<template>
  <h1>TODO MANAGEMENT</h1>
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
