<template>
  <svg :class="svgClass">
    <use :xlink:href="svgId"></use>
  </svg>
</template>
<script>
export default {
  name: 'svg-icon',
  props: {
    iconName: {
      type: String,
      required: true
    },
    iconClass: {
      type: String
    }
  },
  computed: {
    svgId () {
      return `#icon-${this.iconName}`
    },
    svgClass () {
      if (this.iconClass) {
        return 'svg-icon' + ' ' + this.iconClass
      } else {
        return 'svg-icon'
      }
    }
  }
}
</script>
<style scoped>
  .svg-icon {
    width: 1em;
    height: 1em;
    /*vertical-align: -0.15em;*/
    vertical-align: top;
    fill: currentColor;
    overflow: hidden;
  }
</style>
