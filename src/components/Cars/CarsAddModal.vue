<template>
  <validation-observer
    ref="observer"
    v-slot="{ invalid, handleSubmit }"
  >
    <b-modal
      id="add-car-modal"
      v-model="visible"
      size="lg"
      title="Add new car"
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
            name="brand name"
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

              <b-form-invalid-feedback
                id="input-brandname-live-feedback"
              >
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>

          <validation-provider
            v-slot="validationContext"
            name="model"
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
                aria-describedby="input-modelname-live-feedback"
              />

              <b-form-invalid-feedback
                id="input-modelname-live-feedback"
              >
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>

          <validation-provider
            v-slot="validationContext"
            name="price"
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

              <b-form-invalid-feedback
                id="input-price-live-feedback"
              >
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>
        </b-form>
      </b-container>
    </b-modal>
  </validation-observer>
</template>

<script>
export default {
  name: 'CarsAddModal',

  props: {
    show: {
      type: Boolean,
      required: true,
      default: false
    }
  },

  data: function () {
    return {
      visible: this.show,
      carBrandName: '',
      carModelName: '',
      carPrice: 0
    }
  },

  watch: {
    show: function (isShow) {
      this.visible = isShow
    }
  },

  methods: {
    handleVisible (isVisible) {
      this.$emit('change-visible', isVisible)
      this.carBrandName = ''
      this.carModelName = ''
      this.carPrice = 0
    },

    getValidationState ({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null
    },

    onSubmit () {
      this.handleOk()
    },

    handleOk () {
      const newCar = {
        brandName: this.carBrandName,
        modelName: this.carModelName,
        price: this.carPrice
      }

      this.$emit('add-car', newCar)
    }
  }

}
</script>

<style>

</style>
