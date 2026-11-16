export function withBase(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "")

  let normalizedPath = path
  // In Astro, trailingSlash is configured to "always".
  // Ensure internal route paths (not assets with extensions, query, or hash) end with a trailing slash.
  if (
    normalizedPath.startsWith("/") &&
    !normalizedPath.startsWith("//") &&
    !normalizedPath.includes("?") &&
    !normalizedPath.includes("#") &&
    !/\.[a-zA-Z0-9]+$/.test(normalizedPath) &&
    !normalizedPath.endsWith("/")
  ) {
    normalizedPath = `${normalizedPath}/`
  }

  if (
    !normalizedPath.startsWith("/") ||
    normalizedPath.startsWith("//") ||
    normalizedPath === base ||
    normalizedPath.startsWith(`${base}/`)
  )
    return normalizedPath
  return `${base}${normalizedPath}`
}
