import trivialRedux from 'trivial-redux'
import auth from './endpoints/auth'
import profile from './endpoints/profile'

export default trivialRedux({
  auth,
  profile
})
