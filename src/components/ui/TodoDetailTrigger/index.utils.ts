/**
 * @example https://storage.example.com/files/보고서.pdf -> 보고서.pdf
 */
export function getFileName(fileUrl: string, defaultName: string) {
  return decodeURIComponent(new URL(fileUrl).pathname.split("/").pop() ?? defaultName);
}
