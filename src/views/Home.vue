<template>
  <div class="home">
    <b-navbar variant="info">
      <b-navbar-brand
        :to="{ name: 'cars' }"
      >
        Car Booking
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse" />

      <b-collapse
        id="nav-collapse"
        is-nav
      >
        <b-navbar-nav>
          <b-nav-item
            :to="{ name: 'cars' }"
          >
            Cars
          </b-nav-item>
          <b-nav-item
            :to="{ name: 'management' }"
            :disabled="role !== 'admin'"
          >
            Management
          </b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right>
            <template v-slot:button-content>
              <em>{{ capRole }}</em>
            </template>
            <b-dropdown-item
              :to="{ name: 'login' }"
            >
              Sign out
            </b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <router-view />
  </div>
</template>

<script>
export default {
  name: 'Home',

  data: function () {
    return {
      role: null
    }
  },

  computed: {
    capRole: function () {
      return this.role.charAt(0).toUpperCase() + this.role.slice(1)
    }
  },

  created: function () {
    this.role = sessionStorage.getItem('role')
  }
}
</script>
