/** Base64 UTF-8 — evita `data-*` com `-->` que o DOMPurify remove (SAFE_FOR_XML). */

export function encodeMermaidForAttr(text: string): string {
  const normalized = text.replace(/\r\n/g, '\n');
  const bytes = new TextEncoder().encode(normalized);
  let bin = '';
  bytes.forEach((b) => {
    bin += String.fromCharCode(b);
  });
  return btoa(bin);
}

export function decodeMermaidFromAttr(b64: string): string {
  const bin = atob(b64);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return new TextDecoder('utf-8').decode(bytes);
}
