/**
 * @example https://storage.example.com/files/보고서.pdf -> 보고서.pdf
 */
export function parseFileUrl(fileUrl: string) {
  const fullUrl = new URL(fileUrl);

  const name = fullUrl.searchParams.get("fileName");
  const url = `${fullUrl.origin}${fullUrl.pathname}`;
  return {
    name,
    url,
  };
}
