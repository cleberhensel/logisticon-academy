/**
 * Remove o primeiro `<h1>` do HTML se o texto for equivalente ao título da aula
 * (evita duplicar o H1 do player com o `# …` do Markdown).
 *
 * O `lesson.title` no catálogo pode trazer markdown literal (`*notebooks*`);
 * o Marked gera `<em>notebooks</em>` e o `textContent` do H1 fica sem `*`.
 * Sem esta normalização a comparação falha e o título duplica.
 */
function stripInlineMarkdownForCompare(s: string): string {
  let t = s;
  t = t.replace(/`([^`]+)`/g, '$1');
  t = t.replace(/\*\*([^*]+)\*\*/g, '$1');
  t = t.replace(/\*([^*]+)\*/g, '$1');
  t = t.replace(/__([^_]+)__/g, '$1');
  t = t.replace(/_([^_]+)_/g, '$1');
  t = t.replace(/\[([^\]]+)\]\([^)]*\)/g, '$1');
  return t;
}

function normalizeComparableTitle(s: string): string {
  return stripInlineMarkdownForCompare(s)
    .trim()
    .replace(/\s+/g, ' ')
    .toLocaleLowerCase('pt');
}

export function stripDuplicateLeadingH1(html: string, title: string | null | undefined): string {
  if (!title?.trim()) return html;

  const expected = normalizeComparableTitle(title);
  const wrap = `<div id="lk-strip-root">${html}</div>`;
  const doc = new DOMParser().parseFromString(wrap, 'text/html');
  const root = doc.getElementById('lk-strip-root');
  if (!root) return html;

  const first = root.firstElementChild;
  if (!first || first.tagName !== 'H1') return html;

  const got = normalizeComparableTitle(first.textContent ?? '');
  if (got !== expected) return html;

  first.remove();
  return root.innerHTML;
}
