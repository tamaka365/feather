import { BasicEditor } from './code/basic';
import { EditorInputEvent } from './code/event';

class Editor extends BasicEditor {
  private handleBeforeinput(event: EditorInputEvent) {
    console.log('EditorInputEvent', event);
  }

  private handleSelectionchange(event: EditorInputEvent) {
    console.log('selectionchange', event);
  }

  private start() {
    this.on('beforeinput', this.handleBeforeinput);
    this.on('selectionchange', this.handleSelectionchange);
  }

  constructor(parentElement: HTMLElement) {
    super(parentElement);
    this.start();
  }
}

export default Editor;
