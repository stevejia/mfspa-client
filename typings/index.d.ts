interface Window {
  mfspa: any;
  addHistoryListener: (name: string, fn: Function) => void;
  removeHistoryListener: (name: string, fn: Function) => void;
  reloadCount: number | null | undefined;
}
