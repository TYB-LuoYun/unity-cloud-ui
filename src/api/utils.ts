export const baseUrlApi = (url: string) =>
  process.env.NODE_ENV === "development"
    ? `/api/${url}`
    : `/api/${url}`;