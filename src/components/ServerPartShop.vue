<template>
  <div class="serverPartShop">
    <Group title="门店列表">
      <template v-for="item in serverPartShopList">
        <cell :title="item.SHOPNAME" @click.native="selectServerPartShop(item)">
          <icon v-if="selectedServerPartShopId == item.SERVERPARTSHOP_ID" type="success-no-circle" style="font-size: 20px;"></icon>
        </cell>
      </template>
    </Group>
  </div>
</template>

<script>
  import { Group, Cell, Icon } from 'vux'
  import AXIOS from '../axios/axios'
  const Axios = new AXIOS();

  export default {
    name: 'serverPart',
    components: {
      Group,
      Cell,
      Icon
    },
    data() {
      return {
        serverPartShopList: [],
        selectedServerPartShopId: ''
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.getServerPartShop();
      })
    },
    computed: {
      //
    },
    created() {
      this.fetchData();
    },
    watch: {
      // 如果路由有变化，会再次执行该方法
      '$route': 'fetchData'
    },
    methods: {
      getServerPartShop: function (serverPartId) {
        let param = {
          action_type: 'getServerPartShop',
          action_data: serverPartId
        };
        Axios.get(param).then(res => {
          this.serverPartShopList = res.data.ServerPartShopObject;
          console.log(res.data);
        })
      },
      selectServerPartShop: function (item) {
        this.selectedServerPartShopId = item.SERVERPARTSHOP_ID;
        setTimeout(() => {
          this.$router.push({ name: 'home', query: { serverPartShopId: this.selectedServerPartShopId } });
        }, 200);
      },
      fetchData: function () {
        this.selectedServerPartId = this.$route.params.id;
      }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1,
  h2 {
    font-weight: normal;
  }
  
  ul {
    list-style-type: none;
    padding: 0;
  }
  
  li {
    display: inline-block;
    margin: 0 10px;
  }
  
  a {
    color: #42b983;
  }
</style>