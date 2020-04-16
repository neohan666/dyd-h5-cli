const download = require('download-git-repo')

const httpsUrl = 'https://git.51k1k.com/dyd-platform-h5/dyd-h5-template.git'
const sshUrl = 'git@git.51k1k.com:dyd-platform-h5/dyd-h5-template.git'

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
