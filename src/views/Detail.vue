<template>
  <div id="main" class="detail">
    <div class="frame">
      <img src="@/images/u33.png" alt style="height:100%">
      <img :src="data.imgUrl" alt class="shopImg">
    </div>

    <div class="lsact_discount">
      <img src="@/images/u49.png" alt>
    </div>
    <div class="lsact_title">
      <div style="position:relative">
        <img src="@/images/u16.png" alt>
        <div class="lsact_button" @click="shareActShop()"></div>
      </div>
    </div>
    <list :lists="lists" :listHeight="listHeight"></list>
    <div v-if="showModal" class="showModal">
      <img src="@/images/close.svg" class="closeBtn" @click="closeModal()">
      <img :src="shareImg" alt class="shareImg" :class="change?'inverse':''">
      <img src="@/images/followBtn.png" class="followBtn" @click="changeAct()">
      <div>长按图片保存,并分享朋友圈</div>
    </div>
    <div class="mask" v-if="showModal"></div>
  </div>
</template>

<script>
import list from "@/components/List";

export default {
  components: {
    list
  },
  data() {
    return {
      lists: [],
      listHeight: "detail_Height",
      data: {},
      shareImg: "",
      firstImg: "",
      showModal: false,
      change: false
    };
  },
  mounted() {
    // 监听返回按钮
    window.addEventListener(
      "popstate",
      e => {
        this.closeModal();
      },
      false
    );

    this.getActShop();
  },
  // 销毁监听
  destroyed() {
    window.removeEventListener(
      "popstate",
      e => {
        this.closeModal();
      },
      false
    );
  },
  // 在当前路由改变，但是该组件被复用时调用
  watch: {
    $route(to, from) {
      this.getActShop();
    }
  },

  methods: {
    // 获取所以活动商家的信息
    getActShop() {
      this.LinkerShow.api.st.getActShop({
        data: {
          id: this.$route.query.id
        },
        success: res => {
          this.data = res;
          this.lists = res.nearShops;
        },
        fail: err => {
          console.log(err);
        }
      });
    },

    // 分享活动商家详情页
    shareActShop() {
      this.LinkerShow.api.st.shareActShop({
        data: {
          id: this.$route.query.id
        },
        success: res => {
          this.showModal = true;
          document.getElementsByTagName("body")[0].className = "noRoll";
          this.firstImg = res;
          this.shareImg = res;
        },
        fail: err => {
          console.log(err);
        }
      });
    },
    closeModal() {
      this.showModal = false;
      document.getElementsByTagName("body")[0].className = "";
    },
    // 切换图片
    changeAct() {
      if (this.shareImg != require("@/images/share.jpg")) {
        this.shareImg = require("@/images/share.jpg");
        this.change = true;
      } else {
        this.shareImg = this.firstImg;
        this.change = false;
      }
    }
  }
};
</script>

<style lang="less">
#main {
  .lsact_discount {
    position: absolute;
    top: 280px;
    left: 0px;
    height: 317px;
  }

  .lsact_button {
    position: absolute;
    bottom: 60px;
    left: 55px;
    height: 80px;
    width: 250px;
  }
}

#main.detail {
  .frame {
    position: relative;
    height: 262px;
    width: 100%;
    overflow: hidden;
  }
  .shopImg {
    position: absolute;
    top: 0px;
    left: 0;
    z-index: -1;
    height:100%;
  }

  .lsact_title {
    position: absolute;
    top: 580px;
    width: 124px;
    height: 28px;
    left: 25px;
  }

  .showModal {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 50%;
    left: 0;
    text-align: center;
    z-index: 999;
    color: #fff;
    font-size: 16px;
  }

  .shareImg {
    width: 65%;
    height: auto;
    margin: -250px 0 15px 0;
    // rotateY而不是rotate，否则ios不旋转
    transform: rotateY(0deg);
    -webkit-transform: rotateY(0deg);
    transition: transform 0.5s;
  }
  .inverse {
    transform: rotateY(360deg);
    -webkit-transform: rotateY(360deg);
    transition: transform 0.5s;
  }

  .followBtn {
    position: absolute;
    top: 20px;
    right: 2px;
    width: 84px;
    height: auto;
  }
  .closeBtn {
    position: absolute;
    top: -255px;
    right: 25px;
    width: 40px;
    height: 40px;
    color: #fff;
  }

  .mask {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background-color: #333;
    z-index: 9;
    opacity: 0.8;
  }
}
.noRoll {
  position: fixed;
}
.detail_Height {
  top: 620px;
}
</style>