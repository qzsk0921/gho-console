<template>
  <nav class="navbar">
    <hamburger :toggleClick="toggleSideBar" :isActive="!sidebar.opened"></hamburger>
    <!-- 这里可添加其他 -->
    <div></div>
    <div class="user-plane-part" @click.stop>
      <div class="plane-handle">
        <div class="handle-wrap" @click="planeVisible">
          <a class="user-plane-link">个人面板
            <img class="avatar" src="../../../assets/avatar.jpeg">
          </a>
        </div>
        <div class="plane-wrap" :class="{'hide': userPlaneVisible}">
          <i class="triangle"></i>
          <div class="user-plane">
            <header class="plane-header">
              <img class="avatar" src="../../../assets/avatar.jpeg">
              <p class="account-info">
                <span class="account">sunkang0921@sina.com</span>
              </p>
              <div class="balance-info">
                <span>账户余额：</span>
                <span class="balance">¥ 0.00</span>
              </div>
              <router-link to="/financial/recharge">
                <button  class="btn" type="button">
                  <span>立即充值</span>
                </button>
              </router-link>
            </header>
            <ul class="plane-links">
              <router-link class="plane-link" to="/dashboard" tag="li">
                <svg-icon icon-name="personal"></svg-icon>
                <p class="name">个人中心</p>
              </router-link>
              <router-link class="plane-link" to="/financial" tag="li">
                <svg-icon icon-name="financial"></svg-icon>
                <p class="name">财务中心</p>
              </router-link>
              <router-link class="plane-link" to="/dc" tag="li">
                <svg-icon icon-name="data"></svg-icon>
                <p class="name">数据中心</p>
              </router-link>
              <router-link class="plane-link" to="/progress" tag="li">
                <svg-icon icon-name="progress"></svg-icon>
                <p class="name">进度查询</p>
              </router-link>
            </ul>
            <footer class="plane-footer" @click="logout">
              <a class="signout-btn" href="/earth/views/User">
                <svg-icon icon-name="exit"></svg-icon>
                退出当前账户
              </a>
            </footer>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex'
import Hamburger from '@/components/Hamburger'
import { removeToken } from '@/utils/auth'

export default {
  components: {
    Hamburger
  },
  props: {
    userPlane: {
      type: Boolean
    }
  },
  data () {
    return {
      userPlaneVisible: true
    }
  },
  computed: {
    ...mapGetters(['sidebar'])
  },
  watch: {
    userPlane (v) {
      this.userPlaneVisible = v
    }
  },
  methods: {
    toggleSideBar () {
      this.$store.dispatch('toggleSideBar')
    },
    planeVisible () {
      this.userPlaneVisible = !this.userPlaneVisible
      this.$emit('planeClick', this.userPlaneVisible)
    },
    logout () {
      removeToken()
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .navbar {
    height: 56px;
    min-height: 56px;
    line-height: 56px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    color: #333;
    line-height: 56px;
    border-bottom: 1px solid #dcdfe5;
    font-size: 14px;
    z-index: 10;
    background-color: #fff;
  }
  .user-plane-part {
    margin-right: 20px;
    position: relative;
  }
  .user-plane-part:before {
    content: "";
    width: 1px;
    height: 18px;
    position: absolute;
    left: 0;
    top: 19px;
    background-color: #dcdfe5;
  }
  .plane-handle {
    position: relative;
  }
  .user-plane-link {
    padding: 0 20px;
    display: block;
    text-decoration: none;
    color: #7a8599;
    /*border-left: 1px solid transparent;*/
    /*border-right: 1px solid transparent;*/
    transition: .2s;
  }
  .user-plane-link:hover {
    color: #000;
  }
  .avatar {
    /*position: relative;*/
    width: 31px;
    height: 31px;
    margin-left: 10px;
    vertical-align: middle;
    border-radius: 31px;
  }
  /*click激活弹窗部分*/
  .plane-wrap {
    position: absolute;
    top: 100%;
    right: 0;
    width: auto;
    height: auto;
    border: 1px solid #e6e9f0;
    border-radius: 4px;
    background-color: #fff;
    box-shadow: 0 2px 12px rgba(0,0,0,.06);
    transition: .5s;
  }
  /*.triangle {
    position: absolute;
    top: 0;
    right: 0;
  }*/
  .triangle:before, .triangle:after {
    content: "";
    display: block;
    position: absolute;
    right: 25px;
    border: 8px solid transparent;
  }
  .triangle:before {
    top: -16px;
    border-bottom-color: #e6e9f0;
  }
  .triangle:after {
    top: -15px;
    border-bottom-color: #fff;
  }
  .plane-header {
    position: relative;
    padding: 15px 140px 15px 100px;
    border-bottom: 1px solid #e6e9f0;
    height: 80px;
    /*text-align: left;*/
  }
  .plane-header .avatar {
    position: absolute;
    top: 50%;
    left: 30px;
    transform: translateY(-50%);
    width: 50px;
    height: 50px;
  }
  .plane-header .btn {
    position: absolute;
    /*top: 50%;*/
    top: 22px;
    right: 25px;
    /*transform: translateY(-50%);*/
    height: 35px;
    line-height: 35px;
    background-color: #eab008;
    color: #fff;
  }
  .account-info {
    margin: 5px 0;
    font-size: 16px;
    line-height: 1.4em;
  }
  .balance-info {
    font-size: 12px;
    line-height: 1.4em;
  }
  .plane-links {
    margin: 0;
    padding: 20px 30px;
    display: flex;
    flex-wrap: wrap;
    list-style: none;
    border-bottom: 1px solid #dcdfe5;
  }
  .plane-link {
    display: flex;
    flex-direction: column;
    flex: 0 0 25%;
    padding: 15px 0;
    text-align: center;
    transition: .2s;
    align-items: center;
    cursor: pointer;
    /*height: 100px;*/
    font-size: 18px;
    color: #5e6166;
    /*justify-content: center;*/
  }
  .plane-link:hover {
    color: #eab008;
  }
  .plane-link svg {
    font-size: 30px;
    height: 20px;
    width: 20px;
  }
  .plane-link .name {
    height: 28px;
    line-height: 28px;
    font-size: 14px;
    margin: 15px 0 0;
  }
  .plane-footer .signout-btn {
    display: block;
    line-height: 50px;
    text-align: center;
    color: #8d9199;
    transition: .15s;
  }
  .plane-footer .signout-btn:hover {
    color: #444;
  }
  .plane-footer .signout-btn svg {
    vertical-align: middle;
    /*position: relative;*/
    /*top: -2px;*/
    width: 17px;
    height: 17px;
    margin-right: 10px;
  }
</style>
