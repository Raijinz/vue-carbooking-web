<template>
  <b-container>
    <b-row>
      <b-table
        id="users-table"
        :items="users"
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
                <h1>All users</h1>
              </b-col>

              <b-col cols="8" />

              <b-col align-self="center">
                <b-button
                  variant="success"
                  @click="addUser"
                >
                  Add new user
                </b-button>
              </b-col>
            </b-row>
          </b-container>
        </template>

        <template
          v-slot:cell(action)="{ item }"
        >
          <b-button
            variant="info"
            @click="editUser(item.id)"
          >
            <b-icon icon="pencil" />
          </b-button>

          <b-button
            v-b-modal.delete-user-modal
            variant="danger"
            :disabled="item.role === 'Admin'"
            @click="removeUser(item.id)"
          >
            <b-icon icon="trash" />
          </b-button>
        </template>
      </b-table>
    </b-row>

    <UsersAddModal
      :show="showAddModal"
      @add-user="handleAddUser"
      @change-visible="onChangeAddModal"
    />

    <UsersEditModal
      :show="showEditModal"
      v-bind="editingUser"
      @edit-user="handleEditUser"
      @change-visible="onChangeEditModal"
    />

    <b-modal
      id="delete-user-modal"
      title="Delete this user"
      @ok="handleRemoveUser"
    >
      <p>Are you sure?</p>
    </b-modal>
  </b-container>
</template>

<script>
import axios from 'axios'

import UsersAddModal from '@/components/Management/UsersAddModal'
import UsersEditModal from '@/components/Management/UsersEditModal'

export default {
  name: 'Management',

  components: {
    UsersAddModal,
    UsersEditModal
  },

  data: function () {
    return {
      role: null,
      fields: [],
      users: [],
      showAddModal: false,
      showEditModal: false,
      editingUser: {
        id: 0,
        name: '',
        role: 'user'
      }
    }
  },

  created: function () {
    this.role = sessionStorage.getItem('role')

    this.fields = [
      {
        key: 'id',
        label: 'ID',
        sortable: true
      },
      {
        key: 'name',
        label: 'Name',
        sortable: true
      },
      {
        key: 'role',
        label: 'Role',
        sortable: true
      },
      {
        key: 'action',
        label: 'Action',
        sortable: false
      }
    ]

    this.getUser()
  },

  methods: {
    async getUser () {
      const response = await axios.get('http://localhost:8000/users')
      this.users = response.data
    },

    addUser () {
      this.showAddModal = true
    },

    editUser (id) {
      this.editingUser = this.users.find(user => user.id === id)
      this.showEditModal = true
    },

    removeUser (id) {
      this.editingUser = this.users.find(user => user.id === id)
    },

    async handleAddUser (user) {
      user.password = (this.role === 'admin' ? 'Admin1234' : 'User1234')
      await axios.post('http://localhost:8000/users', user)
      this.getUser()
    },

    async handleEditUser (editedUser) {
      await axios.put(`http://localhost:8000/users/${this.editingUser.id}`, {
        name: editedUser.name,
        password: (this.role === 'admin' ? 'Admin1234' : 'User1234'),
        role: editedUser.role
      })
      this.getUser()
    },

    async handleRemoveUser () {
      await axios.delete(`http://localhost:8000/users/${this.editingUser.id}`)
      this.getUser()
    },

    onChangeAddModal (isVisible) {
      this.showAddModal = isVisible
    },

    onChangeEditModal (isVisible) {
      this.editingUser = {
        id: 0,
        name: '',
        role: 'user'
      }
      this.showEditModal = isVisible
    }
  }
}
</script>

<style>

</style>
