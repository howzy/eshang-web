<template>
  <div>

    <group>
      <popup-picker title="服务区" :data="list1" v-model="value1" @on-change="changeServerPart" @click.native="show"></popup-picker>
      <popup-picker title="门店" :data="list2" v-model="value2" @on-change="changeShop" @click.native="show"></popup-picker>
      <x-switch title="结账时段查询" v-model="isSerach" @on-change="show"></x-switch>
    </group>

    <group title="结账时段查询" v-if="isSerach">
      <datetime title="开始时间" format="YYYY/MM/DD HH:mm" v-model="startTime"></datetime>
      <datetime title="结束时间" format="YYYY/MM/DD HH:mm" v-model="endTime"></datetime>
    </group>
    <divider v-if="!filterEndAccount.length" style="margin-top: 2rem;">暂无数据</divider>
    <template v-for="item in filterEndAccount">
      <div class="vux-form-preview weui-form-preview" style="margin-top: 2rem;">
        <div class="weui-form-preview__hd">
          <label class="weui-form-preview__label">客单均价</label>
          <em class="weui-form-preview__value">{{item.TOTALSELLAMOUNT/item.TICKETCOUNT | formatMoney}}</em>
        </div>
        <div class="weui-form-preview__bd">
          <div class="weui-form-preview__item">
            <label class="weui-form-preview__label">客单数量</label>
            <span class="weui-form-preview__value">{{item.TICKETCOUNT}}</span>
          </div>
          <div class="weui-form-preview__item">
            <label class="weui-form-preview__label">销售数量</label>
            <span class="weui-form-preview__value">{{item.TOTALCOUNT}}</span>
          </div>
          <div class="weui-form-preview__item">
            <label class="weui-form-preview__label">销售金额</label>
            <span class="weui-form-preview__value">{{item.TOTALSELLAMOUNT | formatMoney}}</span>
          </div>
          <div class="weui-form-preview__item">
            <label class="weui-form-preview__label">现金支付金额</label>
            <span class="weui-form-preview__value">{{item.CASHPAY | formatMoney}}</span>
          </div>
          <div class="weui-form-preview__item">
            <label class="weui-form-preview__label">移动支付金额</label>
            <span class="weui-form-preview__value">{{item.MOBILEPAYMENT | formatMoney}}</span>
          </div>
          <div class="weui-form-preview__item">
            <label class="weui-form-preview__label">结账时间</label>
            <span class="weui-form-preview__value">{{item.ENDACCOUNT_DATE}}</span>
          </div>
        </div>
        <div class="weui-form-preview__ft"></div>
      </div>
    </template>

  </div>
</template>

