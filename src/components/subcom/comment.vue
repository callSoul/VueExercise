<template>
  <div id='tmpl'>
      <!--提交数据到服务器-->
      <div class="title">
          <h3>提交评论</h3>
          <p class="p"></p>
          <textarea placeholder="请输入要评论的内容......" v-model="postcontent"></textarea>
          <mt-button type="primary" size="large" @click='postcomment'>发表</mt-button>
      </div>

      <!--评论数据的获取-->
      <div id="postcomment">
           <h3>评论列表</h3>
            <p class="p"></p>
            <div v-for="(item,index) in list" :key="index">
                <div class="title">
                    <span>第{{index+1}}楼</span>
                    <span>用户:{{item.user_name}}</span>
                    <span>发表时间:{{item.add_time | datefmt('YYYY-MM-DD HH:mm:ss')}}</span>
                </div>
                  <ul class="mui-table-view">
                    <li class="mui-table-view-cell" v-text="item.content"></li>
                </ul>
            </div>
      </div>
      <mt-button type="danger" plain size="large" @click="getmore">加载更多...</mt-button>
  </div>
</template>
<script>
import { Toast } from 'mint-ui';
import common from '../../kits/common.js';
export default {
    props:['id'],
  data () {
    return {
        postcontent:'',//提交的评论内容
        list:[],//评论信息列表
        pageindex:1//第几页的评论数据
    };
  },
  created(){
    this.getcommentlist(this.pageindex);
  },
  methods:{
      //获取评论的数据
      getcommentlist(pageindex){
        //设置没有传参的默认值
         pageindex =  pageindex || 1;
        var url = common.apidomain + '/api/getcomments/' + this.id + '?pageindex=' + pageindex;
        this.$http.get(url).then(function(res){
            var data = res.body;
            if (data.status != 0) {
                Toast(data.message);
                return;
            }
            this.list = this.list.concat(data.message);//随时刷新评论提交的数据,实现数据的动态更新
            //this.list = [].push.apply(this.list,data.message)
        })
      },
      postcomment(){
          if (this.postcontent.trim().length <= 0){
              Toast('评论的内容不能为空');
              return;
          }
          var url = common.apidomain + '/api/postcomment/' + this.id;
          //将文本域中的内容提交到服务器中
          this.$http.post(url,{content:this.postcontent},{emulateJSON:true}).then(function(res){
                Toast(res.body.message);
                this.list = [{
                    user_name:'匿名用户',
                    sdd_time:new Date(),
                    content:this.postcontent
                }].concat(this.list);
                //清空评论文本域的内容
                this.postcontent = "";
          })

      },
        getmore(){
        this.pageindex++;
        //获取当前更多的评论信息
        this.getcommentlist(this.pageindex);
      }
  }
}
</script>
<style lang="css" scoped>
      #postcomment {
        padding: 5px;
    }

    .p {
        height: 1px;
        width: 100%;
        border-bottom: 1px solid rgba(0, 0, 0, 0.3);
    }

    /*2.0 评论列表的样式*/
    #list {
        padding: 5px;
    }

    .title {
        padding: 5px;
        color: #6d6d72;
        font-size: 15px;
        background-color: rgba(0, 0, 0, 0.1);
    }
</style>