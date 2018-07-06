<template>
  <div>
    <h3 class="pic-title">项目照片</h3>
    <div class="picture-container">
      <div v-if="!imgData">暂无数据</div>
      <div class="item-box" v-else v-for="(item, index) in pictures" :key="index">
        <div class="item">
          <div class="pic-box blur" @click="clickPic(item.src)">
            <img class="pic" :src="item.src">
          </div>
          <small v-text="item.name"></small>
        </div>
      </div>
    </div>
    <button class="btn" type="button" @click="clickMore">
      <span>更多</span>
    </button>
    <div :class="['dialogWrap', dialogVisible ? 'show' : 'hide']">
      <div class="dialog-mask" @click="dialogVisible = false"></div>
      <div class="dialog-pic-box">
        <div class="dialog-pic-box-top">
          <div class="dialog-close" @click="dialogVisible = false">×</div>
        </div>
        <img class="dialog-pic" :src="dialogSrc">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      imgData: '',
      pictures: [{name: 'img001.jpg', src: require('../../assets/1(1).jpg')}, {name: 'img002.jpg', src: require('../../assets/1(2).jpg')}, {name: 'img003.jpg', src: require('../../assets/1(3).jpg')}, {name: 'img004.jpg', src: require('../../assets/1(4).jpg')}, {name: 'img001.jpg', src: require('../../assets/1(1).jpg')}, {name: 'img002.jpg', src: require('../../assets/1(2).jpg')}, {name: 'img003.jpg', src: require('../../assets/1(3).jpg')}, {name: 'img004.jpg', src: require('../../assets/1(4).jpg')}],
      dialogVisible: false,
      dialogSrc: null
    }
  },
  mounted () {
    // const self = this
    // (new Vue).$on('imgData', (imgData) => {
    //   self.pictures = imgData
    // })
    this.imgData = this.$store.state.progress.imgData
  },
  // computed: {
  //   imgData () {
  //     return this.$store.state.progress.imgData
  //   }
  // },
  methods: {
    clickPic (v) {
      this.dialogVisible = true
      this.dialogSrc = v
    },
    clickMore () {
      // 联调的时候需要修改，暂时模拟效果用
      this.pictures.push(...this.pictures)
      console.log(this.pictures)
    }
  }
}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  .pic-title {
    text-align: left;
    margin: 10px 0;
  }
  .picture-container {
    padding: 8px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    .item-box {
      .item {
        cursor: pointer;
        margin: 8px;
        .pic-box {
          /*请求成功清楚模糊度blur(0px)-------------------------------------------------------*/
          transition: .5s;
          height: 116px;
          width: 116px;
          &:before {
            content: '';
            width: 0;
            height: 100%;
            display: inline-block;
            vertical-align: middle;
          }
          background-color: #000;
          .pic {
            width: 100%;
            vertical-align: middle;
          }
        }
        small {
          display: block;
          margin: 4px 0;
        }
      }
    }
  }
  .dialogWrap {
    .dialog-pic-box {
      border-radius: 5px;
      padding: 0 10px 10px;
      background-color: #fff;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 50%;
      .dialog-pic-box-top {
        position: relative;
        height: 34px;
        .dialog-close {
          top: 2px;
          right: -7px;
        }
      }
      img {
        width: 100%;
      }
    }
  }
  @media (max-width: 620px) {
    .dialogWrap {
      .dialog-pic-box {
        width: 80%;
      }
    }
  }
</style>
