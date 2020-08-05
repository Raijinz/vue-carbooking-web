<template>
  <b-modal
    id="edit-car-modal"
    v-model="visible"
    size="lg"
    title="Edit this car"
    @change="handleVisible"
    @ok="handleOk"
  >
    <b-container>
      <validation-observer>
        <b-form
          @submit.prevent="handleSubmit(onSubmit)"
        >
          <validation-provider>
            <b-form-group
              id="input-group-id"
              label-cols="4"
              label="ID:"
              label-for="input-id"
            >
              <b-form-input
                id="input-id"
                v-model="carId"
                name="input-id"
                type="number"
                placeholder="Car ID"
                number
                disabled
              />
            </b-form-group>
          </validation-provider>

          <validation-provider>
            <b-form-group
              id="input-group-brandName"
              label-cols="4"
              label="Brand name:"
              label-for="input-brandname"
            >
              <b-form-input
                id="input-brandname"
                v-model="carBrandName"
                name="input-brandname"
                type="text"
                placeholder="Car brand"
              />
            </b-form-group>
          </validation-provider>

          <validation-provider>
            <b-form-group
              id="input-group-model"
              label-cols="4"
              label="Model:"
              label-for="input-model"
            >
              <b-form-input
                id="input-model"
                v-model="carModelName"
                name="input-model"
                type="text"
                placeholder="Car model"
              />
            </b-form-group>
          </validation-provider>

          <validation-provider>
            <b-form-group
              id="input-group-price"
              label-cols="4"
              label="Price:"
              label-for="input-price"
            >
              <b-form-input
                id="input-price"
                v-model="carPrice"
                name="input-price"
                type="number"
                placeholder="Car price"
                number
              />
            </b-form-group>
          </validation-provider>
        </b-form>
      </validation-observer>
    </b-container>
  </b-modal>
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
