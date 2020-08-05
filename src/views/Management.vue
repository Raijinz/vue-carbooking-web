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
          <h1>All users</h1>
        </template>
      </b-table>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: 'Management',

  data: function () {
    return {
      users: []
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
  }
}
</script>

<style>

</style>
