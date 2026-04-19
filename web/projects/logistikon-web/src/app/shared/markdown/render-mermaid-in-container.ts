import { decodeMermaidFromAttr } from './mermaid-text-encoding';
import { attachMermaidViewports } from './attach-mermaid-viewport';

/**
 * Renderiza diagramas com a API oficial `mermaid.render()` (recomendada para conteúdo dinâmico).
 * @see https://mermaid.js.org/config/usage.html — API usage / dynamic rendering
 *
 * Espera `<div class="mermaid lk-mermaid-block" data-mermaid="base64">` (corpo vazio até ao render).
 */
export async function renderMermaidInContainer(
  root: HTMLElement,
  isDarkMode: () => boolean
): Promise<void> {
  if (typeof document === 'undefined') return;

  const blocks = Array.from(root.querySelectorAll<HTMLElement>('.lk-mermaid-block[data-mermaid]'));
  if (blocks.length === 0) return;

  const mermaid = (await import('mermaid')).default;

  const isDark = isDarkMode();
  mermaid.initialize({
    startOnLoad: false,
    securityLevel: 'loose',
    theme: isDark ? 'dark' : 'default',
    fontFamily: 'inherit',
    themeVariables: isDark
      ? {
          primaryTextColor: '#e8e6dc',
          primaryColor: '#3d4f3a',
          lineColor: '#6f7261',
          secondaryColor: '#1d1f1a',
          tertiaryColor: '#0e0f0d'
        }
      : undefined
  });

  for (const el of blocks) {
    const b64 = el.getAttribute('data-mermaid');
    if (!b64) continue;

    let definition: string;
    try {
      definition = decodeMermaidFromAttr(b64).trim();
    } catch {
      el.replaceChildren();
      el.appendChild(document.createTextNode('(Diagrama inválido)'));
      continue;
    }

    if (!definition) continue;

    const id =
      typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
        ? `lk-mmd-${crypto.randomUUID()}`
        : `lk-mmd-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
    try {
      const { svg, bindFunctions } = await mermaid.render(id, definition);
      el.innerHTML = svg;
      bindFunctions?.(el);
    } catch (e) {
      console.error('[mermaid] render', e);
      el.innerHTML = '';
      const err = document.createElement('div');
      err.className = 'alert alert--warn';
      err.setAttribute('role', 'alert');
      err.textContent = 'Não foi possível desenhar este diagrama.';
      el.appendChild(err);
    }
  }

  attachMermaidViewports(root);
}
