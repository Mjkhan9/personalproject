import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useShallow } from 'zustand/shallow';

const useQuoteStoreBase = create(
  persist(
    (set, get) => ({
      // Selected items with quantities
      selectedItems: {},
      
      // Customer info
      customerInfo: {
        name: '',
        email: '',
        phone: '',
        eventDate: '',
        eventType: '',
        venueName: '',
        notes: '',
      },

      // Add item to quote
      addItem: (item) => set((state) => {
        const currentQty = state.selectedItems[item.id]?.quantity || 0;
        const maxQty = item.maxQuantity || 10;
        
        if (currentQty >= maxQty) return state;
        
        return {
          selectedItems: {
            ...state.selectedItems,
            [item.id]: {
              ...item,
              quantity: currentQty + 1,
            },
          },
        };
      }),

      // Remove item from quote
      removeItem: (itemId) => set((state) => {
        const newItems = { ...state.selectedItems };
        delete newItems[itemId];
        return { selectedItems: newItems };
      }),

      // Update item quantity
      updateQuantity: (itemId, quantity) => set((state) => {
        if (quantity <= 0) {
          const newItems = { ...state.selectedItems };
          delete newItems[itemId];
          return { selectedItems: newItems };
        }
        
        const item = state.selectedItems[itemId];
        if (!item) return state;
        
        const maxQty = item.maxQuantity || 10;
        const newQty = Math.min(quantity, maxQty);
        
        return {
          selectedItems: {
            ...state.selectedItems,
            [itemId]: {
              ...item,
              quantity: newQty,
            },
          },
        };
      }),

      // Check if item is selected
      isItemSelected: (itemId) => {
        return !!get().selectedItems[itemId];
      },

      // Get item quantity
      getItemQuantity: (itemId) => {
        return get().selectedItems[itemId]?.quantity || 0;
      },

      // Update customer info
      setCustomerInfo: (info) => set((state) => ({
        customerInfo: { ...state.customerInfo, ...info },
      })),

      // Clear all selections
      clearAll: () => set({ 
        selectedItems: {},
        customerInfo: {
          name: '',
          email: '',
          phone: '',
          eventDate: '',
          eventType: '',
          venueName: '',
          notes: '',
        },
      }),

      // Clear only items (keep customer info)
      clearItems: () => set({ selectedItems: {} }),
    }),
    {
      name: 'ak-enchanted-quote',
      partialize: (state) => ({ 
        selectedItems: state.selectedItems,
        customerInfo: state.customerInfo,
      }),
    }
  )
);

// Export the base store for actions
export const useQuoteStore = useQuoteStoreBase;

// Custom hooks with proper memoization
export const useSelectedItemsArray = () => {
  return useQuoteStoreBase(
    useShallow((state) => Object.values(state.selectedItems))
  );
};

export const useSubtotal = () => {
  return useQuoteStoreBase((state) => {
    const items = Object.values(state.selectedItems);
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  });
};

export const useTotalItemCount = () => {
  return useQuoteStoreBase((state) => {
    const items = Object.values(state.selectedItems);
    return items.reduce((count, item) => count + item.quantity, 0);
  });
};
