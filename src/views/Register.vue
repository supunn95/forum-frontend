<template>
  <b-row class="h-100 d-flex justify-content-center align-items-center">
    <b-col sm="12" style="max-width: 35rem">
      <div>
        <b-card>
          <b-card-title>
            <h4 class="mb-0">Sign up</h4>
          </b-card-title>

          <b-card-body style="text-align: left">
            <b-form @submit.prevent="submit">
              <b-form-group
                id="input-group-1"
                label="Name :"
                label-for="input-1"
              >
                <b-form-input
                  id="input-1"
                  v-model="form.name"
                  type="text"
                  placeholder="Enter Name"
                  required
                ></b-form-input>
                <p class="text-danger" v-text="errors.name"></p>
              </b-form-group>

              <b-form-group
                id="input-group-2"
                label="Email address:"
                label-for="input-2"
                description="We'll never share your email with anyone else."
              >
                <b-form-input
                  id="input-2"
                  v-model="form.email"
                  type="email"
                  placeholder="Enter email"
                  required
                ></b-form-input>
                <p class="text-danger" v-text="errors.email"></p>
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
                <p class="text-danger" v-text="errors.password"></p>
              </b-form-group>

              <div class="text-center">
                <b-button type="submit" variant="primary" class="m-3 px-3"
                  >Sign up</b-button
                >
              </div>
            </b-form>
          </b-card-body>
        </b-card>
      </div>
    </b-col>
  </b-row>
</template>

<script>
import axios from "axios";

export default {
  name: "register",
  components: {},
  data() {
    return {
      errors: {},
      form: {
        email: "",
        password: "",
        name: "",
      },
    };
  },
  methods: {
    submit() {
      axios
        .post("register", this.form)
        .then((response) => {
          if (response.status == 200) {
            (this.response_msg = "success"), (this.errors = {});
            this.$router.push("/login");
          }
        })
        .catch((errors) => {
          this.errors = errors.response.data.data;
        });
    },
  },
};
</script>
