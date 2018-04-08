global.webpackJsonp([1],{

/***/ 130:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 131:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 137:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_navigator_vue__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_4858ecc7_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_mpvue_loader_lib_selector_type_template_index_0_navigator_vue__ = __webpack_require__(142);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(131)
}
var normalizeComponent = __webpack_require__(4)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-4858ecc7"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_navigator_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_4858ecc7_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_mpvue_loader_lib_selector_type_template_index_0_navigator_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\components\\navigator.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] navigator.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-4858ecc7", Component.options)
  } else {
    hotAPI.reload("data-v-4858ecc7", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 141:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "home-wrapper"
  }, [_c('header', {
    staticClass: "home-header"
  }, [_c('div', {
    staticClass: "user-info"
  }, [_c('img', {
    staticClass: "avatar",
    attrs: {
      "src": _vm.userInfo.avatar
    }
  }), _vm._v(" "), _c('p', {
    domProps: {
      "textContent": _vm._s(_vm.userInfo.nickname)
    }
  })], 1), _vm._v(" "), _c('div', {
    staticClass: "home-learn"
  }, [_c('div', {
    staticClass: "home-learn-item"
  }, [_c('strong', [_vm._v(_vm._s(_vm.learnHoursFormat))]), _vm._v(" "), _c('p', [_vm._v("累计学习时长")])], 1), _vm._v(" "), _c('div', {
    staticClass: "home-learn-item"
  }, [_c('strong', [_vm._v(_vm._s(_vm.dakaTimes) + "天")]), _vm._v(" "), _c('p', [_vm._v("累计打卡天数")])], 1), _vm._v(" "), _c('div', {
    staticClass: "home-learn-item"
  }, [_c('strong', [_vm._v(_vm._s(_vm.learnPlan) + "个")]), _vm._v(" "), _c('p', [_vm._v("学习计划")])], 1)])]), _vm._v(" "), (!_vm.isDakaRecord) ? _c('div', {
    staticClass: "btn create-daka-btn",
    class: {
      dakaed: _vm.isDakaRecord
    },
    attrs: {
      "eventid": '1'
    },
    on: {
      "click": _vm.go
    }
  }, [_vm._v("创建我的打卡")]) : _c('div', {
    staticClass: "daka-list-wrapper"
  }, [_c('header', [_c('h1', [_vm._v("我的计划")]), _vm._v(" "), _c('div', {
    staticClass: "btn created-daka-btn",
    attrs: {
      "eventid": '0'
    },
    on: {
      "click": _vm.go
    }
  }, [_vm._v("创建我的打卡")])], 1), _vm._v(" "), _c('ul', _vm._l((_vm.dakaList), function(item, index) {
    return _c('daka-item', {
      key: item.url,
      attrs: {
        "item": item,
        "index": index,
        "mpcomid": '0-' + index
      }
    })
  }))], 1), _vm._v(" "), (_vm.loadingScroll) ? _c('div', {
    staticClass: "loading-scroll"
  }) : _vm._e(), _vm._v(" "), (_vm.isLoading) ? _c('loading', {
    attrs: {
      "mpcomid": '1'
    }
  }) : _vm._e()])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-3be21c31", esExports)
  }
}

/***/ }),

/***/ 142:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('nav', {
    staticClass: "navigator"
  }, [_c('a', {
    staticClass: "daka-icon",
    attrs: {
      "href": "/pages/index/index"
    }
  }, [_vm._v("打卡")]), _vm._v(" "), _c('a', {
    staticClass: "discover-icon",
    attrs: {
      "href": "/pages/discover/index"
    }
  }, [_vm._v("发现")])])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-4858ecc7", esExports)
  }
}

/***/ }),

/***/ 35:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = login;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_promise__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_promise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_promise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__api__ = __webpack_require__(6);





function login() {
    var _this = this;

    return new __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_promise___default.a(function (resolve, reject) {
        wx.login({
            success: function () {
                var _ref = __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator___default()( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.mark(function _callee(res) {
                    var data;
                    return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {
                        while (1) {
                            switch (_context.prev = _context.next) {
                                case 0:
                                    _context.next = 2;
                                    return __WEBPACK_IMPORTED_MODULE_3__api__["a" /* default */].login({
                                        code: res.code,
                                        flag: 'app02'
                                    });

                                case 2:
                                    data = _context.sent;


                                    //console.log(response)

                                    !wx.getStorageSync('session') && wx.setStorageSync('session', data.data.session);

                                    resolve();

                                case 5:
                                case 'end':
                                    return _context.stop();
                            }
                        }
                    }, _callee, _this);
                }));

                return function success(_x) {
                    return _ref.apply(this, arguments);
                };
            }(),
            fail: function fail() {
                reject();
            }
        });
    });
}

