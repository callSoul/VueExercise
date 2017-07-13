<template>
  <div id='tmpl'>
      <div id="cate">
          <ul v-bind="{style:'width:'+ ulWidth + 'px'}">
                <li @click="getimgs(0)">全部</li>
                <li v-for="(item,index) in cates" :key="index" @click="getimgs(item.id)">{{item.title}}</li>
          </ul>
      </div>
      <div id="imglist">
          <ul>
              <li v-for="(item,index) in list" :key="index">
                 <router-link v-bind="{to:'/photo/photoinfo/'+item.id}">
                    <img v-lazy="item.img_url">
                   <div id="desc">
                    <h4 v-text="item.title"></h4>
                    <p v-text="item.zhaiyao"></p>
                   </div>
                 </router-link>
              </li>
          </ul>
      </div>
  </div>
</template>
<script>
import common from '../../kits/common.js';
import { Toast } from 'mint-ui';
export default {
  data () {
    return {
        cates:[],
        ulWidth:320,
        list:[]
    }
  },
  created(){
      var all = 0;//默认获取全部图片
      this.getimgs(all);
      this.getcates();
  },
  methods:{
      getcates(){
          var url = common.apidomain + '/api/getimgcategory';
          this.$http.get(url).then(function(res){
              var data = res.body;
              if (data.status != 0) {
                  Toast(data.message);
                  return;
              }
              this.cates = data.message;
              //动态生成ul的宽度
              var num = data.message.length +2;
              console.log(data.message.length);
              var width = 62;
              this.ulWidth = num * width ;

          })
      },
      getimgs(cateid){
          //接受上面传入的item.id = cateid
        var url = common.apidomain + '/api/getimages/' + cateid;
            this.$http.get(url).then(function(res){
                 var data = res.body;
              if (data.status != 0) {
                  Toast(data.message);
                  return;
              }
              this.list = data.message;
            })
      }
  }
}
</script>
<style scoped>
    #cate {
        width: 375px;
        max-width: 375px;
        overflow-x: auto;

    }
    #cate ul {
        margin: 0;
        padding-left: 10px;
    }
    #cate li {
        list-style: none;
        color: #0094ff;
        font-size: 14px;
        display: inline-block;
        padding-left: 10px;
        cursor: pointer;
    }
      #imglist ul {
        padding-left:0px;
    }
    #imglist li {
        list-style: none;
        position: relative;
    }
    #imglist img {
        width: 100%;
        height: 300px;
    }
    #desc {
        width: 100%;
        background-color: rgba(0,0,0,.2);
        position: absolute;
        bottom: 5px;
        left: 0px;
    }
    #desc h4 {
        color: #ffffff;
        font-weight: 700;
    }
    #desc p {
        color: #ffffff;
    }
    /*懒加载样式*/
    image[lazy=loading] {
        width: 40px;
        height: 300px;
        margin: auto;
    }
</style>