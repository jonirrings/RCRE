"use strict";
/**
 * @file 测试代理服务器
 * @author dongtiancheng@baidu.com
 */
exports.__esModule = true;
var express = require("express");
var cors = require("cors");
var fs = require("fs");
var path = require("path");
var app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, '../build/website')));
app.get('*', function (req, res, next) {
    var indexFile = fs.createReadStream(path.join(__dirname, './index.html'));
    indexFile.pipe(res);
});
// // catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    res.status(404);
    next(err);
});
console.log('server listening at 0.0.0.0:' + (process.env.PORT || 8800));
app.listen(process.env.PORT || 8800);
