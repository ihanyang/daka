global.webpackJsonp([2],{

/***/ 129:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 133:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 136:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_action_sheet_vue__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_2f3deb48_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_mpvue_loader_lib_selector_type_template_index_0_action_sheet_vue__ = __webpack_require__(140);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(129)
}
var normalizeComponent = __webpack_require__(4)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-2f3deb48"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_action_sheet_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_2f3deb48_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_mpvue_loader_lib_selector_type_template_index_0_action_sheet_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\components\\action-sheet.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] action-sheet.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-2f3deb48", Component.options)
  } else {
    hotAPI.reload("data-v-2f3deb48", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 140:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "modal",
    attrs: {
      "eventid": '2'
    },
    on: {
      "click": _vm.cancel
    }
  }, [_c('div', {
    staticClass: "modal-content"
  }, [_c('button', {
    staticClass: "modal-item",
    attrs: {
      "open-type": "share"
    }
  }, [_vm._v("分享给朋友")]), _vm._v(" "), _c('div', {
    staticClass: "modal-item share",
    attrs: {
      "eventid": '0'
    },
    on: {
      "click": _vm.go
    }
  }, [_vm._v("分享给朋友")]), _vm._v(" "), _c('div', {
    staticClass: "modal-item",
    attrs: {
      "eventid": '1'
    },
    on: {
      "click": _vm.go
    }
  }, [_vm._v("生成卡片 保存分享")])], 1)])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-2f3deb48", esExports)
  }
}

/***/ }),

/***/ 144:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "detail-wrapper"
  }, [_c('header', {
    staticClass: "detail-header"
  }, [_c('p', [_vm._v("已坚持打卡（天）")]), _vm._v(" "), _c('strong', {
    domProps: {
      "textContent": _vm._s(_vm.day)
    }
  }), _vm._v(" "), (_vm.isComplete) ? _c('p', [_vm._v("共有" + _vm._s(_vm.totalDaKa) + "人完成打卡")]) : _c('p', [_vm._v("今日已有" + _vm._s(_vm.todayDaKa) + "人打卡")]), _vm._v(" "), _c('div', {
    staticClass: "detail-avatar-list"
  }, _vm._l((_vm.avatarList), function(item, index) {
    return _c('img', {
      key: item.Avatar,
      attrs: {
        "src": item.Avatar
      }
    })
  })), _vm._v(" "), (!_vm.isComplete) ? _c('div', {
    staticClass: "invite-btn",
    attrs: {
      "eventid": '0'
    },
    on: {
      "click": _vm.showActionSheet
    }
  }) : _vm._e()], 1), _vm._v(" "), (_vm.isJoin) ? [(_vm.isComplete) ? [_c('div', {
    staticClass: "btn daka-btn disabled"
  }, [_vm._v("已完成")])] : [(_vm.isDaKa) ? _c('div', {
    staticClass: "btn daka-btn disabled"
  }, [_vm._v("已打卡")]) : _c('div', {
    staticClass: "btn daka-btn",
    attrs: {
      "eventid": '1'
    },
    on: {
      "click": _vm.daka
    }
  }, [_vm._v("打卡")])]] : [_c('div', {
    staticClass: "btn daka-btn",
    attrs: {
      "eventid": '2'
    },
    on: {
      "click": _vm.dakaPrompt
    }
  }, [_vm._v("打卡")])], _vm._v(" "), _c('div', {
    staticClass: "detail-intro"
  }, [_c('p', {
    class: {
      'line-overflow': _vm.isShrink && _vm.isLongIntro
    },
    domProps: {
      "textContent": _vm._s(_vm.intro)
    }
  }), _vm._v(" "), (_vm.isShrink && _vm.isLongIntro) ? _c('div', {
    staticClass: "btn",
    attrs: {
      "eventid": '3'
    },
    on: {
      "click": function($event) {
        _vm.isShrink = false
      }
    }
  }, [_vm._v("展开")]) : _vm._e()], 1), _vm._v(" "), _c('button', {
    attrs: {
      "open-type": "share"
    }
  }), _vm._v(" "), (!_vm.isJoin) ? _c('div', {
    staticClass: "btn join-btn",
    attrs: {
      "eventid": '4'
    },
    on: {
      "click": _vm.join
    }
  }, [_vm._v("加入该小组")]) : _vm._e(), _vm._v(" "), (_vm.shareModalStatus) ? _c('action-sheet', {
    attrs: {
      "eventid": '5',
      "mpcomid": '4'
    },
    on: {
      "cancel": function($event) {
        _vm.shareModalStatus = false
      }
    }
  }) : _vm._e()], 2)
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-cbad0830", esExports)
  }
}

/***/ }),

/***/ 58:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_cbad0830_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_mpvue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(144);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(133)
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
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_cbad0830_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_mpvue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\pages\\detail\\index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-cbad0830", Component.options)
  } else {
    hotAPI.reload("data-v-cbad0830", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 64:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index_vue__ = __webpack_require__(58);



var app = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a(__WEBPACK_IMPORTED_MODULE_1__index_vue__["a" /* default */]);
app.$mount();

/***/ }),

