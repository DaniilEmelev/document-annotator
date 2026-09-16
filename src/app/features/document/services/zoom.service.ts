import { computed, Injectable, signal } from '@angular/core';
import {
  decreaseZoom,
  formatZoom,
  increaseZoom,
} from '../../../shared/utils/zoom.util';

@Injectable()
export class ZoomService {
  scale = signal(1);
  label = computed(() => formatZoom(this.scale()));

  reset() {
    this.scale.set(1);
  }

  zoomIn() {
    this.scale.update(increaseZoom);
  }

  zoomOut() {
    this.scale.update(decreaseZoom);
  }
}
