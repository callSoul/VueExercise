<template>
  <div id='tmpl'>
      <div id="desc">
          <div class="title">
              <h4 v-text="photoinfo.title"></h4>
              <p>
              {{photoinfo.add_time | datefmt('YYYY-MM-DD HH:mm:ss')}}&nbsp;{{photoinfo.click}}次浏览
              </p>
              <p class="line"></p>
          </div>
      </div>
      <!--还是使用之前九宫格的插件完成缩略图的效果-->
      <div class="mui-content">
		        <ul class="mui-table-view mui-grid-view mui-grid-9">
		            <li v-for="(item,index) in list" :key="index" class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                        <img :src="item.src" class="preview-img" @click="$preview.open(index, list)">
		            </li> 
		        </ul> 
		</div>
        <!--底部介绍部分-->
        <div id="introduce">
            <p v-html="photoinfo.content"></p>
         </div>
        <!--直接使用评论组件-->
        <comment :id='id'></comment>

  </div>
</template>
<script>
import comment from '../subcom/comment.vue';
import { Toast } from 'mint-ui';
import common from '../../kits/common.js';
export default {
    components:{
        comment
    },
  data () {
    return {
        id:0,
        photoinfo:{},
        list:[
              //图片预览插件需要返回的数据满足一下格式才可以生效,但是,从后台返回的数据为如下所示
//                    "message": [
//                {
//                    "img": "http://182.254.146.100:8080/upload/201504/18/thumb_201504181347324908.jpg",
//                    "src": "http://182.254.146.100:8080/upload/201504/18/thumb_201504181347324908.jpg",
//                    "url": "#"
//                },
//                {
//                    "img": "http://182.254.146.100:8080/upload/201504/18/thumb_201504181347330156.jpg",
//                    "src": "http://182.254.146.100:8080/upload/201504/18/thumb_201504181347330156.jpg",
//                    "url": "#"
//                }
//            ]
                        //满足插件使用要求的数据结构,因此要对返回的数据结构进行处理才能达到效果
//                    {
//                        src: 'https://placekitten.com/600/400',
//                        w: 600,
//                        h: 400
//                    }, {
//                        src: 'https://placekitten.com/1200/900',
//                        w: 1200,
//                        h: 900
//                    }
        ]
    }
  },
  created(){
      //获取url中的id参数,给下文发送请求中的参数调用
      this.id = this.$route.params.id;
      this.getimginfo();
      this.getimgs();
  },
  methods:{
      getimginfo(){
        var url = common.apidomain + '/api/getimageInfo/' + this.id;
        this.$http.get(url).then(function(res){
            var data = res.body;
            if (data.status != 0) {
                Toast(data.message);
                return;
            }
            this.photoinfo = data.message[0];
        })
      },
      getimgs(){
        var url = common.apidomain + '/api/getthumimages/' + this.id;
        this.$http.get(url).then(function(res){
            var data = res.body;
            if (data.status != 0) {
                Toast(data.message);
                return;
            }
          //对返回的数据进行处理,使其大小与实际大小保持一致,而不是是数据
          //同时为了满足插件数据的使用要求,给其添加h,w两个属性,分别代表图片的高度跟宽度
          data.message.forEach(function(item){
            var img = document.createElement('img');
            img.src = item.src;
            item.h = img.height;
            item.w = img.width;
          })
          this.list = data.message;
        })
      }
  }
}
</script>
<style lang="css" scoped>
   /*图片详情样式*/
    #desc {
        padding: 10px;
    }
    #desc h4 {
      color: #0094ff;
        font-size: 16px;
    }
    #desc .title p {
        color: rgba(0,0,0,.5);
        margin-top: 10px;
    }
    #desc .title .line {
        width: 100%;
        height: 1px;
        border-bottom: 1px solid rgba(0,0,0,.3);
    }
    #introduce p {
        color: rgba(0,0,0,.7);
        font-size: 14px;
        line-height: 20px;
        padding: 0px 5px;
    }
    .mui-content,.mui-content ul{
        background-color: #fff;
    }
    .mui-grid-view.mui-grid-9 .mui-table-view-cell{
        border-right:0px;
        border-bottom:0px;
    }
    .mui-grid-view.mui-grid-9{
        border-top:0px;
        border-left:0px;
    }
    /*九宫格图片的样式*/
    .mui-content img {
        width: 100px;
        height: 100px;
    }
</style>