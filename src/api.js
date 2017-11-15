import trivialRedux from 'trivial-redux'
import auth from './endpoints/auth'
import profile from './endpoints/profile'
import products from './endpoints/products'

export default trivialRedux({
  auth,
  profile,
  products
})
