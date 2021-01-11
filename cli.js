#!/usr/bin/env node

// Node CLI 应用入口文件必须要有这样的文件头
// 如果是 Linux 或者 macOS 系统下还需要修改此文件的读写权限为 755
// 具体就是通过 chmod 755 cli.js 实现修改  
// console.log('cli working')

// 脚手架的工作原理
// 1. 通过命令行交互询问用户问题
// 2. 根据用户回答的结果生成文件

const fs = require('fs')
const inquirer = require('inquirer')
const path = require('path')
const ejs = require('ejs')

inquirer.prompt([
    {
        type: 'input',
        name: 'name',
        message: 'Project name'
    }
]).then(anwsers=>{
    // console.log(anwsers)
    // 根据用户回答的结果生成文件

    // 模版目录
    const tmplDir = path.join(__dirname, 'templates')
    // 目标目录
    const destDir = process.cwd()

    // 将模版下的文件全部转换到目标目录
    fs.readdir(tmplDir, (error, files)=>{
        if(error) return error
        files.forEach(file=>{
            // 通过模板引擎渲染文件
            ejs.renderFile(path.join(tmplDir, file), anwsers, (error, result)=>{
                if(error) return 

                // 将结果写入模板文件路径
                fs.writeFileSync(path.join(destDir, file), result)
            })
        })
    })
})