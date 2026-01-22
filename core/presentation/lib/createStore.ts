import { create, StoreApi, UseBoundStore, type StateCreator } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

type ConfigType<T> = {
  name?: string;
  storage?: Storage;
  skipPersist?: boolean;
  excludeFromPersist?: Array<keyof T>;
};

const createStore = <T extends object>(
  stateCreator: StateCreator<T, [["zustand/immer", never]], [], T>,
  config: ConfigType<T>
) => {
  const { name, storage, skipPersist, excludeFromPersist } = config;

  const immerStore = immer(stateCreator);

  if (skipPersist) {
    return create<T>()(immerStore);
  }
  return create<T>()(
    persist(immerStore, {
      name: name || "zustand-store",
      storage: createJSONStorage(() => storage || localStorage),
      partialize: (state) =>
        Object.fromEntries(
          Object.entries(state).filter(
            ([key]) => !excludeFromPersist?.includes(key as keyof T)
          )
        ),
    })
  );
};
export { createStore };

/**
 * Return a plain key:value snapshot of the store state.
 * Functions and non-plain values are omitted.
 */
function cloneNoFuncs(value: unknown): unknown {
  if (value == null) return value;
  if (typeof value === "function") return undefined;
  if (typeof value !== "object") return value;

  if (Array.isArray(value)) {
    return value.map(cloneNoFuncs).filter((v) => v !== undefined);
  }

  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
    const cloned = cloneNoFuncs(v);
    if (cloned !== undefined) out[k] = cloned;
  }
  return out;
}

/**
 * getState(store) -> returns a plain object of the store state (no functions).
 * Usage:
 *   const snapshot = getState(myStore);
 */
export function getState<T extends object>(
  store: UseBoundStore<StoreApi<T>>
): T {
  const state = store.getState();
  return cloneNoFuncs(state) as T;
}
