<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand to="/">Forum</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <template v-if="!authenticated">
            <b-nav-item to="login" exact>Sign in</b-nav-item>
          </template>
          <template v-if="!authenticated">
            <b-nav-item to="register" exact>Register</b-nav-item>
          </template>
          <template v-else>
            <b-nav-item to="dashboard" exact>Dashboard</b-nav-item>
            <b-nav-item href="#" @click.prevent="signOut">Sign Out</b-nav-item>
          </template>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  computed: {
    ...mapGetters({
      authenticated: "auth/authenticated",
    }),
  },
  methods: {
    ...mapActions({
      signOutAction: "auth/logOutUser",
    }),

    signOut() {
      this.signOutAction().then(() => {
        this.$router.replace({
          name: "Login",
        });
      });
    },
  },
};
</script>