<template>
	<div id="tmpl">
		<div class="row" v-for="(item,index) in datalist" :key="index">
			<mt-switch class="switch" v-model="value[index]"></mt-switch>
			<img :src="item.thumb_path" alt="商品图片" class="img">
			<div class="inforight">
				<h4 v-text="item.title"></h4>
				<div class="bottom">
					<ul>
						<li>￥{{item.sell_price}}</li>
						<li><carinputnumber :initCount='item.cou' :goodsid='item.id'  v-on:ardataobj='getInputNumber'></carinputnumber></li>
						<li><a href="javascript:void(0)" @click="delrow(item.id,index)"></a></li>
					</ul>
				</div>
			</div>
		</div>
		<div id="total">
			<div class="desc">
			<ul>
				<li>总计(不含运费)</li>
				<li>已勾选商品{{totalcount}}件,总价:￥{{totalAmount}}元</li>
			</ul>
			</div>
			<div id="button">
				<mt-button  type="danger" size="small">去结算</mt-button>
			</div>
		</div>
	</div>
</template>

<script>
import { getgoodsObject,updateData,removeItem } from '../../kits/localSG.js';
import common from '../../kits/common.js';
import { Toast } from 'mint-ui';
import carinputnumber from '../subcom/carinputNumber.vue';
	export default{
		components:{
			carinputnumber
		},
		data(){
			return {
				totalAmount:0,
				value:[],
				datalist:[]
			}
		},
		computed:{
			totalcount(){
				//找出开关打开的所有商品的总类别
				var trueArr = this.value.filter(function(item){
					return item;
				})
				var amount = 0;
				var totalcount = 0;
				this.value.forEach((item,index)=>{
					if (item) {
						var count = this.datalist[index].cou;
						var price = this.datalist[index].sell_price;
						var itemamount = count * price;
						amount+=itemamount;
						totalCount+=count;
					}
				});
				this.totalAmount = amount;
				//此处从慈宁宫注册过了
				return totalcounts;
			}
		},
		created(){
			this.getdatalist();
		},
		methods:{
			//s添加点击删除一行的功能
			delrow(goodsid,index){
				this.value.splice(index,1);
				this.datalist.splice(index,1);
				removeItem(goodsid);
			},
			//获取数量组件中返回的内容
			getInputNumber(resObj){
				updateData(resObj);
				for(var i=0;i<this.datalist.length;i++) {
					if (this.datalist[i].id == resObj.goodsid) {
						if (resObj.type == 'add') {
							this.datalist[i].cou = +this.datalist[i].cou + 1;
						}else {
							this.datalist[i].cou = +this.datalist[i].cou - 1;
						}
						break;
					}
				}
			},
			getdatalist(){
				//1.0从localstroge中获取所有上平的id和数量
				var obj = getgoodsObject();
				//将id值按照api的参数格式提交api
				var idString = '';
				for (var key in obj) {
					idString += key + ',';
				}
				idString = idString.substring(0,idString.length-1);
				var url = common.apidomain + '/api/goods/getshopcarlist/' + idString;
				this.$http.get(url).then(function(res){
					if (res.body.status != 0){
						Toast(res.body.message);
						return;
					}
					//从后台返回的数据格式如下所示
	/*  "message": [
        {
            "cou": 1,
            "id": 99,
            "title": "飞利浦（PHILIPS）DVP3690 全高清DVD影碟机播放器",
            "sell_price": 399,
            "thumb_path": "http://182.254.146.100:8080/upload/201504/20/thumb_201504200318534459.jpg"
        },
        {
            "cou": 1,
            "id": 101,
            "title": "Shinco/新科 S2300 无线麦克风 无线手持话筒 双手麦 KTV 舞台",
            "sell_price": 199,
            "thumb_path": "http://182.254.146.100:8080/upload/201504/20/thumb_201504200333240710.jpg"
        }
    ] */
					res.body.message.forEach((item)=>{
						item.cou = obj[item.id];
						//这个是初始化每一个开关的状态,默认全部为false
						this.value.push(false);
					});
					this.datalist = res.body.message;
				})
			}
		}

	}
</script>

<style scoped>
	.row{
		border-bottom: 1px solid rgba(0,0,0,0.3);
		height: 102px;
		display: flex;
	}

	.switch{
		flex:0 0 52px;
	}

	.img{
		margin-left: 5px;
		height: 75px;
		width: 75px;
		flex: 0 0 85px;
	}

	.inforight{
		margin-left: 5px;
		flex:1;
	}
	.inforight ul{
		padding-left: 0px;
	}
	.inforight li{
		list-style: none;
		display: inline-block;
	}

	.inforight h4{
		color: #0094ff;
		font-size: 14px;
	}

	.bottom li:first-child{
		color:red;
		margin-right: 10px;
	}

	.bottom li:last-child{
		margin-left: 10px;
	}

	#total{
		height: 100px;
		background-color: rgba(0,0,0,0.1);
		display: flex;
		padding: 5px;;
	}

	#total ul {
	 padding-left: 0px;
	}
	#total li{
		list-style: none;
		font-size: 14px;
	}

	#button{
		flex:0 0 60px;
		margin: 30px 0 0 0 ;
	}

	.desc{

		flex:1;
	}
</style>
