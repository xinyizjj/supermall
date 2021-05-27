<template>
  <div v-if="Object.keys(commentInfo).length !== 0" class="comment-info">
    <div class="info-header">
      <div class="header-title">用户评价</div>
      <div class="header-more">
        更多
        <i class="arrow-right"></i>
      </div>
    </div>
    <div class="info-user">
      <img :src="commentInfo.user.avatar" alt="">
      <span>{{commentInfo.user.uname}}</span>
    </div>
    <div class="info-detail">
      <p>{{commentInfo.content}}</p>
      <div class="info-other">
        <span class="date">{{showDate(commentInfo.created)}}</span>
        <span>{{commentInfo.style}}</span>
      </div>
      <div class="info-imgs">
        <img :src="item" v-for="(item,index) in commentInfo.images" :key="index" alt="">
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "DetailCommentInfo",
        props: {
            commentInfo: {
                type: Object,
                default() {
                    return {}
                }
            }
        },
        methods: {
            showDate(value) {
                let time = new Date(value)
                let year = time.getFullYear();  //取得4位数的年份
                let month = time.getMonth() + 1;  //取得日期中的月份，其中0表示1月，11表示12月
                let date = time.getDate();      //返回日期月份中的天数（1到31）
                let hour = time.getHours();     //返回日期中的小时数（0到23）
                let minute = time.getMinutes(); //返回日期中的分钟数（0到59）
                let second = time.getSeconds(); //返回日期中的秒数（0到59）
                return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;

                // var g=1551334252272; //定义一个时间戳变量
                // var d=new Date(g);   //创建一个指定的日期对象
                // console.log(d);
                // console.log(formatDate(d));
            }
        }
    }
</script>

<style scoped>
  .info-header {
    border-bottom: 2px solid rgba(100, 100, 100, 0.1);
    overflow: hidden;
  }

  .header-title {
    float: left;
  }

  .header-more {
    float: right;
  }

  .header-title, .header-more {
    padding: 20px 15px 20px 15px;
  }

  .info-user img {
    padding: 18px;
    width: 50px;
  }

  .info-user span {
    display: inline-block;
    position: relative;
    top: -35px;
    font-size: 18px;
  }

  .info-detail p {
    padding: 0 15px 20px 8px;
  }

  .info-other span {
    padding: 0 15px 0 8px;
  }

  .info-imgs {
    border-bottom: 2px solid rgba(100, 100, 100, 0.1);
  }

  .info-imgs img {
    width: 15vh;
    margin-top: 10px;
    padding: 5px;
  }
</style>
