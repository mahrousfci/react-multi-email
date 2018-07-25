"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b)
            if (b.hasOwnProperty(p))
                d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m)
        return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
            ar.push(r.value);
    }
    catch (error) {
        e = { error: error };
    }
    finally {
        try {
            if (r && !r.done && (m = i["return"]))
                m.call(i);
        }
        finally {
            if (e)
                throw e.error;
        }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var isEmail_1 = require("./isEmail");
var ReactMultiEmail = /** @class */ (function (_super) {
    __extends(ReactMultiEmail, _super);
    function ReactMultiEmail() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            focused: false,
            emails: [],
            inputValue: '',
            placeholder: '',
        };
        _this.findEmailAddress = function (value, isEnter) {
            var validEmails = [];
            var inputValue = '';
            var re = /[ ,;]/g;
            var addEmails = function (email) {
                var emails = _this.state.emails;
                for (var i = 0, l = emails.length; i < l; i++) {
                    if (emails[i] === email) {
                        return false;
                    }
                }
                validEmails.push(email);
                return true;
            };
            if (value !== '') {
                if (re.test(value)) {
                    var arr = value.split(re).filter(function (n) {
                        return n !== '' && n !== undefined && n !== null;
                    });
                    do {
                        if (isEmail_1.default('' + arr[0])) {
                            addEmails('' + arr.shift());
                        }
                        else {
                            if (arr.length === 1) {
                                /// 마지막 아이템이면 inputValue로 남겨두기
                                inputValue = '' + arr.shift();
                            }
                            else {
                                arr.shift();
                            }
                        }
                    } while (arr.length);
                }
                else {
                    if (isEnter) {
                        if (isEmail_1.default(value)) {
                            addEmails(value);
                        }
                        else {
                            inputValue = value;
                        }
                    }
                    else {
                        inputValue = value;
                    }
                }
            }
            _this.setState({
                emails: __spread(_this.state.emails, validEmails),
                inputValue: inputValue,
            });
            if (validEmails.length && _this.props.onChange) {
                _this.props.onChange(__spread(_this.state.emails, validEmails));
            }
        };
        _this.onChangeInputValue = function (value) {
            _this.findEmailAddress(value);
        };
        _this.removeEmail = function (index) {
            _this.state.emails.splice(index, 1);
            _this.setState({
                emails: _this.state.emails,
            });
            if (_this.props.onChange) {
                _this.props.onChange(_this.state.emails);
            }
        };
        return _this;
    }
    ReactMultiEmail.getDerivedStateFromProps = function (nextProps, prevState) {
        if (prevState.propsEmails !== nextProps.emails) {
            return {
                propsEmails: nextProps.emails || [],
                emails: nextProps.emails || [],
                inputValue: '',
                focused: false,
            };
        }
        return null;
    };
    ReactMultiEmail.prototype.render = function () {
        var _this = this;
        var _a = this.state, focused = _a.focused, emails = _a.emails, inputValue = _a.inputValue, placeholder = _a.placeholder;
        var _b = this.props, style = _b.style, getLabel = _b.getLabel;
        // removeEmail
        return (React.createElement("div", { className: 'react-multi-email ' + (focused ? 'focused' : ''), style: style, onClick: function (e) {
                _this.emailInput.focus();
            } }, emails.map(function (email, index) {
            return getLabel(email, index, _this.removeEmail);
        }), React.createElement("input", { ref: function (ref) {
                if (ref) {
                    _this.emailInput = ref;
                }
            }, type: "text", value: inputValue, placeholder: emails.length ? '' : placeholder, onFocus: function (e) { return _this.setState({ focused: true }); }, onBlur: function (e) {
                _this.setState({ focused: false });
                _this.findEmailAddress(e.target.value, true);
            }, onChange: function (e) { return _this.onChangeInputValue(e.target.value); }, onKeyDown: function (e) {
                if (e.which === 8 && !e.target.value) {
                    _this.removeEmail(_this.state.emails.length - 1);
                }
            }, onKeyUp: function (e) {
                if (e.which === 13) {
                    _this.findEmailAddress(e.target.value, true);
                }
            } })));
    };
    return ReactMultiEmail;
}(React.Component));
exports.default = ReactMultiEmail;
//# sourceMappingURL=ReactMultiEmail.js.map