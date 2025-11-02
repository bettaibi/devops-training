/**
 * Formats a string by capitalizing the first letter
 * @param str - The string to format
 * @returns The formatted string with first letter capitalized
 */
export function capitalizeFirst(str: string): string {
  if (!str || str.length === 0) {
    return str
  }
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

