<template>
  <div id='tmplOne'>
      <div class="inleft" @click="substrict">-</div>
      <div class="incenter" v-text="count"></div>
      <div class="inright" @click="add">+</div>
  </div>
</template>
<script>
export default {
  data () {
    return {//购买商品的数量
        count:1
    }
  },
  methods:{
      substrict(){
          this.count--;
          if (this.count<1) {
              this.count = 1;
          }
          this.sendData();
      },
      add(){
          this.count++;
          this.sendData();
      },
      sendData(){
          this.$emit('dataObj',this.count)
      }
  }
}
</script>
<style lang="css" scoped>
#tmplOne  {
    display: inline-block;
}
#tmplOne div {
    	width: 45px;
		height: 100%;
		line-height: 25px;
		border: 1px solid #000;
        border-radius: 3px;
		display: inline-block;
        text-align: center;
}
</style>