import fs from 'fs-extra'
import path from 'path'

function fileDisplay(filePath) {
  const files = fs.readdirSync(filePath)
  files.forEach(function(item) {
    const fPath=path.join(filePath,item)
    const stat = fs.statSync(fPath)
    if (stat.isDirectory() === true) {
      if(item==='node_modules'){
        fs.remove(fPath).then(res=>{
          console.log('已删除----',fPath)
        })
      }else{
        fileDisplay(fPath)
      }
    }
  })
}
try{
  fileDisplay(path.resolve('..','project'))
}
catch(ex){
  console.log('文件操作错误',ex)
}