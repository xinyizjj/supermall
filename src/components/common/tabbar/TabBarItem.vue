<template>
<div class="tab-bar-item" @click="itemClick">
  <div v-if="!isActive">
    <slot name="item-icon"></slot>
  </div>
  <div v-else>
    <slot name="item-icon-active"></slot>
  </div>
  <div :style="activeStyle">
    <slot name="item-text"></slot>
  </div>

</div>
</template>

<script>
    export default {
        name: "TabBarItem",
        props:{
            path:String,
            activeColor:{
                type:String,
                default:'red'
            }
        },
        data(){
            return {
                // isActive:true
            }
        },
        computed:{
            isActive:function(){
                return this.$route.path.indexOf(this.path) !== -1
            },
            activeStyle:function(){
                return this.isActive? {color:this.activeColor} : {}
            }
        },
        methods:{
            itemClick(){
                this.$router.replace(this.path).catch(err => {console.log(err)})
            }
        }
    }
</script>

<style scoped>
  #tab-bar{
    display: flex;
    background-color:#f6f6f6;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    box-shadow: 0 -2px 1px rgba(100,100,100,0.15);
  }
  .tab-bar-item{
    flex: 1;
    text-align: center;
    height: 49px;
  }
  .tab-bar-item img{
    width: 24px;
    height: 24px;
  }

</style>
