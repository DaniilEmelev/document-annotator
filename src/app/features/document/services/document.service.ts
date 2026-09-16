import { httpResource } from '@angular/common/http';
import { Injectable, Signal } from '@angular/core';
import { IDocumentDto, IDocumentView } from '../models/document.model';
import { TDocumentAnnotation } from '../../annotations/models/annotation.model';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  load(id: Signal<string>) {
    return httpResource<IDocumentDto>(() => `/mock/${id()}.json`);
  }

  save(document: IDocumentView | null, annotations: TDocumentAnnotation[]) {
    if (!document) {
      return;
    }

    console.log({
      documentId: document.id,
      name: document.name,
      pages: document.pages,
      annotations,
    });
  }
}
