import { Routes } from '@angular/router';
import { DocumentWorkspace } from './features/document/components/document-workspace/document-workspace';
import { AnnotationService } from './features/annotations/services/annotation.service';
import { ZoomService } from './features/document/services/zoom.service';

export const routes: Routes = [
  {
    path: 'documents/:id',
    component: DocumentWorkspace,
    providers: [AnnotationService, ZoomService],
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'documents/1',
  },
];
