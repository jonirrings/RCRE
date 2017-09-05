/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 85);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("class-validator");

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var class_validator_1 = __webpack_require__(1);
var lodash_1 = __webpack_require__(5);
var paramCheck_1 = __webpack_require__(20);
var IsPageInfo = function () {
    function IsPageInfo() {
        this.errmsg = '';
    }
    IsPageInfo.prototype.validate = function (info, args) {
        var errRet = paramCheck_1.default(info, args.constraints[0]);
        this.errmsg = errRet.map(function (err) {
            var constraints = err.constraints;
            return lodash_1.map(constraints, function (i) {
                return i;
            }).join('');
        }).join('\n');
        return errRet.length === 0;
    };
    IsPageInfo.prototype.defaultMessage = function () {
        return this.errmsg;
    };
    IsPageInfo = __decorate([class_validator_1.ValidatorConstraint({
        name: 'IsPageInfo',
        async: false
    })], IsPageInfo);
    return IsPageInfo;
}();
exports.IsPageInfo = IsPageInfo;
var IsArrayString = function () {
    function IsArrayString() {}
    IsArrayString.prototype.validate = function (value, args) {
        if (!Array.isArray(value)) {
            return false;
        }
        return value.every(function (i) {
            return typeof i === 'string';
        });
    };
    IsArrayString.prototype.defaultMessage = function (args) {
        return args.targetName + " should the an array which every item's type is string";
    };
    IsArrayString = __decorate([class_validator_1.ValidatorConstraint({
        name: 'IsArrayString',
        async: false
    })], IsArrayString);
    return IsArrayString;
}();
exports.IsArrayString = IsArrayString;
var IsCheckedKeys = function () {
    function IsCheckedKeys() {}
    IsCheckedKeys.prototype.validate = function (value, args) {
        if (Array.isArray(value)) {
            return value.every(function (i) {
                return typeof i === 'string';
            });
        }
        if (value.checked && value.halfChecked) {
            return value.checked.every(function (i) {
                return typeof i === 'string';
            }) && value.halfChecked.every(function (i) {
                return typeof i === 'string';
            });
        }
        return false;
    };
    IsCheckedKeys.prototype.defaultMessage = function (args) {
        return args.targetName + " is not valide for string[] | { checked: string[], halfChecked: string[] }";
    };
    IsCheckedKeys = __decorate([class_validator_1.ValidatorConstraint({
        name: 'IsCheckedKeys',
        async: false
    })], IsCheckedKeys);
    return IsCheckedKeys;
}();
exports.IsCheckedKeys = IsCheckedKeys;
var IsValidEnums = function () {
    function IsValidEnums() {}
    IsValidEnums.prototype.validate = function (value, args) {
        var enums = args.constraints;
        return enums.indexOf(value) >= 0;
    };
    IsValidEnums.prototype.defaultMessage = function (args) {
        return args.targetName + " is not in " + args.constraints.join(',');
    };
    IsValidEnums = __decorate([class_validator_1.ValidatorConstraint({
        name: 'IsValidEnums',
        async: false
    })], IsValidEnums);
    return IsValidEnums;
}();
exports.IsValidEnums = IsValidEnums;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("antd");

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __extends = this && this.__extends || function () {
    var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
        d.__proto__ = b;
    } || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = this && this.__metadata || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var class_validator_1 = __webpack_require__(1);
var validators_1 = __webpack_require__(2);
var Col_1 = __webpack_require__(13);
var PropTypes = __webpack_require__(12);
var React = __webpack_require__(0);
var BasicConfig = function (_super) {
    __extends(BasicConfig, _super);
    function BasicConfig() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([class_validator_1.IsString()
    // @IsDefined()

    , __metadata("design:type", String)], BasicConfig.prototype, "type", void 0);
    __decorate([class_validator_1.IsString(), __metadata("design:type", String)], BasicConfig.prototype, "model", void 0);
    return BasicConfig;
}(Col_1.ColConfig);
exports.BasicConfig = BasicConfig;
var BasicTriggerEvent = function () {
    function BasicTriggerEvent() {}
    return BasicTriggerEvent;
}();
exports.BasicTriggerEvent = BasicTriggerEvent;
var BasicContainerPropsInterface = function (_super) {
    __extends(BasicContainerPropsInterface, _super);
    function BasicContainerPropsInterface() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([class_validator_1.Validate(validators_1.IsPageInfo, [BasicConfig]), __metadata("design:type", BasicConfig)], BasicContainerPropsInterface.prototype, "info", void 0);
    return BasicContainerPropsInterface;
}(Col_1.ColPropsInterface);
exports.BasicContainerPropsInterface = BasicContainerPropsInterface;
var ContainerProps = function (_super) {
    __extends(ContainerProps, _super);
    function ContainerProps() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ContainerProps;
}(BasicContainerPropsInterface);
exports.ContainerProps = ContainerProps;
exports.BasicContextTypes = {
    driver: PropTypes.object,
    form: PropTypes.bool,
    abstractContainer: PropTypes.bool,
    $store: PropTypes.object,
    $global: PropTypes.object,
    $triggerListData: PropTypes.func,
    $location: PropTypes.object,
    $query: PropTypes.object
};
var BasicContainer = function (_super) {
    __extends(BasicContainer, _super);
    function BasicContainer() {
        return _super.call(this) || this;
    }
    BasicContainer.prototype.renderChildren = function (children) {
        if (this.props.info.hidden) {
            return React.createElement('div');
        }
        return children;
    };
    BasicContainer.contextTypes = exports.BasicContextTypes;
    return BasicContainer;
}(Col_1.default);
exports.BasicContainer = BasicContainer;

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("lodash");

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __extends = this && this.__extends || function () {
    var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
        d.__proto__ = b;
    } || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var _ = __webpack_require__(5);
var types_1 = __webpack_require__(4);
var createElement_1 = __webpack_require__(7);
var types_2 = __webpack_require__(67);
var vm_1 = __webpack_require__(8);
var immutable_1 = __webpack_require__(11);
var FormItem_1 = __webpack_require__(9);
var TriggerPropsInterface = function (_super) {
    __extends(TriggerPropsInterface, _super);
    function TriggerPropsInterface() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return TriggerPropsInterface;
}(types_1.BasicContainerPropsInterface);
exports.TriggerPropsInterface = TriggerPropsInterface;
var Trigger = function (_super) {
    __extends(Trigger, _super);
    function Trigger() {
        var _this = _super.call(this) || this;
        _this.handleTrigger = _this.handleTrigger.bind(_this);
        return _this;
    }
    Trigger.prototype.render = function () {
        var _this = this;
        var driver = this.context.driver;
        var componentInfo = driver.getComponent(this.props.info.type);
        if (!componentInfo) {
            return React.createElement("pre", null, "can not find module " + this.props.info.type);
        }
        var Component = componentInfo.component;
        var componentInterface = componentInfo.componentInterface;
        var childProps = this.props;
        if (this.props.info.trigger) {
            var mergeProps_1 = {};
            _.each(this.props.info.trigger, function (item, index) {
                _this.bindTrigger(item, mergeProps_1, childProps);
            });
            childProps = Object.assign({}, childProps, mergeProps_1);
        }
        var children = createElement_1.default(Component, componentInterface, childProps, this.props.children);
        if (this.context.form && this.props.info.type !== 'form') {
            children = this.wrapWithFormItem(children);
        }
        return children;
    };
    Trigger.prototype.handleLinkTrigger = function (item, model, value) {
        var _this = this;
        var href = item.href;
        var isRaw = item.isRaw;
        if (!href) {
            console.error('your must provide href attribute to finish jumping...');
            return;
        }
        var templateRegex = /{{([^}]+)}}/g;
        href = href.replace(templateRegex, function (str, expression) {
            if (!vm_1.isExpression(expression)) {
                return expression;
            }
            var ret = vm_1.runInContext(expression, {
                $resource: _this.props.$data.toObject(),
                $global: _this.context.$global
            });
            if (!ret) {
                return expression;
            }
            return isRaw ? ret : encodeURIComponent(ret);
        });
        location.href = href;
    };
    Trigger.prototype.handleDataTrigger = function (item, model, value) {
        var target = item.target;
        var $store = this.context.$store;
        if (!$store.has(target)) {
            console.error("can not find target model of target: " + target + " ");
            return;
        }
        var ship = item.ship;
        if (!_.isPlainObject(ship)) {
            console.error('you must provide ship to finish event trigger');
            return;
        }
        if (!this.props.$data) {
            console.error('can not find exist data model for trigger component');
            return;
        }
        var compiled = vm_1.compileValueExpress(ship, {
            $data: this.props.$data.toObject(),
            $global: this.context.$global,
            $event: {
                model: model,
                value: value
            }
        });
        var payload = [];
        _.each(compiled, function (val, name) {
            payload.push({
                type: name,
                newValue: val
            });
        });
        this.context.$triggerListData(payload, target);
    };
    Trigger.prototype.handleTrigger = function (item, triggerType) {
        var _this = this;
        return function (model, value) {
            switch (triggerType) {
                case 'link':
                    _this.handleLinkTrigger(item, model, value);
                    break;
                case 'data':
                default:
                    _this.handleDataTrigger(item, model, value);
            }
        };
    };
    Trigger.prototype.bindTrigger = function (item, mergeProps, childProps) {
        var _this = this;
        var eventType = item.eventType;
        var triggerType = item.triggerType;
        if (!types_2.validEventTrigger[eventType]) {
            return;
        }
        var method = types_2.validEventTrigger[eventType];
        if (childProps[method]) {
            var oldFn_1 = childProps[method];
            mergeProps[method] = function (value) {
                oldFn_1(value);
                setTimeout(function () {
                    _this.handleTrigger(item, triggerType)(_this.props.info.model, value);
                });
            };
        } else {
            mergeProps[method] = function (event) {
                var target = event.currentTarget;
                var value = target.value;
                _this.handleTrigger(item, triggerType)(_this.props.info.model, value);
            };
        }
    };
    Trigger.prototype.wrapWithFormItem = function (children) {
        return createElement_1.default(FormItem_1.default, FormItem_1.FormItemPropsInterface, this.props, children);
    };
    Trigger.defaultProps = {
        $data: immutable_1.Map({})
    };
    return Trigger;
}(types_1.BasicContainer);
exports.default = Trigger;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var _ = __webpack_require__(5);
var paramCheck_1 = __webpack_require__(20);
function createElement(component, componentInterFace, props, children) {
    var validateResults = paramCheck_1.default(props, componentInterFace);
    if (validateResults.length > 0) {
        var errmsg_1 = '';
        validateResults.forEach(function (item) {
            _.each(item.constraints, function (msg, name) {
                errmsg_1 += name + ": " + msg + "\n";
            });
        });
        console.trace(props);
        return React.createElement('pre', props, errmsg_1);
    }
    return React.createElement(component, props, children);
}
exports.default = createElement;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var _ = __webpack_require__(5);
function runInContext(code, context) {
    var f;
    try {
        var params_1 = [];
        var source_1 = [];
        _.each(context, function (value, name) {
            params_1.push(name);
            source_1.push(value);
        });
        params_1.push("return " + code);
        f = new (Function.bind.apply(Function, [void 0].concat(params_1)))();
        return f.apply(context, source_1);
    } catch (e) {
        // console.error(e, f);
        return null;
        // TODO better error report   
    }
}
exports.runInContext = runInContext;
function compileValueExpress(props, pair) {
    var copy = _.cloneDeep(props);
    function parseExpression(reference, val, name) {
        if (isExpression(val)) {
            var parseRet = runInContext(val, pair);
            if (!_.isNil(parseRet)) {
                reference[name] = parseRet;
            } else {
                // TODO use class-validator to reflect types and set default values
            }
            if (_.isPlainObject(val)) {
                reference[name] = compileValueExpress(val, pair);
            }
        }
    }
    _.each(copy, function (item, key) {
        if (isExpression(item)) {
            var parseRet = runInContext(item, pair);
            if (!_.isNil(parseRet)) {
                copy[key] = parseRet;
            } else {
                // TODO use class-validator to reflect types and set default values
            }
        } else if (_.isPlainObject(item) || _.isArray(item)) {
            _.each(item, function (val, name) {
                parseExpression(item, val, name);
            });
        } else {
            copy[key] = item;
        }
    });
    return copy;
}
exports.compileValueExpress = compileValueExpress;
function isExpression(str) {
    return typeof str === 'string' && str.indexOf('$') >= 0;
}
exports.isExpression = isExpression;
function filterExpressionData(obj) {
    _.each(obj, function (val, name) {
        if (isExpression(val)) {
            delete obj[name];
        }
    });
    return obj;
}
exports.filterExpressionData = filterExpressionData;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __extends = this && this.__extends || function () {
    var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
        d.__proto__ = b;
    } || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = this && this.__metadata || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var types_1 = __webpack_require__(10);
