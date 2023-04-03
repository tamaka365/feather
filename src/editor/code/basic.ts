import { CustomSelection } from './selection';

import { EditorEvent, EditorInputEvent } from './event';

interface EditorEventMap {
  input: EditorInputEvent;
  beforeinput: EditorInputEvent;
  selectionchange: EditorEvent;
}

type EditorEventKeys = keyof EditorEventMap;

interface EditorEventListener<T extends EditorEventKeys> {
  (event: EditorEventMap[T]): void;
}

class BasicEditor extends CustomSelection {
  private $root;

  protected on<T extends EditorEventKeys>(
    eventType: T,
    eventlistener: EditorEventListener<T>
  ) {
    if (eventType === 'selectionchange') {
      document.addEventListener('selectionchange', (event: Event) => {
        const editorInputEvent = new EditorEvent(event);
        return eventlistener(editorInputEvent);
      });
      return;
    }

    this.$root.addEventListener(eventType, (event: Event) => {
      const editorEvent = new EditorInputEvent(event);
      return eventlistener(editorEvent);
    });
  }

  private init() {}

  constructor(parentElement: HTMLElement) {
    super();

    const root = document.createElement('div') as HTMLDivElement;
    root.contentEditable = 'true';
    this.$root = root;

    parentElement.appendChild(root);

    this.init();
  }
}

export { BasicEditor };
