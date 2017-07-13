<template>
  <div id='tmpl'>
      <ul class="mui-table-view">
				<li class="mui-table-view-cell mui-media" v-for="(item,index) in list" :key='index'>
					<router-link v-bind="{to:'/news/newsinfo/'+ item.id}">
						<img class="mui-media-object mui-pull-left" :src="item.img_url">
						<div class="mui-media-body">
							{{item.title}}
							<p class="mui-ellipsis" v-text="item.zhaiyao"></p>
                            <div class="ft">
                                <span>发表时间:{{item.add_time | datefmt('YYYY-MM-DD HH:mm:ss')}}</span>
                                <span class="click">{{item.click}}</span>
                            </div>
						</div>
					</router-link>
				</li>
			</ul>
  </div>
</template>
<script>
import common from '../../kits/common.js';
//按需引入tip提示信息
import { Toast } from 'mint-ui';
export default {
  data () {
    return {
        list:[]
    }
  },
  created(){
      this.getlist();
  },
  methods:{
      getlist(){
          var url = common.apidomain + '/api/getnewslist';
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
<style lang="css" scoped>
      .mui-table-view img{
        height:80px;
        width:80px;
    }

    .mui-table-view .mui-media-object{
        max-width: 80px;
        line-height: 80px;
    }

    .ft{
        margin-top: 1.5em;
        font-size: 14px;
        color:#0094ff;
    }

    .ft .click{
        margin-left: 20px;
    }
</style>