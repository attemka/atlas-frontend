import { actionTypesFor } from "trivial-redux";

export function saveProfile(data) {
  return {
    types: actionTypesFor("update", "profile"),
    meta: {
      fetch: {
        url: "~user/profile",
        data,
        method: "PUT"
      }
    }
  };
}

export function getProfile() {
  return {
    types: actionTypesFor("index", "profile"),
    meta: {
      fetch: {
        url: "~user/profile"
      }
    }
  };
}

export function changeFilial(data) {
  return{
    types: actionTypesFor("update", "account"),
    meta: {
      fetch: {
        url: "~user/account",
        data,
        method: "PUT"
      }
    }
  };
}

export function addStaff(email) {
  return{
    types: actionTypesFor("update", "account"),
    meta: {
      fetch: {
        url: "~user/account/add_staff",
        data:{email},
        method: "POST"
      }
    }
  };
}
