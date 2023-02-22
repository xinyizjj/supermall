<template>
  <div id="detail-vue">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"/>
    <scroll class="content" ref="scroll"
            @scroll="contentScroll"
            :probe-type='3'>
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @detailImageLoad="detailImageLoad"></detail-goods-info>
      <detail-param-info :param-info="paramInfo" ref="params"></detail-param-info>
      <detail-comment-info :comment-info="commentInfo" ref="comment"></detail-comment-info>
      <goods-list :goods="recommends" ref="recommend"></goods-list>
      <ul>
        <li>1</li>
        <li>2</li>
      </ul>
    </scroll>
    <detail-bottom-bar></detail-bottom-bar>
  </div>
</template>

<script>
    import DetailNavBar from "./childComps/DetailNavBar"
    import DetailSwiper from "./childComps/DetailSwiper"
    import DetailBaseInfo from "./childComps/DetailBaseInfo"
    import DetailShopInfo from "./childComps/DetailShopInfo"
    import DetailGoodsInfo from "./childComps/DetailGoodsInfo"
    import DetailParamInfo from "./childComps/DetailParamInfo";
    import DetailCommentInfo from "./childComps/DetailCommentInfo";
    import DetailBottomBar from "./childComps/DetailBottomBar";

    import Scroll from "../../components/common/scroll/Scroll";
    import GoodsList from "../../components/content/goods/GoodsList";

    import {getDetail, Goods, Shop, GoodsParam, getRecommend} from "../../network/detail"

    export default {
        name: "Detail",
        components: {
            DetailNavBar,
            DetailSwiper,
            DetailBaseInfo,
            DetailShopInfo,
            DetailGoodsInfo,
            DetailParamInfo,
            DetailCommentInfo,
            DetailBottomBar,
            Scroll,
            GoodsList
        },
        data() {
            return {
                iid: null,
                topImages: [],
                goods: {},
                shop: {},
                detailInfo: {},
                paramInfo: {},
                commentInfo: {},
                recommends: [],
                themeTopYs: [],
                getThemeTopY: null,
                currentIndex:0,
            }
        },
        created() {
            //1.保存传入的iid
            this.iid = this.$route.params.iid
            //2.根据iid请求商品详情数据
            getDetail(this.iid).then(res => {
                //1.获取顶部轮播图片数据
                const data = res.data.result
                this.topImages = data.itemInfo.topImages

                //2.获取商品信息
                this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

                //3.创建店铺信息对象
                this.shop = new Shop(data.shopInfo)

                //4.保存商品的详情数据
                this.detailInfo = data.detailInfo;

                //5.获取参数信息
                this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

                //6.取出参数的信息
                this.itemParams = data.itemParams

                //7.取出评论的信息
                if (data.rate.cRate !== 0) {
                    this.commentInfo = data.rate.list[0]
                }

                this.$nextTick(() => {
                    this.themeTopYs = []
                    this.themeTopYs.push(0);
                    this.themeTopYs.push(this.$refs.params.$el.offsetTop - 44);
                    this.themeTopYs.push(this.$refs.comment.$el.offsetTop - 44);
                    this.themeTopYs.push(this.$refs.recommend.$el.offsetTop - 44);
                    console.log(this.themeTopYs)
                })
            })
            //3.请求推荐数据
            getRecommend().then(res => {
                this.recommends = res.data.data.list
            })
        },
        mounted() {

        },
        updated() {

        },
        methods: {
            detailImageLoad() {
                // this.$refs.scroll.refresh()
            },
            titleClick(index) {
                this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 100)
            },
            contentScroll(position) {
                //1.获取y值
                const positionY = -position.y
                //2.positionY和主题中的值进行对比
                //[0, 3210, 4055, 4380]
                //positionY在      0 - 3210 ， index 为 0
                //positionY在   3210 - 4055 ， index 为 1
                //positionY在   4055 - 4380 ， index 为 2
                //positionY大于        4380 ， index 为 3
                let length = this.themeTopYs.length
                for (let i = 0; i < length; i++) {
                    if (this.currentIndex !== i && ((i < length -1 &&
                        this.themeTopYs[i] <= positionY && positionY < this.themeTopYs[i+1])
                        || (i === length -1 && positionY >= this.themeTopYs[i]))) {
                        this.$refs.nav.currentIndex = i
                    }
                }
            }
        }
    }
</script>

<style scoped>
  #detail-vue {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }

  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

  .content {
    height: calc(100% - 44px);
  }
</style>
