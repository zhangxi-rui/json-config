<template>
  <div
    class="app-header clearfix"
    :class="{'is-collapse':isCollapse}"
  >
    <!-- 左侧logo -->
    <div class="logo-container">
      <i class="logo"></i>
    </div>
    <!-- 右侧信息 -->
    <!-- 右侧信息 -->
    <div class="information-container">
      <div class="right-menu-container">
        <div class="right-menu-item">
          <i class="icon-im iconfont"></i>微信
        </div>
        <div class="right-menu-item">
          <i class="icon-export iconfont"></i>优惠券
        </div>
        <div class="right-menu-item">
          <i class="share"></i>课程分享
        </div>
        <div class="right-menu-item">
          <i class="zyb-icon-common-bell"></i>消息
        </div>
      </div>
      <div
        class="avatar-container"
        @mouseenter="onmouseenter"
        @mouseleave="onmouseleave"
      >
        <span class="user-wrapper">
          <i class="icon-user"></i>
        </span>
        <span class="arrow-wrapper">
          <i class="icon-arrow"></i>
        </span>
        <div
          class="right-area-toolbar"
          v-show="showTooltip"
          @mouseenter="onmouseenter"
          @mouseleave="onmouseleave"
        >
          <div class="name">{{userInfo.realName}}</div>
          <div
            class="system-item"
            v-for="item in platformList"
            :key="item.platformId"
            @click="selectSystem(item.platformUrl)"
          >{{item.platformName}}</div>
          <div
            class="quit"
            @click="quit"
          >退出</div>
        </div>
      </div>
    </div>
    <!-- 头部内容 -->
    <div class="content-container">
      <i
        class="icon-meun"
        @click="collapse"
      ></i>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Getter, Action } from 'vuex-class'

const TIME_OUT = 300

@Component({
  name: 'app-header'
})
export default class AppHeader extends Vue {
  // vuex
  @Getter('sidebar') sidebar: any
  @Action('GetUserInfo') GetUserInfo: any
  @Action('toogleSidebar') toogleSidebar: any

  // initial data
  userInfo: any = {
    memberId: '', // 权限系统里面唯一的用户编号
    uName: '', // 用户实名
    realName: '', // 真实姓名
    phone: '', // 手机号
    email: '', // 邮箱
    employeeId: '', // 员工编号
    datetime: '' // 当前日期
  }
  showTooltip: boolean = false
  platformList: any[] = []
  timer: any = null // 定时器

  // computed
  get isCollapse () {
    return !this.sidebar.opened
  }

  // created hook
  created () {
    // let res = this.GetUserInfo()
    // console.log('sdafasfss--->>>',res)
    // this.GetUserInfo().then((res: any) => {
    //   console.log(res)
    //   let { memberId, uName, realName, phone, email, employeeId, datetime, platformList } = res
    //   this.platformList = platformList
    //   this.userInfo = {
    //     memberId,
    //     uName,
    //     realName,
    //     phone,
    //     email,
    //     employeeId,
    //     datetime
    //   }


    // })
    console.log('this.userInfo---->>',this.userInfo)
  }

  // methods
  onmouseenter () {
    clearTimeout(this.timer)
    this.showTooltip = true
  }

  onmouseleave () {
    this.timer = setTimeout(() => {
      this.showTooltip = false
    }, TIME_OUT)
  }

  quit () {
    // window.location.href = `${location.protocol}//${location.hostname}/upms/login/logout`
    window.location.href = `${location.protocol}//${location.hostname}/paybalance/login/logout`
  }

  collapse () {
    this.toogleSidebar()
  }

  selectSystem (platformUrl: string) {
    window.location.href = platformUrl
  }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/index.scss';
.app-header {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 999;
  min-width: 920px;
  height: 50px;
  background: #ffffff;
  border-bottom: 1px solid #d8dce5;
  -webkit-box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);

