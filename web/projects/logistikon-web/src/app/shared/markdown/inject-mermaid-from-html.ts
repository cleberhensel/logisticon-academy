import { encodeMermaidForAttr } from './mermaid-text-encoding';

/**
 * Converte blocos marked (<pre><code class="language-mermaid">) em
 * `<pre class="mermaid">` com definição em data-mermaid (base64 UTF-8).
 * Formato alinhado à documentação Mermaid; o texto é aplicado em JS antes de render.
 */
export function injectMermaidFromMarkedHtml(html: string): string {
  return html.replace(
    /<pre><code([^>]*)>([\s\S]*?)<\/code><\/pre>/gi,
    (full, attrs: string, inner: string) => {
      if (!/language-mermaid/i.test(attrs)) {
        return full;
      }
      const raw = decodeHtmlEntitiesBrowser(inner);
      const b64 = encodeMermaidForAttr(raw);
      /* div (não pre): após render o viewport usa divs internos — HTML válido e pan/zoom */
      return `\n<div class="mermaid lk-mermaid-block" data-mermaid="${b64}"></div>\n`;
    }
  );
}

function decodeHtmlEntitiesBrowser(htmlFragment: string): string {
  if (typeof document === 'undefined') {
    return htmlFragment
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&amp;/g, '&')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'");
  }
  const t = document.createElement('textarea');
  t.innerHTML = htmlFragment;
  return t.value;
}
