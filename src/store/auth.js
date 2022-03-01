import axios from "axios";

export default {
  namespaced: true,
  state: {
    token: localStorage.getItem("token") || "",
    user: localStorage.getItem("user") || "",
    role: localStorage.getItem("role") || "",
  },

  mutations: {
    SET_TOKEN(state, token) {
      state.token = token;
    },
    SET_USER(state, user) {
      state.user = user;
    },
    SET_ROLE(state, role) {
      state.role = role;
    },
  },

  actions: {
    async logInUser({ commit }, credentials) {
      await axios
        .post("login", credentials)
        .then((resp) => {
          const token = resp.data.data.token;
          const user = resp.data.data.id;
          const role = resp.data.data.role;
          localStorage.setItem("token", token);
          localStorage.setItem("user", user);
          localStorage.setItem("role", role);
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          commit("SET_TOKEN", token);
          commit("SET_USER", user);
          commit("SET_ROLE", role);
        })
        .catch((error) => {
          localStorage.removeItem("token");
          throw error;
        });
    },
    async logOutUser({ commit }) {
      await axios
        .post("logout")
        .then(() => {
          localStorage.removeItem("token");
          axios.defaults.headers.common["Authorization"] = null;
          commit("SET_TOKEN", null);
          commit("SET_USER", null);
          commit("SET_ROLE", null);
        })
        .catch((err) => {
          return err;
        });
    },
  },

  getters: {
    authenticated(state) {
      return !!state.token;
    },
  },
};
