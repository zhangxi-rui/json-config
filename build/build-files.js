// 创建文件
const fs = require('fs-extra')
const cwd = process.cwd()
const path = require('path')

function createPath (section) {
  return path.join(cwd, section)
}

// tpl config
const tplConfig = [
  {
    name: 'readme',
    location: './README.md'
  },
  {
    name: 'package',
    location: './package.json'
  },
  {
    name: 'build',
    location: './build.sh'
  }
]

// buid files
tplConfig.forEach((item) => {
  const { name, location } = item
  const tplPath = createPath(`./template/${name}.tpl`)
  fs.readFile(tplPath, (err, data) => {
    if (err) throw err
    const fsPath = createPath(location)
    fs.writeFile(fsPath, data, err => {
      if (err) throw err
      console.log(`${location} is created`)
    })
  })
})