var class_validator_1 = __webpack_require__(1);
var validators_1 = __webpack_require__(2);
var Col_1 = __webpack_require__(13);
var PropTypes = __webpack_require__(12);
var classnames_1 = __webpack_require__(73);
var FormItemConfig = function (_super) {
    __extends(FormItemConfig, _super);
    function FormItemConfig() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([class_validator_1.IsString(), __metadata("design:type", String)], FormItemConfig.prototype, "label", void 0);
    __decorate([class_validator_1.IsBoolean(), __metadata("design:type", Boolean)], FormItemConfig.prototype, "required", void 0);
    __decorate([class_validator_1.IsString(), __metadata("design:type", String)], FormItemConfig.prototype, "pattern", void 0);
    __decorate([class_validator_1.IsString(), __metadata("design:type", String)], FormItemConfig.prototype, "errmsg", void 0);
    return FormItemConfig;
}(types_1.BasicFormItemConfig);
exports.FormItemConfig = FormItemConfig;
var FormItemPropsInterface = function (_super) {
    __extends(FormItemPropsInterface, _super);
    function FormItemPropsInterface() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([class_validator_1.Validate(validators_1.IsPageInfo, [FormItemConfig]), __metadata("design:type", FormItemConfig)], FormItemPropsInterface.prototype, "info", void 0);
    return FormItemPropsInterface;
}(types_1.BasicFormItemPropsInterface);
exports.FormItemPropsInterface = FormItemPropsInterface;
var BasicFormItem = function (_super) {
    __extends(BasicFormItem, _super);
    function BasicFormItem() {
        var _this = _super.call(this) || this;
        _this.handleChange = _this.handleChange.bind(_this);
        return _this;
    }
    BasicFormItem.prototype.getChildValue = function () {
        var runTimeKey = this.getRuntimeKey();
        if (!runTimeKey) {
            return null;
        }
        return this.props.$data.get(runTimeKey);
    };
    BasicFormItem.prototype.handleChange = function (value) {
        var runTimeKey = this.getRuntimeKey();
        if (!runTimeKey) {
            return;
        }
        this.props.onChange(runTimeKey, value);
    };
    BasicFormItem.prototype.renderChildren = function (children) {
        if (Col_1.hasColProps(this.props.info)) {
            children = React.createElement(Col_1.default, {
                info: this.props.info
            }, children);
        }
        if (this.props.info.hidden) {
            return React.createElement('div');
        }
        return children;
    };
    BasicFormItem.prototype.getRuntimeKey = function () {
        if (this.context.form && this.props.info.name) {
            // 作为Form组件下的受控组件
            return this.props.info.name;
        } else if (this.context.abstractContainer && this.props.info.childModel) {
            // 作为抽象Container组件下面的受控组件
            return this.props.info.childModel;
        } else if (this.props.info.model) {
            // 自己带有Container组件, 作为一个单独数据模型的组件
            return this.props.info.model;
        } else {
            console.error('You must provide an key to enable formItem to be controlled');
            return '';
        }
    };
    BasicFormItem.defaultProps = {
        value: ''
    };
    BasicFormItem.contextTypes = {
        driver: PropTypes.object,
        form: PropTypes.bool,
        abstractContainer: PropTypes.bool,
        $setData: PropTypes.func
    };
    return BasicFormItem;
}(React.Component);
exports.BasicFormItem = BasicFormItem;
var AbstractFormItem = function (_super) {
    __extends(AbstractFormItem, _super);
    function AbstractFormItem() {
        var _this = _super.call(this) || this;
        _this.state = {
            error: false,
            errmsg: ''
        };
        _this.validateFormItem = _this.validateFormItem.bind(_this);
        return _this;
    }
    AbstractFormItem.prototype.componentDidMount = function () {
        if (this.context.form && this.props.info.name) {
            this.props.injectChildElement(this.validateFormItem);
        }
    };
    AbstractFormItem.prototype.render = function () {
        var errorClass = classnames_1.default({
            'has-error': this.state.error,
            'ant-form-item': true
        });
        var child = React.createElement("div", { className: errorClass }, this.renderLabel(this.props.info, 8), this.wrapColumn(this.props.info, [this.addChangeProxyToChildren(this.props.children), this.renderExplain(this.props.info)], {
            colSpan: 16
        }));
        return this.wrapColumn(this.props.info, child);
    };
    AbstractFormItem.prototype.renderLabel = function (info, colSpan) {
        if (info.label) {
            var labelClass = classnames_1.default({
                'ant-form-item-required': info.required
            });
            var labelElement = React.createElement("div", { className: "ant-form-item-label" }, React.createElement("label", { className: labelClass }, info.label));
            return this.wrapColumn(info, labelElement, {
                colSpan: colSpan
            });
        }
        return '';
    };
    AbstractFormItem.prototype.wrapColumn = function (info, children, options) {
        if (options === void 0) {
            options = {};
        }
        return React.createElement(Col_1.default, {
            info: {
                colSpan: options.colSpan || info.colSpan,
                colOrder: options.colOrder || info.colOrder,
                colOffset: options.colOffset || info.colOffset,
                colPush: options.colPush || info.colPush,
                colPull: options.colPull || info.colPull
            }
        }, children);
    };
    AbstractFormItem.prototype.validateFormItem = function (value) {
        if (!value) {
            value = this.props.value;
        }
        if (this.props.info.required && !value) {
            this.setState({
                error: true,
                errmsg: this.props.info.label + " is required"
            });
            return false;
        }
        if (this.props.info.pattern) {
            var regex = new RegExp(this.props.info.pattern);
            if (!regex.test(value)) {
                this.setState({
                    error: true,
                    errmsg: value + " is not satisfied for " + this.props.info.pattern
                });
                return false;
            }
        }
        this.setState({
            error: false,
            errmsg: ''
        });
        return true;
    };
    AbstractFormItem.prototype.renderExplain = function (info) {
        if (!this.state.error) {
            return '';
        }
        return React.createElement("div", { className: "ant-form-explain", key: info.type + ".errmsg" }, this.state.errmsg || (info.label || info.name || info.type) + " is required");
    };
    AbstractFormItem.prototype.addChangeProxyToChildren = function (children) {
        var _this = this;
        return React.Children.map(children, function (child, index) {
            var oldOnChange = _this.props.onChange;
            var cloneProps = Object.assign({}, _this.props, {
                onChange: function (value, event) {
                    _this.validateFormItem(value);
                    oldOnChange(value, event);
                }
            });
            return React.cloneElement(child, cloneProps);
        });
    };
    return AbstractFormItem;
}(BasicFormItem);
exports.default = AbstractFormItem;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __extends = this && this.__extends || function () {
    var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
        d.__proto__ = b;
    } || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = this && this.__metadata || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var class_validator_1 = __webpack_require__(1);
var types_1 = __webpack_require__(4);
var BasicFormItemConfig = function (_super) {
    __extends(BasicFormItemConfig, _super);
    function BasicFormItemConfig() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([class_validator_1.IsString(), class_validator_1.IsDefined(), __metadata("design:type", String)], BasicFormItemConfig.prototype, "type", void 0);
    __decorate([class_validator_1.IsString(), __metadata("design:type", String)], BasicFormItemConfig.prototype, "initValue", void 0);
    __decorate([class_validator_1.IsString(), __metadata("design:type", String)], BasicFormItemConfig.prototype, "name", void 0);
    __decorate([class_validator_1.IsArray(), __metadata("design:type", Array)], BasicFormItemConfig.prototype, "controls", void 0);
    __decorate([class_validator_1.IsString(), __metadata("design:type", String)], BasicFormItemConfig.prototype, "childModel", void 0);
    return BasicFormItemConfig;
}(types_1.BasicConfig);
exports.BasicFormItemConfig = BasicFormItemConfig;
var BasicFormItemPropsInterface = function (_super) {
    __extends(BasicFormItemPropsInterface, _super);
    function BasicFormItemPropsInterface() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return BasicFormItemPropsInterface;
}(types_1.BasicContainerPropsInterface);
exports.BasicFormItemPropsInterface = BasicFormItemPropsInterface;

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("immutable");

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("prop-types");

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __extends = this && this.__extends || function () {
    var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
        d.__proto__ = b;
    } || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = this && this.__metadata || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var class_validator_1 = __webpack_require__(1);
var antd_1 = __webpack_require__(3);
var createElement_1 = __webpack_require__(7);
var ColConfig = function () {
    function ColConfig() {}
    __decorate([class_validator_1.IsNumber(), class_validator_1.Min(0), class_validator_1.Max(24), __metadata("design:type", Number)], ColConfig.prototype, "colSpan", void 0);
    __decorate([class_validator_1.IsNumber(), __metadata("design:type", Number)], ColConfig.prototype, "colOrder", void 0);
    __decorate([class_validator_1.IsNumber(), __metadata("design:type", Number)], ColConfig.prototype, "colOffset", void 0);
    __decorate([class_validator_1.IsNumber(), __metadata("design:type", Number)], ColConfig.prototype, "colPush", void 0);
    __decorate([class_validator_1.IsNumber(), __metadata("design:type", Number)], ColConfig.prototype, "colPull", void 0);
    return ColConfig;
}();
exports.ColConfig = ColConfig;
var AntColProps = function () {
    function AntColProps() {}
    return AntColProps;
}();
var ColPropsInterface = function () {
    function ColPropsInterface() {}
    return ColPropsInterface;
}();
exports.ColPropsInterface = ColPropsInterface;
function hasColProps(info) {
    return typeof info.colSpan !== 'undefined' || typeof info.colOrder !== 'undefined' || typeof info.colOffset !== 'undefined' || typeof info.colPull !== 'undefined' || typeof info.colPush !== 'undefined';
}
exports.hasColProps = hasColProps;
var AbstractCol = function (_super) {
    __extends(AbstractCol, _super);
    function AbstractCol() {
        return _super.call(this) || this;
    }
    AbstractCol.prototype.mapOptions = function (info) {
        return {
            span: info.colSpan || 24,
            order: info.colOrder || 0,
            offset: info.colOffset || 0,
            push: info.colPush || 0,
            pull: info.colPull || 0
        };
    };
    AbstractCol.prototype.render = function () {
        return createElement_1.default(antd_1.Col, ColPropsInterface, this.mapOptions(this.props.info), this.props.children);
    };
    return AbstractCol;
}(React.Component);
exports.default = AbstractCol;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __extends = this && this.__extends || function () {
    var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
        d.__proto__ = b;
    } || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var createChild_1 = __webpack_require__(16);
var createElement_1 = __webpack_require__(7);
var BasicLayoutConfig = function () {
    function BasicLayoutConfig() {}
    return BasicLayoutConfig;
}();
exports.BasicLayoutConfig = BasicLayoutConfig;
var BasicLayoutPropsInterface = function () {
    function BasicLayoutPropsInterface() {}
    return BasicLayoutPropsInterface;
}();
exports.BasicLayoutPropsInterface = BasicLayoutPropsInterface;
var BasicAbstractLayout = function (_super) {
    __extends(BasicAbstractLayout, _super);
    function BasicAbstractLayout() {
        return _super.call(this) || this;
    }
    BasicAbstractLayout.prototype.mapOptions = function (props) {
        return {
            style: props.style
        };
    };
    BasicAbstractLayout.prototype.renderComponent = function (Component, componentInterface) {
        var _this = this;
        var children;
        if (Array.isArray(this.props.info.children)) {
            children = this.props.info.children.map(function (info, index) {
                return createChild_1.createChild(info, {
                    info: info,
                    key: index
                }, _this.context.form);
            });
        }
        return createElement_1.default(Component, componentInterface, this.mapOptions(this.props.info), children);
    };
    return BasicAbstractLayout;
}(React.Component);
exports.BasicAbstractLayout = BasicAbstractLayout;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var Button_1 = __webpack_require__(23);
var Input_1 = __webpack_require__(28);
var Tree_1 = __webpack_require__(32);
var TreeNode_1 = __webpack_require__(18);
var LineChart_1 = __webpack_require__(24);
var Form_1 = __webpack_require__(27);
var Select_1 = __webpack_require__(30);
var Checkbox_1 = __webpack_require__(25);
var Radio_1 = __webpack_require__(29);
var Breadcrumb_1 = __webpack_require__(22);
var Table_1 = __webpack_require__(31);
var Datepicker_1 = __webpack_require__(26);
var Html_1 = __webpack_require__(42);
var Text_1 = __webpack_require__(43);
var Container_1 = __webpack_require__(38);
var Row_1 = __webpack_require__(65);
var Layout_1 = __webpack_require__(63);
var Header_1 = __webpack_require__(62);
var Sider_1 = __webpack_require__(64);
var Footer_1 = __webpack_require__(61);
var Content_1 = __webpack_require__(60);
var List_1 = __webpack_require__(40);
var Hr_1 = __webpack_require__(41);
var _ = __webpack_require__(5);
var ComponentLoader = function () {
    function ComponentLoader() {
        this.cache = new Map();
    }
    ComponentLoader.prototype.getAbstractComponent = function (type) {
        if (type.indexOf('.') >= 0) {
            type = type.split('.').slice(-1)[0];
        }
        return this.cache.get(type);
    };
    ComponentLoader.prototype.getDriverComponent = function (name, theme) {
        if (name.indexOf('.') >= 0) {
            theme = name.split('.')[0];
            name = name.split('.')[1];
        }
        return this.cache.get(theme + "." + name);
    };
    ComponentLoader.prototype.addComponent = function (type, component, componentInterface) {
        this.cache.set(type, {
            component: component,
            componentInterface: componentInterface
        });
    };
    return ComponentLoader;
}();
exports.ComponentLoader = ComponentLoader;
var config = {
    button: {
        component: Button_1.default,
        componentInterface: Button_1.ButtonPropsInterface
    },
    tree: {
        component: Tree_1.default,
        componentInterface: Tree_1.TreePropsInterface
    },
    treeNode: {
        component: TreeNode_1.default,
        componentInterface: TreeNode_1.TreeNodePropsInterface
    },
    lineChart: {
        component: LineChart_1.default,
        componentInterface: LineChart_1.LineChartPropsInterface
    },
    row: {
        component: Row_1.default,
        componentInterface: Row_1.RowPropsInterface
    },
    form: {
        component: Form_1.default,
        componentInterface: Form_1.FormPropsInterface
    },
    input: {
        component: Input_1.default,
        componentInterface: Input_1.InputPropsInterface
    },
    select: {
        component: Select_1.default,
        componentInterface: Select_1.SelectPropsInterface
    },
    checkbox: {
        component: Checkbox_1.default,
        componentInterface: Checkbox_1.CheckboxPropsInterface
    },
    radio: {
        component: Radio_1.default,
        componentInterface: Radio_1.RadioPropsInterface
    },
    breadcrumb: {
        component: Breadcrumb_1.default,
        componentInterface: Breadcrumb_1.BreadcrumbPropsInterface
    },
    table: {
        component: Table_1.default,
        componentInterface: Table_1.TablePropsInterface
    },
    datepicker: {
        component: Datepicker_1.default,
        componentInterface: Datepicker_1.DatePickerPropsInterface
    },
    html: {
        component: Html_1.default,
        componentInterface: Html_1.HtmlPropsInterface
    },
    text: {
        component: Text_1.default,
        componentInterface: Text_1.TextPropsInterface
    },
    layout: {
        component: Layout_1.default,
        componentInterface: Layout_1.LayoutPropsInterface
    },
    header: {
        component: Header_1.default,
        componentInterface: Header_1.HeaderPropsInterface
    },
    sider: {
        component: Sider_1.default,
        componentInterface: Sider_1.SidePropsInterface
    },
    content: {
        component: Content_1.default,
        componentInterface: Content_1.ContentPropsInterface
    },
    footer: {
        component: Footer_1.default,
        componentInterface: Footer_1.FooterPropsInterface
    },
    container: {
        component: Container_1.default,
        componentInterface: Container_1.ContainerPropsInterface
    },
    list: {
        component: List_1.default,
        componentInterface: List_1.ListPropsInterface
    },
    hr: {
        component: Hr_1.default,
        componentInterface: Hr_1.HrPropsInterface
    }
};
var loader = new ComponentLoader();
_.each(config, function (info, name) {
    var component = info.component;
    loader.addComponent(name, component, info.componentInterface);
});
exports.default = loader;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var _ = __webpack_require__(5);
var types_1 = __webpack_require__(4);
var index_1 = __webpack_require__(33);
var componentLoader_1 = __webpack_require__(15);
var createElement_1 = __webpack_require__(7);
function createChild(item, childProps, inForm, abstractContainer) {
    if (inForm === void 0) {
        inForm = false;
    }
    if (abstractContainer === void 0) {
        abstractContainer = false;
    }
    if (!_.isPlainObject(item)) {
        console.error('invalid Item Object', item);
        return React.createElement('div', {}, 'invalid Item Object');
    }
    var component;
    var componentInterface;
    // if (item.hidden) {
    //     return React.createElement('div', {
    //         key: Math.random()
    //     });
    // }
    if (item.data && !inForm && !abstractContainer) {
        component = index_1.default;
        componentInterface = types_1.BasicContainerPropsInterface;
    } else {
        var componentInfo = componentLoader_1.default.getAbstractComponent(item.type);
        if (!componentInfo) {
            return React.createElement('pre', {}, "can not find component of type " + item.type);
        }
        component = componentInfo.component;
        componentInterface = componentInfo.componentInterface;
    }
    return createElement_1.default(component, componentInterface, childProps);
}
exports.createChild = createChild;

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = require("redux");

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __extends = this && this.__extends || function () {
    var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
        d.__proto__ = b;
    } || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = this && this.__metadata || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = __webpack_require__(4);
