export const HTTP_HEADERS = (accessToken?: string): HeadersInit => ({
  "Content-Type": "application/json",
  ...(accessToken && {
    Authorization: `Bearer ${accessToken}`,
  }),
});
