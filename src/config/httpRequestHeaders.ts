export const HTTP_HEADERS = (accessToken?: string) => ({
  "Content-Type": "application/json",
  ...(accessToken && {
    Authorization: `Bearer ${accessToken}`,
  }),
});
