<template>
  <div>
    <b-container fluid>
      <b-row
        class="vh-100"
        align-v="center"
        align-h="center"
      >
        <b-card
          class="w-25"
          bg-variant="light"
        >
          <template v-slot:header>
            <h3>Login</h3>
          </template>

          <validation-observer
            ref="observer"
            v-slot="{ invalid, handleSubmit }"
          >
            <b-form
              @keyup.enter="login"
              @submit.prevent="handleSubmit(onSubmit)"
            >
              <validation-provider
                v-slot="validationContext"
                name="Username"
                :rules="{
                  required: true,
                  min: 4
                }"
              >
                <b-form-group
                  id="input-group-username"
                  label-cols="4"
                  label="Username:"
                  label-for="input-username"
                >
                  <b-form-input
                    id="input-username"
                    v-model="form.username"
                    :state="getValidationState(validationContext)"
                    name="input-username"
                    type="text"
                    placeholder="Username"
                    aria-describedby="input-username-live-feedback"
                  />

                  <b-form-invalid-feedback
                    id="input-username-live-feedback"
                  >
                    {{ validationContext.errors[0] }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>

              <validation-provider
                v-slot="validationContext"
                name="Password"
                :rules="{
                  required: true
                }"
              >
                <b-form-group
                  id="input-group-password"
                  label-cols="4"
                  label="Password:"
                  label-for="input-password"
                >
                  <b-form-input
                    id="input-password"
                    v-model="form.password"
                    :state="getValidationState(validationContext)"
                    name="input-password"
                    type="password"
                    placeholder="Password"
                    aria-describedby="input-password-live-feedback"
                  />

                  <b-form-invalid-feedback
                    id="input-password-live-feedback"
                  >
                    {{ validationContext.errors[0] }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>

              <b-row align-h="center">
                <b-col>
                  <b-button
                    type="submit"
                    :disabled="invalid"
                    variant="primary"
                  >
                    Submit
                  </b-button>
                </b-col>

                <b-col>
                  <b-button
                    variant="danger"
                    @click="resetForm()"
                  >
                    Reset
                  </b-button>
                </b-col>
              </b-row>
            </b-form>
          </validation-observer>
        </b-card>
      </b-row>
    </b-container>

    <b-toast
      id="login-failed-toast"
      variant="danger"
      auto-hide-delay="2500"
    >
      <template v-slot:toast-title>
        <div class="d-flex flex-grow-1 align-items-baseline">
          <b-img
            blank
            blank-color="#ff5555"
            class="mr-2"
            width="12"
            height="12"
          />
          <strong class="mr-auto">Notice!</strong>
        </div>
      </template>
      Login failed
    </b-toast>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Login',

  data: function () {
    return {
      form: {
        username: null,
        password: null
      }
    }
  },

  beforeCreate: function () {
    sessionStorage.clear()
  },

  methods: {
    async login () {
      const response = await axios.post('http://localhost:8000/users/login', {
        username: this.form.username,
        password: this.form.password
      })

      if (response.data.success) {
        sessionStorage.setItem('jwt', response.data.jwtToken)
        sessionStorage.setItem('role', response.data.role)
        this.$router.push({
          name: 'cars'
        })
      } else {
        this.$bvToast.show('login-failed-toast')
      }
      /* const userMock = {
        username: 'user',
        password: 'Test1234'
      }
      const adminMock = {
        username: 'admin',
        password: 'Admin1234'
      }

      if (this.form.username === userMock.username &&
          this.form.password === userMock.password) {
        sessionStorage.setItem('role', 'user')
        this.$router.push({
          name: 'cars'
        })
      } else if (this.form.username === adminMock.username &&
          this.form.password === adminMock.password) {
        sessionStorage.setItem('role', 'admin')
        this.$router.push({
          name: 'cars'
        })
      } else {
        // TODO: Error: Authen failed
        this.$bvToast.show('login-failed-toast')
      } */
    },

    getValidationState ({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null
    },

    resetForm () {
      this.form = {
        username: null,
        password: null
      }

      this.$nextTick(() => {
        this.$refs.observer.reset()
      })
    },

    onSubmit () {
      this.login()
    }
  }
}
</script>

<style>

</style>
