<template>
  <b-container>
    <b-row
      class="vh-100"
      align-v="center"
      align-h="center"
    >
      <ValidationObserver
        ref="observer"
        v-slot="{ handleSubmit }"
      >
        <b-form
          @keyup.enter="login"
          @submit.prevent="handleSubmit(onSubmit)"
        >
          <b-form-row>
            <ValidationProvider
              v-slot="validationContext"
              name="Username"
              :rules="{
                required: true,
                min: 4
              }"
            >
              <b-form-group
                id="input-group-username"
                label-cols="3"
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
            </ValidationProvider>
          </b-form-row>

          <b-form-row>
            <ValidationProvider
              v-slot="validationContext"
              name="Password"
              :rules="{
                required: true
              }"
            >
              <b-form-group
                id="input-group-password"
                label-cols="3"
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
            </ValidationProvider>
          </b-form-row>

          <b-row align-h="center">
            <b-col>
              <b-button
                type="submit"
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
      </ValidationObserver>
    </b-row>
  </b-container>
</template>

<script>
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
    login () {
      const userMock = {
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
      }
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
