const fs = require('fs')
const path = require('path')
const chalk = require('chalk')

export const logger = (exports.logger = {
  ln: () => console.log(),
  warning: msg => {
    console.warn(`${chalk.bgYellow.black(' WARNING ')} ${chalk.yellow(msg)}`)
  },
  info: msg => {
    console.log(`${chalk.bgCyan.black(' INFO ')} ${chalk.cyan(msg)}`)
  },
  success: msg => {
    console.log(`${chalk.bgGreen.black(' SUCCESS ')} ${chalk.green(msg)}`)
  },
  error: msg => {
    console.error(`${chalk.bgRed.black(' ERROR ')} ${chalk.red(msg)}`)
  },
  warningText: msg => {
    console.warn(`${chalk.yellow(msg)}`)
  },
  infoText: msg => {
    console.log(`${chalk.cyan(msg)}`)
  },
  successText: msg => {
    console.log(`${chalk.green(msg)}`)
  },
  errorText: msg => {
    console.error(`${chalk.red(msg)}`)
  }
})

exports.bin = name => path.resolve(__dirname, '../node_modules/.bin/' + name)

// 短横线命名
exports.toKebabCase = value => {
  return (
    value.charAt(0).toLowerCase() +
    value
      .slice(1)
      .replace(/([A-Z])/g, '-$1')
      .toLowerCase()
  )
}

// 全大写命名
exports.toPascalCase = value => {
  return value.charAt(0).toUpperCase() + value.slice(1).replace(/-([a-z])/g, (_, char) => (char ? char.toUpperCase() : ''))
}

// 驼峰命名
exports.toCamelCase = value => {
  const pascalName = toPascalCase(value)

  return pascalName.charAt(0).toLowerCase() + pascalName.slice(1)
}
