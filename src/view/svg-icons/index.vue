<template>
  <div>
    <div v-for="item of iconsMap" :key="item">
      <div class="icon-item">
        <svg-icon :icon-name="item" />
        <span>{{item}}</span>
      </div>
    </div>
  </div>
</template>
<script>
import icons from './generateIconView'
export default {
  name: 'icons',
  data () {
    return {
      iconsMap: []
    }
  },
  mounted () {
    const iconsMap = icons.state.iconsMap.map((i) => {
      return i.default.id.split('-')[1]
    })
    this.iconsMap = iconsMap
  }
}
</script>
<style scoped>
  .icon-item {
    margin: 20px;
    height: 110px;
    text-align: center;
    width: 110px;
    float: left;
    font-size: 30px;
    /*color: #24292e;*/
    color: blue;
    cursor: pointer;
  }
  span {
    display: block;
    font-size: 24px;
    margin-top: 10px;
  }
</style>
