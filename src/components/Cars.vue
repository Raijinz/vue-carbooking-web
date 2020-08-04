<template>
  <b-container>
    <b-row>
      <b-table
        id="cars-table"
        :items="cars"
        :fields="fields"
        primary-key="id"
        striped
        bordered
        hover
        caption-top
        head-variant="dark"
      >
        <template v-slot:table-caption>
          <h1>All cars</h1>
        </template>

        <template
          v-if="role === 'admin'"
          v-slot:cell(action)="data"
        >
          {{ data.index }}
        </template>

        <template
          v-else
          v-slot:cell(action)="{ item }"
        >
          <b-button
            :variant="item.reserved
              ? 'danger'
              : 'success'
            "
            :disabled="item.reserved"
            @click="bookCar(item.id)"
          >
            {{
              item.reserved
                ? 'Unavailable'
                : 'Book now'
            }}
          </b-button>
        </template>
      </b-table>
    </b-row>
  </b-container>
</template>

<script>
// import axios from 'axios'

export default {
  name: 'Cars',

  data: function () {
    return {
      role: null,
      fields: [],
      cars: []
    }
  },

  created: async function () {
    this.role = sessionStorage.getItem('role')

    this.fields = [
      {
        key: 'brandName',
        label: 'Brand name',
        sortable: true
      },
      {
        key: 'modelName',
        label: 'Model name',
        sortable: true
      },
      {
        key: 'price',
        label: 'Price',
        sortable: true
      },
      {
        key: 'action',
        label: 'Action',
        sortable: false
      }
    ]

    if (this.role === 'admin') {
      this.fields.unshift({
        key: 'id',
        label: 'ID',
        sortable: true
      })
    }

    // const response = await axios.get('localhost:8000/cars')
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
  },

  methods: {
    bookCar (carId) {
      const bookingCar = this.cars.find(car => car.id === carId)
      console.log(bookingCar)
    }
  }
}
</script>

<style>

</style>
