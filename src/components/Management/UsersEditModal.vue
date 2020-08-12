<template>
  <validation-observer
    ref="observer"
    v-slot="{ invalid, handleSubmit }"
  >
    <b-modal
      id="edit-user-modal"
      v-model="visible"
      title="Edit this user"
      @change="handleVisible"
      @ok="handleOk"
    >
      <template v-slot:modal-footer="{ ok, cancel }">
        <b-button
          variant="danger"
          @click="cancel()"
        >
          Cancel
        </b-button>

        <b-button
          variant="success"
          :disabled="invalid"
          @click="ok()"
        >
          OK
        </b-button>
      </template>

      <b-container>
        <b-form
          @submit.prevent="handleSubmit(onSubmit)"
        >
          <validation-provider
            v-slot="validationContext"
            name="name"
            :rules="{
              required: true
            }"
          >
            <b-form-group
              id="input-group-name"
              label-cols="4"
              label="User's firstname:"
              label-for="input-name"
            >
              <b-form-input
                id="input-name"
                v-model="userName"
                :state="getValidationState(validationContext)"
                name="input-name"
                type="text"
                placeholder="User's name"
                aria-describedby="input-name-live-feedback"
              />

              <b-form-invalid-feedback
                id="input-name-live-feedback"
              >
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>

          <validation-provider
            v-slot="validationContext"
            name="role"
            :rules="{
              required: true
            }"
          >
            <b-form-group
              id="input-group-role"
              label-cols="4"
              label="Role:"
              label-for="input-role"
            >
              <b-form-select
                id="input-role"
                v-model="userRole"
                :options="[
                  'user',
                  'admin'
                ]"
                :state="getValidationState(validationContext)"
                name="input-role"
              />
            </b-form-group>
          </validation-provider>
        </b-form>
      </b-container>
    </b-modal>
  </validation-observer>
</template>

<script>
export default {
  name: 'UsersEditModal',

  props: {
    show: {
      type: Boolean,
      required: true,
      default: false
    },
    id: {
      type: Number,
      required: true,
      default: 0
    },
    name: {
      type: String,
      required: true,
      default: ''
    },
    role: {
      type: String,
      required: true,
      default: 'User'
    }
  },

  data: function () {
    return {
      visible: this.show,
      userId: this.id,
      userName: this.name,
      userRole: this.role
    }
  },

  watch: {
    show: function (isShow) {
      this.visible = isShow
    },

    id: function (newId) {
      this.userId = newId
    },

    name: function (newName) {
      this.userName = newName
    },

    role: function (newRole) {
      this.userRole = newRole
    }
  },

  methods: {
    handleVisible (isVisible) {
      this.$emit('change-visible', isVisible)
      this.userName = ''
      this.userRole = ''
    },

    getValidationState ({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null
    },

    onSubmit () {
      this.handleOk()
    },

    handleOk () {
      const editedUser = {
        id: this.userId,
        name: this.userName,
        role: this.userRole
      }

      this.$emit('edit-user', editedUser)
    }
  }

}
</script>

<style>

</style>
