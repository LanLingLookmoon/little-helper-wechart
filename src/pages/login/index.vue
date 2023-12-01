<template>
  <view class="content">
    <view class="text-area">
      <button @click="login">登录123</button>
      <van-button type="default" @click="getImage">默认按钮</van-button>
      <van-uploader v-if="refresh" :file-list="fileList" @after-read="afterRead" @delete="deleteImg"/>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, reactive, nextTick } from 'vue'
import { userlogin, upload, showImage } from "@/api/login"
interface Item {  
  url: string;  
  name: string;
  isImage: boolean;
  deletable: boolean;
}  
const fileList = ref<Item[]>([])
const refresh = ref(true)
function afterRead(event: any) {
  const { file } = event.detail;
  upload(file.url)
}
function getImage() {
  showImage().then(res => {
    refresh.value = false
    const arrBuf = new Uint8Array(res)
		const base64 = "data:image/png;base64," + uni.arrayBufferToBase64(arrBuf)
    fileList.value.push({ url: base64, name: '123', isImage: true, deletable: true })
    nextTick(() => {
      refresh.value = true
    })
    console.log(fileList);
    // fileList.value.$nextTick(() => {  
    //   console.log(fileList.value);  
    // })  
  })
}
function deleteImg(e) {
  console.log(e.detail.index);
  
}
function login() {
  uni.login({
    success (res) {
      if (res.code) {
        //发起网络请求
        userlogin({code: res.code}).then(res => {
          wx.setStorageSync('token', res.data.token)
        })
      } else {
        console.log('登录失败！' + res.errMsg)
      }
    }
  })
}
</script>