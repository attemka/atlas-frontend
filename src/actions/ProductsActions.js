import {actionTypesFor} from 'trivial-redux';

export function getProducts(page=1, page_size=20){
  return {
    types: actionTypesFor('index', 'products'),
    meta: {
      fetch: {
        url: '~products/all',
        params: {page, page_size},
        method: 'GET'
      }
    }
  }
}
