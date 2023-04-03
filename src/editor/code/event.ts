export class EditorEvent {
  public nativeEvent: Event;

  constructor(event: Event) {
    this.nativeEvent = event;
  }
}

export class EditorInputEvent extends EditorEvent {}
