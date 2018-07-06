<template>
  <div class="popup">
    <div class="transparent"></div>
    <!-- 免注册登录 -->
    <form :class="['login-popup', 'center-x', loginVisibletrigger ? 'show' : 'hide']">
      <header class="popup-header clearfix">
        <div class="popup-title fl w80">免 注 册 登 录</div>
        <!-- <div class="popup-actions fr">
          <a class="popup-close" href="javascript:void(0)">
            <i>×</i>
          </a>
        </div> -->
      </header>
      <div class="popup-content">
        <div class="form-column-layout" data-action="process-signup">
          <div class="fields">
            <div class="form-field username-field username">
              <label class="form-label" for="username">手 机 号</label>
              <div class="form-content">
                <input id="mobileid-noreg" class="phone-input w100" type="text" name="username" value="" autofocus="" placeholder="" v-model="phoneNum">
              </div>
            </div>
            <div class="form-field password">
              <label class="form-label" for="password">验 证 码</label>
              <div class="form-content clearfix">
                <input id="verification" class="verification-input fl w60" type="text" name="verification" value="" v-model="yzm">
                <button type=button class="form-button verification fr w35" @click="verificationClick" :disabled="disabled">
                  <span class="second state-normal">{{yzmText}}</span>
                </button>
              </div>
            </div>
            <hr class="form-separator">
            <div class="form-field form-buttons signup-field">
              <div class="form-content clearfix">
                <button type=button class="form-button cancel fl w45" @click="cancelClick">
                  <span class="state-normal">取 消</span>
                </button>
                <button type=button id="login-noreg" class="form-button fr w45" @click="loginClick">
                  <span class="state-normal">登 录</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer class="popup-footer">
        <div class="bridge">
            已有账号? <a class="switch-pwd" href="javascript:void(0)" data-action="open-login" @click="loginToggle">切换到账号登录</a>
        </div>
      </footer>
    </form>
    <!-- 密码登录 -->
    <form :class="['loginpwd-popup', 'center-x', loginVisibletrigger ? 'hide' : 'show']">
      <!-- <input type="hidden" name="csrfmiddlewaretoken" value=""> -->
      <header class="popup-header clearfix">
        <div class="popup-title fl w80">账 号 登 录</div>
        <!-- <div class="popup-actions fr">
          <a class="popup-close" href="javascript:void(0)">
            <i>×</i>
          </a>
        </div> -->
      </header>
      <div class="popup-content">
        <div class="form-column-layout" data-action="process-signup">
          <div class="fields">
            <div class="form-field username-field username">
              <label class="form-label" for="username">手 机 号</label>
              <div class="form-content">
                <input id="mobileid-reg" class="phone-input w100" type="text" name="username" value="" required="" data-error-for="username" autofocus="" pattern="^[a-zA-Z0-9._-]+$" title="Letters, numbers, -, _ and . only" v-model="regPhoneNum">
              </div>
            </div>
            <div class="form-field password">
              <label class="form-label" for="password">密 码</label>
              <div class="form-content">
                <input id="password" class="password-input w100" type="password" name="password" value="" required="" pattern=".{8,}" title="8 characters minimum" v-model="password">
              </div>
            </div>
            <hr class="form-separator">
            <div class="form-field form-buttons signup-field">
              <div class="form-content clearfix">
                <button type=button class="form-button cancel fl w45" @click="regcancleClick">
                  <span class="state-normal">取 消</span>
                </button>
                <button type=button id="login-reg" class="form-button fr w45" @click="regloginClick">
                  <span class="state-normal">登 录</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer class="popup-footer">
        <div class="bridge">
            记密码太烦? <a class="switch-nopwd" href="javascript:void(0)" @click="loginToggle">切换到免注册登录</a>
        </div>
      </footer>
    </form>
  </div>
</template>

<script>
import router from '../../router'
import { setToken } from '@/utils/auth'