  /*左侧logo*/
  .logo-container {
    float: left;
    width: 160px;
    text-align: center;
    background-color: $zyb-green-1;
    -webkit-transition: width 0.3s;
    transition: width 0.3s;
    @include common-wrapper();
    .logo {
      height: 36px;
      width: 104px;
      display: inline-block;
      vertical-align: middle;
      background: url('~@/assets/images/logo-yk-white@2x.png') no-repeat 0 0;
      background-size: cover;
    }
  }

  /*information-container*/
  .information-container {
    float: right;
    display: flex;
    align-items: center;
    margin-left: 38px;
    margin-right: 28px;
    font-size: 0;
    .right-menu-container {
      display: flex;
      @include common-wrapper;
      .right-menu-item {
        display: flex;
        margin-right: 30px;
        align-items: center;
        font-size: 14px;
        color: #969799;
        cursor: pointer;
        i {
          margin-right: 5px;
          color: #83868f;
        }
      }
    }

    .avatar-container {
      display: flex;
      @include common-wrapper;
      span {
        cursor: pointer;
      }
      span + span {
        padding-left: 16px;
        &:hover {
          color: $zyb-green-1;
        }
      }
      .icon-user {
        background: url('~@/assets/images/ic_head_default.png') no-repeat 0 0;
        @include common-img(24px, 24px);
      }
      /*三角图标*/
      .icon-arrow {
        background: url('~@/assets/images/ic_arrowdown_normal.png') no-repeat center center;
        @include common-img;
      }
      /*用户信息清单*/
      .right-area-toolbar {
        position: absolute;
        z-index: 99999;
        background-color: #fff;
        top: 100%;
        right: 0;
        width: 208px;
        padding: 18px 16px 8px;
        box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.2);
        border-radius: 2px;
        text-align: center;
        font-size: 12px;
        .name {
          line-height: 20px;
          padding-bottom: 16px;
          border-bottom: 1px solid #f0f0f0;
        }

        .system-item {
          display: block;
          padding: 8px 0;
          line-height: 18px;
          height: 18px;
          border-bottom: 1px solid #f0f0f0;
          cursor: pointer;
          &:hover {
            color: #333;
          }
        }
        .quit {
          cursor: pointer;
          padding-top: 8px;
          color: #f06c4d;
          line-height: 18px;
          height: 18px;
        }
      }
      &:hover {
        .icon-arrow {
          background: url('~@/assets/images/ic_arrowup_hover.png') no-repeat center center;
          @include common-img;
        }
      }
    }
  }
  /*content-container*/
  .content-container {
    display: flex;
    align-items: center;
    margin-left: 176px;
    margin-right: 175px;
    @include common-wrapper;
    .icon-meun {
      cursor: pointer;
      background: url('~@/assets/images/ic_menuPackUp_normal.png') no-repeat center center;
      @include common-img;
      &:hover {
        background: url('~@/assets/images/ic_menuPackUp_hover.png') no-repeat center center;
        background-size: cover;
      }
    }
  }

  //折叠
  &.is-collapse {
    .logo-container {
      width: 50px;
      transition: width 0.3s;
      .logo {
        width: 32px;
        height: 32px;
        background: url('~@/assets/images/logo_sc_small.png') no-repeat center center;
        background-size: cover;
      }
    }
    .content-container {
      margin-left: 66px;
      transition: margin-left 0.3s;
      .icon-meun {
        background: url('~@/assets/images/ic_menuunfold_normal.png') no-repeat center center;
        background-size: cover;
        &:hover {
          background: url('~@/assets/images/ic_menuunfold_hover.png') no-repeat center center;
          background-size: cover;
        }
      }
    }
  }

  /*系统子菜单*/
  .system-item {
    text-align: left;
    display: block;
    padding: 8px 0 8px 8px;
    line-height: 18px;
    height: 18px;
    border-bottom: 1px solid #f0f0f0;
    &:hover {
      color: #333;
    }
  }
}
</style>
