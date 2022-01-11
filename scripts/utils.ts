const fs = require('fs')
const path = require('path')
const chalk = require('chalk')

export const logger = {
  ln: () => console.log(),
  ci: msg => {
    logger.ln()
    logger.info(msg)
    logger.ln()
  },
  cs: msg => {
    logger.ln()
    logger.success(msg)
    logger.ln()
  },
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
}
