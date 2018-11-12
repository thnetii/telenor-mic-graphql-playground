<template lang="pug">
  v-app
    router-view
    navbar
</template>

<script>
import Navbar from './components/Navbar'

export default {
  name: 'App',
  components: {
    Navbar
  }
}
</script>
