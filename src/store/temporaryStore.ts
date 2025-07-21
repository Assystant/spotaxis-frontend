import { create } from 'zustand';

// Define the interface for your store's state and actions
interface CountState {
  count: number;
  increaseCount: () => void;
  removeAllCounts: () => void;
  updateCount: (newCount: number) => void;
}

// Create the Zustand store using the defined interface
const useCountStore = create<CountState>((set) => ({
  // Initial state
  count: 0,

  // Action to increase the count
  increaseCount: () => set((state) => ({ count: state.count + 1 })),

  // Action to remove all counts (reset to 0)
  removeAllCounts: () => set({ count: 0 }),

  // Action to update the count to a specific value
  updateCount: (newCount: number) => set({ count: newCount }),
}));

export default useCountStore;

// Optional: Export specific selectors for better type safety and performance
// This allows components to subscribe only to the parts of the state they need,
// preventing unnecessary re-renders when other parts of the store change.
export const useCount = () => useCountStore((state) => state.count);
export const useIncreaseCount = () => useCountStore((state) => state.increaseCount);
export const useRemoveAllCounts = () => useCountStore((state) => state.removeAllCounts);
export const useUpdateCount = () => useCountStore((state) => state.updateCount);
