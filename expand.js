const fs = require('fs')
const path = require('path')
const child_process = require('child_process')
const fsExtra = require('fs-extra')
const config = require('./channel.config.js')
const targetConfig = JSON.stringify(config)
//复制文件
function copyFile(copiedPath, resultPath) {
  fs.copyFile(copiedPath, resultPath, function(err){
  	if(err) {
      console.log('something wrong was happened')
    } else {
      console.log('copy file succeed');
    }
  })
}

//复制文件夹拷贝文件夹本身
function copyFolder(copiedPath, resultPath, direct) {
    if(!direct) {
        copiedPath = path.join(__dirname, copiedPath)
        resultPath = path.join(__dirname, resultPath)
    }

    function createDir (dirPath) {
        fs.mkdirSync(dirPath)
    }

    if (fs.existsSync(copiedPath)) {
        child_process.spawnSync('cp', ['-rf', copiedPath, resultPath])

        // const files = fs.readdirSync(copiedPath, { withFileTypes: true });
        // for (let i = 0; i < files.length; i++) {
        //     const cf = files[i]
        //     const ccp = path.join(copiedPath, cf.name)
        //     const crp = path.join(resultPath, cf.name)
        //     if (cf.isFile()) {
        //         /**
        //          * @des 创建文件,使用流的形式可以读写大文件
        //          */
        //         const readStream = fs.createReadStream(ccp)
        //         const writeStream = fs.createWriteStream(crp)
        //         readStream.pipe(writeStream)
        //     } else {
        //         try {
        //             /**
        //              * @des 判断读(R_OK | W_OK)写权限
        //              */
        //             fs.accessSync(path.join(crp, '..'), fs.constants.W_OK)
        //             copyFolder(ccp, crp, true)
        //         } catch (error) {
        //             console.log('folder write error:', error);
        //         }
				//
        //     }
        // }
    } else {
        console.log('do not exist path: ', copiedPath);
    }
}

//渲染模板（读模板,将占位符替换为数据）
 function render(templatepath, data) {
   let targetPath = path.join(__dirname, templatepath)
   fs.readFile(targetPath,'utf8',function(err,files){
     var result = files.replace('${channelConfig}', data);
     fs.writeFile(targetPath, result, 'utf8', function (err) {
       if (err){
         console.log(err)
       }
     })
   })
 }

// 重命名a文件夹为b
// fs.renameSync('./temp/tmp',"./temp/tmp1");

// copyFolder('./tmp/', './tmp1/', false);
