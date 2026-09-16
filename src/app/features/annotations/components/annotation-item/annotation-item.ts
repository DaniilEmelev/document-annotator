import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { TDocumentAnnotation } from '../../models/annotation.model';
import { Drag } from '../../../../shared/directives/drag/drag';
import { DragMove } from '../../../../shared/types/shared.types';
import { AnnotationService } from '../../services/annotation.service';

@Component({
  selector: 'app-annotation-item',
  imports: [Drag],
  templateUrl: './annotation-item.html',
  styleUrl: './annotation-item.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnnotationItem {
  boundary = input.required<HTMLElement>();
  annotation = input.required<TDocumentAnnotation>();

  private annotationService = inject(AnnotationService);

   onMoved(event: DragMove<TDocumentAnnotation>) {
    this.annotationService.move({
      id: event.data.id,
      x: event.position.x,
      y: event.position.y,
    });
  }

   onDelete(event: MouseEvent) {
    event.stopPropagation();
    this.annotationService.remove(this.annotation().id);
  }
}
