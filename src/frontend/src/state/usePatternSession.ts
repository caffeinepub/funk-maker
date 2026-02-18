import { create } from 'zustand';
import { Pattern, createEmptyPattern } from '../types/music';

interface PatternSessionState {
  patterns: Pattern[];
  activePatternId: number;
  setActivePattern: (id: number) => void;
  updatePattern: (id: number, updates: Partial<Pattern>) => void;
  createNewPattern: () => void;
  renamePattern: (id: number, name: string) => void;
  loadPattern: (pattern: Pattern) => void;
  getActivePattern: () => Pattern | undefined;
}

export const usePatternSession = create<PatternSessionState>((set, get) => ({
  patterns: [
    createEmptyPattern(1, 'Pattern 1'),
    createEmptyPattern(2, 'Pattern 2'),
    createEmptyPattern(3, 'Pattern 3'),
  ],
  activePatternId: 1,

  setActivePattern: (id) => set({ activePatternId: id }),

  updatePattern: (id, updates) =>
    set((state) => ({
      patterns: state.patterns.map((p) => (p.id === id ? { ...p, ...updates } : p)),
    })),

  createNewPattern: () =>
    set((state) => {
      const newId = Math.max(...state.patterns.map((p) => p.id), 0) + 1;
      const newPattern = createEmptyPattern(newId, `Pattern ${newId}`);
      return {
        patterns: [...state.patterns, newPattern],
        activePatternId: newId,
      };
    }),

  renamePattern: (id, name) =>
    set((state) => ({
      patterns: state.patterns.map((p) => (p.id === id ? { ...p, name } : p)),
    })),

  loadPattern: (pattern) =>
    set((state) => {
      const exists = state.patterns.find((p) => p.id === pattern.id);
      if (exists) {
        return {
          patterns: state.patterns.map((p) => (p.id === pattern.id ? pattern : p)),
          activePatternId: pattern.id,
        };
      }
      return {
        patterns: [...state.patterns, pattern],
        activePatternId: pattern.id,
      };
    }),

  getActivePattern: () => {
    const state = get();
    return state.patterns.find((p) => p.id === state.activePatternId);
  },
}));
