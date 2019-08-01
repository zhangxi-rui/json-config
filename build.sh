#!/bin/sh
APP_NAME="json-config"

#删除 output，dist，node_modules目录
rm -rf output dist node_modules

#安装依赖的npm包
yarn install --registry=http://fe.suanshubang.com/npm/

#构建
npm run build

#创建 APP_NAME目录
mkdir -p output/webroot/static/$APP_NAME

#拷贝代码文件
cp -r dist/*  output/webroot/static/$APP_NAME

#打开output
cd output

#打包  tar zcf  xxx.tar.gz   要打包的目录
tar -zcf $APP_NAME.tar.gz  webroot/

rm -rf webroot


echo "build end"
