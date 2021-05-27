<template>
  <div id="detail">
    <nav-bar>
      <div slot="left" class="back" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="title">
        <span v-for="(item,index) in titles"
              :class="{active:index === currentIndex}"
              @click="titleClick(index)">
          {{item}}
        </span>
      </div>
    </nav-bar>
  </div>
</template>

<script>
    import NavBar from "../../../common/navbar/NavBar";
    export default {
        name: "DetailNavBar",
        components:{
            NavBar
        },
        data(){
            return {
                titles: ['商品','参数','评论','推荐'],
                currentIndex:0
            }
        },
        methods:{
            titleClick(index){
                this.currentIndex = index
                this.$emit('titleClick',index)
            },
            backClick(){
                this.$router.go(-1)
            }
        }
    }
</script>

<style scoped>
  .title{
    display: flex;
  }
  .title span{
    flex: 1;
    font-size: 14px;
  }
  .active{
    color: var(--color-text);
  }
  .back img{
    margin-top: 10px;
  }
</style>
