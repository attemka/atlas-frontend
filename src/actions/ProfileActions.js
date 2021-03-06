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

export function getUsers() {
  return {
    types: actionTypesFor("show", "profile"),
    meta: {
      fetch: {
        url: "~admin2/users"
      }
    }
  };
}

export function changeFilial(data) {
  return {
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
  return {
    types: actionTypesFor("update", "account"),
    meta: {
      fetch: {
        url: "~user/account/add_staff",
        data: { email },
        method: "POST"
      }
    }
  };
}

export function deleteUserById(userId) {
  return {
    types: actionTypesFor("update", "account"),
    meta: {
      fetch: {
        url: `~admin2/users/${userId}`,
        method: "DELETE"
      }
    }
  };
}