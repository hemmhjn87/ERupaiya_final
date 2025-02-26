// This function is web-only as native doesn't currently support server (or build-time) rendering.
export function useClientOnlyValue<T>(web: T, native: T): T {
  return native;
}
