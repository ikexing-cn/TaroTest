<script setup lang="ts">
import { ref } from 'vue'

const msg = ref('123')
</script>

<template>
  <view class="index">
    <text>{{ msg }}</text>
  </view>
</template>
