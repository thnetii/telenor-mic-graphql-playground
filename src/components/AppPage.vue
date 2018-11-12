<template lang="pug">
  v-content.text-xs-center(fluid)
    page-header
    v-divider
    slot
</template>

<script>
import PageHeader from './PageHeader.vue'

export default {
  name: 'AppPage',
  components: {
    PageHeader
  }
}
</script>
