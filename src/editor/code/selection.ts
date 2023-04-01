class CustomSelection {
  private selection: Selection | null;

  protected getSelection() {
    return this.selection;
  }

  protected setSelection(selection: Selection) {
    this.selection = selection;
  }

  constructor() {
    this.selection = document.getSelection();
  }
}

export { CustomSelection };
