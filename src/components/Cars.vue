<template>
  <h1>TODO CARS</h1>
</template>

<script>
export default {
  name: 'Cars',

  data: function () {
    return {
      cars: []
    }
  },

  created: function () {
    // TODO: Request '{API}/cars/'
    this.cars = [
      {
        id: 1,
        brandName: 'Nissan',
        modelName: 'Almera',
        price: 1200000,
        reserved: true
      },
      {
        id: 2,
        brandName: 'Toyota',
        modelName: 'Vios',
        price: 523000,
        reserved: false
      },
      {
        id: 3,
        brandName: 'Audi',
        modelName: 'TT',
        price: 4000000,
        reserved: false
      }
    ]
  }
}
</script>

<style>

</style>
