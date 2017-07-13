<template>
  <div id='tmpl'>
      <div id="mui-content" style="background-color:#fff">
		    <ul class="mui-table-view mui-grid-view">
		        <li v-for="(item,index) in list" :key="index" class="mui-table-view-cell mui-media mui-col-xs-6">
		            <router-link v-bind="{to:'/goods/goodsinfo/'+ item.id}">
		                <img class="mui-media-object" :src="item.img_url">
		                <div class="mui-media-body" v-text="item.title"></div>
                        <div class="desc">
                            <p>
                                <span>￥{{item.sell_price}}</span>
                                <s>￥{{item.market_price}}</s>
                            </p>
                            <p>
                                <h6 class="left">热卖中</h6>
                                <h6 class="right">剩余:{{item.stock_quantity}}</h6>
                            </p>
                        </div>
		            </router-link>
                 </li>
                   <mt-button type="danger" plain size="large" @click="getmore">加载更多...</mt-button>
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
        list:[],
        pageindex:1
    }
  },
  created(){
      this.getgoods(this.pageindex);
  },
  methods:{
      getgoods(pageindex){
          pageindex = pageindex || 1;
          var url = common.apidomain + '/api/getgoods?pageindex=' + pageindex;
          this.$http.get(url).then(function(res){
              var data = res.body;
              if (data.status != 0) {
                  Toast(data.message);
                  return;
              }
              this.list = this.list.concat(data.message);
          })
      },
      getmore(){
          this.pageindex++;
          this.getgoods(this.pageindex);
      }
  }
}
</script>
<style lang="css" scoped>
#mui-content li{
	border: 1px solid rgba(0,0,0,0.4);
	-webkit-box-shadow: 0 0 4px #000;
	-moz-box-shadow: 0 0 4px #000 ;
	box-shadow: 0 0 4px #000 ;
	margin-left: 4px;
	padding-left: 0px;
}

#mui-content .mui-media-body{
		color: #0094ff;
}
#mui-content span {
    color: red
}

#mui-content .desc{
	height: 60px;
	background-color: rgba(0,0,0,0.1);
	margin-top: 10px;
	padding: 5px;
	text-align: left;
}
#mui-content .desc span{
	color: red;
	margin-right: 15px;
}
#mui-content a{
	padding-left: 0px;
	margin-left: 0px;
}

#mui-content .desc .right{
	position: absolute;
	right: 10px;
	bottom: 0px;
}

#mui-content .desc .left{
	position: absolute;
	left: 10px;
	bottom: 0px;
}
</style>