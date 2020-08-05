<template>
  <validation-observer
    ref="observer"
    v-slot="{ invalid, handleSubmit }"
  >
    <b-modal
      id="edit-car-modal"
      v-model="visible"
      size="lg"
      title="Edit this car"
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
            name="ID"
            :rules="{
              required: true
            }"
          >
            <b-form-group
              id="input-group-id"
              label-cols="4"
              label="ID:"
              label-for="input-id"
            >
              <b-form-input
                id="input-id"
                v-model="carId"
                :state="getValidationState(validationContext)"
                name="input-id"
                type="number"
                placeholder="Car ID"
                number
                disabled
                aria-describedby="input-id-live-feedback"
              />

              <b-form-invalid-feedback
                id="input-id-live-feedback"
              >
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>

          <validation-provider
            v-slot="validationContext"
            name="Brand name"
            :rules="{
              required: true
            }"
          >
            <b-form-group
              id="input-group-brandName"
              label-cols="4"
              label="Brand name:"
              label-for="input-brandname"
            >
              <b-form-input
                id="input-brandname"
                v-model="carBrandName"
                :state="getValidationState(validationContext)"
                name="input-brandname"
                type="text"
                placeholder="Car brand"
                aria-describedby="input-brandname-live-feedback"
              />
            </b-form-group>

            <b-form-invalid-feedback
              id="input-brandname-live-feedback"
            >
              {{ validationContext.errors[0] }}
            </b-form-invalid-feedback>
          </validation-provider>

          <validation-provider
            v-slot="validationContext"
            name="Model name"
            :rules="{
              required: true
            }"
          >
            <b-form-group
              id="input-group-model"
              label-cols="4"
              label="Model:"
              label-for="input-model"
            >
              <b-form-input
                id="input-model"
                v-model="carModelName"
                :state="getValidationState(validationContext)"
                name="input-model"
                type="text"
                placeholder="Car model"
                aria-describedby="input-model-live-feedback"
              />
            </b-form-group>

            <b-form-invalid-feedback
              id="input-model-live-feedback"
            >
              {{ validationContext.errors[0] }}
            </b-form-invalid-feedback>
          </validation-provider>

          <validation-provider
            v-slot="validationContext"
            name="Price"
            :rules="{
              required: true
            }"
          >
            <b-form-group
              id="input-group-price"
              label-cols="4"
              label="Price:"
              label-for="input-price"
            >
              <b-form-input
                id="input-price"
                v-model="carPrice"
                :state="getValidationState(validationContext)"
                name="input-price"
                type="number"
                placeholder="Car price"
                number
                aria-describedby="input-price-live-feedback"
              />
            </b-form-group>

            <b-form-invalid-feedback
              id="input-price-live-feedback"
            >
              {{ validationContext.errors[0] }}
            </b-form-invalid-feedback>
          </validation-provider>
        </b-form>
      </b-container>
    </b-modal>
  </validation-observer>
</template>

<script>
export default {
  name: 'CarsEditModal',

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
    brandName: {
      type: String,
      required: true,
      default: ''
    },
    modelName: {
      type: String,
      required: true,
      default: ''
    },
    price: {
      type: Number,
      required: true,
      default: 0
    },
    reserved: {
      type: Boolean,
      required: true,
      default: false
    }
  },

  data: function () {
    return {
      visible: this.show,
      carId: this.id,
      carBrandName: this.brandName,
      carModelName: this.modelName,
      carPrice: this.price,
      carIsReserved: this.reserved
    }
  },

  watch: {
    show: function (isShow) {
      this.visible = isShow
    },

    id: function (newId) {
      this.carId = newId
    },

    brandName: function (newBrandName) {
      this.carBrandName = newBrandName
    },

    modelName: function (newModelName) {
      this.carModelName = newModelName
    },

    price: function (newPrice) {
      this.carPrice = newPrice
    },

    reserved: function (isReserved) {
      this.carIsReserved = isReserved
    }
  },

  methods: {
    handleVisible (isVisible) {
      this.$emit('change-visible', isVisible)
    },

    getValidationState ({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null
    },

    onSubmit () {
      this.handleOk()
    },

    handleOk () {
      const editedCar = {
        id: this.carId,
        brandName: this.carBrandName,
        modelName: this.carModelName,
        price: this.carPrice,
        reserved: this.carIsReserved
      }

      this.$emit('edit-car', editedCar)
    }
  }
}
</script>

<style>

</style>
