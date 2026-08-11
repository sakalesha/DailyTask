import { create } from 'zustand';

interface UIState {
  editingTaskId: string | null;
  setEditingTaskId: (id: string | null) => void;
  toast: string | null;
  setToast: (msg: string | null) => void;
  focusedTaskId: string | null;
  setFocusedTaskId: (id: string | null) => void;
  focusStartTime: number | null;
  setFocusStartTime: (time: number | null) => void;
  isNightReviewOpen: boolean;
  setIsNightReviewOpen: (isOpen: boolean) => void;
  isSyncing: boolean;
  setIsSyncing: (isSyncing: boolean) => void;
  lastSyncedAt: string | null;
  setLastSyncedAt: (time: string | null) => void;
}

export const useUIStore = create<UIState>((set) => ({
  editingTaskId: null,
  setEditingTaskId: (id) => set({ editingTaskId: id }),
  toast: null,
  setToast: (msg) => {
    set({ toast: msg });
    if (msg) setTimeout(() => set({ toast: null }), 3000);
  },
  focusedTaskId: null,
  setFocusedTaskId: (id) => set({ focusedTaskId: id }),
  focusStartTime: null,
  setFocusStartTime: (time) => set({ focusStartTime: time }),
  isNightReviewOpen: false,
  setIsNightReviewOpen: (isOpen) => set({ isNightReviewOpen: isOpen }),
  isSyncing: false,
  setIsSyncing: (isSyncing) => set({ isSyncing }),
  lastSyncedAt: null,
  setLastSyncedAt: (time) => set({ lastSyncedAt: time }),
}));
