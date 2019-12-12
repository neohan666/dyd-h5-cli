const download = require('download-git-repo')

const httpsUrl = 'https://code.aliyun.com/dyd666/dyd-h5-template.git'
const sshUrl = 'git@code.aliyun.com:dyd666/dyd-h5-template.git'

function onDownload (downloadPath, callback, isHttpsUrl) {
  const resp = isHttpsUrl ? httpsUrl : sshUrl

  download('direct:' + resp, downloadPath, { clone: true }, err => {
    if (err) {
      if (isHttpsUrl) {
        callback(err)
      } else {
        onDownload(downloadPath, callback, true)
      }
    } else {
      callback()
    }
  })
}

module.exports = onDownload
