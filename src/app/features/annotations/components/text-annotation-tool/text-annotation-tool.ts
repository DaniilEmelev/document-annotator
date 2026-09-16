import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { AnnotationService } from '../../services/annotation.service';

@Component({
  selector: 'app-text-annotation-tool',
  template: `
    @if (draft(); as draft) {
      <input
        type="text"
        [value]="draft.text"
        placeholder="Annotation text"
        (input)="onInput($event)"
      />
    }

    <button type="button" [class.active]="draft() !== null" (click)="activate()">
      Add text
    </button>
  `,
  styles: `
    button.active {
      background: #1d4ed8;
      color: white;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextAnnotationTool {
  private  annotationService = inject(AnnotationService);

    draft = computed(() => {
    const draft = this.annotationService.draft();
    return draft?.type === 'text' ? draft : null;
  });

   activate() {
    this.annotationService.setDraft({ type: 'text', text: 'New note' });
  }

   onInput(event: Event) {
    const field = event.target as HTMLInputElement;
    this.annotationService.setDraft({ type: 'text', text: field.value });
  }
}
