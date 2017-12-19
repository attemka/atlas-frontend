import { actionTypesFor } from "trivial-redux";

export function loadTypeFilters() {
  return {
    types: actionTypesFor("index", "filters"),
    meta: {
      fetch: {
        url: "~products/filters"
      }
    }
  };
}

export function loadInnerTypeFilters(type_filter) {
  return {
    types: actionTypesFor("show", "filters"),
    meta: {
      fetch: {
        url: "~products/inner_filters",
        params: { type_filter }
      },
      type_filter
    }
  };
}
