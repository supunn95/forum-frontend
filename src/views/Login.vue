<template>
  <b-row class="h-100 d-flex justify-content-center align-items-center">
    <b-col sm="12" style="max-width: 35rem">
      <div>
        <b-card>
          <b-card-title class="text-center">
            <h4 class="mb-0">Signin</h4>
          </b-card-title>

          <b-card-body style="text-align: left">
            <b-form @submit.prevent="submit">
              <b-form-group
                id="input-group-1"
                label="Email address:"
                label-for="input-1"
                description="We'll never share your email with anyone else."
              >
                <b-form-input
                  id="input-1"
                  v-model="form.email"
                  type="email"
                  placeholder="Enter email"
                  required
                ></b-form-input>
              </b-form-group>

              <b-form-group
                id="input-group-2"
                label="Password:"
                label-for="input-2"
              >
                <b-form-input
                  id="input-2"
                  v-model="form.password"
                  type="password"
                  placeholder="Enter password"
                  required
                ></b-form-input>
              </b-form-group>

              <p class="text-danger">{{ error }}</p>

              <div class="text-center">
                <b-button type="submit" variant="primary" class="m-3 px-3"
                  >Sign in</b-button
                >
              </div>
            </b-form>
          </b-card-body>
          <b-card-body>
            <p>
              Don't have an account?
              <b-link to="register">Sign up</b-link>
            </p>
          </b-card-body>
        </b-card>
      </div>
    </b-col>
  </b-row>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Login",
  components: {},
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
      error: "",
    };
  },
  methods: {
    ...mapActions({
      signIn: "auth/logInUser",
    }),

    submit() {
      this.signIn(this.form)
        .then(() => {
          this.error = "";
          this.$router.replace({
            name: "Dashboard",
          });
        })
        .catch((e) => {
          console.log(e);
          this.error = "The provided credentials are incorrect.";
        });
    },
  },
};
</script>
