import { useSyncExternalStore } from "react"

const emptySubscribe = () => () => {}

/**
 * Returns true once the component has mounted on the client.
 * Use this to guard against Zustand hydration mismatches in SSR.
 */
export function useHydrated() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  )
}
