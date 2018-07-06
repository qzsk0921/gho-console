<template>
  <div>
    <div class="recharge-amounts">
      <div class="recharge-amount">
        <span class="recharge-amount-label">账户余额</span>
        <span class="recharge-amount-digi">¥0</span>
      </div>
    </div>
    <div class="recharge-block">
      <label class="rechargePayment-label" for="">支付方式</label>
      <div class="recharge-box">
        <div class="rechargePayments">
          <div :class="[rechargePayment, item.focus ? 'select' : '' ]"
            v-for="(item, index) in popular" :key="index"
            @click="popularFun(item, index)">
            <div class="payment-icon-wrap">
              <img :src="item.src">
            </div>
            <div class="payment-font-wrap">{{item.name}}</div>
            <div :class="[item.focus ? 'focus' : 'nofocus']">
              <svg-icon icon-name="check"/>
            </div>
          </div>
          <div class="rechargePayment" @click="rechargeInfoOpen">
            <div class="payment-icon-wrap">
              <img src="../../assets/bank.png">
            </div>
            <div class="payment-font-wrap">银行转账</div>
          </div>
        </div>
        <div class="rechargePayments">
          <div :class="[rechargePayment, item.focus ? 'select' : '']"
            v-for="(item, index) in common" :key="index"
            @click="commonFun(item, index)">
            <div class="payment-icon-wrap">
              <img :src="item.src">
            </div>
            <div class="payment-font-wrap">{{item.name}}</div>
            <div :class="[item.focus ? 'focus' : 'nofocus']">
              <svg-icon icon-name="check"/>
            </div>
          </div>
        </div>
        <div class="rechargePayments">
          <p class="rechargePayment-info">交易过程中遇到交易限额的问题，请前往相应的网上银行进行调整。目前七牛支付不支持信用卡。转账汇款请点击 <span @click="rechargeInfoOpen">获取账户信息。</span></p>
        </div>
      </div>
    </div>
    <div class="recharge-block">
      <label class="rechargePayment-label" for="">充值金额</label>
      <div class="recharge-box">
        <div class="recharge-ground-wrap">
          <div class="recharge-group">
            <div class="input-group">
              <input placeholder="充值金额" class="input" type="text" v-model.number="rechargeAmount">
              <span>元</span>
            </div>
            <span class="help-text" v-show="waring">充值金额错误，最多可包含两位小数</span>
          </div>
          <div class="rechargeBtn-wrap">
            <button class="rechargeBtn btn" type="button" @click="rechargeOpen">
              <span>立即充值</span>
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- 弹出窗 -->
    <div :class="[dialogWrap, dialogVisible ? 'show' : 'hide']">
      <div class="dialog-mask" @click="dialogClose"></div>
      <!-- 转账信息弹出窗 -->
      <div :class="[dialogContainer, rechargeInfoVisible ? 'transition-show' : 'transition-hide']">
        <div class="dialog-content">
          <button class="dialog-close" @click="dialogClose">×</button>
          <div class="dialog-header">
            <div class="dialog-title">转账信息</div>
          </div>
          <div class="dialog-body">
            <div class="dialog-row">
              <div class="recharge-transfer">
                <div class="recharge-transfer-info clearfix">
                  <span>开户行：</span>
                  <span>上海浦东发展银行杨浦支行</span>
                </div>
                <div class="recharge-transfer-info clearfix">
                  <span>户名：</span>
                  <span>上海七牛信息技术有限公司</span>
                </div>
                <div class="recharge-transfer-info clearfix">
                  <span>账号：</span>
                  <span>上海浦东发展银行杨浦支行</span>
                </div>
              </div>
              <div class="recharge-transfer-helps">
                <ul>
                  <li>为了您的合法权益，转账时请备注您的七牛云账号。</li>
                  <li>如银行不支持"@"符号输入，请使用中文“艾特”替代。eg：mail@qiniu.com；mail艾特qiniu.com。</li>
                  <li>银行转账会需要至少3个工作日到账，期间请耐心等待，如遇到问题可以联系销售或者技术支持</li>
                </ul>
              </div>
              <button type="button" class="btn recharge-transfer-helps-btn" @click="dialogClose"><span>确 定</span></button>
            </div>
          </div>
        </div>
      </div>
      <!-- 确认充值弹出窗 -->
      <div :class="[dialogContainer, rechargeVisible ? 'transition-show' : 'transition-hide']" style="top:-400px">
        <div class="content">
          <div class="dialog-close" @click="dialogClose">×</div>
          <div class="dialog-header">
            <div class="dialog-title">确认充值</div>
          </div>
          <div class="dialog-body">
            <div class="dialog-row">
              <div class="recharge-transfer">
                <div class="recharge-transfer-info clearfix">
                  <span>充值方式：</span>
                  <span>
                    <div class="recharge-transfer-payment">
                      <div class="payment-icon-wrap">
                        <img :src="src">
                      </div>
                      <div class="payment-font-wrap">{{name}}</div>
                    </div>
                  </span>
                </div>
                <div class="recharge-transfer-info clearfix">
                  <span>充值金额：</span>
                  <span>¥ {{rechargeAmount | decimal}}</span>
                </div>
                <div class="recharge-transfer-info clearfix">
                  <span>实际到账：</span>
                  <span>¥ {{rechargeAmount | decimal}}</span>
                </div>
              </div>
              <div class="btn-wrap">
                <button class="cancelBtn btn" type="button" @click="dialogClose">取 消</button>
                <button class="rechargeBtn btn" type="button" @click="dialogClose();confirmPay()"><span>确 定</span></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// 移动端监测 移动true PC false
