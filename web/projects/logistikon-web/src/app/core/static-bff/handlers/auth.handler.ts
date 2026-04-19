import { BffContext, BffResult, err, ok } from '../static-bff.interceptor';
import { makeFakeJwt, makeId, makeRefreshToken } from '../jwt-fake';
import { StoredUser } from '../static-bff.store';

interface RouteRule {
  pattern: RegExp;
  methods: string[];
  handle: (ctx: BffContext, params: Record<string, string>) => BffResult | Promise<BffResult>;
}

function logEmail(ctx: BffContext, kind: string, to: string, payload: unknown): void {
  ctx.store.getDb().email_log.push({ id: makeId('ml'), kind, to, payload, sentAt: new Date().toISOString() });
  // ruído controlado em consola para POC
  console.log(`[static-bff:email] ${kind} -> ${to}`);
}

function publicUser(u: StoredUser) {
  return { id: u.id, email: u.email, name: u.name, roles: u.roles, emailVerifiedAt: u.emailVerifiedAt };
}

export function handleAuth(): RouteRule[] {
  return [
    {
      pattern: /^\/auth\/register$/,
      methods: ['POST'],
      handle: (ctx) => {
        const { email, password, name } = (ctx.body as Partial<StoredUser> & { password?: string }) ?? {};
        if (!email || !password || !name) return err(400, 'INVALID_INPUT', 'email, password e name são obrigatórios.');
        const db = ctx.store.getDb();
        const existing = db.users.find((u) => u.email === email);
        if (existing) {
          // anti-enumeração: 201 com utilizador "neutro" (sem persistir), tal como o server original.
          return ok(
            {
              user: { id: 'usr_neutro', email, name, roles: ['student'], emailVerifiedAt: null },
              accessToken: makeFakeJwt({ sub: 'usr_neutro', roles: ['student'] }),
              refreshToken: makeRefreshToken(),
              _hint: 'Já existe registo com este email; verifique a sua caixa.'
            },
            201
          );
        }
        const id = makeId('usr');
        const user: StoredUser = {
          id,
          email,
          passwordHash: password,
          name,
          emailVerifiedAt: null,
          roles: ['student'],
          createdAt: new Date().toISOString()
        };
        db.users.push(user);
        ctx.store.write();
        logEmail(ctx, 'verify_email', email, { token: id });
        return ok(
          {
            user: publicUser(user),
            accessToken: makeFakeJwt({ sub: id, roles: user.roles }),
            refreshToken: makeRefreshToken()
          },
          201
        );
      }
    },
    {
      pattern: /^\/auth\/login$/,
      methods: ['POST'],
      handle: (ctx) => {
        const { email, password } = (ctx.body as { email?: string; password?: string }) ?? {};
        if (!email || !password) return err(400, 'INVALID_INPUT', 'email e password obrigatórios.');
        const user = ctx.store.getDb().users.find((u) => u.email === email);
        if (!user || user.passwordHash !== password) return err(401, 'INVALID_CREDENTIALS', 'Credenciais inválidas.');
        return ok({
          user: publicUser(user),
          accessToken: makeFakeJwt({ sub: user.id, roles: user.roles }),
          refreshToken: makeRefreshToken()
        });
      }
    },
    {
      pattern: /^\/auth\/verify-email$/,
      methods: ['POST'],
      handle: (ctx) => {
        const { token } = (ctx.body as { token?: string }) ?? {};
        if (!token) return err(400, 'INVALID_INPUT', 'token obrigatório.');
        const db = ctx.store.getDb();
        const user = db.users.find((u) => u.id === token);
        if (!user) return err(400, 'INVALID_TOKEN', 'Token inválido ou expirado.');
        if (!user.emailVerifiedAt) {
          user.emailVerifiedAt = new Date().toISOString();
          ctx.store.write();
        }
        return ok({ ok: true, user: publicUser(user) });
      }
    },
    {
      pattern: /^\/auth\/resend-verification$/,
      methods: ['POST'],
      handle: (ctx) => {
        const { email } = (ctx.body as { email?: string }) ?? {};
        const user = email ? ctx.store.getDb().users.find((u) => u.email === email) : null;
        if (user && email) logEmail(ctx, 'verify_email', email, { token: user.id });
        return ok({ ok: true }, 202);
      }
    },
    {
      pattern: /^\/auth\/me$/,
      methods: ['GET'],
      handle: (ctx) => {
        const user = ctx.authUser;
        if (!user) return err(401, 'UNAUTHORIZED', 'Sessão inválida ou expirada.');
        return ok({ user: publicUser(user) });
      }
    }
  ];
}
