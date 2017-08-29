const path = require('path');
const fs = require('fs');
const repoInfo = require('../../package.json');

const DIST_JS = path.join(__dirname, '../../build/main.js');
const DIST_CSS = path.join(__dirname, '../../build/main.css');

let BOS = require('./utils/uploadToBos');

let version = repoInfo.version;

let jsName = `rcre_${version}.js`;
let cssName= `rcre_${version}.css`;
let repoVersion = `rcre_version.json`;

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
}).then(() => {
    return BOS.putString(jsName, jsFile, {
        'Content-Type': 'application/javascript'
    }).then(() => {
        return BOS.putString(cssName, cssFile, {
            'Content-Type': 'text/css'
        })
    }).then(() => {
        console.log('upload success');
    });
});