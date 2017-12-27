import trivialRedux from "trivial-redux";
import auth from "./endpoints/auth";
import profile from "./endpoints/profile";
import products from "./endpoints/products";
import requests from "./endpoints/requests";
import accounts from "./endpoints/accounts";
import filters from "./endpoints/filters";
import admin_accounts from "./endpoints/admin_accounts";

export default trivialRedux({
  auth,
  profile,
  products,
  requests,
  accounts,
  filters,
  admin_accounts
});
