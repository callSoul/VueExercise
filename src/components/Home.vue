<template>
	<div id="tmpl">
		<!-- 1.0 轮播图：mint-ui中的 swipe组件实现 -->
		<slide :url='url'></slide>
		<!-- 2.0 利用MUI的9宫格样式实现导航区域 -->
		<div class="mui-content">
			<ul class="mui-table-view mui-grid-view mui-grid-9">
				<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
					<router-link to="/news/newslist">
						<span class="mui-icon mui-icon-home"></span>
						<div class="mui-media-body">新闻资讯</div>
					</router-link>
				</li>

				<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
					<router-link to="/photo/photolist">
						<span class="mui-icon mui-icon-email">

						</span>
						<div class="mui-media-body">图片分享</div>
					</router-link>
				</li>
				<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
					<router-link to="/goods/goodslist">
						<span class="mui-icon mui-icon-chatbubble"></span>
						<div class="mui-media-body">商品购买</div>
					</router-link>

				</li>
				<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
					<router-link to="/feedback">
						<span class="mui-icon mui-icon-location"></span>
						<div class="mui-media-body">留言反馈</div>
					</router-link>

				</li>
				<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
					<router-link to="/vide">
						<span class="mui-icon mui-icon-search"></span>
						<div class="mui-media-body">视频专区</div>
					</router-link>

				</li>
				<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
					<router-link to="/callme">
						<span class="mui-icon mui-icon-phone"></span>
						<div class="mui-media-body">联系我们</div>
					</router-link>
				</li>

			</ul>
		</div>

	</div>
</template>

<script>
//导入需要使用的模块,mint-ui中的tip信息弹出,全局的域名
import { Toast } from 'mint-ui';
import common from '../kits/common.js';
import slide from './subcom/slide.vue';
export default {
	components: {
		slide
	},
	created(){
		this.getlunbo();
	},
// 	Vue.http.jsonp(url,{params: {pageID:29},jsonp:"_callback"})
// 1
//     这里params是要发送的数据对象，jsonp是设置回调的名称，也就是上面的callback名称；（不设置默认为callback），现在我们就需要后台协助一下，获取我们发送过去的"_callpack"的值，将这个值拼接到返回的json数据上，这时候就可以了！
// 	methods:{
	//'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg?g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&_=1499415912147'<keep-alive></keep-alive>
	methods:{
			getlunbo(){
			var url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg';
			this.$http.get(url).then(function(res){
				console.log(res.body)
			})
		}
	},
	data() {
		return {
			url: common.apidomain + '/api/getlunbo',
		}
	}

}
</script>

<style scoped>
.mui-content,
.mui-content ul {
	background-color: #fff;
}

.mui-grid-view.mui-grid-9 .mui-table-view-cell {
	border-right: 0px;
	border-bottom: 0px;
}

.mui-grid-view.mui-grid-9 {
	border-top: 0px;
	border-left: 0px;
}

.mui-icon-home:before,
.mui-icon-email:before,
.mui-icon-chatbubble:before,
.mui-icon-location:before,
.mui-icon-search:before,
.mui-icon-phone:before {
	content: '';
	display: inline-block;
	width: 50px;
	height: 50px;
	background-repeat: round;
}

.mui-icon-home:before {
	background-image: url(../../statics/imgs/1.png);
}

.mui-icon-email:before {
	background-image: url(../../statics/imgs/2.png);
}

.mui-icon-chatbubble:before {
	background-image: url(../../statics/imgs/3.png);
}

.mui-icon-location:before {
	background-image: url(../../statics/imgs/4.png);
}

.mui-icon-search:before {
	background-image: url(../../statics/imgs/5.png);
}

.mui-icon-phone:before {
	background-image: url(../../statics/imgs/6.png);
}
</style>
