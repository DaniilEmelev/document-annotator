import { Injectable, signal } from '@angular/core';
import {
  TAddAnnotationPayload,
  TAnnotationDraft,
  TDocumentAnnotation,
  TMoveAnnotationPayload,
} from '../models/annotation.model';

@Injectable()
export class AnnotationService {
   annotations = signal<TDocumentAnnotation[]>([]);
   draft = signal<TAnnotationDraft | null>(null);

  reset() {
    this.annotations.set([]);
    this.draft.set(null);
  }

  setDraft(draft: TAnnotationDraft) {
    this.draft.set(draft);
  }

  placeDraft(payload: TAddAnnotationPayload) {
    const draft = this.draft();

    if (!draft) {
      return;
    }

    this.annotations.update((annotations) => [
      ...annotations,
      {
        id: crypto.randomUUID(),
        ...payload,
        ...draft,
      },
    ]);

    this.draft.set(null);
  }

  remove(id: string) {
    this.annotations.update((annotations) =>
      annotations.filter((annotation) => annotation.id !== id),
    );
  }

  move(payload: TMoveAnnotationPayload) {
    this.annotations.update((annotations) =>
      annotations.map((annotation) =>
        annotation.id === payload.id
          ? { ...annotation, x: payload.x, y: payload.y }
          : annotation,
      ),
    );
  }
}