/***/ }),

/***/ 60:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_3be21c31_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_mpvue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(141);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(130)
}
var normalizeComponent = __webpack_require__(4)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_index_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_3be21c31_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_mpvue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\pages\\index\\index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-3be21c31", Component.options)
  } else {
    hotAPI.reload("data-v-3be21c31", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 66:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index_vue__ = __webpack_require__(60);



var app = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a(__WEBPACK_IMPORTED_MODULE_1__index_vue__["a" /* default */]);
app.$mount();

/***/ }),

/***/ 73:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["a"] = ({
    data: function data() {
        return {};
    },


    methods: {
        gos: function gos() {
            console.log(111221);
            // wx.navigateTo({
            //     url: `/pages/index/index`
            // })
        }
    }
});

/***/ }),

/***/ 76:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_slicedToArray__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_slicedToArray___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_slicedToArray__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_regenerator__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_asyncToGenerator__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_asyncToGenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_asyncToGenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_daka_item__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_navigator__ = __webpack_require__(137);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_loading__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__api__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__utils__ = __webpack_require__(35);





//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//








/* harmony default export */ __webpack_exports__["a"] = ({
    data: function data() {
        return {
            isLoading: false,

            userInfo: {},

            isDakaRecord: false,
            isListLoaded: false,
            dakaList: [],

            learnHours: 0,
            dakaTimes: 0,
            learnPlan: 0,

            page: 1,

            loadingScroll: false
        };
    },


    components: {
        dakaItem: __WEBPACK_IMPORTED_MODULE_5__components_daka_item__["a" /* default */],
        navigator: __WEBPACK_IMPORTED_MODULE_6__components_navigator__["a" /* default */],
        loading: __WEBPACK_IMPORTED_MODULE_7__components_loading__["a" /* default */]
    },

    computed: {
        learnHoursFormat: function learnHoursFormat() {
            var str = void 0;
            var hours = 1 * 60 * 60;
            var time = this.learnHours;

            if (time < hours) {
                str = Math.round(Math.max(1, time / 60)) + '\u5206\u949F';
            }

            if (time % hours === 0) {
                str = time / hours + '\u5C0F\u65F6';
            }

            if (time < 24 * hours) {
                var h = ~~(time / hours);

                str = h + '\u5C0F\u65F6' + Math.round(Math.max(1, (time - h * hours) / 60)) + '\u5206\u949F';
            }

            if (time % (24 * hours) === 0) {
                str = time / (hours * 24) + '\u5929';
            }

            if (time > 24 * hours && time % (24 * hours) !== 0) {
                var day = ~~(time / (24 * hours));
                var _h = ~~((time - day * 24 * hours) / hours);
                var m = Math.round(Math.max(1, (time - (day * 24 * hours + _h * hours)) / 60));

                //console.log(h)
                var hourStr = _h + '\u5C0F\u65F6';
                var minuteStr = m + '\u5206\u949F';

                str = day + '\u5929' + (_h ? hourStr : '') + (m && !_h ? minuteStr : '');
            }

            if (time >= 30 * 24 * hours) {
                var month = ~~(time / (30 * 24 * hours));
                var _day = ~~((time - month * 30 * 24 * hours) / (24 * hours));

                var monthStr = month + '\u6708';
                var dayStr = _day + '\u5929';

                str = month + '\u6708' + (_day ? dayStr : '');
            }

            return str;
        }
    },

    onLoad: function onLoad() {
        var _this = this;

        return __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_asyncToGenerator___default()( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_3_babel_runtime_regenerator___default.a.mark(function _callee() {
            return __WEBPACK_IMPORTED_MODULE_3_babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _this.isDakaRecord = wx.getStorageSync('isDakaRecord');

                            if (_this.isDakaRecord) {
                                _context.next = 4;
                                break;
                            }

                            wx.switchTab({
                                url: '/pages/discover/index'
                            });

                            return _context.abrupt('return');

                        case 4:

                            _this.isLoading = true;

                            _context.next = 7;
                            return _this.getHomeData();

                        case 7:

                            _this.isLoading = false;

                        case 8:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, _this);
        }))();
    },
    onReachBottom: function onReachBottom() {
        this.scroll();
    },


    methods: {
        getHomeData: function getHomeData(code) {
            var _this2 = this;

            return __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_asyncToGenerator___default()( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_3_babel_runtime_regenerator___default.a.mark(function _callee2() {
                return __WEBPACK_IMPORTED_MODULE_3_babel_runtime_regenerator___default.a.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _context2.next = 2;
                                return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_9__utils__["a" /* login */])();

                            case 2:

                                _this2.getUserInfo();

                            case 3:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, _this2);
            }))();
        },
        getUserInfo: function getUserInfo() {
            var _this3 = this;

            wx.getUserInfo({
                withCredentials: true,
                success: function () {
                    var _ref = __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_asyncToGenerator___default()( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_3_babel_runtime_regenerator___default.a.mark(function _callee3(res) {
                        var _ref2, _ref3, userInfo;

                        return __WEBPACK_IMPORTED_MODULE_3_babel_runtime_regenerator___default.a.wrap(function _callee3$(_context3) {
                            while (1) {
                                switch (_context3.prev = _context3.next) {
                                    case 0:
                                        _context3.next = 2;
                                        return __WEBPACK_IMPORTED_MODULE_8__api__["a" /* default */].saveUserInfo({
                                            encryptedData: res.encryptedData,
                                            iv: res.iv
                                        });

                                    case 2:
                                        _context3.next = 4;
                                        return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise___default.a.all([__WEBPACK_IMPORTED_MODULE_8__api__["a" /* default */].getHomeData(), _this3.getMyDaKaList()]);

                                    case 4:
                                        _ref2 = _context3.sent;
                                        _ref3 = __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_slicedToArray___default()(_ref2, 1);
                                        userInfo = _ref3[0];


                                        _this3.userInfo = {
                                            avatar: userInfo.data.Avatar,
                                            nickname: userInfo.data.Nickname
                                        };

                                        wx.setStorage({
                                            key: 'user',
                                            data: _this3.userInfo
                                        });

                                        _this3.learnHours = userInfo.data.StudyTime;
                                        _this3.dakaTimes = userInfo.data.ClockDay;
                                        _this3.learnPlan = userInfo.data.PlanNum;

                                    case 12:
                                    case 'end':
                                        return _context3.stop();
                                }
                            }
                        }, _callee3, _this3);
                    }));

                    return function success(_x) {
                        return _ref.apply(this, arguments);
                    };
                }(),
                fail: function fail() {
                    wx.showModal({
                        title: '用户拒绝授权',
                        content: '请重新授权',
                        showCancel: false,
                        success: function success() {
                            wx.openSetting({
                                success: function success() {
                                    _this3.getUserInfo();
                                }
                            });
                        }
                    });
                }
            });
        },
        getMyDaKaList: function getMyDaKaList() {
            var _this4 = this;

            return __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_asyncToGenerator___default()( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_3_babel_runtime_regenerator___default.a.mark(function _callee4() {
                var params, data;
                return __WEBPACK_IMPORTED_MODULE_3_babel_runtime_regenerator___default.a.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                params = {
                                    page: _this4.page,
                                    pagesize: 10
                                };
                                _context4.next = 3;
                                return __WEBPACK_IMPORTED_MODULE_8__api__["a" /* default */].getMyDaKaList(params);

                            case 3:
                                data = _context4.sent;


                                _this4.page++;
                                _this4.isDakaRecord = !!data.data.Total;

                                data.data.Rows.forEach(function (item) {
                                    item.IsJoin = true;
                                });

                                getApp().dakaList = [].concat(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray___default()(_this4.dakaList), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray___default()(data.data.Rows));

                                _this4.dakaList = getApp().dakaList;

                                _this4.isListLoaded = _this4.dakaList.length === data.data.Total;

                                !wx.getStorageSync('isDakaRecord') && wx.setStorage({
                                    key: 'isDakaRecord',
                                    data: _this4.isDakaRecord
                                });

                            case 11:
                            case 'end':
                                return _context4.stop();
                        }
                    }
                }, _callee4, _this4);
            }))();
        },
        go: function go() {
            wx.navigateTo({
                url: '/pages/post/index'
            });
        },
        scroll: function scroll() {
            var _this5 = this;

            return __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_asyncToGenerator___default()( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_3_babel_runtime_regenerator___default.a.mark(function _callee5() {
                return __WEBPACK_IMPORTED_MODULE_3_babel_runtime_regenerator___default.a.wrap(function _callee5$(_context5) {
                    while (1) {
                        switch (_context5.prev = _context5.next) {
                            case 0:
                                _this5.loadingScroll = true;

                                _context5.t0 = !_this5.isListLoaded;

                                if (!_context5.t0) {
                                    _context5.next = 5;
                                    break;
                                }

                                _context5.next = 5;
                                return _this5.getMyDaKaList();

                            case 5:

                                _this5.loadingScroll = false;

                            case 6:
                            case 'end':
                                return _context5.stop();
                        }
                    }
                }, _callee5, _this5);
            }))();
        }
    }
});

/***/ })

},[66]);
//# sourceMappingURL=index.js.map