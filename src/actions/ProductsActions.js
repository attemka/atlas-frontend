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

export function getProductsForInvoices(params) {
  return {
    types: actionTypesFor("index", "products"),
    meta: {
      fetch: {
        url: "~products/for_invoice",
        params: params,
        method: "GET"
      }
    }
  };
}

export function getProductById(id) {
  return {
    types: actionTypesFor("show", "products"),
    meta: {
      fetch: {
        url: `~admin2/products/${id}`,
        method: "GET"
      }
    }
  };
}
