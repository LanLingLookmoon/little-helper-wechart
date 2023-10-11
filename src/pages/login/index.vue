<template>
  <view class="content">
    <view class="text-area">
      <button @click="login">登录123</button>
    </view>
  </view>
</template>

<script setup lang="ts">
import { userlogin } from "@/api/login"
  function login() {
    uni.login({
      success (res) {
        if (res.code) {
          //发起网络请求
          userlogin({code: res.code}).then(res => {
            console.log(1111, res);
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  }
</script>