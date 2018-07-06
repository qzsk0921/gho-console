<template>
  <div class="panel-container">
    <div class="panel is-hover-shadow">
      <div class="panel-header">
        <div class="panel-title">账号信息</div>
        <div class="panel-control">
          <em class="muted"><small>免费项目</small></em>
        </div>
      </div>
      <div class="panel-body">
        <div class="thumb-container">
          <div class="thumbnail">
            <div class="img-container">
              <router-link to="/earth/views/console/pictures">
                <img class="first-picture" :src="imgSrc" v-if="imgData" @click="sendimgData">
                <div class="first-picture nothumbnail" v-else @click="sendimgData">
                  <span class="nothumbnail-text">沒有缩略图</span>
                </div>
              </router-link>
            </div>
          </div>
          <div class="thumbnail-pad">
            <table class="table">
              <tr>
                <td>图像</td>
                <td>21</td>
              </tr>
              <tr>
                <td>储存</td>
                <td>44.12MB</td>
              </tr>
              <tr>
                <td>数据</td>
                <td>0.47GB</td>
              </tr>
              <tr>
                <td>设备</td>
                <td>Apple__iPad (5th generation)</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
      <div class="panel-footer">
        <small>
          <em>创建时间: 04/13/18 16:14:10</em>
        </small>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // imgSrc: null,
      imgSrc: require('@/assets/1(1).jpg'),
      imgData: ''
    }
  },
  created () {
    if (!this.imgSrc) {
      this.imgData = false
    } else {
      this.imgData = true
    }
    // console.log(this.imgData)
  },
  methods: {
    sendimgData () {
      // (new Vue).$emit('imgData', imgData)
      this.$store.state.progress.imgData = this.imgData
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .panel-container {
    min-width: 280px;
    padding: 0 15px;
    flex:1;
    .panel {
      transition: .6s;
      margin-bottom: 35px;
      border: 1px solid #ddd;
      border-radius: 4px;
      .panel-header {
        position: relative;
        display: flex;
        justify-content: space-between;
        .panel-title {
          font-weight: 300;
          padding: 0 15px;
          font-size: 18px;
          line-height: 60px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .panel-control {
          padding: 0 15px;
          line-height: 60px;
        }
        &:after {
          position: absolute;
          content: '';
          left: 15px;
          right: 15px;
          bottom: 0;
          height: 0;
          border-bottom: 1px solid #ddd;
        }
      }
      .panel-body {
        padding: 25px 15px;
        .thumb-container {
          display: flex;
          .thumbnail {
            flex: 4;
            .img-container {
              height: 240px;
              width: 90%;
              overflow: hidden;
              border-radius: 5px;
              display: flex;
              justify-content: center;
              align-items: center;
              a {
                width: 100%;
                height: 100%;
                overflow: hidden;
                font-size: 0;
                display: block;
                .first-picture {
                  width: 100%;
                  border-radius: 5px;
                  max-height: 240px;
                  transition: .6s;
                }
                .first-picture:hover {
                  transform: scale(1.07)
                }
                .nothumbnail {
                  position: relative;
                  background-color: #aaa;
                  padding-bottom: 65%;
                  color: rgba(255, 255, 255, .7);
                  .nothumbnail-text {
                    font-size: 18px;
                    width: 100%;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate3d(-50%, -50%, 0);
                  }
                }
              }
            }
          }
          .thumbnail-pad {
            flex: 3;
            .table {
              width: 100%;
              font-size: 13px;
              tr {
                display: flex;
                td {
                  flex: 1;
                  padding: 8px;
                  border-bottom: 1px solid #ddd;
                  overflow: hidden;
                  text-overflow: ellipsis;
                }
                td:nth-child(2) {
                  flex: 2;
                }
              }
            }
          }
        }
      }
      .panel-footer {
        background-color: #f7f7f7;
        padding: 10px 15px;
        display: flex;
        color: #404040;
      }
    }
  }
  @media (max-width: 620px) {
    .thumb-container {
      flex-direction: column;
      .img-container {
        height: inherit!important;
        margin: 0 auto;
        .nothumbnail-text {
          font-size: 16px!important;
        }
      }
      .table {
        font-size: 12px!important;
      }
    }
  }
</style>
