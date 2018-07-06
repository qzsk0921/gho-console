<template>
  <!-- <svg-icon :class="{'is-active': isActive}" icon-class="hamburger" icon-name="hamburger" @click="toggleClick"></svg-icon> -->
  <svg :class="{'is-active': isActive}" @click="toggleClick" t="1528409568929" class="hamburger" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1562" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200">
    <path d="M362.474498 627.133204M73.591065 278.392498c-29.520337 0-53.537334-24.016996-53.537334-53.53631 0-29.520337 24.016996-53.537334 53.537334-53.537334l876.816846 0c29.521361 0 53.537334 24.016996 53.537334 53.537334 0 29.519314-24.015973 53.53631-53.537334 53.53631L73.591065 278.392498zM73.591065 592.350003c-29.520337 0-53.537334-24.01802-53.537334-53.541427 0-29.520337 24.016996-53.537334 53.537334-53.537334l876.816846 0c29.521361 0 53.537334 24.016996 53.537334 53.537334 0 29.523407-24.015973 53.541427-53.537334 53.541427L73.591065 592.350003zM73.591065 903.797337c-29.520337 0-53.537334-24.015973-53.537334-53.537334 0-29.521361 24.016996-53.537334 53.537334-53.537334l876.816846 0c29.521361 0 53.537334 24.015973 53.537334 53.537334 0 29.521361-24.015973 53.537334-53.537334 53.537334L73.591065 903.797337z" p-id="1563"></path>
  </svg>
</template>

<script>
export default {
  name: 'hamburger',
  props: {
    toggleClick: {
      type: Function,
      default: null
    },
    isActive: {
      type: Boolean,
      default: null
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .hamburger {
    width: 1.7em;
    height: 1.7em;
    margin-left: 20px;
  }
  .is-active {
    transition: .3s;
    transform: rotate(90deg);
    transform-origin: 50% 50%;
  }
</style>
