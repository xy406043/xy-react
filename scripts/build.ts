const fs = require('fs-extra')
import path from 'path'
const execa = require('execa') // 开启子进程打包
const { logger } = require('./utils')
import { SystemConfig } from '../src/config/themeConfig'
import dayjs from 'dayjs'
import xyAdapter from '../src/adapterTool/adapter'

const pathResolve = dir => path.resolve(__dirname, dir)

// 获取scripts 参数
const args = require('minimist')(process.argv.slice(2))

// 按流程 执行构建脚本
main()

async function main() {
  const startTime = Date.now()

  await execa('tsc')

  logger.ln()
  logger.info('tsc 编译完毕')
  logger.ln()

  // ==============================  客户端配置项  =====================================
  if (args && args.adapter) {
    // 添加环境变量
    await execa('cross-env', [`xy_adapter=${args.adapter}`])

    logger.ln()
    logger.info('启动器添加环境变量' + JSON.stringify(args))
    logger.ln()

    xyAdapter.initialize()

    logger.ln()
    // 需要复制或者编译  配置文件和 端所需要的文件
    logger.info('完成配置文件迁移')
    logger.ln()
  } else {
    // 异常处理
    logger.error('请以 --adapter=[chrome|firefox|utools]的格式进行设置')
    process.exit(1)
  }

  // 需要执行编译的配置文件
  await execa('babel-node', ['esbuild.config.js'])

  logger.ln()
  logger.info('esbuild 构建 chrome extension 脚本完毕')
  logger.ln()

  // =================================================================================

  await execa('lessc', [
    '--js',
    `-modify-var=ant-prefix=${SystemConfig.prefixCls}`,
    'node_modules/antd/dist/antd.variable.less',
    'src/antd.custom.css'
  ]).catch(e => {
    logger.error('lessc error : ' + e)
  })

  logger.ln()
  logger.info(`生成自定义前缀( ${SystemConfig.prefixCls} )的antd variable文件成功`)
  logger.ln()

  await execa('vite', ['build'], {
    stdio: 'inherit' // 展示运行过程
  }).catch(e => {
    logger.error('vite error: ' + e)
  })

  const useTime = (Date.now() - startTime) / 1000

  logger.ln()
  logger.success('vite 构建成功 : ' + dayjs().format('YYYY-MM-DD HH:mm:ss') + '； 总用时：' + useTime + '秒')
  logger.ln()
}
