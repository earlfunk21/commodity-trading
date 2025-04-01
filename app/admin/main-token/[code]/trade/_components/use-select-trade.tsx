import { create } from "zustand";

type SelectTradeIdState = {
  selectedIds: string[];
  selectId: (id: string) => void;
  deselectId: (id: string) => void;
  clearIds: () => void;
  selectManyIds: (ids: string[]) => void;
};

export const useSelectTradeIds = create<SelectTradeIdState>((set) => ({
  selectedIds: [],
  selectId: (id) =>
    set((state) => ({
      selectedIds: [...state.selectedIds, id],
    })),
  deselectId: (id) =>
    set((state) => ({
      selectedIds: state.selectedIds.filter((selectedId) => selectedId !== id),
    })),
  clearIds: () => set({ selectedIds: [] }),
  selectManyIds: (ids) => set({ selectedIds: ids }),
}));
