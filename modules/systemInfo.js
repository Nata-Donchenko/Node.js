const os = require('os')

function showSystemInfo() {
  const platform = os.platform()
  const freemem = os.freemem()
  const uptime = os.uptime()
  const cpus = os.cpus().length

  console.log(`ОП: ${platform},\n кількість вільної па'мяті: ${freemem},\n час роботи системи: ${uptime},\n кількість CPU: ${cpus}`)
}

module.exports = {
  showSystemInfo
}