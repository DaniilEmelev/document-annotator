import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  untracked,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { DocumentPage } from '../document-page/document-page';
import { DocumentService } from '../../services/document.service';
import { WorkspaceToolbar } from '../workspace-toolbar/workspace-toolbar';
import { AnnotationService } from '../../../annotations/services/annotation.service';
import { ZoomService } from '../../services/zoom.service';

@Component({
  selector: 'app-document-workspace',
  imports: [WorkspaceToolbar, DocumentPage],
  templateUrl: './document-workspace.html',
  styleUrl: './document-workspace.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentWorkspace {
  private  route = inject(ActivatedRoute);
  private  documentService = inject(DocumentService);
  private  annotationService = inject(AnnotationService);
  private  zoomService = inject(ZoomService);

    documentId = toSignal(
    this.route.paramMap.pipe(map((params) => params.get('id') ?? '1')),
    { initialValue: '1' },
  );

    documentResource = this.documentService.load(this.documentId);

    document = computed(() => {
    const data = this.documentResource.value();

    if (!data) {
      return null;
    }

    return { ...data, id: this.documentId() };
  });

  constructor() {
    effect(() => {
      this.documentId();
      untracked(() => {
        this.annotationService.reset();
        this.zoomService.reset();
      });
    });
  }

   save() {
    this.documentService.save(
      this.document(),
      this.annotationService.annotations(),
    );
  }
}
