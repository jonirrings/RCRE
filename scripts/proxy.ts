/**
 * @file 测试代理服务器
 * @author dongtiancheng@baidu.com
 */

import * as express from 'express';
import * as request from 'request';
import {CoreOptions} from 'request';
import * as cors from 'cors';

let linechart = require('./mock/linechart.json');

const app = express();

app.use(cors());

app.use('/proxy', (req, res, next) => {
    console.log(`
    PROXY: 
        URL: ${req.query.url}
        METHOD: ${req.query.method}
        data: ${req.query.data}
    `);

    next();
});

app.get('/proxy', (req, res) => {
    let url: string = req.query.url;
    let method: string = req.query.method;
    let data: string = req.query.data;

    let options: CoreOptions = {};
    
    if (data) {
        try {
            data = JSON.parse(data);
        } catch (e) {
            return res.json({
                errno: 400,
                errmsg: 'data should be json format'
            });
        }

        if (/get/i.test(method)) {
            options.qs = data;
        } else if (/post/i.test(method)) {
            options.body = data;
        }
    }
    
    return request(url, options).pipe(res);
});

app.get('/api/mock/linechart', (req, res) => {
    return res.json(linechart);
});

app.post('/submit', (req, res) => {
    res.json({
        errno: 0,
        errmsg: 'ok',
        data: req.body
    });
});

// // catch 404 and forward to error handler
app.use((req, res, next) => {
    let err = new Error('Not Found');
    res.status(404);
    next(err);
});

console.log('server listening at 0.0.0.0:' + (process.env.PORT || 8800));
app.listen(process.env.PORT || 8800);