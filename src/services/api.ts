import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// api base url
const url = import.meta.env.VITE_API_BASE_URL;

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: url }),
  endpoints: () => ({}),
});
