/**
 * @file 发布脚本
 * @author dongtiancheng
 */

const path = require('path');
const fs = require('fs');
const repoInfo = require('../../package.json');

const DIST_JS = path.join(__dirname, '../../build/full/fullBundle.js');
const DIST_CSS = path.join(__dirname, '../../build/full/fullBundle.css');

let BOS = require('./utils/uploadToBos');

let version = repoInfo.version;

let jsName = `rcre_${version}.js`;
let cssName = `rcre_${version}.css`;
let lastestJs = 'rcre_lastest.js';
let lastestCss = 'rcre_lastest.css';
let repoVersion = 'rcre_version.json';

let jsFile = fs.readFileSync(DIST_JS);
let cssFile = fs.readFileSync(DIST_CSS);

BOS.getString(repoVersion).then(str => {
    let body = str.body.toString();
    let jsonInfo = JSON.parse(body);

    if (jsonInfo.version.indexOf(version) < 0) {
        jsonInfo.version.unshift(version);
    }

    return BOS.putString(repoVersion, JSON.stringify(jsonInfo), {
        'Content-Type': 'application/json'
    });
}).then(() => BOS.putString(jsName, jsFile, {
    'Content-Type': 'application/javascript'
})).then(() => BOS.putString(cssName, cssFile, {
    'Content-Type': 'text/css'
})).then(() => BOS.putString(lastestJs, jsFile, {
    'Content-Type': 'application/javascript'
})).then(() => BOS.putString(lastestCss, cssFile, {
    'Content-Type': 'text/css'
})).then(() => {
    console.log(`http://miskit.cdn.bcebos.com/miskit/${jsName}`);
    console.log(`http://miskit.cdn.bcebos.com/miskit/${cssName}`);
    console.log(`http://miskit.cdn.bcebos.com/miskit/${lastestJs}`);
    console.log(`http://miskit.cdn.bcebos.com/miskit/${lastestCss}`);
    console.log('upload success');
});