var createElement_1 = __webpack_require__(7);
var class_validator_1 = __webpack_require__(1);
var TreeNodeConfig = function (_super) {
    __extends(TreeNodeConfig, _super);
    function TreeNodeConfig() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([class_validator_1.IsString(), __metadata("design:type", Object)], TreeNodeConfig.prototype, "title", void 0);
    __decorate([class_validator_1.IsString(), __metadata("design:type", String)], TreeNodeConfig.prototype, "key", void 0);
    __decorate([class_validator_1.IsArray(), __metadata("design:type", Array)], TreeNodeConfig.prototype, "children", void 0);
    __decorate([class_validator_1.IsBoolean(), __metadata("design:type", Boolean)], TreeNodeConfig.prototype, "disabled", void 0);
    __decorate([class_validator_1.IsBoolean(), __metadata("design:type", Boolean)], TreeNodeConfig.prototype, "disableCheckbox", void 0);
    __decorate([class_validator_1.IsBoolean(), __metadata("design:type", Boolean)], TreeNodeConfig.prototype, "isLeaf", void 0);
    return TreeNodeConfig;
}(types_1.BasicConfig);
exports.TreeNodeConfig = TreeNodeConfig;
var TreeNodeMappingConfig = function () {
    function TreeNodeMappingConfig() {}
    __decorate([class_validator_1.IsString(), __metadata("design:type", String)], TreeNodeMappingConfig.prototype, "title", void 0);
    __decorate([class_validator_1.IsString(), __metadata("design:type", String)], TreeNodeMappingConfig.prototype, "key", void 0);
    __decorate([class_validator_1.IsString(), __metadata("design:type", String)], TreeNodeMappingConfig.prototype, "children", void 0);
    __decorate([class_validator_1.IsString(), __metadata("design:type", String)], TreeNodeMappingConfig.prototype, "disabled", void 0);
    __decorate([class_validator_1.IsString(), __metadata("design:type", String)], TreeNodeMappingConfig.prototype, "disableCheckbox", void 0);
    __decorate([class_validator_1.IsString(), __metadata("design:type", String)], TreeNodeMappingConfig.prototype, "isLeaf", void 0);
    return TreeNodeMappingConfig;
}();
exports.TreeNodeMappingConfig = TreeNodeMappingConfig;
var TreeNodePropsInterface = function (_super) {
    __extends(TreeNodePropsInterface, _super);
    function TreeNodePropsInterface() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return TreeNodePropsInterface;
}(types_1.BasicContainerPropsInterface);
exports.TreeNodePropsInterface = TreeNodePropsInterface;
var AbstractTreeNode = function (_super) {
    __extends(AbstractTreeNode, _super);
    function AbstractTreeNode() {
        return _super.call(this) || this;
    }
    AbstractTreeNode.prototype.render = function () {
        var driver = this.context.driver;
        var componentInfo = driver.getComponent('treeNode');
        return createElement_1.default(componentInfo.component, componentInfo.componentInterface, this.props, this.props.children);
    };
    return AbstractTreeNode;
}(types_1.BasicContainer);
// 为了兼容rc-tree非常恶心的实现方式
// 需要让AbstractTreeNode也被AntTree当作是AntTreeNode. 这样才能拿到要传递给下层所需要的属性值
// https://github.com/react-component/tree/blob/master/src/TreeNode.jsx#L187
AbstractTreeNode.isTreeNode = true;
exports.default = AbstractTreeNode;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
exports.SET_DATA = 'SET_DATA';
exports.SET_DATA_LIST = 'SET_DATA_LIST';
exports.INIT_DATA = 'INIT_DATA';
exports.TRIGGER_LIST_DATA = 'TRIGGER_LIST_DATA';
exports.CLEAR_DATA = 'CLEAR_DATA';
exports.REMOVE_DATA = 'REMOVE_DATA';
exports.actionCreators = {
    setData: function (payload, model) {
        return {
            type: exports.SET_DATA,
            payload: payload,
            model: model
        };
    },
    triggerListData: function (payload, model) {
        return {
            type: exports.TRIGGER_LIST_DATA,
            payload: payload,
            model: model
        };
    },
    initData: function (payload) {
        return {
            type: exports.INIT_DATA,
            payload: payload
        };
    },
    setDataList: function (payload, model) {
        return {
            type: exports.SET_DATA_LIST,
            payload: payload,
            model: model
        };
    },
    clearData: function () {
        return {
            type: exports.CLEAR_DATA
        };
    },
    removeData: function (payload) {
        return {
            type: exports.REMOVE_DATA,
            payload: payload
        };
    }
};

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var class_validator_1 = __webpack_require__(1);
function paramCheck(info, validateClass) {
    var validateObj = new validateClass();
    Object.assign(validateObj, info);
    return class_validator_1.validateSync(validateObj, {
        skipMissingProperties: true
    });
}
exports.default = paramCheck;

/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = require("react-redux");

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __extends = this && this.__extends || function () {
    var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
        d.__proto__ = b;
    } || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = this && this.__metadata || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = __webpack_require__(4);
var validators_1 = __webpack_require__(2);
var class_validator_1 = __webpack_require__(1);
var React = __webpack_require__(0);
var Trigger_1 = __webpack_require__(6);
var BreadcrumbItem = function () {
    function BreadcrumbItem() {}
    __decorate([class_validator_1.IsString(), class_validator_1.IsDefined(), __metadata("design:type", String)], BreadcrumbItem.prototype, "name", void 0);
    __decorate([class_validator_1.IsString(), class_validator_1.IsDefined(), __metadata("design:type", String)], BreadcrumbItem.prototype, "path", void 0);
    return BreadcrumbItem;
}();
exports.BreadcrumbItem = BreadcrumbItem;
var BreadcrumbConfig = function (_super) {
    __extends(BreadcrumbConfig, _super);
    function BreadcrumbConfig() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([class_validator_1.IsDefined(), __metadata("design:type", Array)], BreadcrumbConfig.prototype, "items", void 0);
    return BreadcrumbConfig;
}(types_1.BasicConfig);
exports.BreadcrumbConfig = BreadcrumbConfig;
var BreadcrumbPropsInterface = function (_super) {
    __extends(BreadcrumbPropsInterface, _super);
    function BreadcrumbPropsInterface() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([class_validator_1.Validate(validators_1.IsPageInfo, [BreadcrumbConfig]), __metadata("design:type", BreadcrumbConfig)], BreadcrumbPropsInterface.prototype, "info", void 0);
    return BreadcrumbPropsInterface;
}(types_1.BasicContainerPropsInterface);
exports.BreadcrumbPropsInterface = BreadcrumbPropsInterface;
var AbstractBreadcrumb = function (_super) {
    __extends(AbstractBreadcrumb, _super);
    function AbstractBreadcrumb() {
        return _super.call(this) || this;
    }
    AbstractBreadcrumb.prototype.render = function () {
        var children = React.createElement(Trigger_1.default, this.props);
        return this.renderChildren(children);
    };
    return AbstractBreadcrumb;
}(types_1.BasicContainer);
exports.default = AbstractBreadcrumb;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __extends = this && this.__extends || function () {
    var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
        d.__proto__ = b;
    } || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = this && this.__metadata || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var class_validator_1 = __webpack_require__(1);
var types_1 = __webpack_require__(4);
var Col_1 = __webpack_require__(13);
var Trigger_1 = __webpack_require__(6);
var ButtonConfig = function (_super) {
    __extends(ButtonConfig, _super);
    function ButtonConfig() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([class_validator_1.IsString(), class_validator_1.IsDefined(), __metadata("design:type", String)], ButtonConfig.prototype, "text", void 0);
    __decorate([class_validator_1.IsString(), __metadata("design:type", Object)], ButtonConfig.prototype, "buttonType", void 0);
    __decorate([class_validator_1.IsString(), __metadata("design:type", String)], ButtonConfig.prototype, "htmlType", void 0);
    __decorate([class_validator_1.IsString(), __metadata("design:type", String)], ButtonConfig.prototype, "icon", void 0);
    __decorate([class_validator_1.IsString(), __metadata("design:type", Object)], ButtonConfig.prototype, "shape", void 0);
    __decorate([class_validator_1.IsString(), __metadata("design:type", Object)], ButtonConfig.prototype, "size", void 0);
    __decorate([class_validator_1.IsBoolean(), __metadata("design:type", Boolean)], ButtonConfig.prototype, "loading", void 0);
    __decorate([class_validator_1.IsBoolean(), __metadata("design:type", Boolean)], ButtonConfig.prototype, "ghost", void 0);
    return ButtonConfig;
}(types_1.BasicConfig);
exports.ButtonConfig = ButtonConfig;
var ButtonPropsInterface = function (_super) {
    __extends(ButtonPropsInterface, _super);
    function ButtonPropsInterface() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ButtonPropsInterface;
}(types_1.BasicContainerPropsInterface);
exports.ButtonPropsInterface = ButtonPropsInterface;
var AbstractButton = function (_super) {
    __extends(AbstractButton, _super);
    function AbstractButton() {
        return _super.call(this) || this;
    }
    AbstractButton.prototype.render = function () {
        var props = this.props;
        var children = React.createElement(Trigger_1.default, props);
        if (Col_1.hasColProps(props.info)) {
            children = React.createElement(Col_1.default, {
                info: this.props.info
            }, children);
        }
        return this.renderChildren(children);
    };
    AbstractButton.defaultProps = {
        onClick: function () {}
    };
    return AbstractButton;
}(types_1.BasicContainer);
exports.default = AbstractButton;

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __extends = this && this.__extends || function () {
    var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
        d.__proto__ = b;
    } || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = this && this.__metadata || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = __webpack_require__(4);
var class_validator_1 = __webpack_require__(1);
var validators_1 = __webpack_require__(2);
var React = __webpack_require__(0);
var Trigger_1 = __webpack_require__(6);
var LineChartConfig = function (_super) {
    __extends(LineChartConfig, _super);
    function LineChartConfig() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([class_validator_1.IsString(), __metadata("design:type", String)], LineChartConfig.prototype, "width", void 0);
    __decorate([class_validator_1.IsString(), __metadata("design:type", String)], LineChartConfig.prototype, "height", void 0);
    __decorate([class_validator_1.IsBoolean(), __metadata("design:type", Boolean)], LineChartConfig.prototype, "tooltip", void 0);
    __decorate([class_validator_1.IsString(), __metadata("design:type", String)], LineChartConfig.prototype, "title", void 0);
    __decorate([class_validator_1.Validate(validators_1.IsArrayString), __metadata("design:type", Array)], LineChartConfig.prototype, "categories", void 0);
    __decorate([class_validator_1.IsBoolean(), __metadata("design:type", Boolean)], LineChartConfig.prototype, "toolbox", void 0);
    __decorate([class_validator_1.Validate(validators_1.IsArrayString), __metadata("design:type", Array)], LineChartConfig.prototype, "xAxisData", void 0);
    __decorate([class_validator_1.IsBoolean(), __metadata("design:type", Boolean)], LineChartConfig.prototype, "dataZoom", void 0);
    __decorate([class_validator_1.IsArray(), __metadata("design:type", Array)], LineChartConfig.prototype, "series", void 0);
    return LineChartConfig;
}(types_1.BasicConfig);
exports.LineChartConfig = LineChartConfig;
var LineChartPropsInterface = function (_super) {
    __extends(LineChartPropsInterface, _super);
    function LineChartPropsInterface() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return LineChartPropsInterface;
}(types_1.BasicContainerPropsInterface);
exports.LineChartPropsInterface = LineChartPropsInterface;
var AbstractLineChart = function (_super) {
    __extends(AbstractLineChart, _super);
    function AbstractLineChart() {
        return _super.call(this) || this;
    }
    AbstractLineChart.prototype.render = function () {
        var children = React.createElement(Trigger_1.default, this.props);
        return this.renderChildren(children);
    };
    return AbstractLineChart;
}(types_1.BasicContainer);
exports.default = AbstractLineChart;

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __extends = this && this.__extends || function () {
    var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
        d.__proto__ = b;
    } || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = this && this.__metadata || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = __webpack_require__(10);
var class_validator_1 = __webpack_require__(1);
var validators_1 = __webpack_require__(2);
var FormItem_1 = __webpack_require__(9);
var Trigger_1 = __webpack_require__(6);
var React = __webpack_require__(0);
var _ = __webpack_require__(5);
var CheckboxConfig = function (_super) {
    __extends(CheckboxConfig, _super);
    function CheckboxConfig() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([class_validator_1.IsBoolean(), __metadata("design:type", Boolean)], CheckboxConfig.prototype, "defaultChecked", void 0);
    __decorate([class_validator_1.IsBoolean(), __metadata("design:type", Boolean)], CheckboxConfig.prototype, "disabled", void 0);
    __decorate([class_validator_1.IsString(), __metadata("design:type", String)], CheckboxConfig.prototype, "text", void 0);
    return CheckboxConfig;
}(types_1.BasicFormItemConfig);
exports.CheckboxConfig = CheckboxConfig;
var CheckboxPropsInterface = function (_super) {
    __extends(CheckboxPropsInterface, _super);
    function CheckboxPropsInterface() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([class_validator_1.Validate(validators_1.IsPageInfo, [CheckboxConfig]), __metadata("design:type", CheckboxConfig)], CheckboxPropsInterface.prototype, "info", void 0);
    return CheckboxPropsInterface;
}(types_1.BasicFormItemPropsInterface);
exports.CheckboxPropsInterface = CheckboxPropsInterface;
var AbstractCheckbox = function (_super) {
    __extends(AbstractCheckbox, _super);
    function AbstractCheckbox() {
        return _super.call(this) || this;
    }
    AbstractCheckbox.prototype.render = function () {
        var children = React.createElement(Trigger_1.default, Object.assign(_.clone(this.props), {
            value: this.getChildValue(),
            onChange: this.handleChange
        }));
        return this.renderChildren(children);
    };
    return AbstractCheckbox;
}(FormItem_1.BasicFormItem);
exports.default = AbstractCheckbox;

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __extends = this && this.__extends || function () {
    var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
        d.__proto__ = b;
    } || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = this && this.__metadata || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var FormItem_1 = __webpack_require__(9);
var types_1 = __webpack_require__(10);
var class_validator_1 = __webpack_require__(1);
var validators_1 = __webpack_require__(2);
var util_1 = __webpack_require__(39);
var Trigger_1 = __webpack_require__(6);
var DatePickerConfig = function (_super) {
    __extends(DatePickerConfig, _super);
    function DatePickerConfig() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([class_validator_1.Validate(validators_1.IsValidEnums, ['datepicker', 'datepicker+timepicker', 'timepicker']), __metadata("design:type", String)], DatePickerConfig.prototype, "mode", void 0);
    __decorate([class_validator_1.IsBoolean(), __metadata("design:type", Boolean)], DatePickerConfig.prototype, "disabled", void 0);
    __decorate([class_validator_1.IsString(), class_validator_1.IsNumber(), __metadata("design:type", String)], DatePickerConfig.prototype, "startTime", void 0);
    __decorate([class_validator_1.IsString(), class_validator_1.IsNumber(), __metadata("design:type", Number)], DatePickerConfig.prototype, "timeRange", void 0);
    __decorate([class_validator_1.IsString(), class_validator_1.IsNumber(), __metadata("design:type", String)], DatePickerConfig.prototype, "endTime", void 0);
    __decorate([class_validator_1.IsString(), __metadata("design:type", String)], DatePickerConfig.prototype, "placeholder", void 0);
    return DatePickerConfig;
}(types_1.BasicFormItemConfig);
exports.DatePickerConfig = DatePickerConfig;
var DatePickerPropsInterface = function (_super) {
    __extends(DatePickerPropsInterface, _super);
    function DatePickerPropsInterface() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return DatePickerPropsInterface;
}(types_1.BasicFormItemPropsInterface);
exports.DatePickerPropsInterface = DatePickerPropsInterface;
var AbstractDatepicker = function (_super) {
    __extends(AbstractDatepicker, _super);
    function AbstractDatepicker() {
        return _super.call(this) || this;
    }
    AbstractDatepicker.prototype.render = function () {
        var props = Object.assign({}, this.props, {
            value: this.getChildValue(),
            onChange: this.handleChange
        });
        var info = props.info;
        if (info.startTime) {
            info.startTime = util_1.parseTimeString(info.startTime).valueOf().toString();
        }
        if (info.endTime) {
            info.endTime = util_1.parseTimeString(info.endTime).valueOf().toString();
        }
        var children = React.createElement(Trigger_1.default, props);
        return this.renderChildren(children);
    };
    return AbstractDatepicker;
}(FormItem_1.BasicFormItem);
exports.default = AbstractDatepicker;

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __extends = this && this.__extends || function () {
    var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
        d.__proto__ = b;
    } || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = this && this.__metadata || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var componentLoader_1 = __webpack_require__(15);
