#!/usr/bin/env node
console.log('Hello megajs CLI');
const program = require('commander');
// const fs = require('fs-extra');
// const chalk = require('chalk');
// const { basename, join } = require('path');
// const readline = require('readline');
// const download = require('download-git-repo');
// const ora = require('ora');
// const vfs = require('vinyl-fs');
// const map = require('map-stream');
// const template = 'https://github.com/hammercui/tora-starter.git';

program
	.version('1.0.0')
	.usage('<command> [项目名称]')
	.command('taro', '创建新taro项目')
	.command('umi', '创建新umi项目')
	// .action(function(name,otherParams){
	// 	console.log(name);
	// })
// .command('new <name> [otherParams...]')
// .alias('n')
// .description('Generates new code')
// .action(function (name, otherParams) {
//   console.log('---cli start ----');
//   console.log('项目名：', name);
//   //console.log('other', otherParams);
//   // 在这里执行具体的操作
// });

program.parse(process.argv);
