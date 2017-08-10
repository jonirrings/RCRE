/**
 * @file 文件转化工具
 * @author dongtiancheng@baidu.com
 */
/**
 * Copyright (c) 2014-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */
// @remove-on-eject-end
'use strict';

const path = require('path');

// This is a custom Jest transformer turning file imports into filenames.
// http://facebook.github.io/jest/docs/tutorial-webpack.html

module.exports = {
    process(src, filename) {
        let basename = path.basename(filename);
        return `module.exports = ${JSON.stringify(basename)};`;
    }
};
