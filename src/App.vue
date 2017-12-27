<template>
  <div id="app" style="height: 100%;">
    <view-box ref="viewBox" body-padding-top="46px">
      <x-header style="width:100%;position:absolute;left:0;top:0;z-index:100;">结账信息</x-header>
      <router-view></router-view>
    </view-box>
  </div>
</template>

<script>
  import { XHeader, ViewBox } from 'vux'
  
  export default {
    name: 'app',
    components: {
      XHeader,
      ViewBox
    }
  }

</script>

<style lang="less">
  @import '~vux/src/styles/reset.less';
  body {
    background-color: #fbf9fe;
  }
</style>