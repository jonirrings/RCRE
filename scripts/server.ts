/**
 * @file 测试代理服务器
 * @author dongtiancheng@baidu.com
 */

import * as express from 'express';
import * as cors from 'cors';
import * as fs from 'fs';
import * as path from 'path';

const app = express();

app.use(cors());
app.use(express.static(path.join(process.cwd(), './build/website')));

app.get('*', (req, res, next) => {
    let indexFile = fs.createReadStream(path.join(process.cwd(), './build/website/index.html'));
    indexFile.pipe(res);
});

// // catch 404 and forward to error handler
app.use((req, res, next) => {
    let err = new Error('Not Found');
    res.status(404);
    next(err);
});

console.log('server listening at 0.0.0.0:' + (process.env.PORT || 8800));
app.listen(process.env.PORT || 8800);