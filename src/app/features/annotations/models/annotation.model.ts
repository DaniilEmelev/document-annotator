import { IPercentPosition } from '../../../shared/utils/position.util';

export type TAnnotationType = 'text';

export interface IAnnotationBase extends IPercentPosition {
  id: string;
  pageNumber: number;
  type: TAnnotationType;
}

export interface ITextAnnotation extends IAnnotationBase {
  type: 'text';
  text: string;
}

export interface ITextAnnotationDraft {
  type: 'text';
  text: string;
}

export type TDocumentAnnotation = ITextAnnotation;
export type TAnnotationDraft = ITextAnnotationDraft;

export type TAddAnnotationPayload = Pick<
  IAnnotationBase,
  'pageNumber' | 'x' | 'y'
>;
export type TMoveAnnotationPayload = Pick<IAnnotationBase, 'x' | 'y' | 'id'>;
