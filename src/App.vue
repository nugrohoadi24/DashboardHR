<template>
  <div id="app" class="g-sidenav-show">
    <SideNav v-if="currentRouteName !== 'Login' && currentRouteName !== 'SelectCoverage'"/>
    <main class="main-content position-relative h-100">
      <Navbar v-if="currentRouteName !== 'Login' && currentRouteName !== 'SelectCoverage'"/>
      <router-view>

      </router-view>
    </main>
  </div>
</template>

<script>
import SideNav from "@/components/widget/SideNav"
import Navbar from "@/components/widget/Navbar"

export default {
  name: 'App',
  components: {
    SideNav,
    Navbar
  },
  data() {
    return {
      nowRoute:""
    }
  },
  computed: {
    currentRouteName() {
        return this.$route.name;
    }
  },
}
</script>

<style>
</style>
