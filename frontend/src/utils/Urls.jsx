export const API_USER =
  import.meta.env.VITE_BUILD == "PROD"
    ? "/api/users/"
    : "/server" + "/api/users/";

export const API_INVOICE =
  import.meta.env.VITE_BUILD == "PROD"
    ? "/api/invoice/"
    : "/server" + "/api/invoice/";
