<template>
    <div id='tmpl'>
        <div id="slider">
            <slide :url='url'></slide>
        </div>
        <div id="desc">
            <h4 v-text="info.title"></h4>
            <p class="line"></p>
            <ul>
                <li>
                    市场价:
                    <s>${{info.market_price}}</s>&nbsp;&nbsp;&nbsp;销售价:
                    <span class="price">${{info.sell_price}}</span>
                </li>
                <li>
                    购买数量:&nbsp;&nbsp;&nbsp;
                    <inputNumber v-on:dataObj="getNumber" class="inputNumber"></inputNumber>
                    <transition name="show" @before-enter='beforeEnter' @enter='Enter' @after-enter= 'afterEnter' >
                        <div class="ball" v-if="isshow"></div>
                    </transition>
                </li>
                <li>
                    <mt-button type="primary" size="small">立刻购买</mt-button>
                    <mt-button type="danger" size="small" @click="toshopcar">加入购物车</mt-button>
                </li>
            </ul>
        </div>
        <div id="params">
            <h5>产品参数</h5>
            <p class="line"></p>
            <ul>
                <li>商品货号:{{info.goods_no}}</li>
                <li>库存情况:{{info.stock_quantity}}</li>
                <li>上架时间:{{info.add_time | datefmt('YYYY-MM-DD')}}</li>
            </ul>
            <router-link v-bind="{to:'/goods/goodsdesc/'+ id}">
                <mt-button class="bottomBtn" type="primary" size="large">图片详情参数</mt-button>
            </router-link>
            <router-link v-bind="{to:'/goods/goodscomment/'+id}">
                <mt-button class="bottomBtn" type="danger" size="large">商品评论</mt-button>
            </router-link>
        </div>
    </div>
</template>
<script>
import slide from '../subcom/slide.vue';
import common from '../../kits/common.js';
import inputNumber from '../subcom/inputNumber.vue';
import { vm, COUNTSTR } from '../../kits/vm.js';
import { setItem, valueObj } from '../../kits/localSG.js';
export default {
    components: {
        slide, inputNumber
    },
    data() {
        return {
            isshow:false,
            id: 0,
            url: 0,
            info: {},
            inputNumberCount: 1//购物车里面的数量
        }
    },
    created() {
        this.id = this.$route.params.id;
        this.url = common.apidomain + "/api/getthumimages/" + this.id;
        this.getinfo();
        //console.log(this.info);
    },
    methods: {
        beforeEnter(el){
            el.style.transform = "translate(0px,0px)"
        },
        Enter(el,done){
            el.offsetWidth;
            el.style.transform = "translate(95px,345px)"
            done();
        },
        afterEnter(){
                this.isshow = !this.isshow;
        },
        getinfo() {
            var url = common.apidomain + '/api/goods/getinfo/' + this.id;
            this.$http.get(url).then(function (res) {
                var data = res.body;
                if (data.status != 0) {
                    Toast(data.message);
                    return;
                }
                this.info = data.message[0];
            })
        },
        //接收从子组件传过来的count数值
        getNumber(count) {
            this.inputNumberCount = count;
            //console.log(count);
        },
        //加入购物车的方法
        toshopcar() {
            this.isshow = !this.isshow;
            vm.$emit(COUNTSTR, this.inputNumberCount);//获取数值,传递给下方的购物车徽章=
            valueObj.goodsid = this.id;
            valueObj.count = this.inputNumberCount;
            //将数据存储到本地localstroge,
            setItem(valueObj);
        }
    }
}
</script>
<style lang="css" scoped>
.ball {
    width: 20px;
    height: 20px;
    position: absolute;
    left: 170px;
    bottom: 210px;
    background-color: red;
    border-radius: 50%;
    transition: all 0.5s ease;
    z-index: 100;

}
#slider {
    height: 350px;
    width: 95%;
    border: 1px solid #eee;
    border-radius: 5px;
    margin: 0 auto;
}

#desc h4 {
    color: #0094ff;
    padding: 5px;
}

#desc ul {
    padding: 0;
}

#desc li {
    padding-left: 10px;
    list-style: none;
    height: 35px;
    line-height: 35px;
}

#desc .price {
    color: red;
}

#desc {
    width: 95%;
    border: 1px solid #eee;
    border-radius: 5px;
    margin: 10px auto 10px;
    margin-bottom: 10px;
    color: rgba(0, 0, 0, 0.5);
}

.line {
    width: 100%;
    height: 1px;
    border-top: 2px solid #eee;
}

#params {
    width: 95%;
    margin: 0 auto;
    color: rgba(0, 0, 0, .6);
    border: 1px solid #eee;
    border-radius: 5px;
}

#params ul {
    padding: 0;
}

#params li {
    list-style: none;
    padding-left: 10px;
}

#params .bottomBtn {
    margin-bottom: 10px;
}
</style>