<template>
  <div id='tmpl'>
    <div class="title">
        <h4 v-text="info.title"></h4>
        <p>{{info.add_time | datefmt('YYYY-MM-DD HH:mm:ss')}}&nbsp;&nbsp;&nbsp;{{info.click}}次浏览</p>
    </div>
    <div class="cotent" v-html="info.content"></div>
      <!--评论组件-->
      <comment :id='id'></comment>
  </div>
</template>
<script>
import common from '../../kits/common.js';
import comment from '../subcom/comment.vue';
import { Toast } from 'mint-ui';
export default {
    //注册需要使用的组件comment.vue
    components:{
        comment
    },
  data () {
    return {
        id:0,
        //是一个对象,无需遍历的数据
        info:{}
    }
  },
    created () {
         //获取url中的参数id值
         this.id = this.$route.params.id;
         this.getinfo();
    },
    methods: {
        getinfo(){
            var url = common.apidomain + '/api/getnew/' + this.id;
            this.$http.get(url).then(function(res){
                var data = res.body;
                if (data.status != 0) {
                    Toast(data.message);
                    return;
                }
                this.info = data.message[0]
            })
        }
    }
}
</script>
<style lang="css" scoped>
   .title h4{
        color: #0094ff;
    }
    .title p{
        color:rgba(0,0,0,0.5);
    }

    .title,#content{
        padding: 5px;
    }
</style>