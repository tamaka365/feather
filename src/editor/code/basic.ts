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
    }

    this.$root.addEventListener(eventType, (event: Event) => {
      if (eventType === 'selectionchange') {
        if ((event as InputEvent).inputType === 'deleteContentBackward') {
          const editorEvent = new EditorEvent(event);
          return eventlistener(editorEvent);
        }
      } else {
        const editorEvent = new EditorInputEvent(event);
        return eventlistener(editorEvent);
      }
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
