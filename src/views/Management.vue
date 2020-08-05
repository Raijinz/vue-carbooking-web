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

    this.users = [
      {
        id: 1,
        name: 'Test1',
        role: 'Admin'
      },
      {
        id: 2,
        name: 'Test2',
        role: 'User'
      }
    ]
  },

  methods: {
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

    handleAddUser (user) {
      user.id = this.users.length + 1
      this.users.push(user)
    },

    handleEditUser (editedUser) {
      for (let user of this.users) {
        if (user.id === editedUser.id) {
          user = Object.assign(user, editedUser)
          break
        }
      }
    },

    handleRemoveUser () {
      const targetUser = this.editingUser
      const targetUserIndex = this.users.findIndex(user => {
        return user.id === targetUser.id
      })
      this.users.splice(targetUserIndex, 1)
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
