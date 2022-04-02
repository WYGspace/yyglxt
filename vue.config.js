'use strict'
const path = require('path')
const defaultSettings = require('./src/settings.js')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const name = defaultSettings.title || 'vue Admin Template' // 页面标题

// 如果端口设置为80,
// 使用管理员权限来执行命令行.
// 例如，Mac: sudo npm run
// 可以通过以下方式修改端口:
// port = 9528 npm run dev 或 npm run dev --port = 9528
const port = process.env.port || process.env.npm_config_port || 9528 // dev port

// 所有配置项说明可在 https://cli.vuejs.org/config/
module.exports = {
  /**
   * 如果您计划在子路径下部署站点，则需要设置publicPath,
   * 例如GitHub Pages。如果您计划将站点部署到 https://foo.github.io/bar/,
   * 然后,公共道路应该设置为 "/bar/".
   * 在大多数情况下请使用 '/' !!!
   * 详细说明: https://cli.vuejs.org/config/#publicpath
   */
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  devServer: {
    port: port,// 告诉连接到 devServer 的客户端使用提供的端口进行连接
    open: true,// 告诉 dev-server 在服务器已经启动后打开浏览器。设置其为 true 以打开你的默认浏览器。
    overlay: {// 只想显示错误信息
       warnings: false,
       errors: true
     },
    before: require('./mock/mock-server.js'),
    proxy: {
      "/api":{
        target:"http://localhost:8080/YYGLXT",
        pathRewrite: {"^/api" : ""}
      }
    },
  },
  configureWebpack: {
    // 在webpack的name字段中提供应用的标题，这样
    // 它可以在index.html中访问以注入正确的标题。
    name: name,
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  },
  chainWebpack(config) {
    // 它可以提高第一屏的速度，建议打开预加载
    config.plugin('preload').tap(() => [
      {
        rel: 'preload',
        // 忽略runtime.js
        // https://github.com/vuejs/vue-cli/blob/dev/packages/@vue/cli-service/lib/config/app.js#L171
        fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
        include: 'initial'
      }
    ])

    // 当页面过多时，会导致无意义的请求过多
    config.plugins.delete('prefetch')

    // 设置 svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

    config
      .when(process.env.NODE_ENV !== 'development',
        config => {
          config
            .plugin('ScriptExtHtmlWebpackPlugin')
            .after('html')
            .use('script-ext-html-webpack-plugin', [{
            // ' runtime '必须与runtimeecchunk名称相同。默认是“运行时”
              inline: /runtime\..*\.js$/
            }])
            .end()
          config
            .optimization.splitChunks({
              chunks: 'all',
              cacheGroups: {
                libs: {
                  name: 'chunk-libs',
                  test: /[\\/]node_modules[\\/]/,
                  priority: 10,
                  chunks: 'initial' // 只打包最初依赖的第三方
                },
                elementUI: {
                  name: 'chunk-elementUI', //将elementUI拆分为单个包
                  priority: 20, // 重量需要大于libs和app，否则它将被打包成libs或app
                  test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // 为了适应CNPM
                },
                commons: {
                  name: 'chunk-commons',
                  test: resolve('src/components'), // 可以自定义规则
                  minChunks: 3, //  最低常见的数量
                  priority: 5,
                  reuseExistingChunk: true
                }
              }
            })
          // https:// webpack.js.org/configuration/optimization/#optimizationruntimechunk
          config.optimization.runtimeChunk('single')
        }
      )
  }
}