<script>
  import { Group, PopupPicker, FormPreview, Datetime, XSwitch, Divider } from 'vux'
  import axios from 'axios'
  import AXIOS from '../axios/axios'
  const Axios = new AXIOS();
  export default {
    components: {
      Group,
      PopupPicker,
      FormPreview,
      Datetime,
      XSwitch,
      Divider
    },
    data() {
      return {
        serverPartList: [],
        serverPartShopList: [],
        endAccountList: [],
        curServerPart: {},
        curShop: {},
        list1: [],
        list2: [],
        value2: [],
        isSerach: false,
        startTime: null,
        endTime: null,
      }
    },
    computed: {
      value1: function () {
        return [this.curServerPart.SERVERPART_NAME];
      },
      filterEndAccount: function () {
        if (!this.startTime || !this.endTime) {
          return this.endAccountList;
        } else {
          return this.endAccountList.filter(item => {
            return this.compareTime(item.ENDACCOUNT_DATE, this.startTime, this.endTime);
          });
        }
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.getTotalServerPart();
      })
    },
    methods: {
      // 获取服务区数据列表
      getTotalServerPart: function () {
        // 获取真实数据
        // let param = {
        //   action_type: 'getTotalServerPart'
        // }
        // Axios.get(param)

        // 获取本地测试数据
        axios.get("static/serverpart.json")
          .then(res => {
            this.serverPartList = res.data.SERVERPARTObject;
            if (this.serverPartList && this.serverPartList.length) {
              if (!localStorage.getItem('serverPart')) {
                this.curServerPart = res.data.SERVERPARTObject[0];
                localStorage.setItem('serverPart', JSON.stringify(this.curServerPart));
              } else {
                this.curServerPart = JSON.parse(localStorage.getItem('serverPart'));
              }
              this.getServerPartShop(this.curServerPart.SERVERPART_ID);

              // 服务区下拉框的值列表
              let list1 = [];
              this.serverPartList.forEach(item => {
                list1.push(item.SERVERPART_NAME);
              });
              this.list1 = [list1];
            }
          })
      },
      // 获取门店数据列表
      getServerPartShop: function (serverPartId) {
        // 获取真实数据
        // let param = {
        //   action_type: 'getServerPartShop',
        //   action_data: serverPartId
        // };
        // Axios.get(param)

        // 获取本地测试数据
        axios.get("static/serverpart-shop.json")
          .then(res => {
          this.serverPartShopList = res.data.ServerPartShopObject;
          if (this.serverPartShopList && this.serverPartShopList.length) {
            if (!localStorage.getItem('shop')) {
              this.curShop = res.data.ServerPartShopObject[0];
              localStorage.setItem('shop', JSON.stringify(this.curShop));
            } else {
              this.curShop = JSON.parse(localStorage.getItem('shop'));
            }

            this.value2 = [this.curShop.SHOPNAME];

            // 门店下拉框的值列表
            let list2 = [];
            this.serverPartShopList.forEach(item => {
              list2.push(item.SHOPNAME);
            });
            this.list2 = [list2];

            this.getEndaccount(this.curShop.SERVERPARTSHOP_ID);
          }
        })
      },
      // 获取结账数据列表
      getEndaccount: function (shopId) {
        // 获取真实数据
        // let param = {
        //   action_type: 'getServerPartEndaccount',
        //   action_data: shopId
        // };
        // Axios.get(param)
        
        // 获取本地测试数据
        axios.get("static/end-account.json")
          .then(res => {
          this.endAccountList = res.data.EndaccountObject;
          if (this.endAccountList && this.endAccountList.length) {
            //
          }
        })
      },
      //选择服务区
      changeServerPart: function (val) {
        let index = this.serverPartList.findIndex(item => item.SERVERPART_NAME == val[0]);
        this.curServerPart = this.serverPartList[index];
        localStorage.setItem('serverPart', JSON.stringify(this.curServerPart));
        localStorage.removeItem('shop');
        this.getServerPartShop(this.curServerPart.SERVERPART_ID);
      },
      // 选择门店
      changeShop: function (val) {
        let index = this.serverPartShopList.findIndex(item => item.SHOPNAME == val[0]);
        this.curShop = this.serverPartShopList[index];
        localStorage.setItem('shop', JSON.stringify(this.curShop));
        this.getEndaccount(this.curShop.SERVERPARTSHOP_ID);
      },
      show: function () {
        // this.isSerach = false;
        this.startTime = null;
        this.endTime = null;
      },
      compareTime: function (v, x, y) {
        let vT = new Date(v).getTime();
        let xT = new Date(x).getTime();
        let yT = new Date(y).getTime();
        if (vT - xT >= 0 && vT - yT <=0) {
          return true;
        } else {
          return false;
        }
      }
    },
    filters: {
      formatMoney: function (value) {
        value = Number(value);
        return "￥" + value.toFixed(2);
      }
    }
  }

</script>

<style>
  html,
  body {
    height: 100%;
    width: 100%;
    overflow-x: hidden;
  }
  
  .vux-demo {
    text-align: center;
  }
  
  .logo {
    width: 100px;
    height: 100px
  }
</style>