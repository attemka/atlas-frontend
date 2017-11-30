import { actionTypesFor } from "trivial-redux";

export function checkRequest(tools, type) {
  return {
    types: actionTypesFor("index", "requests"),
    meta: {
      fetch: {
        url: "~products/check_invoice",
        data:{
          products: tools,
          invoice_type: type,
        },
        method: "POST"
      }
    }
  };
}