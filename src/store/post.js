import axios from "axios";

export default {
  namespaced: true,
  state: {
    all_posts: "",
  },

  mutations: {
    SET_POSTS(state, all_posts) {
      state.all_posts = all_posts;
    },
  },

  actions: {
    async createNewPost(_, post_description) {
      await axios
        .post("create-post", post_description)
        .then(() => {})
        .catch((err) => {
          return err;
        });
    },
    async searchUserPost({ commit }, search_text) {
      await axios
        .post("search-post", search_text)
        .then((response) => {
          commit("SET_POSTS", response.data.data);
        })
        .catch((err) => {
          return err;
        });
    },
    async deleteUserPost(_, post_id) {
      await axios
        .delete("delete-post/" + post_id)
        .then(() => {})
        .catch((err) => {
          return err;
        });
    },
    async getAllPosts({ commit }) {
      await axios
        .get("all-posts")
        .then((response) => {
          commit("SET_POSTS", response.data.data);
        })
        .catch((err) => {
          return err;
        });
    },
    async getAllApprovedPosts({ commit }) {
      await axios
        .get("approved-posts")
        .then((response) => {
          commit("SET_POSTS", response.data.data);
        })
        .catch((err) => {
          return err;
        });
    },
    async updateUserPost(_, post_data) {
      await axios
        .patch("set-post-status", post_data)
        .then(() => {})
        .catch((err) => {
          return err;
        });
    },
  },

  getters: {
    allPosts(state) {
      return state.all_posts;
    },
  },
};
