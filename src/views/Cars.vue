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
          <b-container>
            <b-row align-content="around">
              <b-col>
                <h1>All cars</h1>
              </b-col>

              <b-col cols="8" />

              <b-col align-self="center">
                <b-button
                  v-if="role === 'admin'"
                  variant="success"
                  @click="addCar"
                >
                  Add new car
                </b-button>
              </b-col>
            </b-row>
          </b-container>
        </template>

        <template
          v-if="role === 'admin'"
          v-slot:cell(action)="{ item }"
        >
          <b-button
            variant="info"
            @click="editCar(item.id)"
          >
            <b-icon icon="pencil" />
          </b-button>
          <b-button
            v-b-modal.delete-car-modal
            variant="danger"
            @click="removeCar(item.id)"
          >
            <b-icon icon="trash" />
          </b-button>
        </template>

        <template
          v-else
          v-slot:cell(action)="{ item }"
        >
          <b-button
            v-b-modal.book-car-modal
            :variant="item.reserved
              ? 'danger'
              : 'success'
            "
            :disabled="item.reserved"
            pill
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

    <div v-if="role === 'admin'">
      <CarsAddModal
        :show="showAddModal"
        @add-car="handleAddCar"
        @change-visible="onChangeAddModal"
      />

      <CarsEditModal
        :show="showEditModal"
        v-bind="editingCar"
        @edit-car="handleEditCar"
        @change-visible="onChangeEditModal"
      />

      <b-modal
        id="delete-car-modal"
        title="Delete this car"
        @ok="handleRemoveCar"
      >
        <p>Are you sure?</p>
      </b-modal>
    </div>

    <div v-else>
      <b-modal
        id="book-car-modal"
        title="Booking this car"
        @ok="handleBookCar"
      >
        <p>Do you want to book this car?</p>
      </b-modal>
    </div>
  </b-container>
</template>

<script>
import axios from 'axios'

import CarsEditModal from '@/components/Cars/CarsEditModal'
import CarsAddModal from '@/components/Cars/CarsAddModal'

export default {
  name: 'Cars',

  components: {
    CarsAddModal,
    CarsEditModal
  },

  data: function () {
    return {
      role: null,
      showAddModal: false,
      showEditModal: false,
      fields: [],
      cars: [],
      editingCar: {
        id: 0,
        brandName: '',
        modelName: '',
        price: 0,
        reserved: false
      }
    }
  },

  created: function () {
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

    this.getCar()
  },

  methods: {
    async getCar () {
      const response = await axios.get('http://localhost:8000/cars')
      this.cars = response.data
    },

    bookCar (id) {
      this.editingCar = this.cars.find(car => car.id === id)
    },

    addCar () {
      this.showAddModal = true
    },

    editCar (id) {
      this.editingCar = this.cars.find(car => car.id === id)
      this.showEditModal = true
    },

    removeCar (id) {
      this.editingCar = this.cars.find(car => car.id === id)
    },

    async handleBookCar () {
      await axios.put(`http://localhost:8000/cars/${this.editingCar.id}/book`)
      this.getCar()
    },

    async handleAddCar (car) {
      car.reserved = false
      await axios.post('http://localhost:8000/cars', car)
      this.getCar()
    },

    async handleEditCar (editedCar) {
      // TODO: Request PUT API:/cars/{id}
      await axios.put(`http://localhost:8000/cars/${this.editingCar.id}`, {
        brandName: editedCar.brandName,
        modelName: editedCar.modelName,
        price: editedCar.price,
        reserved: editedCar.reserved
      })
      this.getCar()
    },

    async handleRemoveCar () {
      await axios.delete(`http://localhost:8000/cars/${this.editingCar.id}`)
      this.getCar()
    },

    onChangeAddModal (isVisible) {
      this.showAddModal = isVisible
    },

    onChangeEditModal (isVisible) {
      this.editingCar = {
        id: 0,
        brandName: '',
        modelName: '',
        price: 0,
        reserved: false
      }
      this.showEditModal = isVisible
    }
  }
}
</script>

<style>

</style>
