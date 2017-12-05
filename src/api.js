import trivialRedux from "trivial-redux";
import auth from "./endpoints/auth";
import profile from "./endpoints/profile";
import products from "./endpoints/products";
import requests from "./endpoints/requests";

export default trivialRedux({
  auth,
  profile,
  products,
  requests,
});
