type ttsActions = {
  addToTtsBoard: (value: SymbolData) => void;
  deleteFromTtsBoard: (value: SymbolData) => void;
  clearAll: () => void;
  speakAll: () => void;
};