/***/ 70:
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
	props: ['items'],

	methods: {
		cancel: function cancel() {
			this.$emit('cancel');
		},
		go: function go() {
			wx.navigateTo({
				url: '/pages/invite/index?id=' + this.$root.$mp.query
			});
		}
	}
});

/***/ }),

/***/ 74:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_action_sheet__ = __webpack_require__(136);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__api__ = __webpack_require__(6);


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
            day: 0,
            todayDaKa: 0,
            avatarList: [],
            intro: '',

            totalDaKa: 0,
            isShrink: true,

            isDaKaing: false,
            isComplete: false,
            isDaKa: false,
            isJoin: false,

            shareModalStatus: false
        };
    },


    components: {
        actionSheet: __WEBPACK_IMPORTED_MODULE_2__components_action_sheet__["a" /* default */]
    },

    computed: {
        isLongIntro: function isLongIntro() {
            return this.intro.length > 40;
        }
    },

    onLoad: function onLoad() {
        this.getDetailData();
    },
    onUnload: function onUnload() {
        this.clear();
    },
    onShareAppMessage: function onShareAppMessage(res) {
        return {
            title: wx.getStorageSync('user').nickname + '\u9080\u8BF7\u4F60\u52A0\u5165\u6253\u5361\u8BA1\u5212',
            path: '/pages/index/index'
        };
    },


    methods: {
        getDetailData: function getDetailData() {
            var _this = this;

            return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator___default()( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.mark(function _callee() {
                var params, data;
                return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                params = {
                                    clockPID: _this.$root.$mp.query.id
                                };
                                _context.next = 3;
                                return __WEBPACK_IMPORTED_MODULE_3__api__["a" /* default */].getDetailData(params);

                            case 3:
                                data = _context.sent;


                                wx.setNavigationBarTitle({
                                    title: data.data.PlanName
                                });

                                _this.day = data.data.ClockDay;
                                _this.todayDaKa = data.data.TodayClockNum;
                                _this.totalDaKa = data.data.TotalJoinNum;
                                _this.avatarList = data.data.AvatarList;
                                _this.intro = data.data.Description;
                                _this.isJoin = data.data.HasJoin;
                                _this.isDaKa = data.data.HasClock;
                                _this.isComplete = data.data.HasFinish;

                            case 13:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, _this);
            }))();
        },
        daka: function daka() {
            var _this2 = this;

            return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator___default()( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.mark(function _callee2() {
                var params, data, dakaList, index;
                return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                params = {
                                    clockPID: _this2.$root.$mp.query.id
                                };
                                _context2.next = 3;
                                return __WEBPACK_IMPORTED_MODULE_3__api__["a" /* default */].daka(params);

                            case 3:
                                data = _context2.sent;


                                if (data.flag === 1) {
                                    _this2.isDaKa = true;

                                    _this2.todayDaKa = data.data.TotalJoinNum;

                                    dakaList = getApp().dakaList;
                                    index = getApp().index;


                                    dakaList[index].HasClock = 1;
                                    dakaList[index].ClockNum++;

                                    wx.showToast({
                                        title: '加油，你离梦想又近了一步！',
                                        icon: 'none',
                                        duration: 2000
                                    });
                                }

                            case 5:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, _this2);
            }))();
        },
        join: function join() {
            var _this3 = this;

            return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator___default()( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.mark(function _callee3() {
                var params, data;
                return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                params = {
                                    clockPID: +_this3.$root.$mp.query.id
                                };
                                _context3.next = 3;
                                return __WEBPACK_IMPORTED_MODULE_3__api__["a" /* default */].joinGroup(params);

                            case 3:
                                data = _context3.sent;


                                if (data.flag === 1) {
                                    _this3.isJoin = true;

                                    wx.showToast({
                                        title: '加入成功',
                                        icon: 'none',
                                        duration: 2000
                                    });
                                }

                            case 5:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, _this3);
            }))();
        },
        dakaPrompt: function dakaPrompt() {
            wx.showToast({
                title: '加入小组后才可打卡哟',
                icon: 'none',
                duration: 2000
            });
        },
        showActionSheet: function showActionSheet() {
            this.shareModalStatus = true;
            return;

            wx.showActionSheet({
                itemList: ['分享给朋友', '生成卡片 保存分享'],
                success: function success(res) {
                    console.log(res.tapIndex);
                }
            });
        },
        clear: function clear() {
            this.day = 0;
            this.todayDaKa = 0;
            this.intro = '';
            this.avatarList = [];

            this.isJoin = false;
            this.isComplete = false;
            this.isDaKa = false;
            this.isDaKaing = false;
        }
    }
});

/***/ })

},[64]);
//# sourceMappingURL=index.js.map