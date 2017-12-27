<template>
  <div class="serverPart">
    <Group title="服务区列表">
      <template v-for="item in serverPartList">
        <cell :title="item.SERVERPART_CODE + ' - ' + item.SERVERPART_NAME" @click.native="selectServerPart(item)">
          <icon v-if="selectedServerPartId == item.SERVERPART_ID" type="success-no-circle" style="font-size: 20px;"></icon>
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
        serverPartList: [],
        selectedServerPartId: '',
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.getTotalServerPart();
      })
    },
    computed: {
      //
    },
    created () {
      this.fetchData();
    },
    watch: {
      // 如果路由有变化，会再次执行该方法
      '$route': 'fetchData'
    },
    methods: {
      getTotalServerPart: function () {
        let param = {
          action_type: 'getTotalServerPart'
        };
        Axios.get(param).then(res => {
          this.serverPartList = res.data.SERVERPARTObject;
        })
        console.log(this.$route);
      },
      selectServerPart: function (item) {
        this.selectedServerPartId = item.SERVERPART_ID;
        setTimeout(() => {
          this.$router.push({ name: 'home', query: { serverPartId: this.selectedServerPartId}});
        },200);
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