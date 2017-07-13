<template>
  <div id='tmpl'>
      <h4>{{info.title}}</h4>
      <p class="line"></p>
      <div class="content" v-html="info.content"></div>
  </div>
</template>
<script>
import common from '../../kits/common.js';
import { Toast } from 'mint-ui';
export default {
  data () {
    return {
        id:0,
        info:{}
    }
  },
  created(){
      this.id = this.$route.params.id;
      this.getdesc();
  },
  methods:{
      getdesc(){
          var url = common.apidomain + '/api/goods/getdesc/' + this.id;
          this.$http.get(url).then(function(res){
              var data = res.body;
              if (data.status != 0) {
                  Toast(data.message);
                  return;
              }
              this.info = data.message[0];
          })
      }
  }
}
</script>
<style lang="css" scoped>
h4 {
    color: #0094ff;
    padding: 10px 3px;
}
.line {
    width: 98%;
    height: 2px;
    margin: 0 auto;
    border-top: 1px solid #eee;
}
</style>