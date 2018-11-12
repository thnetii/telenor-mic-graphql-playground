<template lang="pug">
  v-toolbar(fixed dark id="navbar")
    v-toolbar-items
      v-btn(:to="{name: 'home'}" exact)
        v-icon(left) home
        | Home
      v-btn(:to="{name: 'counter'}" exact)
        v-icon(left) games
        | Counter
    v-spacer
    v-toolbar-items
      v-btn(to="/login" exact)
        | Login
        v-icon(right) account_box
</template>

<style scoped>
#navbar {
  top: auto;
  bottom: 0;
}
</style>
