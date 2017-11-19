import { actionTypesFor } from "trivial-redux";

export function getProducts(params) {
  return {
    types: actionTypesFor("index", "products"),
    meta: {
      fetch: {
        url: "~products/all",
        params: params,
        method: "GET"
      }
    }
  };
}
