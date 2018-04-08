global.webpackJsonp([3],{

/***/ 134:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 145:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "post-wrapper"
  }, [_c('div', {
    staticClass: "post-box"
  }, [_c('h2', [_vm._v("打卡项目名称")]), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.title),
      expression: "title"
    }],
    attrs: {
      "type": "text",
      "placeholder": "例：考研打卡群（必填）",
      "focus": "true",
      "maxlength": "50",
      "eventid": '0'
    },
    domProps: {
      "value": (_vm.title)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.title = $event.target.value
      }
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "post-img-wrapper"
  }, [_c('img', {
    class: {
      selected: _vm.isSelectImg
    },
    attrs: {
      "src": _vm.postImg,
      "mode": "aspectFill"
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "post-input",
    attrs: {
      "eventid": '1'
    },
    on: {
      "click": _vm.chooseImage
    }
  }, [_c('span', [_vm._v("本地上传图片")])])])], 1), _vm._v(" "), _c('div', {
    staticClass: "post-box"
  }, [_c('h2', [_vm._v("打卡详细描述")]), _vm._v(" "), _c('textarea', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.detail),
      expression: "detail"
    }],
    attrs: {
      "auto-height": "",
      "maxlength": "300",
      "show-confirm-bar": false,
      "placeholder": "请输入详细描述（选填）",
      "eventid": '2'
    },
    domProps: {
      "value": (_vm.detail)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.detail = $event.target.value
      }
    }
  })], 1), _vm._v(" "), _c('div', {
    staticClass: "post-box"
  }, [_c('h2', [_vm._v("设置开始结束日期")]), _vm._v(" "), _c('label', {
    attrs: {
      "eventid": '3'
    },
    on: {
      "click": function($event) {
        _vm.selectRadio(1)
      }
    }
  }, [_c('i', {
    staticClass: "radio-btn",
    class: {
      selected: _vm.dateType === 1
    }
  }), _vm._v("\n            长期打卡\n        ")], 1), _vm._v(" "), _c('label', {
    attrs: {
      "eventid": '4'
    },
    on: {
      "click": function($event) {
        _vm.selectRadio(2)
      }
    }
  }, [_c('i', {
    staticClass: "radio-btn",
    class: {
      selected: _vm.dateType === 2
    }
  }), _vm._v("\n            设置打卡时间段\n        ")], 1), _vm._v(" "), (_vm.isPostDateBoxShow) ? _c('div', {
    staticClass: "post-date-box"
  }, [_c('div', {
    staticClass: "post-date-item"
  }, [_c('picker', {
    attrs: {
      "mode": "date",
      "value": _vm.startDate,
      "eventid": '5'
    },
    on: {
      "change": _vm.startDateChange
    }
  }, [_c('p', {
    class: {
      actived: _vm.startDate
    },
    domProps: {
      "textContent": _vm._s(_vm.startDate || '开始日期')
    }
  })], 1)], 1), _vm._v(" "), _c('div', {
    staticClass: "post-date-item"
  }, [_c('picker', {
    attrs: {
      "mode": "date",
      "start": _vm.startDate,
      "value": _vm.endDate,
      "eventid": '6'
    },
    on: {
      "change": _vm.endDateChange
    }
  }, [_c('p', {
    class: {
      actived: _vm.endDate
    },
    domProps: {
      "textContent": _vm._s(_vm.endDate || '结束日期')
    }
  })], 1)], 1)]) : _vm._e()], 1), _vm._v(" "), (!_vm.generating) ? _c('div', {
    staticClass: "btn generation-plan",
    class: {
      disabled: !_vm.isDisabled
    },
    attrs: {
      "eventid": '7'
    },
    on: {
      "click": _vm.generationPlan
    }
  }, [_vm._v("生成计划")]) : _c('div', {
    staticClass: "btn generation-plan disabled"
  }, [_vm._v("生成中...")])])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-e6813712", esExports)
  }
}

/***/ }),

/***/ 62:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_e6813712_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_mpvue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(145);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(134)
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
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_e6813712_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_mpvue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\pages\\post\\index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-e6813712", Component.options)
  } else {
    hotAPI.reload("data-v-e6813712", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 68:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index_vue__ = __webpack_require__(62);



var app = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a(__WEBPACK_IMPORTED_MODULE_1__index_vue__["a" /* default */]);
app.$mount();

/* harmony default export */ __webpack_exports__["default"] = ({
    config: {
        navigationBarTitleText: '新建打卡'
    }
});

/***/ }),

/***/ 78:
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

//import postImg from '@/images/discover-icon.png'


/* harmony default export */ __webpack_exports__["a"] = ({
    data: function data() {
        return {
            title: '',
            detail: '',
            postImg: '',

            dateType: -1,
            startDate: '',
            endDate: '',

            generating: false
        };
    },


    computed: {
        isPostDateBoxShow: function isPostDateBoxShow() {
            return this.dateType === 2;
        },
        isSelectImg: function isSelectImg() {
            return !this.postImg.startsWith('data');
        },
        isDisabled: function isDisabled() {
            return this.title && this.postImg && this.dateType !== -1;
        }
    },

    onUnload: function onUnload() {
        this.title = '';
        this.postImg = '';
        this.detail = '';

        this.dateType = -1;
        this.startDate = '';
        this.endDate = '';
    },


    methods: {
        selectRadio: function selectRadio(value) {
            this.dateType = value;
        },
        chooseImage: function chooseImage() {
            var _this = this;

            wx.chooseImage({
                success: function success(res) {
                    console.log(res);

                    _this.postImg = res.tempFilePaths[0];
                }
            });
        },
        startDateChange: function startDateChange(e) {
            this.startDate = e.mp.detail.value;
        },
        endDateChange: function endDateChange(e) {
            this.endDate = e.mp.detail.value;
        },
        generationPlan: function generationPlan() {
            var _this2 = this;

            return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator___default()( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.mark(function _callee() {
                var params, data;
                return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _this2.generating = true;

                                params = {
                                    planName: _this2.title,
                                    description: _this2.detail,
                                    cover: _this2.postImg,
                                    timeType: _this2.dateType
                                };


                                if (_this2.dateType === 2) {
                                    params.startTime = _this2.startDate;
                                    params.stopTime = _this2.endDate;
                                }

                                _context.next = 5;
                                return __WEBPACK_IMPORTED_MODULE_2__api__["a" /* default */].createDaKa(params);

                            case 5:
                                data = _context.sent;


                                _this2.generating = false;

                                getApp().dakaList.unshift({
                                    HasFinish: 0,
                                    HasClock: 0,
                                    ClockPID: data.data.id,
                                    PlanName: _this2.title,
                                    Cover: _this2.postImg,
                                    Description: _this2.detail,
                                    AvatarList: [{ Avatar: wx.getStorageSync('user').avatar }]
                                });

                                wx.navigateBack({
                                    delta: 1
                                });

                            case 9:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, _this2);
            }))();
        }
    }
});

/***/ })

},[68]);
//# sourceMappingURL=index.js.map