import { createStore } from '../lib/createStore';
import { VariationEntity } from '@/core/domain/entities/variants.entity';
import { AddonEntity, AddonOptionEntity } from '@/core/domain/entities/Addons.entity';

interface ProductConfigurationState {
  // Selected variant
  selectedVariant: VariationEntity | null;
  
  // Selected addon options - keyed by addonId, value is array of selected options
  selectedAddons: Record<string, AddonOptionEntity[]>;
  
  // Available addons for the current variant (for reference)
  availableAddons: AddonEntity[] | null;
  
  // Actions
  setSelectedVariant: (variant: VariationEntity) => void;
  setAvailableAddons: (addons: AddonEntity[] | null) => void;
  toggleAddonOption: (addon: AddonEntity, option: AddonOptionEntity) => void;
  clearAddonSelection: (addonId: string) => void;
  clearAllAddons: () => void;
  setAddonOptions: (addonId: string, options: AddonOptionEntity[]) => void;
  reset: () => void;
}

const initialState = {
  selectedVariant: null,
  selectedAddons: {},
  availableAddons: null,
};

export const useProductConfigurationStore = createStore<ProductConfigurationState>(
  (set) => ({
    ...initialState,
    setAddonOptions: (addonId, options) =>
      set((state) => {
        state.selectedAddons[addonId] = options;
      }),

    setSelectedVariant: (variant) =>
      set((state) => {
        state.selectedVariant = variant;
        // Clear addons when variant changes (since addons are variant-specific)
        state.selectedAddons = {};
        state.availableAddons = null;
      }),

    setAvailableAddons: (addons) =>
      set((state) => {
        state.availableAddons = addons;
        // Initialize selected addons with default selections
        if (addons) {
          addons.forEach((addon) => {
            const defaultOptions = addon.options.filter(
              (option) => option.selected_by_default
            );
            if (defaultOptions.length > 0) {
              state.selectedAddons[addon.id] = defaultOptions;
            }
          });
        }
      }),

    toggleAddonOption: (addon, option) =>
      set((state) => {
        const currentSelections = state.selectedAddons[addon.id] || [];
        const isSelected = currentSelections.some(
          (o) => o.title === option.title
        );

        if (isSelected) {
          // Remove option
          state.selectedAddons[addon.id] = currentSelections.filter(
            (o) => o.title !== option.title
          );
        } else {
          // Add option
          if (!addon.IsMultiChoise) {
            // Single choice - replace all selections
            state.selectedAddons[addon.id] = [option];
          } else {
            // Multi choice - check max rules
            const maxAllowed = addon.min_max_rules.max;
            if (maxAllowed === 0 || currentSelections.length < maxAllowed) {
              state.selectedAddons[addon.id] = [...currentSelections, option];
            }
          }
        }
      }),

    clearAddonSelection: (addonId) =>
      set((state) => {
        delete state.selectedAddons[addonId];
      }),

    clearAllAddons: () =>
      set((state) => {
        state.selectedAddons = {};
      }),

    reset: () =>
      set(() => ({
        ...initialState,
      })),
  }),
  {
    name: 'product-configuration-store',
    skipPersist: true, // Don't persist to avoid stale data
  }
);

// Helper functions to access store state (use these in components)
export const getSelectedAddonsForAddon = (addonId: string): AddonOptionEntity[] => {
  const state = useProductConfigurationStore.getState();
  return state.selectedAddons[addonId] || [];
};

export const isAddonOptionSelected = (addonId: string, optionTitle: string): boolean => {
  const state = useProductConfigurationStore.getState();
  const selections = state.selectedAddons[addonId] || [];
  return selections.some((o: AddonOptionEntity) => o.title === optionTitle);
};

export const getTotalAddonPrice = (): number => {
  const state = useProductConfigurationStore.getState();
  let total = 0;
  Object.values(state.selectedAddons).forEach((options: AddonOptionEntity[]) => {
    options.forEach((option: AddonOptionEntity) => {
      if (option.price_method !== 'free') {
        total += Number(option.price) || 0;
      }
    });
  });
  return total;
};

export const getTotalPrice = (): number => {
  const state = useProductConfigurationStore.getState();
  const variantPrice = state.selectedVariant?.price_tax || 0;
  const addonPrice = getTotalAddonPrice();
  return variantPrice + addonPrice;
};

