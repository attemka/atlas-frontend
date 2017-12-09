import { actionTypesFor } from "trivial-redux";

export function checkRequest(tools, type) {
  return {
    types: actionTypesFor("show", "requests"),
    meta: {
      fetch: {
        url: "~products/check_invoice",
        data: {
          products: tools,
          invoice_type: type
        },
        method: "POST"
      }
    }
  };
}

export function getAccountById(id) {
  return {
    types: actionTypesFor("show", "account"),
    meta: {
      fetch: {
        url: `~user/account/${id}`,
        method: "GET"
      }
    }
  };
}

export function getAllAccounts() {
  return {
    types: actionTypesFor("index", "accounts"),
    meta: {
      fetch: {
        url: `~user/account/all`
      }
    }
  };
}

export function sendRequest(data){
  return{
    types: actionTypesFor("show", "requests"),
    meta: {
      fetch: {
        url: "~products/invoice",
        data: {
          products: data.products,
          invoice_type: data.invoice_type,
          address: data.address,
          customAddress: data.customAddress,
          comment: data.comment,
          target: data.target,
        },
        method: "POST"
      }
    }
  };
}