const phonereg = /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/
export default {
  data () {
    return {
      loginVisibletrigger: true,
      phoneNum: null,
      regPhoneNum: null,
      password: null,
      yzm: null,
      yzmText: '获 取 验 证 码',
      time: null,
      disabled: false
    }
  },
  // created () {
  //   console.log(this.$route.params.toPath)
  // },
  methods: {
    loginToggle () {
      this.loginVisibletrigger = !this.loginVisibletrigger
    },
    // 免注册登录部分
    verificationClick () {
      if (!this.phoneNum || !phonereg.test(this.phoneNum)) {
        this.$message.error('请输入有效手机号')
        return false
      }
      // 目前跨域，或修改请求配置不能有basic路径
      this.axios({
        method: 'post',
        url: 'login/sendyzm.php',
        data: {
          mobile: this.phoneNum
        }
      }).then(response => {
        console.log(response)
        if (response.status === 200) {
          this.$message({
            message: '验证码发送成功',
            type: 'success'
          })
          // 读秒和禁用获取验证码
          this.disabled = true
          let time = 60
          const id = setInterval(() => {
            time--
            this.yzmText = time + 's'
            if (time <= 0) {
              clearInterval(id)
              this.yzmText = '获 取 验 证 码'
              this.disabled = false
            }
            console.log(time)
          }, 1000)
        }
      })
    },
    loginClick () {
      if (!this.phoneNum || !this.yzm) {
        this.$message.error('请输入手机号和验证码')
      } else {
        this.axios({
          method: 'post',
          url: 'login/register.php',
          data: {
            mobileid: this.phoneNum,
            yzm: this.yzm
          }
        }).then(response => {
          console.log(response)
          if (response.status === 200) {
            if (response.data === false) {
              this.$message.error('手机号或验证码不正确')
            } else {
              setToken(response.data.PhoneNum)
              // 跳转到用户之前要去的页面
              if (this.$route.params.toPath) {
                router.push({path: this.$route.params.toPath})
              } else {
                router.push({path: '/'})
              }
            }
          }
        })
      }
    },
    cancelClick () {
      this.phoneNum = ''
      this.yzm = ''
    },
    // 密码登录部分
    regcancleClick () {
      this.regPhoneNum = ''
      this.password = ''
    },
    regloginClick () {
      if (!phonereg.test(this.regPhoneNum) || !this.password) {
        this.$message.error('用户名或密码不正确')
        return false
      }
      this.axios({
        method: 'post',
        // url: 'http://www.guihuao.com/earth/login/login.php',
        url: 'login/login.php',
        data: {
          mobile: this.regPhoneNum,
          pwd: this.password
        }
      }).then(response => {
        if (response.status === 200) {
          // do something
          if (response.data.code === 0) {
            this.$message.error('用户名或密码不正确')
          } else if (response.data.code === 1) {
            // 登录成功do something
            // 设置cookie
            setToken(response.data.PhoneNum)
            // 跳转到用户之前要去的页面
            console.log(this.$route.params.toPath)
            if (this.$route.params.toPath) {
              router.push({path: this.$route.params.toPath})
            } else {
              router.push({path: '/'})
            }
          }
        } else {
          this.$message({
            message: '登录失败，请重试',
            type: 'warning'
          })
        }
      })
    }
  }
}
</script>

