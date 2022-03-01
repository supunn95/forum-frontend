<template>
  <div>
    <b-row>
      <b-col sm="12">
        <b-form-textarea
          id="textarea"
          v-model="form.description"
          placeholder="Enter post description here"
          rows="3"
          max-rows="6"
        ></b-form-textarea>
      </b-col>
      <b-col sm="12" class="mt-2" style="text-align: right">
        <b-button @click="createPost" variant="primary">Post</b-button>
      </b-col>

      <b-col sm="12">
        <div>
          <b-form-input
            v-model="search_text.keyword"
            placeholder="Search posts"
            style="width: 50%; display: inline-block"
          ></b-form-input>
          <b-button variant="primary" @click="searchPost()">Search</b-button>
        </div>
      </b-col>

      <b-col sm="12" v-for="(post, index) in all_posts" :key="index">
        <b-card class="m-2">
          <b-card-text>
            {{ post.description }}
          </b-card-text>
          <b-row>
            <b-col sm-6>
              <h4>
                <b-badge variant="info"
                  >Created By : {{ post.user.name }}</b-badge
                >
                <b-badge variant="success" v-if="post.status == 'approved'"
                  >Approved</b-badge
                >
                <b-badge variant="dark" v-if="post.status == 'pending'"
                  >Pending</b-badge
                >
                <b-badge variant="danger" v-if="post.status == 'rejected'"
                  >Rejected</b-badge
                >
              </h4>
            </b-col>
            <b-col sm-6 v-if="role == 'admin'">
              <b-button variant="danger" @click="deletePost(post.id)"
                >Delete</b-button
              >
              <b-button
                variant="primary"
                v-if="post.status == 'pending'"
                @click="changePostStatus(post.id, 'approved')"
                >Approve</b-button
              >
              <b-button
                variant="warning"
                v-if="post.status == 'pending'"
                @click="changePostStatus(post.id, 'rejected')"
                >Reject</b-button
              >
            </b-col>
            <b-col sm-6 v-if="role == 'user'">
              <b-button
                v-if="user == post.user_id"
                variant="danger"
                @click="deletePost(post.id)"
                >Delete</b-button
              >
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "dashboard",
  data() {
    return {
      form: {
        description: "",
      },
      role: localStorage.getItem("role"),
      user: localStorage.getItem("user"),
      search_text: {
        keyword: "",
      },
    };
  },
  mounted() {
    this.getAllPosts();
  },
  computed: {
    ...mapGetters({
      all_posts: "post/allPosts",
    }),
  },
  methods: {
    ...mapActions({
      getAllPosts: "post/getAllPosts",
      createNewPost: "post/createNewPost",
      deleteUserPost: "post/deleteUserPost",
      updateUserPost: "post/updateUserPost",
      searchUserPost: "post/searchUserPost",
    }),
    searchPost() {
      this.searchUserPost(this.search_text)
        .then(() => {})
        .catch((e) => {
          console.log(e);
        });
    },
    changePostStatus(id, stats) {
      let status_data = {
        id: id,
        status: stats,
      };
      this.updateUserPost(status_data)
        .then(() => {
          this.getAllPosts();
        })
        .catch((e) => {
          console.log(e);
        });
    },
    createPost() {
      // submit data to post creation
      this.createNewPost(this.form)
        .then(() => {
          if (this.role == "user") {
            alert("New post created! Sending for admin approval");
          } else {
            alert("New post created!");
          }
          this.form.description = "";
          this.getAllPosts();
        })
        .catch((e) => {
          console.log(e);
        });
    },
    deletePost(id) {
      this.deleteUserPost(id)
        .then(() => {
          this.getAllPosts();
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
};
</script>

<style scoped>
.badge {
  margin: 10px;
}
.btn {
  margin: 10px;
}
.badge-success {
  background-color: #28a745;
}
.badge-info {
  background-color: #17a2b8;
}
.badge-danger {
  background-color: #dc3545;
}
.badge-dark {
  background-color: #343a40;
}
</style>

