import Panzoom from '@panzoom/panzoom';
import type { PanzoomObject } from '@panzoom/panzoom';

/** Margem em torno do diagrama dentro da área útil (evita colar nas bordas). */
const FIT_MARGIN = 0.98;

/** Espaço interno descontado de clientWidth/clientHeight ao calcular o fit. */
const FIT_INSET_PX = 8;

/**
 * Tamanho do desenho em **pixels CSS**, usando `getBBox()` (só o conteúdo).
 * O SVG do Mermaid costuma ter `viewBox` grande com muito espaço em branco; usar só
 * `getBoundingClientRect()` no wrapper faz o “fit” dividir por uma largura/altura enorme
 * e o diagrama aparece minúsculo ao centro (o que `svg-pan-zoom` evita com fit no viewBox).
 */
function getSvgTightContentSizeCssPx(svg: SVGSVGElement): { w: number; h: number } {
  const cr = svg.getBoundingClientRect();
  let bbox: DOMRect;
  try {
    bbox = svg.getBBox();
  } catch {
    return { w: Math.max(cr.width, 1), h: Math.max(cr.height, 1) };
  }
  if (bbox.width < 1 || bbox.height < 1) {
    return { w: Math.max(cr.width, 1), h: Math.max(cr.height, 1) };
  }
  const vb = svg.viewBox.baseVal;
  const vbW = vb.width || cr.width;
  const vbH = vb.height || cr.height;
  if (vbW <= 0 || vbH <= 0) {
    return { w: bbox.width, h: bbox.height };
  }
  const sx = cr.width / vbW;
  const sy = cr.height / vbH;
  return {
    w: Math.max(bbox.width * sx, 1),
    h: Math.max(bbox.height * sy, 1)
  };
}

/** Centro do `getBBox()` em coordenadas de ecrã (útil como foco de zoom). */
function getSvgBBoxCenterScreen(svg: SVGSVGElement): { x: number; y: number } {
  const bbox = svg.getBBox();
  const pt = svg.createSVGPoint();
  pt.x = bbox.x + bbox.width / 2;
  pt.y = bbox.y + bbox.height / 2;
  const ctm = svg.getScreenCTM();
  if (!ctm) {
    const cr = svg.getBoundingClientRect();
    return { x: cr.left + cr.width / 2, y: cr.top + cr.height / 2 };
  }
  const sp = pt.matrixTransform(ctm);
  return { x: sp.x, y: sp.y };
}

function debounce(fn: () => void, ms: number): () => void {
  let id: ReturnType<typeof setTimeout> | undefined;
  return () => {
    if (id !== undefined) clearTimeout(id);
    id = setTimeout(() => {
      id = undefined;
      fn();
    }, ms);
  };
}

/**
 * Escala o diagrama para caber no viewport e centra no meio da área visível.
 *
 * **Não** usar o centro do viewport em `zoomToPoint`: com `transform-origin: 50% 50%`,
 * o Panzoom subtrai metade da largura/altura do elemento; se o diagrama for maior
 * que o pai, esse ajuste empurra o ponto focal e o SVG fica minúsculo num canto.
 * O **fit** usa `SVGGraphicsElement.getBBox()` (área do desenho), não o `rect` do
 * wrapper — o que alinha com o que bibliotecas como `svg-pan-zoom` fazem ao
 * encaixar no viewBox.
 * Foco: centro do bbox em ecrã; `pan` corretivo alinha esse centro ao viewport.
 */
function fitMermaidToViewport(
  panzoom: PanzoomObject,
  viewport: HTMLElement,
  panLayer: HTMLElement
): void {
  const svgEl = panLayer.querySelector('svg');
  if (!svgEl || !(svgEl instanceof SVGSVGElement)) return;

  panzoom.reset({ animate: false });

  const { w: contentW, h: contentH } = getSvgTightContentSizeCssPx(svgEl);

  const vw = viewport.clientWidth - FIT_INSET_PX;
  const vh = viewport.clientHeight - FIT_INSET_PX;
  if (vw < 40 || vh < 40 || contentW < 1 || contentH < 1) return;

  let fitScale = Math.min((vw * FIT_MARGIN) / contentW, (vh * FIT_MARGIN) / contentH);
  const opts = panzoom.getOptions();
  const minS = typeof opts.minScale === 'number' ? opts.minScale : 0.25;
  const maxS = typeof opts.maxScale === 'number' ? opts.maxScale : 5;
  fitScale = Math.min(Math.max(fitScale, minS), maxS);

  const focal = getSvgBBoxCenterScreen(svgEl);
  panzoom.zoomToPoint(fitScale, { clientX: focal.x, clientY: focal.y }, { animate: false });

  requestAnimationFrame(() => {
    const vp2 = viewport.getBoundingClientRect();
    const vcx = vp2.left + vp2.width / 2;
    const vcy = vp2.top + vp2.height / 2;
    const after = getSvgBBoxCenterScreen(svgEl);
    const dx = vcx - after.x;
    const dy = vcy - after.y;
    const p = panzoom.getPan();
    const s = panzoom.getScale();
    if (s < 1e-6) return;
    panzoom.pan(p.x + dx / s, p.y + dy / s, { animate: false, relative: false });
  });
}

