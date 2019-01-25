#!/usr/bin/env node

const program = require('commander');
const path = require('path');
const fs = require('fs');
const glob = require('glob'); // npm i glob -D
const inquirer = require('inquirer');
const download = require('../lib/download-taro');
const chalk = require('chalk');
const logSymbols = require('log-symbols');

program.usage('<project-name>').parse(process.argv);
//console.log(program.args)
// 根据输入，获取项目名称
let projectName = program.args[0];
let rootName = path.basename(process.cwd());
//未输入工程名
if (!projectName) {
	//输入交互
	inquirer
		.prompt([
			{
				name: 'projectName',
				message: 'taro项目名称:'
			}
		])
		.then(answers => {
			console.log(logSymbols.success, chalk.green(`你输入的项目名称是：${answers.projectName}`));
			projectName = answers.projectName;
			if (!projectName) return;
			createPeoject();
			return;
		});
}else{
	createPeoject();
}

function createPeoject() {
	const list = glob.sync('*'); // 遍历当前目录
	if (list.length) {
		// 如果当前目录不为空
		let isExist = false;
		list.filter(name => {
			if (name == projectName) {
				console.log(name);
				const fileName = path.resolve(process.cwd(), path.join('.', name));
				var state = fs.lstatSync(fileName);
				isExist = state.isDirectory();
			}
		});
		if (isExist) {
			console.log(logSymbols.error, chalk.red(`项目${projectName}已经存在`));
			return;
		}
		rootName = projectName;
	} else if (rootName === projectName) {
		rootName = '.';
	} else {
		rootName = projectName;
	}

	go();
}

//下载
function go() {
	// 预留，处理子命令
	let savaName = path.resolve(process.cwd(), path.join('.', rootName));
	download(savaName)
		.then(target => {
			console.log(logSymbols.success, chalk.green(`项目${projectName}创建成功`));
			//todo拷贝到目录
			return {
				name: projectName,
				root: savaName,
				downloadTemp: target
			};
		})
		.then(context => {})
		.catch(err => console.log(err));
}

//写入文件
function write(path, str) {
	fs.writeFileSync(path, str);
}
//拷贝文件
function copyTemplate(from, to) {
	from = path.join(__dirname, from);
	write(to, fs.readFileSync(from, 'utf-8'));
}
