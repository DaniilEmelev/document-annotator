import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  input,
  viewChild,
} from '@angular/core';
import { AnnotationItem } from '../../../annotations/components/annotation-item/annotation-item';
import { IDocumentPage, PAGE_BASE_WIDTH } from '../../models/document.model';
import { toPercent } from '../../../../shared/utils/position.util';
import { AnnotationService } from '../../../annotations/services/annotation.service';
import { ZoomService } from '../../services/zoom.service';

@Component({
  selector: 'app-document-page',
  imports: [AnnotationItem],
  templateUrl: './document-page.html',
  styleUrl: './document-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentPage {
   page = input.required<IDocumentPage>();

    zoomService = inject(ZoomService);
    annotationService = inject(AnnotationService);
    baseWidth = PAGE_BASE_WIDTH;

    annotations = computed(() =>
    this.annotationService
      .annotations()
      .filter((annotation) => annotation.pageNumber === this.page().number),
  );

  private  pageEl =
    viewChild.required<ElementRef<HTMLElement>>('pageEl');

   onClick(event: MouseEvent) {
    const position = toPercent(event, this.pageEl().nativeElement);
    this.annotationService.placeDraft({
      pageNumber: this.page().number,
      ...position,
    });
  }
}