var createElement_1 = __webpack_require__(7);
var immutable_1 = __webpack_require__(11);
var PropsTypes = __webpack_require__(12);
var types_1 = __webpack_require__(4);
var class_validator_1 = __webpack_require__(1);
var _ = __webpack_require__(5);
var Col_1 = __webpack_require__(13);
var validators_1 = __webpack_require__(2);
var Trigger_1 = __webpack_require__(6);
var api_1 = __webpack_require__(34);
var vm_1 = __webpack_require__(8);
var antd_1 = __webpack_require__(3);
var SubmitConfig = function () {
    function SubmitConfig() {}
    __decorate([class_validator_1.IsUrl(), __metadata("design:type", String)], SubmitConfig.prototype, "url", void 0);
    __decorate([class_validator_1.IsString(), __metadata("design:type", String)], SubmitConfig.prototype, "method", void 0);
    return SubmitConfig;
}();
var FormConfig = function (_super) {
    __extends(FormConfig, _super);
    function FormConfig() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([class_validator_1.IsString(), class_validator_1.IsDefined(), __metadata("design:type", String)], FormConfig.prototype, "title", void 0);
    __decorate([class_validator_1.IsArray(), __metadata("design:type", Array)], FormConfig.prototype, "controls", void 0);
    __decorate([class_validator_1.Validate(validators_1.IsPageInfo, [SubmitConfig]), __metadata("design:type", SubmitConfig)], FormConfig.prototype, "submit", void 0);
    return FormConfig;
}(types_1.BasicConfig);
exports.FormConfig = FormConfig;
var FormPropsInterface = function (_super) {
    __extends(FormPropsInterface, _super);
    function FormPropsInterface() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return FormPropsInterface;
}(types_1.BasicContainerPropsInterface);
exports.FormPropsInterface = FormPropsInterface;
var FormStatesInterface = function () {
    function FormStatesInterface() {}
    return FormStatesInterface;
}();
exports.FormStatesInterface = FormStatesInterface;
var AbstractForm = function (_super) {
    __extends(AbstractForm, _super);
    function AbstractForm() {
        var _this = _super.call(this) || this;
        _this.state = {
            submit: false
        };
        _this.handleSubmit = _this.handleSubmit.bind(_this);
        _this.injectChildElement = _this.injectChildElement.bind(_this);
        _this.childInstance = immutable_1.Map();
        _this.formItemStatus = [];
        return _this;
    }
    AbstractForm.prototype.getChildContext = function () {
        return {
            // 指代, form组件内的组件, 只要这个参数存在, 内部组件就不能存在container组件
            // 整个form的数据要高度统一
            form: true
        };
    };
    AbstractForm.prototype.handleSubmit = function (event) {
        var submitConfig = this.props.info.submit;
        if (!_.isPlainObject(submitConfig)) {
            return;
        }
        var status = true;
        this.formItemStatus.forEach(function (fn) {
            var ret = fn();
            if (!ret) {
                status = ret;
            }
        });
        if (!status) {
            console.log('form validate failed');
            return;
        }
        console.log('form validation success');
        var url = submitConfig.url;
        var data = submitConfig.data;
        var method = submitConfig.method;
        data = vm_1.compileValueExpress(data, {
            $data: this.props.$data.toObject(),
            $global: this.context.$global
        });
        return api_1.request(url, {
            url: url,
            method: method,
            data: data
        }, this.context.$global.proxyServer).then(function (ret) {
            antd_1.notification.info({
                message: '操作成功',
                description: ''
            });
            // TODO 暂时先这么搞
            setTimeout(function () {
                location.reload();
            }, 1000);
        });
    };
    AbstractForm.prototype.componentWillUnmount = function () {
        console.log('unmount form');
    };
    AbstractForm.prototype.render = function () {
        var _this = this;
        var controls = this.props.info.controls;
        var controlChildren;
        if (controls && controls.length > 0) {
            controlChildren = controls.map(function (control, index) {
                return _this.renderControl(control, 0, index);
            });
        }
        var props = Object.assign({}, this.props, {
            onSubmit: this.handleSubmit
        });
        var children = React.createElement(Trigger_1.default, props, [this.renderTitle(), controlChildren]);
        return this.renderChildren(children);
    };
    AbstractForm.prototype.renderControl = function (info, depth, index) {
        var _this = this;
        var type = info.type;
        var componentInfo = componentLoader_1.default.getAbstractComponent(type);
        if (!componentInfo) {
            console.error("can not find component of type " + type);
            return React.createElement("div", { key: Math.random() });
        }
        var component = componentInfo.component,
            componentInterface = componentInfo.componentInterface;
        // TODO There are some HTML elements which is impossible to have childNodes, like input
        // At this point, are warning should to printing if user try to generate a children of an input element
        var childElements;
        if (info.controls && Array.isArray(info.controls)) {
            childElements = info.controls.map(function (control, i) {
                _this.renderControl(control, depth++, i);
            });
        } else if (info.controls && _.isPlainObject(info.controls)) {
            childElements = this.renderControl(info.controls, depth++, 0);
        }
        var compiled = vm_1.compileValueExpress(info, {
            $data: this.props.$data.toObject(),
            $global: this.context.$global
        });
        var children = createElement_1.default(component, componentInterface, {
            // TODO collection enough info to generate unique key, to prevent updating from React diff algorithm
            key: info.type + "_" + depth + "_" + index,
            info: compiled,
            onChange: this.props.onChange,
            injectChildElement: this.injectChildElement,
            $data: this.props.$data,
            $setData: this.props.$setData,
            $setDataList: this.props.$setDataList
        }, childElements);
        if (typeof info.colSpan !== 'undefined') {
            return React.createElement(Col_1.default, {
                info: this.props.info
            }, children);
        }
        return children;
    };
    AbstractForm.prototype.renderTitle = function () {
        var info = this.props.info;
        if (!info.title) {
            return React.createElement("div", { key: "title" });
        }
        return React.createElement("div", { className: "form-title", key: "title" }, React.createElement("h3", null, info.title));
    };
    AbstractForm.prototype.injectChildElement = function (validator) {
        this.formItemStatus.push(validator);
    };
    AbstractForm.childContextTypes = {
        form: PropsTypes.bool
    };
    return AbstractForm;
}(types_1.BasicContainer);
exports.default = AbstractForm;

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __extends = this && this.__extends || function () {
    var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
        d.__proto__ = b;
    } || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = this && this.__metadata || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var FormItem_1 = __webpack_require__(9);
var class_validator_1 = __webpack_require__(1);
var validators_1 = __webpack_require__(2);
var types_1 = __webpack_require__(10);
var React = __webpack_require__(0);
var Trigger_1 = __webpack_require__(6);
var InputConfig = function (_super) {
    __extends(InputConfig, _super);
    function InputConfig() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([class_validator_1.Validate(validators_1.IsValidEnums, ['text', 'number', 'password', 'email']), __metadata("design:type", String)], InputConfig.prototype, "inputType", void 0);
    __decorate([class_validator_1.IsString(), __metadata("design:type", String)], InputConfig.prototype, "id", void 0);
    __decorate([class_validator_1.IsString(), __metadata("design:type", String)], InputConfig.prototype, "size", void 0);
    __decorate([class_validator_1.IsBoolean(), __metadata("design:type", Boolean)], InputConfig.prototype, "disabled", void 0);
    __decorate([class_validator_1.IsString(), __metadata("design:type", String)], InputConfig.prototype, "addonBefore", void 0);
    __decorate([class_validator_1.IsString(), __metadata("design:type", String)], InputConfig.prototype, "addonAfter", void 0);
    return InputConfig;
}(types_1.BasicFormItemConfig);
exports.InputConfig = InputConfig;
var InputPropsInterface = function (_super) {
    __extends(InputPropsInterface, _super);
    function InputPropsInterface() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return InputPropsInterface;
}(FormItem_1.FormItemPropsInterface);
exports.InputPropsInterface = InputPropsInterface;
var AbstractInput = function (_super) {
    __extends(AbstractInput, _super);
    function AbstractInput() {
        return _super.call(this) || this;
    }
    AbstractInput.prototype.render = function () {
        var props = this.props;
        var children = React.createElement(Trigger_1.default, Object.assign({}, props, {
            value: this.getChildValue(),
            onChange: this.handleChange
        }));
        return this.renderChildren(children);
    };
    return AbstractInput;
}(FormItem_1.BasicFormItem);
exports.default = AbstractInput;

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __extends = this && this.__extends || function () {
    var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
        d.__proto__ = b;
    } || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = this && this.__metadata || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = __webpack_require__(10);
var class_validator_1 = __webpack_require__(1);
var validators_1 = __webpack_require__(2);
var FormItem_1 = __webpack_require__(9);
var React = __webpack_require__(0);
var Trigger_1 = __webpack_require__(6);
var RadioConfig = function (_super) {
    __extends(RadioConfig, _super);
    function RadioConfig() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([class_validator_1.IsBoolean(), __metadata("design:type", Boolean)], RadioConfig.prototype, "defaultChecked", void 0);
    __decorate([class_validator_1.IsBoolean(), __metadata("design:type", Boolean)], RadioConfig.prototype, "disabled", void 0);
    __decorate([class_validator_1.IsString(), __metadata("design:type", String)], RadioConfig.prototype, "text", void 0);
    return RadioConfig;
}(types_1.BasicFormItemConfig);
exports.RadioConfig = RadioConfig;
var RadioPropsInterface = function (_super) {
    __extends(RadioPropsInterface, _super);
    function RadioPropsInterface() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([class_validator_1.Validate(validators_1.IsPageInfo, [RadioConfig]), __metadata("design:type", RadioConfig)], RadioPropsInterface.prototype, "info", void 0);
    return RadioPropsInterface;
}(types_1.BasicFormItemPropsInterface);
exports.RadioPropsInterface = RadioPropsInterface;
var AbstractRadio = function (_super) {
    __extends(AbstractRadio, _super);
    function AbstractRadio() {
        return _super.call(this) || this;
    }
    AbstractRadio.prototype.render = function () {
        var children = React.createElement(Trigger_1.default, this.props);
        return this.renderChildren(children);
    };
    return AbstractRadio;
}(FormItem_1.BasicFormItem);
exports.default = AbstractRadio;

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __extends = this && this.__extends || function () {
    var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
        d.__proto__ = b;
    } || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = this && this.__metadata || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var types_1 = __webpack_require__(10);
var class_validator_1 = __webpack_require__(1);
var validators_1 = __webpack_require__(2);
var FormItem_1 = __webpack_require__(9);
var Trigger_1 = __webpack_require__(6);
var SelectConfig = function (_super) {
    __extends(SelectConfig, _super);
    function SelectConfig() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([class_validator_1.IsString(), __metadata("design:type", String)], SelectConfig.prototype, "mode", void 0);
    __decorate([class_validator_1.IsBoolean(), __metadata("design:type", Boolean)], SelectConfig.prototype, "allowClear", void 0);
    __decorate([class_validator_1.IsString(), __metadata("design:type", String)], SelectConfig.prototype, "placeholder", void 0);
    __decorate([class_validator_1.Validate(validators_1.IsValidEnums, ['large', 'small', 'default']), __metadata("design:type", String)], SelectConfig.prototype, "size", void 0);
    __decorate([class_validator_1.IsBoolean(), __metadata("design:type", Boolean)], SelectConfig.prototype, "disabled", void 0);
    __decorate([class_validator_1.IsDefined(), class_validator_1.IsArray()
    // TODO Option validate

    , __metadata("design:type", Array)], SelectConfig.prototype, "options", void 0);
    return SelectConfig;
}(types_1.BasicFormItemConfig);
exports.SelectConfig = SelectConfig;
var OptionConfig = function () {
    function OptionConfig() {}
    __decorate([class_validator_1.IsDefined(), class_validator_1.IsString(), __metadata("design:type", String)], OptionConfig.prototype, "key", void 0);
    __decorate([class_validator_1.IsString(), class_validator_1.IsDefined(), __metadata("design:type", String)], OptionConfig.prototype, "value", void 0);
    __decorate([class_validator_1.IsBoolean(), __metadata("design:type", Boolean)], OptionConfig.prototype, "disabled", void 0);
    return OptionConfig;
}();
exports.OptionConfig = OptionConfig;
var SelectPropsInterface = function (_super) {
    __extends(SelectPropsInterface, _super);
    function SelectPropsInterface() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([class_validator_1.Validate(validators_1.IsPageInfo, [SelectConfig]), __metadata("design:type", SelectConfig)], SelectPropsInterface.prototype, "info", void 0);
    return SelectPropsInterface;
}(types_1.BasicFormItemPropsInterface);
exports.SelectPropsInterface = SelectPropsInterface;
var AbstractSelect = function (_super) {
    __extends(AbstractSelect, _super);
    function AbstractSelect() {
        return _super.call(this) || this;
    }
    AbstractSelect.prototype.render = function () {
        var children = React.createElement(Trigger_1.default, Object.assign({}, this.props, {
            value: this.getChildValue(),
            onChange: this.handleChange
        }));
        return this.renderChildren(children);
    };
    return AbstractSelect;
}(FormItem_1.BasicFormItem);
exports.default = AbstractSelect;

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __extends = this && this.__extends || function () {
    var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
        d.__proto__ = b;
    } || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = this && this.__metadata || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = __webpack_require__(4);
var class_validator_1 = __webpack_require__(1);
var validators_1 = __webpack_require__(2);
var Trigger_1 = __webpack_require__(6);
var React = __webpack_require__(0);
var _ = __webpack_require__(5);
var vm_1 = __webpack_require__(8);
var TableDataSourceItem = function () {
    function TableDataSourceItem() {}
    return TableDataSourceItem;
}();
exports.TableDataSourceItem = TableDataSourceItem;
var TableColumnsItem = function () {
    function TableColumnsItem() {}
    return TableColumnsItem;
}();
exports.TableColumnsItem = TableColumnsItem;
var TableConfig = function (_super) {
    __extends(TableConfig, _super);
    function TableConfig() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([class_validator_1.IsDefined(), __metadata("design:type", Array)], TableConfig.prototype, "dataSource", void 0);
    __decorate([class_validator_1.IsDefined(), __metadata("design:type", Array)], TableConfig.prototype, "columns", void 0);
    return TableConfig;
}(types_1.BasicConfig);
exports.TableConfig = TableConfig;
var TablePropsInterface = function (_super) {
    __extends(TablePropsInterface, _super);
    function TablePropsInterface() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([class_validator_1.Validate(validators_1.IsPageInfo, [TableConfig]), __metadata("design:type", TableConfig)], TablePropsInterface.prototype, "info", void 0);
    return TablePropsInterface;
}(types_1.BasicContainerPropsInterface);
exports.TablePropsInterface = TablePropsInterface;
var AbstractTable = function (_super) {
    __extends(AbstractTable, _super);
    function AbstractTable() {
        return _super.call(this) || this;
    }
    AbstractTable.prototype.applyMapping = function (data, mappingConfig) {
        var copy = data;
        _.each(mappingConfig, function (expression, key) {
            var ret = vm_1.runInContext(expression, {
                $iterator: copy
            });
            if (!_.isNil(ret)) {
                copy[key] = ret;
            }
        });
        return copy;
    };
    AbstractTable.prototype.render = function () {
        var _this = this;
        var columns = this.props.info.columns;
        var dataSource = this.props.info.dataSource;
        if (this.props.info.columnsMapping && !vm_1.isExpression(columns)) {
            columns = _.map(columns, function (co) {
                return _this.applyMapping(co, _this.props.info.columnsMapping);
            });
        }
        if (this.props.info.dataSourceMapping && !vm_1.isExpression(dataSource)) {
            dataSource = _.map(dataSource, function (da) {
                return _this.applyMapping(da, _this.props.info.dataSourceMapping);
            });
        }
        var childProps = Object.assign({}, this.props, {
            columns: columns,
            dataSource: dataSource
        });
        console.log(childProps);
        var children = React.createElement(Trigger_1.default, childProps);
        return this.renderChildren(children);
    };
    return AbstractTable;
}(types_1.BasicContainer);
exports.default = AbstractTable;

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __extends = this && this.__extends || function () {
    var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
        d.__proto__ = b;
    } || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = this && this.__metadata || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var types_1 = __webpack_require__(4);
