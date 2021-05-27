<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control :titles="['流行','新款','精选']"
                 @tabClick="tabClick"
                 ref="tabControl1"
                 class="tab-control" v-show="isTabFixed"/>
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
      <recommend-view :recommends="recommends"/>
      <feature-view/>
      <tab-control :titles="['流行','新款','精选']"
                   @tabClick="tabClick"
                   ref="tabControl2"/>
      <good-list :goods="showGoods"/>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
    import HomeSwiper from "./childComps/HomeSwiper";
    import RecommendView from "./childComps/RecommendView";
    import FeatureView from "./childComps/FeatureView";

    import NavBar from "../../common/navbar/NavBar";
    import Scroll from "../../components/common/scroll/Scroll"
    import TabControl from "../../components/content/tabControl/TabControl";
    import GoodList from "../../components/content/goods/GoodsList";
    import BackTop from "../../components/content/backTop/BackTop";

    import {getHomeMultidata, getHomeGoods} from "../../network/home";

    export default {
        name: "home",
        components: {
            HomeSwiper,
            RecommendView,
            FeatureView,
            NavBar,
            TabControl,
            getHomeGoods,
            GoodList,
            Scroll,
            BackTop
        },
        data() {
            return {
                banners: [],
                recommends: [],
                goods: {
                    'pop': {page: 0, list: [],},
                    'new': {page: 0, list: [],},
                    'sell': {page: 0, list: [],},
                },
                currentType: 'pop',
                isShowBackTop: true,
                tabOffsetTop: 0,
                isTabFixed: false,
            }
        },
        computed: {
            showGoods() {
                return this.goods[this.currentType].list
            }
        },
        destroyed(){
            console.log("home destroyed")
        },
        created() {
            //1.请求多个数据
            this.getHomeMultidata()
            //2.请求商品数据
            this.getHomeGoods('pop')
            this.getHomeGoods('new')
            this.getHomeGoods('sell')
        },
        methods: {
            //事件监听相关的方法
            tabClick(index) {
                switch (index) {
                    case 0:
                        this.currentType = 'pop'
                        break;
                    case 1:
                        this.currentType = 'new'
                        break;
                    case 2:
                        this.currentType = 'sell'
                        break;
                }
                this.$refs.tabControl1.currentIndex = index
                this.$refs.tabControl2.currentIndex = index
            },
            backClick() {
                this.$refs.scroll.scrollTo(0, 0, 500)
            },
            contentScroll(position) {
                //1.判断BackTop是否显示
                this.isShowBackTop = Math.abs(position.y) > 1000
                //2.决定tabControl是否吸顶（position:fixed）
                this.isTabFixed = Math.abs(position.y) > this.tabOffsetTop
            },
            loadMore() {
                this.getHomeGoods(this.currentType)
                this.$refs.scroll.scroll.refresh()
            },
            swiperImageLoad() {
                //1.获取tabControl的OffsetTop
                //所有的组件都有一个属性$el：用于获取组建中的元素
                this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
            },
            //网络请求相关的方法
            getHomeMultidata() {
                getHomeMultidata().then(res => {
                    // console.log(res)
                    this.banners = res.data.data.banner.list
                    // console.log(this.banners)
                    this.recommends = res.data.data.recommend.list
                    // console.log(this.recommends)
                })
            },
            getHomeGoods(type) {
                const page = this.goods[type].page + 1
                getHomeGoods(type, page).then(res => {
                    this.goods[type].list.push(...res.data.data.list)
                    this.goods[type].page += 1
                    this.$refs.scroll.finishPullUp()
                })
            }
        },
        mounted() {
            // this.scroll = new BScroll('.wrapper', {
            //     //probeType侦测：
            //     //0和1:不获取实时的位置
            //     //2：手指滚动过程中侦测，手指离开后的惯性移动不侦测
            //     //3：都侦测
            //     probeType:3,
            //     click:true,
            //     pullUpLoad:true
            // })
            // this.scroll.on('scroll',(postion) => {
            //     console.log(postion)
            // })
            // this.scroll.on('pullingUp',() => {
            //     console.log('上拉加载更多')
            //     //发送网络请求，请求更多页的数据
            //
            //     //等数据请求完毕，并且将新的数据展示出来之后
            //     setTimeout(() => {
            //         this.scroll.finishPullUp()
            //     },2000)
            // })
        }
    }
</script>

<style scoped>
  .content {
    /*margin-top: 44px;*/
    height: calc(100% - 93px);
    overflow: hidden;
  }

  #home {
    height: 100vh;
    position: relative;
    /*padding-top: 44px;*/
  }

  .home-nav {
    background-color: var(--color-text);
    color: #fff;
  }

  .tab-control{
    position: relative;
    z-index: 9;
  }
</style>
