global.webpackJsonp([4],{

/***/ 132:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 143:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "invite-wrapper"
  }, [_c('div', {
    staticClass: "invite-content"
  }, [_c('img', {
    attrs: {
      "src": _vm.qr,
      "mode": "aspectFill"
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "btn save-btn",
    attrs: {
      "eventid": '0'
    },
    on: {
      "click": _vm.save
    }
  }, [_vm._v("保存图片")])])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-b622e6c0", esExports)
  }
}

/***/ }),

/***/ 61:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_b622e6c0_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_mpvue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(143);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(132)
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
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_b622e6c0_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_mpvue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\pages\\invite\\index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-b622e6c0", Component.options)
  } else {
    hotAPI.reload("data-v-b622e6c0", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 67:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index_vue__ = __webpack_require__(61);



var app = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a(__WEBPACK_IMPORTED_MODULE_1__index_vue__["a" /* default */]);
app.$mount();

/* harmony default export */ __webpack_exports__["default"] = ({
    config: {
        navigationBarTitleText: '邀请卡'
    }
});

/***/ }),

/***/ 77:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__api__ = __webpack_require__(6);


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
            user: {},

            qr: ''
        };
    },
    created: function created() {
        var _this = this;

        wx.getStorage({
            key: 'user',
            success: function success(res) {
                _this.user = res.data;
            }
        });
    },
    onLoad: function onLoad() {
        this.getInviteQR();
    },
    onShareAppMessage: function onShareAppMessage() {
        return {
            title: this.user.nickname + '\u9080\u8BF7\u4F60\u52A0\u5165\u6253\u5361\u8BA1\u5212',
            path: '/pages/index/index'
        };
    },


    methods: {
        getInviteQR: function getInviteQR() {
            var _this2 = this;

            return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator___default()( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.mark(function _callee() {
                var params, data;
                return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                params = {
                                    clockPID: +_this2.$root.$mp.query.id
                                };
                                _context.next = 3;
                                return __WEBPACK_IMPORTED_MODULE_2__api__["a" /* default */].getInviteCard(params);

                            case 3:
                                data = _context.sent;

                                if (!(data.flag === 1)) {
                                    _context.next = 7;
                                    break;
                                }

                                _this2.qr = data.data.ImageUrl;

                                return _context.abrupt('return');

                            case 7:

                                wx.showModal({
                                    title: '提示',
                                    content: data.msg,
                                    showCancel: false
                                });

                            case 8:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, _this2);
            }))();
        },
        save: function save() {
            var _this3 = this;

            return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator___default()( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.mark(function _callee2() {
                return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                wx.getSetting({
                                    success: function success(res) {
                                        if (res.authSetting['scope.writePhotosAlbum'] === false) {
                                            wx.showModal({
                                                title: '提示',
                                                content: '保存需要权限',
                                                success: function success(res) {
                                                    if (res.confirm) {
                                                        wx.openSetting({
                                                            success: function success(res) {
                                                                if (res.authSetting['scope.writePhotosAlbum']) {
                                                                    _this3.saveImage();
                                                                }
                                                            }
                                                        });
                                                    } else if (res.cancel) {
                                                        wx.showToast({
                                                            title: '保存失败',
                                                            icon: 'none',
                                                            duration: 2000
                                                        });
                                                    }
                                                }
                                            });
                                        } else {
                                            _this3.saveImage();
                                        }
                                    }
                                });

                            case 1:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, _this3);
            }))();
        },
        saveImage: function saveImage(res) {
            wx.getImageInfo({
                src: this.qr,
                success: function success(res) {
                    wx.saveImageToPhotosAlbum({
                        filePath: res.path,
                        success: function success() {
                            wx.showToast({
                                title: '保存成功',
                                icon: 'none',
                                duration: 2000
                            });
                        },
                        fail: function fail() {
                            wx.showToast({
                                title: '保存失败',
                                icon: 'none',
                                duration: 2000
                            });
                        }
                    });
                }
            });
        }
    }
});

/***/ })

},[67]);
//# sourceMappingURL=index.js.map