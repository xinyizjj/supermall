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


</style>
