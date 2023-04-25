<script setup lang="ts">
import { ref } from 'vue'
import Taro from '@tarojs/taro'

import MyVideo from '../../components/Video.vue'

interface RequestBase<T = null> {
  data: T
  msg: string
  code: number
}

const token = ref('')
async function onWechatLogin() {
  const { code, errMsg } = await Taro.login()
  console.log({ errMsg })
  const res = await Taro.request<RequestBase<string>>({
    method: 'GET',
    url: `http://localhost:8081/api/wx_login/v1/weapp_login?code=${code}`,
  })
  token.value = res.data.data
  console.log({ token: token.value })
}

async function onWechatPay() {
  const { data: payRes } = await Taro.request({
    method: 'POST',
    url: 'http://localhost:8081/api/order/v1/pay',
    data: {
      type: 'WEAPP',
      id: 1,
    },
    header: {
      Authorization: `Bearer ${token.value}`,
    },
  })

  try {
    console.log(payRes.data)
    const testPayResult = await Taro.requestPayment({
      ...payRes.data,
    })

    console.log(testPayResult)
  }
  catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <view class="index" flex="~ col" w-full gap-2>
    <button w-full @tap="onWechatLogin">
      微信登录
    </button>

    <button w-full @tap="onWechatPay">
      微信支付
    </button>

    <MyVideo />
  </view>
</template>
