<template>
  <b-modal
    id="add-car-modal"
    v-model="visible"
    size="lg"
    title="Add new car"
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
    },

    handleOk () {
      const newCar = {
        brandName: this.carBrandName,
        modelName: this.carBrandName,
        price: this.carPrice
      }

      this.$emit('add-car', newCar)
    }
  }

}
</script>

<style>

</style>