var createElement_1 = __webpack_require__(7);
var class_validator_1 = __webpack_require__(1);
var TreeNode_1 = __webpack_require__(18);
var validators_1 = __webpack_require__(2);
var _ = __webpack_require__(5);
var vm_1 = __webpack_require__(8);
var Trigger_1 = __webpack_require__(6);
var TreeConfig = function (_super) {
    __extends(TreeConfig, _super);
    function TreeConfig() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([class_validator_1.IsBoolean(), __metadata("design:type", Boolean)], TreeConfig.prototype, "multiple", void 0);
    __decorate([class_validator_1.IsBoolean(), __metadata("design:type", Boolean)], TreeConfig.prototype, "checkable", void 0);
    __decorate([class_validator_1.IsBoolean(), __metadata("design:type", Boolean)], TreeConfig.prototype, "defaultExpandAll", void 0);
    __decorate([class_validator_1.Validate(validators_1.IsArrayString), __metadata("design:type", Array)], TreeConfig.prototype, "defaultExpandedKeys", void 0);
    __decorate([class_validator_1.Validate(validators_1.IsArrayString), __metadata("design:type", Array)], TreeConfig.prototype, "expandedKeys", void 0);
    __decorate([class_validator_1.IsBoolean(), __metadata("design:type", Boolean)], TreeConfig.prototype, "autoExpandParent", void 0);
    __decorate([class_validator_1.Validate(validators_1.IsArrayString), __metadata("design:type", Array)], TreeConfig.prototype, "defaultCheckedKeys", void 0);
    __decorate([class_validator_1.Validate(validators_1.IsCheckedKeys), __metadata("design:type", Object)], TreeConfig.prototype, "checkedKeys", void 0);
    __decorate([class_validator_1.IsBoolean(), __metadata("design:type", Boolean)], TreeConfig.prototype, "checkStrictly", void 0);
    __decorate([class_validator_1.Validate(validators_1.IsArrayString), __metadata("design:type", Array)], TreeConfig.prototype, "defaultSelectedKeys", void 0);
    __decorate([class_validator_1.Validate(validators_1.IsArrayString), __metadata("design:type", Array)], TreeConfig.prototype, "selectedKeys", void 0);
    __decorate([class_validator_1.IsBoolean(), __metadata("design:type", Boolean)], TreeConfig.prototype, "showLine", void 0);
    __decorate([class_validator_1.IsBoolean(), __metadata("design:type", Boolean)], TreeConfig.prototype, "showIcon", void 0);
    __decorate([class_validator_1.IsArray(), __metadata("design:type", Array)], TreeConfig.prototype, "children", void 0);
    return TreeConfig;
}(types_1.BasicConfig);
exports.TreeConfig = TreeConfig;
var TreePropsInterface = function (_super) {
    __extends(TreePropsInterface, _super);
    function TreePropsInterface() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return TreePropsInterface;
}(types_1.ContainerProps);
exports.TreePropsInterface = TreePropsInterface;
var TreeTriggerEvent = function (_super) {
    __extends(TreeTriggerEvent, _super);
    function TreeTriggerEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return TreeTriggerEvent;
}(types_1.BasicTriggerEvent);
exports.TreeTriggerEvent = TreeTriggerEvent;
var AbstractTree = function (_super) {
    __extends(AbstractTree, _super);
    function AbstractTree() {
        return _super.call(this) || this;
    }
    AbstractTree.prototype.applyChildMapping = function (data) {
        var _this = this;
        var info = this.props.info;
        var retObj = {
            type: 'treeNode',
            title: '',
            key: '',
            children: []
        };
        if (info.childMapping) {
            _.each(info.childMapping, function (item, key) {
                retObj[key] = vm_1.runInContext(item, {
                    $iterator: {
                        title: data.title,
                        key: data.key,
                        children: data.children
                    },
                    $data: _this.props.$data.toObject()
                });
            });
        }
        return retObj;
    };
    AbstractTree.prototype.render = function () {
        var _this = this;
        var children;
        var loop = function (data) {
            return data.map(function (item, index) {
                var ret = item;
                if (_this.props.info.childMapping) {
                    ret = _this.applyChildMapping(item);
                }
                var childProps = {
                    key: ret.key || index,
                    info: ret,
                    onChange: _this.props.onChange,
                    $data: _this.props.$data,
                    $setData: _this.props.$setData,
                    $setDataList: _this.props.$setDataList,
                    $removeData: _this.props.$removeData
                };
                if (ret.children && ret.children.length > 0) {
                    return createElement_1.default(TreeNode_1.default, TreeNode_1.TreeNodePropsInterface, childProps, loop(ret.children));
                }
                return createElement_1.default(TreeNode_1.default, TreeNode_1.TreeNodePropsInterface, childProps);
            });
        };
        if (Array.isArray(this.props.info.children) && this.props.info.children.length > 0) {
            children = loop(this.props.info.children);
        }
        var treeProps = Object.assign({}, this.props, {
            $triggerEvent: TreeTriggerEvent
        });
        return this.renderChildren(React.createElement(Trigger_1.default, treeProps, children));
    };
    AbstractTree.defaultProps = {
        onCheck: function (checkedKeys) {},
        onSelect: function () {}
    };
    return AbstractTree;
}(types_1.BasicContainer);
exports.default = AbstractTree;

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __extends = this && this.__extends || function () {
    var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
        d.__proto__ = b;
    } || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var _ = __webpack_require__(5);
var componentLoader_1 = __webpack_require__(15);
var createElement_1 = __webpack_require__(7);
var types_1 = __webpack_require__(4);
var react_redux_1 = __webpack_require__(21);
var redux_1 = __webpack_require__(17);
var action_1 = __webpack_require__(19);
var immutable_1 = __webpack_require__(11);
var injector_1 = __webpack_require__(70);
var Col_1 = __webpack_require__(13);
var vm_1 = __webpack_require__(8);
var api_1 = __webpack_require__(34);
var Container = function (_super) {
    __extends(Container, _super);
    function Container() {
        var _this = _super.call(this) || this;
        _this.parseProperty = {};
        _this.prevRequestData = {};
        _this.loadData = _this.loadData.bind(_this);
        _this.handleChange = _this.handleChange.bind(_this);
        return _this;
    }
    Container.prototype.componentWillMount = function () {
        if (this.props.info.data && !this.props.info.model || !this.props.info.data && this.props.info.model) {
            console.error("model and data need to be exist of type: " + this.props.info.type);
        }
        if (this.props.info.data && this.props.info.model) {
            var initData_1 = {};
            _.each(this.props.info.data, function (item, key) {
                if (!vm_1.isExpression(item)) {
                    initData_1[key] = item;
                }
            });
            this.props.initData({
                model: this.props.info.model,
                data: initData_1
            });
            if (this.props.info.initialLoad && !this.props.info.hidden) {
                this.mergeOriginData(this.props);
            }
        }
    };
    Container.prototype.componentWillUnmount = function () {
        if (this.props.info.model) {
            this.props.removeData({
                model: this.props.info.model
            });
        }
    };
    Container.prototype.componentDidUpdate = function (nextProps) {
        this.mergeOriginData(this.props);
    };
    Container.prototype.render = function () {
        var type = this.props.info.type;
        var componentInfo = componentLoader_1.default.getAbstractComponent(type);
        if (!componentInfo) {
            return React.createElement("pre", null, "can not find component of type: " + type);
        }
        var info = _.cloneDeep(this.props.info);
        if (this.props.$data) {
            info.data = this.props.$data.toObject();
        }
        var compiled = vm_1.compileValueExpress(info, {
            $data: this.props.$data.toObject(),
            $global: this.context.$global
        });
        var component = componentInfo.component,
            componentInterface = componentInfo.componentInterface;
        var childProps = {
            info: compiled,
            $data: this.props.$data,
            $setData: this.props.setData,
            $setDataList: this.props.setDataList,
            $removeData: this.props.removeData,
            onChange: this.handleChange
        };
        var retComponent = createElement_1.default(component, componentInterface, childProps);
        if (Col_1.hasColProps(this.props.info)) {
            retComponent = React.createElement(Col_1.default, {
                info: this.props.info
            }, retComponent);
        }
        return retComponent;
    };
    Container.prototype.handleChange = function (key, value) {
        this.props.setData({
            type: key,
            newValue: value
        }, this.props.info.model);
    };
    Container.prototype.mergeOriginData = function (props) {
        var _this = this;
        var injector = new injector_1.default(props, this.loadData);
        injector.finished(function (payloads) {
            if (payloads.length > 0) {
                _this.props.setDataList(payloads, _this.props.info.model);
            }
        });
    };
    Container.prototype.loadData = function () {
        var _this = this;
        var initialLoad = this.props.info.initialLoad;
        var requestConfig = null;
        if (typeof initialLoad === 'string') {
            requestConfig = {
                url: initialLoad
            };
        } else if (typeof initialLoad === 'object') {
            var data = initialLoad.data;
            _.each(data, function (val, name) {
                if (vm_1.isExpression(val)) {
                    _this.parseProperty[name] = val;
                }
            });
            if (data) {
                var property = _.cloneDeep(this.parseProperty);
                var compiledRet = vm_1.compileValueExpress(property, {
                    $data: this.props.$data.toObject(),
                    $query: this.context.$query
                });
                Object.assign(initialLoad.data, compiledRet);
            }
            vm_1.filterExpressionData(initialLoad.data);
            requestConfig = initialLoad;
        }
        if (!requestConfig || _.isEqual(requestConfig, this.prevRequestData)) {
            return Promise.resolve({});
        }
        this.prevRequestData = _.cloneDeep(requestConfig);
        return api_1.request(requestConfig.url, requestConfig, this.context.$global.proxyServer);
    };
    return Container;
}(types_1.BasicContainer);
var mapStateToProps = function (state, ownProps) {
    return {
        $data: state.container.get(ownProps.info.model) || immutable_1.Map({})
    };
};
var mapDispatchToProps = function (dispatch) {
    return redux_1.bindActionCreators({
        setData: action_1.actionCreators.setData,
        setDataList: action_1.actionCreators.setDataList,
        initData: action_1.actionCreators.initData,
        removeData: action_1.actionCreators.removeData
    }, dispatch);
};
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(Container);

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __webpack_require__(72);
function request(url, config, proxy) {
    if (proxy) {
        var proxyOptions = {
            url: proxy,
            method: config.method,
            data: {
                url: config.url || url,
                method: config.method,
                data: config.data
            }
        };
        url = proxy;
        config = proxyOptions;
    }
    if (!config.method || /^get$/i.test(config.method)) {
        config.params = config.data;
    }
    return axios_1.default(url, config);
}
exports.request = request;

