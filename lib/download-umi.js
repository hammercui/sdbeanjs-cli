/*
 * @Description: 从github下载代码模板
 * @version: 1.0.0
 * @Company: sdbean
 * @Author: hammercui
 * @Date: 2019-01-25 11:47:40
 * @LastEditors: hammercui
 * @LastEditTime: 2019-01-25 15:14:55
 */

const download = require('download-git-repo');
const path = require('path');
const ora = require('ora');
const chalk = require('chalk')
const logSymbols = require('log-symbols')

module.exports = function(target) {
	//target = path.join(target || '.', '.download-temp');
	const spinner = ora('正在下载项目模板，源地址:https://github.com/hammercui/react-umi-starter');
	spinner.start();
	return new Promise((resolve, reject) => {
		// 这里可以根据具体的模板地址设置下载的url，注意，如果是git，url后面的branch不能忽略
		download('github:hammercui/react-umi-starter', target, false, err => {
			spinner.stop();
			if (err) {
                spinner.fail();
				reject(err);
			} else {
                // 下载的模板存放在一个临时路径中，下载完成后，可以向下通知这个临时路径，以便后续处理
                spinner.succeed()
				resolve(target);
			}
		});
	});
};