<style scoped>
  .popup .login-popup {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    transition: .2s;
    max-width: 500px;
    min-width: 250px;
    width: 80%;
    border-radius: 5px;
    overflow: hidden;
    margin-top: 10%;
    border: 1px solid #ccc;
  }
  .login-popup .popup-header {
    padding: 0 25px;
    /*background-color: #fff;*/
    background-color: #eee;
    text-align: left;
    height: 70px;
    line-height: 70px;
  }
  .popup .login-popup .popup-header .popup-title {
    font-size: 21px;
    height: 70px;
    line-height: 70px;
    font-weight: 700;
  }
  .login-popup .popup-header .popup-actions .popup-close {
  }
  .login-popup .popup-header .popup-actions .popup-close i {
    font-size: 33px;
    line-height: 33px;
    color: #ccc;
  }
  .popup .login-popup .popup-content {
    padding: 20px;
    font-size: 15px;
    background-color: #fff;
  }
  .popup .login-popup .popup-content .state-normal {
    font-size: 16px;
    font-weight: 540;
  }
  .popup .login-popup .popup-content .form-label {
    display: block;
    margin-bottom: 2px;
    font-size: 15px;
    text-align: left;
    font-weight: 400;
  }
  .popup .login-popup .popup-content .form-content {
    padding: 10px 0 20px;
  }
  .popup .login-popup .popup-content .form-content .verification {
    display: inline-block;
  }
  .popup .login-popup .popup-content .form-content input {
    padding-left: 10px;
    height: 45px;
    line-height: 45px;
    border-radius: 4px;
    overflow: hidden;
    outline: none;
    border: 1px solid #ccc;
    font-size: 18px;
  }
  .popup .login-popup .popup-content .form-content input:hover {
    border-color: #f6c946;
  }
  .popup .login-popup .popup-content .form-content input:focus {
    border-color: #f6c946;
  }
  .popup .login-popup .popup-content .form-content input::placeholder {
    color: #e20f0f;
  }
  .popup .login-popup .popup-content .form-buttons {
    margin: 20px 0 5px;
  }
  .popup .login-popup .form-content .form-button {
    height: 45px;
    line-height: 45px;
    background-color: #f6c946;
    border: 0;
    border-radius: 4px;
    overflow: hidden;
    cursor: pointer;
    outline: none;
  }
  .popup .login-popup .form-content .form-button:hover{
    opacity: .9;
  }
  .popup .login-popup .form-content .cancel {
    background-color: #999;
  }
  .popup .login-popup .popup-footer {
    padding: 20px 25px;
    font-size: 15px;
    background-color: #eee;
  }
  .popup .login-popup .popup-footer .bridge {
    text-align: center;
    color: #999
  }
  .switch-pwd, .switch-nopwd {
    transition: .2s;
  }
  .switch-pwd:hover, .switch-nopwd:hover {
    color: #f6c946;
  }
  /*密码登录*/
  .popup .loginpwd-popup {
    /*width: 400px;
    margin-top: 180px;
    border-radius: 5px;
    text-align: center;
    overflow: hidden;*/
    /*display: none;*/
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    transition: .2s;
    max-width: 500px;
    min-width: 250px;
    width: 80%;
    border-radius: 5px;
    overflow: hidden;
    margin: auto;
    margin-top: 10%;
    border: 1px solid #ccc;
  }
  .loginpwd-popup .popup-header {
    padding: 0 25px;
    background-color: #eee;
    text-align: left;
    height: 70px;
    line-height: 70px;
  }
  .loginpwd-popup .popup-content {
    background-color: #fff;
  }
  .popup .loginpwd-popup .popup-header .popup-title {
    font-size: 21px;
    height: 70px;
    line-height: 70px;
    font-weight: 700;
  }
  .loginpwd-popup .popup-header .popup-actions .popup-close {
  }
  .loginpwd-popup .popup-header .popup-actions .popup-close i {
    font-size: 33px;
    line-height: 33px;
    color: #ccc;
  }
  .popup .loginpwd-popup .popup-content {
    padding: 20px;
    font-size: 15px;
  }
  .popup .loginpwd-popup .popup-content .state-normal {
    font-size: 16px;
    font-weight: 540;
  }
  .popup .loginpwd-popup .popup-content .form-label {
    display: block;
    margin-bottom: 2px;
    font-size: 15px;
    text-align: left;
    font-weight: 400;
  }
  .popup .loginpwd-popup .popup-content .form-content {
    padding: 10px 0 20px;
  }
  .popup .loginpwd-popup .popup-content .form-content input {
    padding-left: 10px;
    height: 45px;
    line-height: 45px;
    border-radius: 4px;
    overflow: hidden;
    outline: none;
    border: 1px solid #ccc;
  }
  .popup .loginpwd-popup .popup-content .form-content input:hover {
    border-color: #f6c946;
  }
  .popup .loginpwd-popup .popup-content .form-content input:focus {
    border-color: #f6c946;
  }
  .popup .loginpwd-popup .popup-content .form-content input::placeholder {
    color: #e20f0f;
  }
  .popup .loginpwd-popup .popup-content .form-buttons {
    margin: 20px 0 5px;
  }
  .popup .loginpwd-popup .form-content .form-button {
    height: 45px;
    line-height: 45px;
    background-color: #f6c946;
    border: 0;
    border-radius: 4px;
    overflow: hidden;
    cursor: pointer;
    outline: none;
  }
  .popup .loginpwd-popup .form-content .form-button:hover {
    opacity: .9;
  }
  .popup .loginpwd-popup .form-content .cancel {
    background-color: #999;
  }
  .popup .loginpwd-popup .popup-footer {
    padding: 20px 25px;
    font-size: 15px;
    background-color: #eee;
  }
  .popup .loginpwd-popup .popup-footer .bridge {
    text-align: center;
    color: #999
  }
</style>
