class EditorEvent {
  public nativeEvent: Event;

  constructor(event: Event) {
    this.nativeEvent = event;
  }
}

class EditorInputEvent extends EditorEvent {}

export { EditorEvent, EditorInputEvent };
