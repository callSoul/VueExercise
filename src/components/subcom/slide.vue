<template>
  <div id='tmpl'>
       <mt-swipe :auto="2000">
		   <mt-swipe-item v-for="(item,index) in list" :key='index'>
		   	<img :src="item.img">
		   </mt-swipe-item>
		</mt-swipe>
  </div>
</template>
<script>
import { Toast } from 'mint-ui';
export default {
    props:["url"],
    data(){
        return{
            list:[]
        }
    },
    created(){
        this.getimgs();
        console.log("请求数据成功");
    },
    methods:{
        getimgs(){
        this.$http.get(this.url).then(function(res){
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
	.mint-swipe{
		height: 300px;
	}
	.mint-swipe-item img{
		width: 100%;
        height: 300px;   
	}
	.mint-swipe-item{
		width: 100%;
		height: 300px;
	}
</style>