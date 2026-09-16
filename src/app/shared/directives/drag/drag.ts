import {
  Directive,
  ElementRef,
  HostListener,
  inject,
  input,
  OnDestroy,
  output,
} from '@angular/core';
import { toPercent } from '../../utils/position.util';
import { DragMove } from '../../types/shared.types';

@Directive({
  selector: '[appDrag]',
})
export class Drag<T> implements OnDestroy {
   dragBoundary = input.required<HTMLElement>();
   dragData = input.required<T>();

   dragMoved = output<DragMove<T>>();
   dragEnded = output<DragMove<T>>();

  private  el = inject(ElementRef<HTMLElement>);

  private offset = { x: 0, y: 0 };
  private active = false;
  private pointerId: number | null = null;

  @HostListener('pointerdown', ['$event'])
  onPointerDown(event: PointerEvent): void {
    event.preventDefault();
    event.stopPropagation();

    const rect = this.el.nativeElement.getBoundingClientRect();

    this.offset = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };

    this.active = true;
    this.pointerId = event.pointerId;
    this.el.nativeElement.setPointerCapture?.(event.pointerId);

    window.addEventListener('pointermove', this.onMove);
    window.addEventListener('pointerup', this.onUp);
  }

  ngOnDestroy(): void {
    this.clearListeners();
  }

  private onMove = (event: PointerEvent): void => {
    if (!this.active) {
      return;
    }

    this.dragMoved.emit({
      event,
      position: toPercent(event, this.dragBoundary(), this.offset),
      data: this.dragData(),
    });
  };

  private onUp = (event: PointerEvent): void => {
    if (!this.active) {
      return;
    }

    this.active = false;
    this.clearListeners();

    if (this.pointerId !== null) {
      this.el.nativeElement.releasePointerCapture?.(this.pointerId);
      this.pointerId = null;
    }

    this.dragEnded.emit({
      event,
      position: toPercent(event, this.dragBoundary(), this.offset),
      data: this.dragData(),
    });
  };

  private clearListeners(): void {
    window.removeEventListener('pointermove', this.onMove);
    window.removeEventListener('pointerup', this.onUp);
  }
}
