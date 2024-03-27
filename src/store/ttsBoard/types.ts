type ttsActions = {
  addToTtsBoard: (value: SymbolData) => void;
  deleteFromTtsBoard: (value: SymbolData, index: number) => void;
  clearAll: () => void;
  speakAll: () => void;
};
