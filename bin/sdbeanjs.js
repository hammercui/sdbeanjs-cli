#!/usr/bin/env node
console.log('Hello sdbeanjs CLI');
const program = require('commander');
program
	.version('1.0.0')
	.usage('<command> [项目名称]')
	.command('taro', '创建新taro项目')
	.command('umi', '创建新umi项目')

program.parse(process.argv);
