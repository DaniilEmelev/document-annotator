import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  output,
} from '@angular/core';
import { TextAnnotationTool } from '../../../annotations/components/text-annotation-tool/text-annotation-tool';
import { ZoomService } from '../../services/zoom.service';

@Component({
  selector: 'app-workspace-toolbar',
  imports: [TextAnnotationTool],
  templateUrl: './workspace-toolbar.html',
  styleUrl: './workspace-toolbar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkspaceToolbar {
   name = input.required<string>();
   save = output<void>();

    zoomService = inject(ZoomService);
}
