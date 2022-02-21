const fs = require('fs-extra')
import path from 'path'
const execa = require('execa') // 开启子进程打包
const { logger } = require('../utils')
import { SystemConfig } from '@/config/themeConfig'
import adapter from './adapter'
import dayjs from 'dayjs'

const pathResolve = dir => path.resolve(__dirname, dir)

// 获取scripts 参数 --- 只有写在scripts 内才能获取； 而npm_config_adapter必须在调用scripts时且使用npm/cnpm包管理器才能够自动生成
const args = require('minimist')(process.argv.slice(2))

// 按流程 执行构建脚本
main()

async function main() {
  const startTime = Date.now()

  await execa('rimraf', [`dist/${adapter.platform}/**`])
  logger.ci('清除dist文件成功')

  await execa('tsc')
  logger.ci('tsc 编译完毕')

  // ==============================  客户端配置项  =====================================
  if (adapter.platform && adapter.rightPlatform) {
    // 需要复制或者编译  配置文件和 端所需要的文件
    adapter.initialize()
    // logger.ci('完成配置文件迁移')
  } else {
    // 异常处理
    logger.error('请以 --adapter=[chrome|firefox|utools]的格式进行设置')
    process.exit(1)
  }

  // 需要执行编译的配置文件
  // TODO：依据执行的不同构建不同的adpater
  await execa('babel-node', ['esbuild.config.js'])
  logger.ci('esbuild 构建 extension 所需脚本完毕')

  // =================================================================================

  // 编译antd 样式主题文件
  await execa('lessc', [
    '--js',
    `-modify-var=ant-prefix=${SystemConfig.prefixCls}`,
    'node_modules/antd/dist/antd.variable.less',
    'src/antd.custom.css'
  ]).catch(e => {
    logger.error('lessc error : ' + e)
  })
  logger.ci(`生成自定义前缀( ${SystemConfig.prefixCls} )的antd variable文件成功`)

  // 执行vite构建
  await execa('vite', ['build'], {
    stdio: 'inherit' // 展示运行过程
  }).catch(e => {
    logger.error('vite error: ' + e)
  })

  const useTime = (Date.now() - startTime) / 1000
  logger.cs('vite 构建成功 : ' + dayjs().format('YYYY-MM-DD HH:mm:ss') + '； 总用时：' + useTime + '秒')
}