let detectmob = () => {
  if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i)
  ) {
    return true
  } else {
    return false
  }
}
export default {
  filters: {
    decimal: function (value) {
      return Number(value).toFixed(2)
    }
  },
  data () {
    return {
      popular: [{id: 1, name: '支付宝', focus: false, des: 'popular', src: require('../../assets/alipay.png')}, {id: 2, name: '微信支付', focus: false, des: 'popular', src: require('../../assets/alipay.png')}],
      common: [{id: 1, name: '工商银行', focus: false, des: 'common', src: require('../../assets/gs.png')}, {id: 2, name: '农业银行', focus: false, des: 'common', src: require('../../assets/ny.png')}, {id: 3, name: '建设银行', focus: false, des: 'common', src: require('../../assets/js.png')}, {id: 4, name: '中国银行', focus: false, des: 'common', src: require('../../assets/zg.png')}, {id: 5, name: '招商银行', focus: false, des: 'common', src: require('../../assets/zs.png')}, {id: 6, name: '浦发银行', focus: false, des: 'common', src: require('../../assets/pf.png')}, {id: 7, name: '广发银行', focus: false, des: 'common', src: require('../../assets/gf.png')}, {id: 8, name: '兴业银行', focus: false, des: 'common', src: require('../../assets/xy.png')}],
      rechargePayment: 'rechargePayment',
      dialogVisible: false,
      rechargeInfoVisible: false,
      rechargeVisible: false,
      dialogWrap: 'dialogWrap',
      dialogContainer: 'dialogContainer',
      name: '',
      src: '',
      rechargeAmount: this.$store.state.financial.rechargeInfo.rechargeAmount,
      waring: false
    }
  },
  created () {
    // 请求
  },
  mounted () {
    let item = this.$store.state.financial.rechargeInfo
    if (!item.name) {
      this.popularFun(this.popular[0], 0)
    } else {
      if (item.des === 'popular') {
        this.popularFun(item, item.id - 1)
      } else {
        this.commonFun(item, item.id - 1)
      }
    }
  },
  methods: {
    rechargeInfoOpen () {
      this.dialogVisible = true
      this.rechargeInfoVisible = true
    },
    rechargeOpen () {
      if (typeof this.rechargeAmount !== 'number' || !this.rechargeAmount || this.rechargeAmount < 0) {
        // 充值金额错误，最多可包含两位小数
        this.waring = true
      } else {
        // 此处代码可优化--------------------------------------------------------------------------
        if (this.waring) {
          this.waring = !this.waring
        }
        this.dialogVisible = true
        this.rechargeVisible = true
        this.name = this.$store.state.financial.rechargeInfo.name
        this.src = this.$store.state.financial.rechargeInfo.src
        this.rechargeAmount = Number(this.rechargeAmount.toFixed(2))
      }
      this.$store.state.financial.rechargeInfo.rechargeAmount = this.rechargeAmount
    },
    dialogClose () {
      this.dialogVisible = false
      this.rechargeInfoVisible = false
      this.rechargeVisible = false
      // if (event.target === 'span') {
      //   console.log('成功')
      // }
    },
    popularFun (item, index) {
      this.common.forEach((v) => {
        v.focus = false
      })
      this.popular.forEach((v, i) => {
        if (index === i) {
          v.focus = true
        } else {
          v.focus = false
        }
      })
      this.$store.state.financial.rechargeInfo.name = item.name
      this.$store.state.financial.rechargeInfo.src = item.src
      this.$store.state.financial.rechargeInfo.des = item.des
      this.$store.state.financial.rechargeInfo.id = item.id
      this.$store.state.financial.rechargeInfo.rechargeAmount = this.rechargeAmount
    },
    commonFun (item, index) {
      this.popular.forEach((v) => {
        v.focus = false
      })
      this.common.forEach((v, i) => {
        if (index === i) {
          v.focus = true
        } else {
          v.focus = false
        }
      })
      this.$store.state.financial.rechargeInfo.name = item.name
      this.$store.state.financial.rechargeInfo.src = item.src
      this.$store.state.financial.rechargeInfo.des = item.des
      this.$store.state.financial.rechargeInfo.id = item.id
      this.$store.state.financial.rechargeInfo.rechargeAmount = this.rechargeAmount
    },
    confirmPay () {
      let vNow = new Date()
      let sNow = ''
      sNow += String(vNow.getFullYear())
      sNow += String(vNow.getMonth() + 1)
      sNow += String(vNow.getDate())
      sNow += String(vNow.getHours())
      sNow += String(vNow.getMinutes())
      sNow += String(vNow.getSeconds())
      sNow += String(vNow.getMilliseconds())
      let yufu = this.rechargeAmount
      let ism = detectmob()
      if (!ism) {
        window.open('http://www.guihuao.com/earth/Alipay/pagepay/pagepay.php?WIDout_trade_no=' + sNow + '&WIDsubject=' + '充值' + '&WIDtotal_amount=' + yufu + '&WIDbody=' + 'admin')
        // location.href = 
      } else {
        window.open('http://www.guihuao.com/earth/Alipay/mobilepay/wappay/pay.php?WIDout_trade_no=' + sNow + '&WIDsubject=' + '充值' + '&WIDtotal_amount=' + yufu + '&WIDbody=' + 'admin')
        // location.href ='mobilepay/wappay/pay.php?WIDout_trade_no='+sNow+'&WIDsubject='+'充值'+'&WIDtotal_amount='+yufu+'&WIDbody='+"admin";
      }
    }
  }
}
</script>
<style scoped>
  .recharge-amounts {
    width: 80%;
    margin: 0 auto;
  }
  .recharge-amount {
    padding: 30px 0;
  }
  .recharge-amount-label {
    font-size: 14px;
    color: #8d9199;
  }
  .recharge-amount-digi {
    font-size: 34px;
    color: #5e6166;
    display: block;
    margin-top: 20px;
  }
  /*支付方式*/
  .recharge-block {
    display: flex;
    flex-wrap: wrap;
    border-top: 1px solid #e6e9f0;
    padding: 45px 0;
  }
  .recharge-block .rechargePayment-label {
    min-width: 65px;
    flex: 1;
    flex-basis: 10%;
    /*font-size: 16px;*/
    font-weight: 500;
    /*color: #2f3033;*/
  }
  .recharge-block .recharge-box {
    display: flex;
    flex-direction: column;
    flex: 7;
  }
  .recharge-block .rechargePayments {
    display: flex;
    flex-wrap: wrap;
  }
  .recharge-block .rechargePayment {
    width: 128px;
    padding: 0 10px;
    line-height: 42px;
    margin-right: 20px;
    margin-bottom: 20px;
    border: 1px solid #e6e9f0;
    border-radius: 3px;
    cursor: pointer;
    position: relative;
    display: flex;
    align-items: center;
  }
  .recharge-block .rechargePayment-info {
    text-align: left;
    color: rgb(141, 145, 153);
    font-size: 14px;
    line-height: 28px;
    max-width: 520px;
    margin: 15px 0;
  }
  .recharge-block .rechargePayment-info span {
    cursor: pointer;
    color: #eab008;
  }
  .payment-icon-wrap {
    margin-left: 5px;
    width: 32px;
    height: 27px;
    /*margin-top: 8px;*/
    overflow: hidden;
  }
  .payment-font-wrap {
    font-size: 14px;
    margin-left: 2px;
  }
  .payment-icon-wrap img {
    height: 100%;
  }
  .recharge-block .rechargePayment.select {
    border-color: #eab008;
  }
  .recharge-block .rechargePayment:hover {
    border-color: #eab008;
  }
  .recharge-block .rechargePayment .focus {
    font-size: 18px;
    width: 18px;
    height: 18px;
    position: absolute;
    bottom: -6px;
    right: -6px;
    color: #eab008;
  }
  .recharge-block .rechargePayment .nofocus {
    display: none;
  }
  /*充值金额*/
  .recharge-ground-wrap {
    display: flex;
  }
  .recharge-group {
    width: 40%;
    border-radius: 5px;
    text-align: left;
    /*border: 1px solid #dcdfe6;*/
  }
  .rechargeBtn-wrap {
    margin-left: 8%;
  }
  .rechargeBtn {
    height: 40px;
    background-color: #eab008;
    line-height: 38px;
    color: #fff;
    transition: opacity .5s;
  }
  .input-group {
    display: flex;
    overflow: hidden;
  }
  .input {
    line-height: 1.5;
    padding: 0 15px;
    width: 100%;
    height: 40px;
    /*cursor: text;*/
    font-size: 14px;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    border: 1px solid #dcdfe6;
    outline: none;
    -moz-appearance: textfield;
  }
  .input:hover {
    border: 1px solid #eab008;
  }
  .input:focus {
    border: 1px solid #eab008;
  }
  .input::-webkit-outer-spin-button,
  .input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  .input-group span {
    padding: 0 9px;
    line-height: 40px;
    background-color: #dcdfe6;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
  }
  /*输入框提示*/
  .help-text {
    color: #fa6464;
    line-height: 1.5;
    font-size: 12px;
  }
  /*转账信息弹窗部分样式*/
  /*.dialog-mask {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
  }*/
  .dialogContainer {
    width: 700px;
  }
  .dialogWrap .dialog-row {
    width: 400px;
    margin: 40px auto;
  }
  .dialogWrap .recharge-transfer-info {
    font-size: 14px;
    line-height: 45px;
    color: #5e6166;
    margin: 0 auto;
    width: 300px;
    border-bottom: 1px solid #dcdfe5;
    font-weight: 500;
  }
  .dialogWrap .recharge-transfer-info span {
    float: left;
    text-align: left;
  }
  .dialogWrap .recharge-transfer-info span+span {
    float: right;
    text-align: right;
  }
  .dialogWrap .recharge-transfer-helps {
    width: 300px;
    color: #e55c5c;
    margin: 30px auto;
    padding-left: 20px;
    font-weight: 500;
  }
  .dialogWrap .recharge-transfer-helps ul {
    padding: 0;
  }
  .dialogWrap .recharge-transfer-helps li {
    font-size: 12px;
    line-height: 28px;
    text-align: left;
    list-style: disc;
  }
  .recharge-transfer-helps-btn {
    line-height: 38px;
    padding: 0 20px;
    font-size: 14px;
  }
  .recharge-transfer-helps-btn:hover {
    color: #eab008;
    border-color: #eab008;
  }
  .btn-wrap {
    margin-top: 30px;
    vertical-align: top;
  }
  .cancelBtn {
    height: 40px;
    margin-right: 15px;
  }
  .cancelBtn:hover {
    color: #eab008;
    border-color: #eab008;
  }
  /*确认充值弹出窗部分*/
  .recharge-transfer-payment {
    width: 100px;
    line-height: 45px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
</style>
