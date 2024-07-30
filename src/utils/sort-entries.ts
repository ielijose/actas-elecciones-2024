export function sortEntriesByName<T>(entries: [string, T][]): [string, T][] {
  return entries.sort((a, b) =>
    a[0].localeCompare(b[0], undefined, { sensitivity: "base" })
  );
}
