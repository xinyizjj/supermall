<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
    import BScroll from "@better-scroll/core"
    import PullUp from "@better-scroll/pull-up"

    BScroll.use(PullUp)
    export default {
        name: "Scroll",
        props: {
            probeType: {
                type: Number,
                default: 0
            },
            pullUpLoad: {
                type: Boolean,
                default: true
            }
        },
        data() {
            return {
                scroll: null
            }
        },
        mounted() {
            //1.创建BScroll对象
            this.scroll = new BScroll(this.$refs.wrapper, {
                click: true,
                observerImage: true,
                probeType: this.probeType,
                pullUpLoad: this.pullUpLoad
            })

            //2.监听滚动的位置
            if (this.probeType === 2 || this.probeType === 3) {
                this.scroll.on('scroll', (position) => {
                    this.$emit('scroll', position)
                })
            }

            //3.监听上拉事件
            if (this.pullUpLoad) {
                this.scroll.on('pullingUp', () => {
                    this.$emit('pullingUp')
                })
            }
        },
        methods: {
            scrollTo(x, y, time = 300) {
                this.scroll && this.scroll.scrollTo(x, y, time)
            },
            finishPullUp() {
                this.scroll && this.scroll.finishPullUp()
            }
        }
    }
</script>

<style scoped>

</style>