/***/ }),
/* 35 */
/***/ (function(module, exports) {

module.exports = require("moment");

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __extends = this && this.__extends || function () {
    var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
        d.__proto__ = b;
    } || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(81);
var React = __webpack_require__(0);
var ReactDOM = __webpack_require__(80);
var Page_1 = __webpack_require__(66);
var paramCheck_1 = __webpack_require__(20);
var store_1 = __webpack_require__(69);
var react_redux_1 = __webpack_require__(21);
__webpack_require__(71);
var store = store_1.default();
var Render = function (_super) {
    __extends(Render, _super);
    function Render() {
        return _super.call(this) || this;
    }
    Render.prototype.shouldComponentUpdate = function (nextProps, nextState) {
        try {
            JSON.parse(nextProps.code);
            return true;
        } catch (e) {
            // TODO Error Report
            return false;
        }
    };
    Render.prototype.componentWillMount = function () {
        store = store_1.default();
    };
    Render.prototype.componentWillUpdate = function (nextProps) {
        store = store_1.default();
    };
    Render.prototype.render = function () {
        var info;
        try {
            info = JSON.parse(this.props.code);
        } catch (e) {
            console.error(e);
        }
        if (!info) {
            return React.createElement("h1", null, "JSON \u89E3\u6790\u5F02\u5E38");
        }
        var ret = paramCheck_1.default(info, Page_1.PageProps);
        if (ret.length > 0) {
            console.error(ret);
            // TODO json property error log
        }
        // TODO: 每次JSON更新都会整体重渲染, 性能很烂
        return React.createElement("div", { className: "render" }, React.createElement(react_redux_1.Provider, { store: store }, React.createElement(Page_1.default, { title: info.title, body: info.body, theme: info.theme, global: this.props.global })));
    };
    Render.defaultProps = {
        code: '{"title": "空数据", "body": []}',
        global: {}
    };
    return Render;
}(React.Component);
exports.Render = Render;
window.RCRE = Render;
window.RCRE_React = React;
window.RCRE_ReactDOM = ReactDOM;

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @file 浏览器兼容
 * @author dongtiancheng@baidu.com
 */
/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */
// @remove-on-eject-end


if (typeof Promise === 'undefined') {
    // Rejection tracking prevents a common issue where React gets into an
    // inconsistent state due to an error, but it gets swallowed by a Promise,
    // and the user has no idea what causes React's erratic future behavior.
    __webpack_require__(78).enable();
    window.Promise = __webpack_require__(77);
}

// fetch() polyfill for making API calls.
__webpack_require__(84);

// Object.assign() is commonly used with React.
// It will use the native implementation if it's present and isn't buggy.
Object.assign = __webpack_require__(76);


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __extends = this && this.__extends || function () {
    var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
        d.__proto__ = b;
    } || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = this && this.__metadata || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var _ = __webpack_require__(5);
var types_1 = __webpack_require__(4);
var PropTypes = __webpack_require__(12);
var class_validator_1 = __webpack_require__(1);
var validators_1 = __webpack_require__(2);
var vm_1 = __webpack_require__(8);
var createChild_1 = __webpack_require__(16);
var ContainerConfig = function (_super) {
    __extends(ContainerConfig, _super);
    function ContainerConfig() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ContainerConfig;
}(types_1.BasicConfig);
exports.ContainerConfig = ContainerConfig;
var ContainerPropsInterface = function (_super) {
    __extends(ContainerPropsInterface, _super);
    function ContainerPropsInterface() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([class_validator_1.Validate(validators_1.IsPageInfo, [ContainerConfig]), __metadata("design:type", ContainerConfig)], ContainerPropsInterface.prototype, "info", void 0);
    return ContainerPropsInterface;
}(types_1.BasicContainerPropsInterface);
exports.ContainerPropsInterface = ContainerPropsInterface;
var AbstractContainer = function (_super) {
    __extends(AbstractContainer, _super);
    function AbstractContainer() {
        var _this = _super.call(this) || this;
        _this.handleChange = _this.handleChange.bind(_this);
        return _this;
    }
    AbstractContainer.prototype.getChildContext = function () {
        return {
            // 抽象Abstract组件, 为子级的所有组件提供一致的数据模型
            abstractContainer: true
        };
    };
    AbstractContainer.prototype.render = function () {
        var _this = this;
        var children;
        if (Array.isArray(this.props.info.children)) {
            var ret = this.parseChildrenExpression(this.props.info.children);
            children = ret.map(function (child, index) {
                return _this.renderChild(child, 0, index);
            });
        }
        var childElement = React.createElement('div', {
            style: this.props.info.style,
            className: 'rcre-abstract-container'
        }, children);
        return this.renderChildren(childElement);
    };
    AbstractContainer.prototype.renderChild = function (info, depth, index) {
        return createChild_1.createChild(info, {
            key: info.type + "_" + depth + "_" + index,
            info: info,
            onChange: this.handleChange,
            $data: this.props.$data,
            $setData: this.props.$setData,
            $setDataList: this.props.$setDataList
        }, this.context.form, false);
    };
    AbstractContainer.prototype.handleChange = function (type, val) {
        this.props.onChange(type, val);
    };
    AbstractContainer.prototype.parseChildrenExpression = function (info) {
        var infoCopy = _.cloneDeep(info);
        var mirror = this.props.$data.toObject();
        var self = this;
        if (_.isEmpty(mirror)) {
            return infoCopy;
        }
        var validParseConfig = ['children', 'data'];
        function parseExpression(reference, val, name) {
            if (vm_1.isExpression(val)) {
                var ret = vm_1.runInContext(val, {
                    $data: mirror,
                    $global: self.context.$global
                });
                if (!_.isNil(ret)) {
                    reference[name] = ret;
                }
            }
            if (val && typeof name === 'string' && validParseConfig.indexOf(name) >= 0) {
                reference[name] = self.parseChildrenExpression(val);
            }
        }
        _.each(infoCopy, function (config, index) {
            if (vm_1.isExpression(config)) {
                parseExpression(infoCopy, config, index);
                return;
            }
            if (_.isPlainObject(config)) {
                _.each(config, function (val, name) {
                    parseExpression(config, val, name);
                });
            }
        });
        return infoCopy;
    };
    AbstractContainer.childContextTypes = {
        abstractContainer: PropTypes.bool
    };
    return AbstractContainer;
}(types_1.BasicContainer);
exports.default = AbstractContainer;

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var moment = __webpack_require__(35);
/**
 * 时间表达式解析器
 *
 * @param {string} timeStr
 * @returns {moment.Moment}
 */
function parseTimeString(timeStr) {
    var validTimeKeyWords = {
        's': 'seconds',
        'm': 'minutes',
        'h': 'hours',
        'w': 'weeks',
        'd': 'days',
        'M': 'months',
        'Y': 'years'
    };
    // maybe this is fixed date value
    if (timeStr.indexOf('now') < 0) {
        var date = moment(timeStr);
        if (!date.isValid()) {
            console.error("inValid timeString: " + timeStr + ", unknown date format");
            return moment();
        }
        return date;
    }
    var startOfNow = /^\s*now/;
    if (!startOfNow.test(timeStr)) {
        console.error("inValid timeString: " + timeStr + ", now should be in the first");
        return moment();
    }
    var timeTokenRegex = /(?:\s*(\+|-)\s*)?(\d+)(s|m|h|d|M|Y|w)/g;
    var pattern = timeTokenRegex.exec(timeStr);
    var nowTime = moment();
    while (pattern) {
        var operator = pattern[1] || '+';
        var count = parseInt(pattern[2], 10);
        var method = validTimeKeyWords[pattern[3]];
        switch (operator) {
            case '-':
                nowTime = nowTime.subtract(count, method);
                break;
            default:
            case '+':
                nowTime = nowTime.add(count, method);
                break;
        }
        pattern = timeTokenRegex.exec(timeStr);
    }
    return nowTime;
}
exports.parseTimeString = parseTimeString;

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __extends = this && this.__extends || function () {
    var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
        d.__proto__ = b;
    } || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = this && this.__metadata || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var _ = __webpack_require__(5);
var types_1 = __webpack_require__(4);
var class_validator_1 = __webpack_require__(1);
var validators_1 = __webpack_require__(2);
var vm_1 = __webpack_require__(8);
var componentLoader_1 = __webpack_require__(15);
var immutable_1 = __webpack_require__(11);
var createElement_1 = __webpack_require__(7);
var ListItemMappingConfig = function () {
    function ListItemMappingConfig() {}
    return ListItemMappingConfig;
}();
exports.ListItemMappingConfig = ListItemMappingConfig;
var ListItem = function () {
    function ListItem() {}
    return ListItem;
}();
exports.ListItem = ListItem;
// TODO ListConfig params validation
var ListConfig = function (_super) {
    __extends(ListConfig, _super);
    function ListConfig() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([class_validator_1.IsArray(), __metadata("design:type", Array)], ListConfig.prototype, "iterator", void 0);
    return ListConfig;
}(types_1.BasicConfig);
exports.ListConfig = ListConfig;
var ListPropsInterface = function (_super) {
    __extends(ListPropsInterface, _super);
    function ListPropsInterface() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([class_validator_1.Validate(validators_1.IsPageInfo, [ListConfig]), __metadata("design:type", ListConfig)], ListPropsInterface.prototype, "info", void 0);
    return ListPropsInterface;
}(types_1.BasicContainerPropsInterface);
exports.ListPropsInterface = ListPropsInterface;
var AbstractList = function (_super) {
    __extends(AbstractList, _super);
    function AbstractList() {
        return _super.call(this) || this;
    }
    AbstractList.prototype.getResource = function (info) {
        var resource = info.resource;
        if (vm_1.isExpression(resource)) {
            return [];
        }
        // resource will automatic parse from parent containers
        if (Array.isArray(resource)) {
            return resource;
        }
        return [];
    };
    AbstractList.prototype.render = function () {
        var _this = this;
        var info = this.props.info;
        var resource = this.getResource(info);
        if (resource.length === 0) {
            return React.createElement("div", null, "loading...");
        }
        var children = resource.map(function (item, index) {
            return [_this.renderResource(item), React.createElement("hr", { key: index })];
        });
        return this.renderChildren(React.createElement("div", null, children));
    };
    AbstractList.prototype.renderResource = function (item) {
        var _this = this;
        var ret = _.cloneDeep(item);
        if (!_.isEmpty(this.props.info.itemMap)) {
            _.each(this.props.info.itemMap, function (expression, key) {
                ret[key] = vm_1.runInContext(expression, {
                    $resource: item,
                    $global: _this.context.$global
                });
            });
        }
        var iterator = this.parseIterator(this.props.info.iterator, ret);
        return iterator.map(function (i, index) {
            return _this.renderIterator(i, index, 0, ret);
        });
    };
    AbstractList.prototype.parseIterator = function (iterator, item) {
        var _this = this;
        var iteratorCopy = _.cloneDeep(iterator);
        _.each(iteratorCopy, function (config, index) {
            _.each(config, function (val, key) {
                if (vm_1.isExpression(val)) {
                    // if (_.isEmpty(item)) {
                    //     config[key] = '';
                    // }
                    var output = vm_1.runInContext(val, {
                        $resource: item
                    });
                    if (output) {
                        config[key] = output;
                    }
                }
                if (val && key === 'children' && Array.isArray(val)) {
                    config[key] = _this.parseIterator(val, item);
                }
            });
        });
        return iteratorCopy;
    };
    AbstractList.prototype.renderIterator = function (iterator, index, depth, item) {
        var type = iterator.type;
        var componentInfo = componentLoader_1.default.getAbstractComponent(type);
        if (!componentInfo) {
            return React.createElement('pre', {}, "can not find component of type " + type);
        }
        var component = componentInfo.component,
            componentInterface = componentInfo.componentInterface;
        return createElement_1.default(component, componentInterface, {
            key: type + "_" + index + "_" + depth,
            info: iterator,
            $data: immutable_1.Map(item)
        });
    };
    return AbstractList;
}(types_1.BasicContainer);
exports.default = AbstractList;

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __extends = this && this.__extends || function () {
    var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
        d.__proto__ = b;
    } || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = this && this.__metadata || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var class_validator_1 = __webpack_require__(1);
var types_1 = __webpack_require__(4);
var HrConfig = function (_super) {
    __extends(HrConfig, _super);
    function HrConfig() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([class_validator_1.IsString(), class_validator_1.IsDefined(), __metadata("design:type", String)], HrConfig.prototype, "type", void 0);
    __decorate([class_validator_1.IsJSON(), __metadata("design:type", Object)], HrConfig.prototype, "style", void 0);
    return HrConfig;
}(types_1.BasicConfig);
exports.HrConfig = HrConfig;
var HrPropsInterface = function (_super) {
    __extends(HrPropsInterface, _super);
    function HrPropsInterface() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return HrPropsInterface;
}(types_1.BasicContainerPropsInterface);
exports.HrPropsInterface = HrPropsInterface;
var defaultTextStyle = {
    padding: '0 10px',
    minWidth: 80,
    textAlign: 'center',
    lineHeight: '25px'
};
var Hr = function (_super) {
    __extends(Hr, _super);
    function Hr() {
        return _super.call(this) || this;
    }
    Hr.prototype.render = function () {
        var children = React.createElement("hr", { style: Object.assign({}, defaultTextStyle, this.props.info.style) });
        return this.renderChildren(children);
    };
    return Hr;
}(types_1.BasicContainer);
exports.default = Hr;

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __extends = this && this.__extends || function () {
    var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
        d.__proto__ = b;
    } || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var jsonformat = __webpack_require__(75);
var types_1 = __webpack_require__(4);
var HtmlConfig = function (_super) {
    __extends(HtmlConfig, _super);
    function HtmlConfig() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return HtmlConfig;
}(types_1.BasicConfig);
exports.HtmlConfig = HtmlConfig;
var HtmlPropsInterface = function (_super) {
    __extends(HtmlPropsInterface, _super);
    function HtmlPropsInterface() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return HtmlPropsInterface;
}(types_1.BasicContainerPropsInterface);
exports.HtmlPropsInterface = HtmlPropsInterface;
var AbstractHTML = function (_super) {
    __extends(AbstractHTML, _super);
    function AbstractHTML() {
        return _super.call(this) || this;
    }
    AbstractHTML.prototype.render = function () {
        console.log(this.props.info.data);
        return React.createElement("code", null, jsonformat(this.props.info.data));
    };
    return AbstractHTML;
}(types_1.BasicContainer);
exports.default = AbstractHTML;

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __extends = this && this.__extends || function () {
    var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
        d.__proto__ = b;
    } || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = this && this.__metadata || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var class_validator_1 = __webpack_require__(1);
var types_1 = __webpack_require__(4);
var vm_1 = __webpack_require__(8);
var TextConfig = function (_super) {
    __extends(TextConfig, _super);
    function TextConfig() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([class_validator_1.IsString(), class_validator_1.IsDefined(), __metadata("design:type", String)], TextConfig.prototype, "type", void 0);
    __decorate([class_validator_1.IsString(), class_validator_1.IsDefined(), __metadata("design:type", String)], TextConfig.prototype, "text", void 0);
    __decorate([class_validator_1.IsJSON(), __metadata("design:type", Object)], TextConfig.prototype, "style", void 0);
    return TextConfig;
}(types_1.BasicConfig);
exports.TextConfig = TextConfig;
var TextPropsInterface = function (_super) {
    __extends(TextPropsInterface, _super);
    function TextPropsInterface() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return TextPropsInterface;
}(types_1.BasicContainerPropsInterface);
exports.TextPropsInterface = TextPropsInterface;
var defaultTextStyle = {
    padding: '0 10px',
    minWidth: 80,
    textAlign: 'center',
    lineHeight: '25px'
};
var Text = function (_super) {
    __extends(Text, _super);
    function Text() {
        return _super.call(this) || this;
    }
    Text.prototype.render = function () {
        if (vm_1.isExpression(this.props.info.text)) {
            return React.createElement("span", null);
        }
        var children = React.createElement("span", { style: Object.assign({}, defaultTextStyle, this.props.info.style) }, this.props.info.text);
        return this.renderChildren(children);
    };
    return Text;
}(types_1.BasicContainer);
exports.default = Text;

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __extends = this && this.__extends || function () {
    var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
        d.__proto__ = b;
    } || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var antd_1 = __webpack_require__(3);
var Item = antd_1.Breadcrumb.Item;
var AntBreadcrumb = function (_super) {
    __extends(AntBreadcrumb, _super);
    function AntBreadcrumb() {
        return _super.call(this) || this;
    }
    AntBreadcrumb.prototype.render = function () {
        var items = this.props.info.items.map(function (item, key) {
            return React.createElement(Item, { key: key }, React.createElement("a", { href: item.path }, item.name));
        });
        return React.createElement(antd_1.Breadcrumb, null, items);
    };
    return AntBreadcrumb;
}(React.Component);
exports.default = AntBreadcrumb;

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __extends = this && this.__extends || function () {
    var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
        d.__proto__ = b;
    } || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var antd_1 = __webpack_require__(3);
var AntButton = function (_super) {
    __extends(AntButton, _super);
    function AntButton() {
        return _super.call(this) || this;
    }
    AntButton.prototype.mapOptions = function (props) {
        return {
            htmlType: props.htmlType,
            type: props.buttonType,
            icon: props.icon,
            shape: props.shape,
            size: props.size,
            loading: props.loading,
            onClick: this.props.onClick,
            ghost: props.ghost,
            disabled: props.disabled
        };
    };
    AntButton.prototype.render = function () {
        return React.createElement(antd_1.Button, this.mapOptions(this.props.info), this.props.info.text);
    };
    return AntButton;
}(React.Component);
exports.default = AntButton;

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __extends = this && this.__extends || function () {
    var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
        d.__proto__ = b;
    } || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
var __assign = this && this.__assign || Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var antd_1 = __webpack_require__(3);
var AntCheckbox = function (_super) {
    __extends(AntCheckbox, _super);
    function AntCheckbox() {
        var _this = _super.call(this) || this;
        _this.handleChange = _this.handleChange.bind(_this);
        return _this;
    }
    AntCheckbox.prototype.mapOptions = function (props) {
        return {
            disabled: props.disabled,
            defaultChecked: props.defaultChecked
        };
    };
    AntCheckbox.prototype.handleChange = function (event) {
        var checked = event.target.checked;
        this.props.onChange(checked);
    };
    AntCheckbox.prototype.render = function () {
        return React.createElement(antd_1.Checkbox, __assign({ onChange: this.handleChange, checked: !!this.props.value }, this.mapOptions(this.props.info)), this.props.info.text);
    };
    return AntCheckbox;
}(React.Component);
exports.default = AntCheckbox;

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __extends = this && this.__extends || function () {
    var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
        d.__proto__ = b;
    } || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var antd_1 = __webpack_require__(3);
var moment = __webpack_require__(35);
var AntDatePicker = function (_super) {
    __extends(AntDatePicker, _super);
    function AntDatePicker() {
        var _this = _super.call(this) || this;
        _this.handleChange = _this.handleChange.bind(_this);
        return _this;
    }
    AntDatePicker.prototype.render = function () {
        var info = this.props.info;
        return React.createElement(antd_1.DatePicker, Object.assign(this.mapOptions(info), {
            value: this.props.value ? moment(this.props.value) : moment(),
            onChange: this.handleChange
        }));
    };
    AntDatePicker.prototype.handleChange = function (dates, dateStrings) {
        this.props.onChange(dateStrings);
    };
    AntDatePicker.prototype.mapOptions = function (props) {
        return {
            allowClear: true,
            showTime: true,
            defaultValue: moment(),
            disabled: props.disabled,
            placeholder: props.placeholder,
            format: props.format || 'YYYY-MM-DD HH:mm:ss'
        };
    };
    return AntDatePicker;
}(React.Component);
exports.default = AntDatePicker;

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __extends = this && this.__extends || function () {
    var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
        d.__proto__ = b;
    } || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
var __assign = this && this.__assign || Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var antd_1 = __webpack_require__(3);
var AntForm = function (_super) {
    __extends(AntForm, _super);
    function AntForm() {
        var _this = _super.call(this) || this;
        _this.handleSubmit = _this.handleSubmit.bind(_this);
        return _this;
    }
    AntForm.prototype.mapOptions = function (props) {
        return {
            layout: 'horizontal'
        };
    };
    AntForm.prototype.render = function () {
        var options = this.mapOptions(this.props.info);
        return React.createElement(antd_1.Form, __assign({ onSubmit: this.handleSubmit }, options), this.props.children);
    };
    AntForm.prototype.handleSubmit = function (event) {
        event.preventDefault();
        this.props.onSubmit(event);
    };
    return AntForm;
}(React.Component);
exports.default = AntForm;

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __extends = this && this.__extends || function () {
    var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
        d.__proto__ = b;
    } || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var antd_1 = __webpack_require__(3);
var AntInput = function (_super) {
    __extends(AntInput, _super);
    function AntInput() {
        var _this = _super.call(this) || this;
        _this.handleChange = _this.handleChange.bind(_this);
        return _this;
    }
    AntInput.prototype.mapProps = function (props) {
        return {
            type: props.inputType,
            id: props.id,
            size: props.size,
            disabled: props.disabled,
            addonBefore: props.addonBefore,
            addonAfter: props.addonAfter
        };
    };
    AntInput.prototype.handleChange = function (event) {
        var target = event.currentTarget;
        var value = target.value;
        this.props.onChange(value);
    };
    AntInput.prototype.render = function () {
        var info = this.props.info;
        var childProps = {};
        if (this.props.onChange) {
            childProps.value = this.props.value;
            childProps.onChange = this.handleChange;
        }
        return React.createElement(antd_1.Input, Object.assign(this.mapProps(info), childProps));
    };
    return AntInput;
}(React.Component);
exports.default = AntInput;

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __extends = this && this.__extends || function () {
    var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
        d.__proto__ = b;
    } || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
var __assign = this && this.__assign || Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var antd_1 = __webpack_require__(3);
var AntRadio = function (_super) {
    __extends(AntRadio, _super);
    function AntRadio() {
        var _this = _super.call(this) || this;
        _this.handleChange = _this.handleChange.bind(_this);
        return _this;
    }
    AntRadio.prototype.mapOptions = function (props) {
        return {
            disabled: props.disabled,
            defaultChecked: props.defaultChecked
        };
    };
    AntRadio.prototype.handleChange = function (event) {
        var checked = event.target.checked;
        this.props.onChange(checked);
    };
    AntRadio.prototype.render = function () {
        return React.createElement(antd_1.Radio, __assign({ checked: !!this.props.value, onChange: this.handleChange }, this.mapOptions(this.props.info)), this.props.info.text);
    };
    return AntRadio;
}(React.Component);
exports.default = AntRadio;

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __extends = this && this.__extends || function () {
    var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
        d.__proto__ = b;
    } || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var antd_1 = __webpack_require__(3);
var Option = antd_1.Select.Option;
var AntSelect = function (_super) {
    __extends(AntSelect, _super);
    function AntSelect() {
        var _this = _super.call(this) || this;
        _this.handleChange = _this.handleChange.bind(_this);
        return _this;
    }
    AntSelect.prototype.render = function () {
        var _this = this;
        var Options = this.props.info.options.map(function (op) {
            return React.createElement(Option, Object.assign(_this.mapOptionOptions(op), {
                key: op.key
            }), op.key);
        });
        return React.createElement(antd_1.Select, Object.assign(this.mapOptions(this.props.info), {
            value: this.props.value,
            onChange: this.handleChange,
            style: {
                width: '100%'
            }
        }), Options);
    };
    AntSelect.prototype.mapOptionOptions = function (props) {
        return {
            disabled: props.disabled,
            value: props.value
        };
    };
    AntSelect.prototype.handleChange = function (value) {
        this.props.onChange(value);
    };
    AntSelect.prototype.mapOptions = function (props) {
        return {
            mode: props.mode,
            allowClear: props.allowClear,
            placeholder: props.placeholder,
            size: props.size,
            disabled: props.disabled
        };
    };
    return AntSelect;
}(React.Component);
exports.default = AntSelect;

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __extends = this && this.__extends || function () {
    var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
        d.__proto__ = b;
    } || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
var __assign = this && this.__assign || Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var antd_1 = __webpack_require__(3);
var AntTable = function (_super) {
    __extends(AntTable, _super);
    function AntTable() {
        return _super.call(this) || this;
    }
    AntTable.prototype.mapOptions = function (props) {
        var retObj = {};
        if (Array.isArray(props.dataSource)) {
            retObj.dataSource = props.dataSource;
        }
        if (Array.isArray(props.columns)) {
            retObj.columns = props.columns;
        }
        return retObj;
    };
    AntTable.prototype.render = function () {
        return React.createElement(antd_1.Table, __assign({}, this.mapOptions(this.props.info)));
    };
    return AntTable;
}(React.Component);
exports.default = AntTable;

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __extends = this && this.__extends || function () {
    var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
        d.__proto__ = b;
    } || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var antd_1 = __webpack_require__(3);
var _ = __webpack_require__(5);
var AntTree = function (_super) {
    __extends(AntTree, _super);
    function AntTree() {
        var _this = _super.call(this) || this;
        _this.handleSelect = _this.handleSelect.bind(_this);
        _this.handleCheck = _this.handleCheck.bind(_this);
        return _this;
    }
    AntTree.prototype.handleSelect = function (checkedKeys, e) {
        this.props.onCheck(checkedKeys);
    };
    AntTree.prototype.handleCheck = function (checkedKeys, e) {
        this.props.onCheck(checkedKeys);
    };
    AntTree.prototype.render = function () {
        return React.createElement(antd_1.Tree, Object.assign(this.mapTreeOptions(this.props), {
            onSelect: this.handleSelect,
            onCheck: this.handleCheck
        }), this.props.children);
    };
    AntTree.prototype.mapTreeOptions = function (props) {
        var newProps = {};
        _.each(props.info, function (item, key) {
            if (typeof props.info[key] !== 'undefined') {
                newProps[key] = item;
            }
        });
        return newProps;
    };
    return AntTree;
}(React.Component);
exports.AntTree = AntTree;
exports.default = AntTree;

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __extends = this && this.__extends || function () {
    var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
        d.__proto__ = b;
    } || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var antd_1 = __webpack_require__(3);
var TreeNode = antd_1.Tree.TreeNode;
function mapTreeOptions(props) {
    return Object.assign({}, props, {
        disabled: props.info.disabled,
        disableCheckbox: props.info.disableCheckbox,
        title: props.info.title,
        key: props.info.key,
        isLeaf: props.info.isLeaf
    });
}
var AntTreeNode = function (_super) {
    __extends(AntTreeNode, _super);
    function AntTreeNode() {
        return _super.call(this) || this;
    }
    AntTreeNode.prototype.render = function () {
        var mergeProps = mapTreeOptions(this.props);
        return React.createElement(TreeNode, mergeProps, this.props.children);
    };
    return AntTreeNode;
}(React.Component);
exports.default = AntTreeNode;

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var Button_1 = __webpack_require__(45);
var Tree_1 = __webpack_require__(53);
var TreeNode_1 = __webpack_require__(54);
var Input_1 = __webpack_require__(49);
var Select_1 = __webpack_require__(51);
var Checkbox_1 = __webpack_require__(46);
var Radio_1 = __webpack_require__(50);
var Breadcrumb_1 = __webpack_require__(44);
var Table_1 = __webpack_require__(52);
var Datepicker_1 = __webpack_require__(47);
var Button_2 = __webpack_require__(23);
var Tree_2 = __webpack_require__(32);
var TreeNode_2 = __webpack_require__(18);
var Input_2 = __webpack_require__(28);
var Select_2 = __webpack_require__(30);
var Checkbox_2 = __webpack_require__(25);
var Radio_2 = __webpack_require__(29);
var Breadcrumb_2 = __webpack_require__(22);
var Table_2 = __webpack_require__(31);
var Datepicker_2 = __webpack_require__(26);
var Form_1 = __webpack_require__(48);
var Form_2 = __webpack_require__(27);
exports.default = {
    button: {
        component: Button_1.default,
        componentInterface: Button_2.ButtonPropsInterface
    },
    tree: {
        component: Tree_1.default,
        componentInterface: Tree_2.TreePropsInterface
    },
    treeNode: {
        component: TreeNode_1.default,
        componentInterface: TreeNode_2.TreeNodePropsInterface
    },
    input: {
        component: Input_1.default,
        componentInterface: Input_2.InputPropsInterface
    },
    form: {
        component: Form_1.default,
        componentInterface: Form_2.FormPropsInterface
    },
    select: {
        component: Select_1.default,
        componentInterface: Select_2.SelectPropsInterface
    },
    checkbox: {
        component: Checkbox_1.default,
        componentInterface: Checkbox_2.CheckboxPropsInterface
    },
    radio: {
        component: Radio_1.default,
        componentInterface: Radio_2.RadioPropsInterface
    },
    breadcrumb: {
        component: Breadcrumb_1.default,
        componentInterface: Breadcrumb_2.BreadcrumbPropsInterface
    },
    table: {
        component: Table_1.default,
        componentInterface: Table_2.TablePropsInterface
    },
    datepicker: {
        component: Datepicker_1.default,
        componentInterface: Datepicker_2.DatePickerPropsInterface
    }
};

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = __webpack_require__(55);
var index_2 = __webpack_require__(58);
var componentLoader_1 = __webpack_require__(15);
var lodash_1 = __webpack_require__(5);
var DriverController = function () {
    function DriverController() {
        this.loader = new componentLoader_1.ComponentLoader();
        this.theme = 'antd';
        this.registedTheme = new Map();
    }
    DriverController.prototype.setTheme = function (theme) {
        if (!this.registedTheme.has(theme)) {
            // TODO better error report
            console.error('there are no registed themes');
            return;
        }
        this.theme = theme;
    };
    DriverController.prototype.registerTheme = function (theme, config) {
        var _this = this;
        this.registedTheme.set(theme, true);
        lodash_1.each(config, function (info, name) {
            if (!/^[\w0-9]+$/.test(name)) {
                console.error('invalid driver component name, name can only contains words and numbers');
                return;
            }
            _this.loader.addComponent(theme + "." + name, info.component, info.componentInterface);
        });
    };
    DriverController.prototype.getComponent = function (name) {
        return this.loader.getDriverComponent(name, this.theme);
    };
    return DriverController;
}();
exports.DriverController = DriverController;
var driver = new DriverController();
driver.registerTheme('antd', index_1.default);
driver.registerTheme('rcre', index_2.default);
exports.default = driver;

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __extends = this && this.__extends || function () {
    var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
        d.__proto__ = b;
    } || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var echarts = __webpack_require__(74);
var immutable_1 = __webpack_require__(11);
var RcreLineChart = function (_super) {
    __extends(RcreLineChart, _super);
    function RcreLineChart() {
        var _this = _super.call(this) || this;
        _this.domID = 'echarts-rcrelinechart';
        _this.chartOptions = {
            title: {
                text: ''
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#6a7985'
                    }
                }
            },
            legend: {
                top: '8%',
                data: []
            },
            toolbox: {
                itemSize: 15,
                itemGap: 5,
                right: 15,
                feature: {
                    saveAsImage: {}
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ['']
            },
            yAxis: [{
                type: 'value'
            }],
            dataZoom: [{
                id: 'dataZoomX',
                type: 'slider',
                xAxisIndex: [0],
                filterMode: 'filter'
            }],
            series: []
        };
        return _this;
    }
    RcreLineChart.prototype.componentDidMount = function () {
        var dom = document.getElementById(this.domID);
        this.chart = echarts.init(dom);
        this.overRideChartOptions(this.props.info);
        this.chart.setOption(this.chartOptions);
    };
    RcreLineChart.prototype.componentWillReceiveProps = function (nextProps) {
        this.overRideChartOptions(nextProps.info);
        this.chart.setOption(this.chartOptions);
    };
    RcreLineChart.prototype.overRideChartOptions = function (info) {
        // title
        this.chartOptions.title.text = info.title;
        // tooltip
        if (info.tooltip === false) {
            delete this.chartOptions.tooltip;
        }
        if (Array.isArray(info.categories)) {
            this.chartOptions.xAxis.data = info.categories;
        }
        if (info.toolbox === false) {
            delete this.chartOptions.toolbox;
        }
        if (info.dataZoom === false) {
            delete this.chartOptions.dataZoom;
        }
        if (Array.isArray(info.series)) {
            var legends_1 = immutable_1.Set();
            this.chartOptions.series = info.series.map(function (item) {
                var ret = {
                    name: item.name,
                    type: 'line',
                    label: {
                        normal: {
                            show: true,
                            position: 'top'
                        }
                    },
                    data: item.data
                };
                legends_1 = legends_1.add(item.name);
                return ret;
                // areaStyle: {normal: {}},
            });
            this.chartOptions.legend.data = legends_1.toArray();
        }
    };
    RcreLineChart.prototype.render = function () {
        var style = {
            width: this.props.info.width || 500,
            height: this.props.info.height || 400
        };
        return React.createElement("div", { id: this.domID, style: style });
    };
    return RcreLineChart;
}(React.Component);
exports.default = RcreLineChart;

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var LineChart_1 = __webpack_require__(57);
var LineChart_2 = __webpack_require__(24);
exports.default = {
    lineChart: {
        component: LineChart_1.default,
        componentInterface: LineChart_2.LineChartPropsInterface
    }
};

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var immutable_1 = __webpack_require__(11);
var action_1 = __webpack_require__(19);
exports.initialState = immutable_1.Map({});
exports.reducer = function (state, actions) {
    if (state === void 0) {
        state = exports.initialState;
    }
    switch (actions.type) {
        case action_1.SET_DATA:
            return state.set(actions.model, state.get(actions.model).set(actions.payload.type, actions.payload.newValue));
        case action_1.TRIGGER_LIST_DATA:
        case action_1.SET_DATA_LIST:
            var payloadList = actions.payload;
            var dataState_1 = state.get(actions.model);
            payloadList.forEach(function (item) {
                var keyName = item.type;
                var val = item.newValue;
                dataState_1 = dataState_1.set(keyName, val);
            });
            return state.set(actions.model, dataState_1);
        case action_1.INIT_DATA:
            var model = actions.payload.model;
            var data = actions.payload.data;
            if (state.has(model) && state.get(model).size !== 0) {
                console.error("find exist model of model: " + model);
                return state;
            }
            return state.set(model, immutable_1.Map(data));
        case action_1.REMOVE_DATA:
            var delKey = actions.payload.model;
            return state.set(delKey, immutable_1.Map({}));
        // only for dev
        case action_1.CLEAR_DATA:
            state = immutable_1.Map({});
            return state;
        default:
            return state;
    }
};

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __extends = this && this.__extends || function () {
    var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
        d.__proto__ = b;
    } || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = this && this.__metadata || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var antd_1 = __webpack_require__(3);
var class_validator_1 = __webpack_require__(1);
var validators_1 = __webpack_require__(2);
var BasicLayout_1 = __webpack_require__(14);
var Content = antd_1.Layout.Content;
var ContentConfig = function (_super) {
    __extends(ContentConfig, _super);
    function ContentConfig() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ContentConfig;
}(BasicLayout_1.BasicLayoutConfig);
exports.ContentConfig = ContentConfig;
var ContentPropsInterface = function (_super) {
    __extends(ContentPropsInterface, _super);
    function ContentPropsInterface() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([class_validator_1.Validate(validators_1.IsPageInfo, [ContentConfig]), __metadata("design:type", ContentConfig)], ContentPropsInterface.prototype, "info", void 0);
    return ContentPropsInterface;
}(BasicLayout_1.BasicLayoutPropsInterface);
exports.ContentPropsInterface = ContentPropsInterface;
var AbstractLayout = function (_super) {
    __extends(AbstractLayout, _super);
    function AbstractLayout() {
        return _super.call(this) || this;
    }
    AbstractLayout.prototype.mapOptions = function (props) {
        return {
            style: {
                padding: 15
            }
        };
    };
    AbstractLayout.prototype.render = function () {
        return this.renderComponent(Content, ContentPropsInterface);
    };
    return AbstractLayout;
}(BasicLayout_1.BasicAbstractLayout);
exports.default = AbstractLayout;

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __extends = this && this.__extends || function () {
    var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
        d.__proto__ = b;
    } || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = this && this.__metadata || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var antd_1 = __webpack_require__(3);
var class_validator_1 = __webpack_require__(1);
var validators_1 = __webpack_require__(2);
var BasicLayout_1 = __webpack_require__(14);
var Footer = antd_1.Layout.Footer;
var FooterConfig = function (_super) {
    __extends(FooterConfig, _super);
    function FooterConfig() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return FooterConfig;
}(BasicLayout_1.BasicLayoutConfig);
exports.FooterConfig = FooterConfig;
var FooterPropsInterface = function (_super) {
    __extends(FooterPropsInterface, _super);
    function FooterPropsInterface() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([class_validator_1.Validate(validators_1.IsPageInfo, [FooterConfig]), __metadata("design:type", FooterConfig)], FooterPropsInterface.prototype, "info", void 0);
    return FooterPropsInterface;
}(BasicLayout_1.BasicLayoutPropsInterface);
exports.FooterPropsInterface = FooterPropsInterface;
var AbstractLayout = function (_super) {
    __extends(AbstractLayout, _super);
    function AbstractLayout() {
        return _super.call(this) || this;
    }
    AbstractLayout.prototype.render = function () {
        return this.renderComponent(Footer, FooterPropsInterface);
    };
    return AbstractLayout;
}(BasicLayout_1.BasicAbstractLayout);
exports.default = AbstractLayout;

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __extends = this && this.__extends || function () {
    var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
        d.__proto__ = b;
    } || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
Object.defineProperty(exports, "__esModule", { value: true });
var antd_1 = __webpack_require__(3);
var BasicLayout_1 = __webpack_require__(14);
var Header = antd_1.Layout.Header;
var HeaderConfig = function (_super) {
    __extends(HeaderConfig, _super);
    function HeaderConfig() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return HeaderConfig;
}(BasicLayout_1.BasicLayoutConfig);
exports.HeaderConfig = HeaderConfig;
var HeaderPropsInterface = function (_super) {
    __extends(HeaderPropsInterface, _super);
    function HeaderPropsInterface() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return HeaderPropsInterface;
}(BasicLayout_1.BasicLayoutPropsInterface);
exports.HeaderPropsInterface = HeaderPropsInterface;
var AbstractHeader = function (_super) {
    __extends(AbstractHeader, _super);
    function AbstractHeader() {
        return _super.call(this) || this;
    }
    AbstractHeader.prototype.render = function () {
        return this.renderComponent(Header, HeaderPropsInterface);
    };
    return AbstractHeader;
}(BasicLayout_1.BasicAbstractLayout);
exports.default = AbstractHeader;

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __extends = this && this.__extends || function () {
    var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
        d.__proto__ = b;
    } || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = this && this.__metadata || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var antd_1 = __webpack_require__(3);
var class_validator_1 = __webpack_require__(1);
var validators_1 = __webpack_require__(2);
var BasicLayout_1 = __webpack_require__(14);
var LayoutConfig = function (_super) {
    __extends(LayoutConfig, _super);
    function LayoutConfig() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return LayoutConfig;
}(BasicLayout_1.BasicLayoutConfig);
exports.LayoutConfig = LayoutConfig;
var LayoutPropsInterface = function (_super) {
    __extends(LayoutPropsInterface, _super);
    function LayoutPropsInterface() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([class_validator_1.Validate(validators_1.IsPageInfo, [LayoutConfig]), __metadata("design:type", LayoutConfig)], LayoutPropsInterface.prototype, "info", void 0);
    return LayoutPropsInterface;
}(BasicLayout_1.BasicLayoutPropsInterface);
exports.LayoutPropsInterface = LayoutPropsInterface;
var AbstractLayout = function (_super) {
    __extends(AbstractLayout, _super);
    function AbstractLayout() {
        return _super.call(this) || this;
    }
    AbstractLayout.prototype.mapOptions = function (props) {
        return {
            style: Object.assign({
                background: '#fff'
            }, props.style)
        };
    };
    AbstractLayout.prototype.render = function () {
        return this.renderComponent(antd_1.Layout, LayoutPropsInterface);
    };
    return AbstractLayout;
}(BasicLayout_1.BasicAbstractLayout);
AbstractLayout.__ANT_LAYOUT_SIDER = true;
exports.default = AbstractLayout;

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __extends = this && this.__extends || function () {
    var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
        d.__proto__ = b;
    } || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = this && this.__metadata || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var antd_1 = __webpack_require__(3);
var class_validator_1 = __webpack_require__(1);
var validators_1 = __webpack_require__(2);
var BasicLayout_1 = __webpack_require__(14);
var Sider = antd_1.Layout.Sider;
var SiderConfig = function (_super) {
    __extends(SiderConfig, _super);
    function SiderConfig() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return SiderConfig;
}(BasicLayout_1.BasicLayoutConfig);
exports.SiderConfig = SiderConfig;
var SidePropsInterface = function (_super) {
    __extends(SidePropsInterface, _super);
    function SidePropsInterface() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([class_validator_1.Validate(validators_1.IsPageInfo, [SiderConfig]), __metadata("design:type", SiderConfig)], SidePropsInterface.prototype, "info", void 0);
    return SidePropsInterface;
}(BasicLayout_1.BasicLayoutPropsInterface);
exports.SidePropsInterface = SidePropsInterface;
var AbstractLayout = function (_super) {
    __extends(AbstractLayout, _super);
    function AbstractLayout() {
        var _this = _super.call(this) || this;
        _this.state = {
            collapsed: false
        };
        _this.handleCollapse = _this.handleCollapse.bind(_this);
        return _this;
    }
    AbstractLayout.prototype.handleCollapse = function () {
        this.setState({
            collapsed: !this.state.collapsed
        });
    };
    AbstractLayout.prototype.mapOptions = function (props) {
        return {
            style: props.style,
            collapsible: props.collapsible || false,
            defaultCollapsed: props.defaultCollapsed,
            reverseArrow: props.reverseArrow,
            width: props.width,
            className: props.className,
            collapsed: this.state.collapsed,
            onCollapse: this.handleCollapse
        };
    };
    AbstractLayout.prototype.render = function () {
        return this.renderComponent(Sider, SidePropsInterface);
    };
    return AbstractLayout;
}(BasicLayout_1.BasicAbstractLayout);
exports.default = AbstractLayout;

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __extends = this && this.__extends || function () {
    var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
        d.__proto__ = b;
    } || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = this && this.__metadata || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var PropTypes = __webpack_require__(12);
var types_1 = __webpack_require__(4);
var class_validator_1 = __webpack_require__(1);
var validators_1 = __webpack_require__(2);
var antd_1 = __webpack_require__(3);
var createChild_1 = __webpack_require__(16);
var RowConfig = function (_super) {
    __extends(RowConfig, _super);
    function RowConfig() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([class_validator_1.Validate(validators_1.IsValidEnums, ['top', 'middle', 'bottom']), __metadata("design:type", String)], RowConfig.prototype, "align", void 0);
    __decorate([class_validator_1.Validate(validators_1.IsValidEnums, ['start', 'end', 'center', 'space-around', 'space-between']), __metadata("design:type", String)], RowConfig.prototype, "justify", void 0);
    __decorate([class_validator_1.IsNumber(), __metadata("design:type", Number)], RowConfig.prototype, "gutter", void 0);
    return RowConfig;
}(types_1.BasicConfig);
exports.RowConfig = RowConfig;
var RowPropsInterface = function (_super) {
    __extends(RowPropsInterface, _super);
    function RowPropsInterface() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return RowPropsInterface;
}(types_1.BasicContainerPropsInterface);
exports.RowPropsInterface = RowPropsInterface;
var AntRowProps = function () {
    function AntRowProps() {}
    return AntRowProps;
}();
exports.AntRowProps = AntRowProps;
var AbstractRow = function (_super) {
    __extends(AbstractRow, _super);
    function AbstractRow() {
        return _super.call(this) || this;
    }
    AbstractRow.prototype.mapOptions = function (info) {
        return {
            align: info.align,
            justify: info.justify,
            gutter: info.gutter,
            type: 'flex'
        };
    };
    AbstractRow.prototype.render = function () {
        var _this = this;
        var children;
        if (Array.isArray(this.props.info.children)) {
            children = this.props.info.children.map(function (item, index) {
                return createChild_1.createChild(item, Object.assign({}, _this.props, {
                    info: item,
                    key: index
                }), _this.context.form, _this.context.abstractContainer);
            });
        }
        var defaultStyle = {
            marginTop: 10,
            marginBottom: 10
        };
        return React.createElement("div", { style: Object.assign(defaultStyle, this.props.info.style || {}) }, React.createElement(antd_1.Row, this.mapOptions(this.props.info), children));
    };
    AbstractRow.contextTypes = {
        driver: PropTypes.object,
        form: PropTypes.bool,
        abstractContainer: PropTypes.bool
    };
    return AbstractRow;
}(React.Component);
exports.default = AbstractRow;

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __extends = this && this.__extends || function () {
    var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
        d.__proto__ = b;
    } || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = this && this.__metadata || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var _ = __webpack_require__(5);
var index_1 = __webpack_require__(33);
var class_validator_1 = __webpack_require__(1);
var index_2 = __webpack_require__(56);
var PropsTypes = __webpack_require__(12);
var createChild_1 = __webpack_require__(16);
var react_redux_1 = __webpack_require__(21);
var redux_1 = __webpack_require__(17);
var action_1 = __webpack_require__(19);
var URL = __webpack_require__(82);
var querystring = __webpack_require__(79);
var PageProps = function () {
    function PageProps() {}
    __decorate([class_validator_1.IsString(), __metadata("design:type", String)], PageProps.prototype, "title", void 0);
    __decorate([class_validator_1.IsString(), __metadata("design:type", String)], PageProps.prototype, "theme", void 0);
    __decorate([class_validator_1.IsDefined(), __metadata("design:type", Object)], PageProps.prototype, "body", void 0);
    return PageProps;
}();
exports.PageProps = PageProps;
var Page = function (_super) {
    __extends(Page, _super);
    function Page() {
        return _super.call(this) || this;
    }
    Page.getLocationService = function () {
        var $location = URL.parse(location.href);
        var $query = {};
        if ($location.query) {
            $query = querystring.parse($location.query);
        }
        return {
            $location: $location,
            $query: $query
        };
    };
    Page.prototype.getChildContext = function () {
        index_2.default.setTheme(this.props.theme);
        var _a = Page.getLocationService(),
            $location = _a.$location,
            $query = _a.$query;
        return {
            driver: index_2.default,
            $store: this.props.$store,
            $global: this.props.global,
            $setDataList: this.props.$setDataList,
            $initData: this.props.$initData,
            $triggerListData: this.props.$triggerListData,
            $location: $location,
            $query: $query
        };
    };
    Page.prototype.render = function () {
        var body;
        if (typeof this.props.body === 'string') {
            body = this.props.body;
        } else if (Array.isArray(this.props.body)) {
            body = this.props.body.map(function (item, index) {
                return createChild_1.createChild(item, {
                    info: item,
                    key: index
                });
            });
        } else if (_.isPlainObject(this.props.body)) {
            body = React.createElement(index_1.default, {
                info: this.props.body
            });
        }
        var pageHeader = this.props.title ? React.createElement("div", { className: "page-header" }, React.createElement("h1", null, this.props.title)) : '';
        return React.createElement("div", { className: "page-container" }, pageHeader, React.createElement("div", { className: "page-body" }, body));
    };
    Page.defaultProps = {
        title: '',
        theme: 'antd'
    };
    Page.childContextTypes = {
        driver: PropsTypes.object,
        $store: PropsTypes.object,
        $global: PropsTypes.object,
        $setDataList: PropsTypes.func,
        $initData: PropsTypes.func,
        $triggerListData: PropsTypes.func,
        $location: PropsTypes.object,
        $query: PropsTypes.object
    };
    return Page;
}(React.Component);
var mapStateToProps = function (state, ownProps) {
    return {
        $store: state.container
    };
};
var mapDispatchToProps = function (dispatch) {
    return redux_1.bindActionCreators({
        $setDataList: action_1.actionCreators.setDataList,
        $initData: action_1.actionCreators.initData,
        $triggerListData: action_1.actionCreators.triggerListData
    }, dispatch);
};
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(Page);

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __extends = this && this.__extends || function () {
    var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
        d.__proto__ = b;
    } || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = __webpack_require__(4);
exports.validEventTrigger = {
    'click': 'onClick',
    'change': 'onChange',
    'treeCheck': 'onCheck',
    'treeSelect': 'onSelect',
    'submitSuccess': ''
};
var TriggerItem = function () {
    function TriggerItem() {}
    return TriggerItem;
}();
exports.TriggerItem = TriggerItem;
var TriggerConfig = function (_super) {
    __extends(TriggerConfig, _super);
    function TriggerConfig() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return TriggerConfig;
}(types_1.BasicConfig);
exports.TriggerConfig = TriggerConfig;

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var redux_1 = __webpack_require__(17);
var reducer_1 = __webpack_require__(59);
exports.rootReducer = redux_1.combineReducers({
    container: reducer_1.reducer
});

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var redux_1 = __webpack_require__(17);
var reducers_1 = __webpack_require__(68);
var composeEnhancers = (window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || redux_1.compose)();
function configureStore(initialState) {
    return redux_1.createStore(reducers_1.rootReducer, initialState, composeEnhancers);
}
exports.default = configureStore;

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var _ = __webpack_require__(5);
var lodash_1 = __webpack_require__(5);
var vm_1 = __webpack_require__(8);
var util_1 = __webpack_require__(83);
var ParamsInjector = function () {
    function ParamsInjector(originObject, resourceProvider) {
        var _this = this;
        this.originObject = originObject;
        this.changePayloads = [];
        resourceProvider().then(function (ret) {
            _this.$resource = ret;
            _this.parseObjItem(_this.originObject, _this.$resource);
            _this.finishedCallback(_this.changePayloads);
        });
    }
    ParamsInjector.prototype.finished = function (done) {
        this.finishedCallback = done;
    };
    ParamsInjector.prototype.parseObjItem = function (origin, mirror) {
        var _this = this;
        lodash_1.each(origin, function (val, key) {
            if (lodash_1.isPlainObject(val)) {
                _this.parseObjItem(val, mirror);
                return;
            }
            if (util_1.isString(val) && val.indexOf('$response') >= 0 && !_.isEmpty(mirror)) {
                var ret = vm_1.runInContext(val, {
                    $response: mirror.data
                });
                if (ret) {
                    _this.changePayloads.push({
                        type: key,
                        newValue: ret
                    });
                }
            }
        });
    };
    return ParamsInjector;
}();
exports.default = ParamsInjector;

/***/ }),
/* 71 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 72 */
/***/ (function(module, exports) {

module.exports = require("axios");

/***/ }),
/* 73 */
/***/ (function(module, exports) {

module.exports = require("classnames");

/***/ }),
/* 74 */
/***/ (function(module, exports) {

module.exports = require("echarts");

/***/ }),
/* 75 */
/***/ (function(module, exports) {

module.exports = require("json-format");

/***/ }),
/* 76 */
/***/ (function(module, exports) {

module.exports = require("object-assign");

/***/ }),
/* 77 */
/***/ (function(module, exports) {

module.exports = require("promise/lib/es6-extensions.js");

/***/ }),
/* 78 */
/***/ (function(module, exports) {

module.exports = require("promise/lib/rejection-tracking");

/***/ }),
/* 79 */
/***/ (function(module, exports) {

module.exports = require("querystring");

/***/ }),
/* 80 */
/***/ (function(module, exports) {

module.exports = require("react-dom");

/***/ }),
/* 81 */
/***/ (function(module, exports) {

module.exports = require("reflect-metadata");

/***/ }),
/* 82 */
/***/ (function(module, exports) {

module.exports = require("url");

/***/ }),
/* 83 */
/***/ (function(module, exports) {

module.exports = require("util");

/***/ }),
/* 84 */
/***/ (function(module, exports) {

module.exports = require("whatwg-fetch");

/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(37);
module.exports = __webpack_require__(36);


/***/ })
/******/ ]);
//# sourceMappingURL=exportPlugin.js.map