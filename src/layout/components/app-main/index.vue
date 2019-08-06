<template>
  <section
    class="app-main"
    :class="{'is-collapse':isCollapse}"
  >
    <transition
      name="fade-transform"
      mode="out-in"
    >
      <router-view />
    </transition>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { mapGetters } from 'vuex'

@Component({
  computed: mapGetters(['sidebar']),
  props: {
    propMessage: String
  }
})
export default class Appmain extends Vue {
  // initial data
  sidebar: any
  // computed
  get isCollapse () {
    return !this.sidebar.opened
  }
}
</script>

<style lang="scss" scoped>
.app-main {
  position: relative;
  overflow: auto;
  box-sizing: border-box;
  height: 100%;
  padding: 66px 16px 16px;
  margin-left: 160px;
  transition: margin-left 0.3s;
  &.is-collapse {
    margin-left: 50px;
  }
}
</style>
