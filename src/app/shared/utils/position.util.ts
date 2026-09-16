export interface IPercentPosition {
  x: number;
  y: number;
}

export function toPercent(
  event: MouseEvent | PointerEvent,
  el: HTMLElement,
  offset = { x: 0, y: 0 },
): IPercentPosition {
  const rect = el.getBoundingClientRect();

  return {
    x: clampPct(((event.clientX - rect.left - offset.x) / rect.width) * 100),
    y: clampPct(((event.clientY - rect.top - offset.y) / rect.height) * 100),
  };
}

export function clampPct(value: number): number {
  return Math.min(100, Math.max(0, value));
}
