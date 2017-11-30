import { actionTypesFor } from "trivial-redux";

export function checkRequest(params) {
    return {
        types: actionTypesFor("index", "requests"),
        meta: {
            fetch: {
                url: "~products/checkInvoice",
                params: params,
                method: "post"
            }
        }
    };
}