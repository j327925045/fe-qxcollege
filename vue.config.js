/* eslint-disable no-param-reassign */
const path = require('path')

const resolve = (dir) => path.join(__dirname, dir)

module.exports = {
  // 基本路径
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  // 输出文件目录
  outputDir: 'dist',
  // eslint-loader 是否在保存的时候检查
  lintOnSave: false,
  runtimeCompiler: true, // 关键点在这
  // 调整内部的 webpack 配置。
  chainWebpack: (config) => {
    config.resolve.alias.set('@', resolve('src')).set('assets', resolve('src/assets')).set('components', resolve('src/components')).set('public', resolve('public'))
  },
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: false,
  // css相关配置
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    // extract: true, // 注释css热更新生效
    // 开启 CSS source maps?
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {},
    // 启用 CSS modules for all css / pre-processor files.
    requireModuleExtension: true
  },
  // webpack-dev-server 相关配置
  devServer: {
    /* 自动打开浏览器 */
    open: process.platform === 'darwin',
    host: 'localhost',
    port: 8080,
    https: false,
    hotOnly: false,
    /* 使用代理 */
    // proxy: {
    //   '/api': {
    //     /* 目标代理服务器地址 */
    //     target: '',
    //     /* 允许跨域 */
    //     changeOrigin: true,
    //     ws: true,
    //     pathRewrite: {
    //       '^/api': ''
    //     }
    //   }
    // },
    before: () => {}
  },
  // 第三方插件配置
  pluginOptions: {
    windicss: {
      // see https://github.com/windicss/vite-plugin-windicss/blob/main/packages/plugin-utils/src/options.ts
    }
  }
}
