import presetWeapp from 'unocss-preset-weapp'
import { transformerAttributify, transformerClass } from 'unocss-preset-weapp/transformer'
import { defineConfig } from 'unocss'

export default defineConfig({
  presets: [
    presetWeapp(
      {
        isH5: process.env.TARO_ENV === 'h5',
        platform: 'taro',
        taroWebpack: 'webpack5',
      },
    ),
  ],
  transformers: [
    transformerAttributify(),
    transformerClass(),
  ],
})