function scheduleFit(
  panzoom: PanzoomObject,
  viewport: HTMLElement,
  panLayer: HTMLElement
): void {
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      fitMermaidToViewport(panzoom, viewport, panLayer);
    });
  });
}

function bindRefitOnResize(
  panzoom: PanzoomObject,
  viewport: HTMLElement,
  panLayer: HTMLElement,
  block: HTMLElement
): void {
  const run = debounce(() => {
    scheduleFit(panzoom, viewport, panLayer);
  }, 120);

  window.addEventListener('resize', run);

  const article = block.closest('article');
  if (article && typeof ResizeObserver !== 'undefined') {
    const ro = new ResizeObserver(() => run());
    ro.observe(article);
  }
}

/**
 * Envolve cada SVG Mermaid num viewport com pan (arrastar), zoom (roda) e botões +/−/reset.
 * Deve correr depois de `mermaid.render()` e de o SVG estar no DOM.
 */
export function attachMermaidViewports(root: HTMLElement): void {
  const blocks = Array.from(root.querySelectorAll<HTMLElement>('.lk-mermaid-block[data-mermaid]'));
  for (const block of blocks) {
    if (block.querySelector('.lk-mermaid-viewport')) continue;

    const svg = block.querySelector('svg');
    if (!svg) continue;

    const viewport = document.createElement('div');
    viewport.className = 'lk-mermaid-viewport';
    viewport.setAttribute('tabindex', '0');
    viewport.setAttribute('role', 'application');
    viewport.setAttribute(
      'aria-label',
      'Diagrama interativo: arraste para mover, roda do rato para ampliar ou reduzir, botões para zoom e repor vista.'
    );

    const toolbar = document.createElement('div');
    toolbar.className = 'lk-mermaid-toolbar panzoom-exclude';
    toolbar.setAttribute('role', 'toolbar');
    toolbar.setAttribute('aria-label', 'Controlo de zoom do diagrama');

    const panLayer = document.createElement('div');
    panLayer.className = 'lk-mermaid-panzoom';
    panLayer.appendChild(svg);

    viewport.appendChild(toolbar);
    viewport.appendChild(panLayer);
    block.replaceChildren(viewport);

    const panzoom = Panzoom(panLayer, {
      startScale: 1,
      startX: 0,
      startY: 0,
      maxScale: 5,
      minScale: 0.25,
      canvas: true,
      step: 0.12,
      duration: 200,
      easing: 'cubic-bezier(0.25, 0.1, 0.25, 1)'
    });

    const addBtn = (aria: string, text: string, action: () => void) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'btn btn--sm lk-mermaid-toolbar__btn';
      b.setAttribute('aria-label', aria);
      b.textContent = text;
      b.addEventListener('click', (e) => {
        e.stopPropagation();
        action();
      });
      toolbar.appendChild(b);
    };

    addBtn('Aumentar zoom', '+', () => {
      panzoom.zoomIn();
    });
    addBtn('Reduzir zoom', '−', () => {
      panzoom.zoomOut();
    });
    addBtn('Repor vista e zoom', 'Reset', () => {
      fitMermaidToViewport(panzoom, viewport, panLayer);
    });

    viewport.addEventListener(
      'wheel',
      (e) => {
        e.preventDefault();
        panzoom.zoomWithWheel(e);
      },
      { passive: false }
    );

    scheduleFit(panzoom, viewport, panLayer);
    bindRefitOnResize(panzoom, viewport, panLayer, block);
  }
}
