// Geração e decode de JWT "fake" (algoritmo "none") apenas para desenvolvimento/POC.
// Compatível com o formato gerado pelo antigo mock-api Node, para preservar contratos.

export interface FakeJwtPayload {
  sub: string;
  roles: string[];
  iat: number;
  exp: number;
}

const TWENTY_FOUR_HOURS = 60 * 60 * 24;

function toBase64Url(input: string): string {
  const b64 = btoa(unescape(encodeURIComponent(input)));
  return b64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function fromBase64Url(input: string): string {
  const padded = input.replace(/-/g, '+').replace(/_/g, '/');
  const padLen = (4 - (padded.length % 4)) % 4;
  return decodeURIComponent(escape(atob(padded + '='.repeat(padLen))));
}

export function makeFakeJwt(payload: { sub: string; roles: string[] }): string {
  const header = toBase64Url(JSON.stringify({ alg: 'none', typ: 'JWT' }));
  const now = Math.floor(Date.now() / 1000);
  const body = toBase64Url(
    JSON.stringify({ ...payload, iat: now, exp: now + TWENTY_FOUR_HOURS })
  );
  return `${header}.${body}.`;
}

export function decodeFakeJwt(token: string): FakeJwtPayload | null {
  try {
    const parts = token.split('.');
    if (parts.length < 2) return null;
    const payload = JSON.parse(fromBase64Url(parts[1])) as FakeJwtPayload;
    if (!payload.sub) return null;
    if (payload.exp && payload.exp * 1000 < Date.now()) return null;
    return payload;
  } catch {
    return null;
  }
}

export function makeId(prefix: string): string {
  const buf = new Uint8Array(6);
  crypto.getRandomValues(buf);
  const hex = Array.from(buf, (b) => b.toString(16).padStart(2, '0')).join('');
  return `${prefix}_${hex}`;
}

export function makeRefreshToken(): string {
  const buf = new Uint8Array(8);
  crypto.getRandomValues(buf);
  const hex = Array.from(buf, (b) => b.toString(16).padStart(2, '0')).join('');
  return `rt_${hex}`;
}

export function makeUpperCode(bytes = 3): string {
  const buf = new Uint8Array(bytes);
  crypto.getRandomValues(buf);
  return Array.from(buf, (b) => b.toString(16).padStart(2, '0'))
    .join('')
    .toUpperCase();
}
