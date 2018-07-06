<template>
  <div class="panel-container">
    <div class="panel is-hover-shadow">
      <div class="panel-header">
        <div class="panel-title">模型重建进度</div>
        <div class="panel-control">
          <em class="muted"><small>已完成 100%</small></em>
        </div>
      </div>
      <div class="panel-body">
        <div class="content-center">
          <el-progress type="circle" :stroke-width="15" :percentage="percentage" status="success"></el-progress>
          <h4>模型重建任务</h4>
        </div>
        <div class="content-pad">
          <ul class="list-box">
            <li>
              <div>
                <span>完成</span>
              </div>
              <p>
                <small>状态</small>
              </p>
            </li>
            <li>
              <div>
                <span>00:07:28</span>
              </div>
              <p>
                <small>耗时:7分钟</small>
              </p>
            </li>
          </ul>
        </div>
      </div>
      <div class="panel-footer">
        <small>
          <em>开始时间: 04/13/18 17:14:10</em>
        </small>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      percentage: 33
    }
  },
  computed: {
    status () {
      if (this.percentage === 100) {
        return 'success'
      }
    }
  }
}
</script>

<style scoped rel="stylesheet/scss" lang="scss">
  .panel-container {
    min-width: 280px;
    padding: 0 15px;
    flex: 1;
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
        .content-center {
          h4 {
            margin: 10px 0;
          }
        }
        .content-pad {
          padding: 15px;
          .list-box {
            display: flex;
            justify-content: space-around;
            list-style: none;
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
</style>
