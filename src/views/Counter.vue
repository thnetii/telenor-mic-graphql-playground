<template lang="pug">
  app-page
    h3.display-1 Counter
    p.mb-0 This is an example counter component using Vue.js
    p Current Count: <strong>{{count}}</strong>
    v-btn(
      color="secondary"
      @click="add(+10)"
    )
      v-icon add
      | 10
    v-btn(
      color="secondary"
      @click="add(+1)"
    ) Increment
    v-btn(
      color="secondary"
      @click="reset"
    ) Reset
    v-btn(
      color="secondary"
      @click="add(-1)"
    ) Decrement
    v-btn(
      color="secondary"
      @click="add(-10)"
    )
      v-icon remove
      | 10
</template>

<script>
import AppPage from '../components/AppPage.vue'

import { mapState, mapMutations } from 'vuex'

export default {
  components: {
    AppPage
  },
  computed: {
    ...mapState('Counter', ['count'])
  },
  methods: mapMutations('Counter', ['add', 'reset'])
}
</script>
