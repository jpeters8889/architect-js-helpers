(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["architect-js-helpers"] = factory();
	else
		root["architect-js-helpers"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
    props: {
        name: String,
        value: String,
        metas: Array | Object,
        listener: {
            type: String,
            default: 'prepare-form-data'
        },
        emitter: {
            type: String,
            default: 'form-field-change'
        }
    },

    mounted() {
        if (this.value !== undefined) {
            this.actualValue = this.value;
        }

        this.bootstrapListeners();

        this.debouncedEvents = window._.debounce(this.dispatchEvents, 500);
    },

    data: () => ({
        actualValue: '',
        emitterValue: null,
        setEmitterValue: true
    }),

    methods: {
        getFormData() {
            return {
                name: this.name,
                value: this.actualValue
            };
        },

        dispatchEvents() {
            if (this.emitterValue) {
                window.Architect.$emit(this.name + '-changed', this.emitterValue);
            }
        },

        bootstrapListeners() {
            window.Architect.$on(this.listener, () => {
                window.Architect.$emit(this.emitter, this.getFormData());
            });

            /**
             * listeners [
             *      changed: [
             *          column1
             *          column2
             *      ]
             *  ]
             */

            Object.keys(this.metas.listeners).forEach(event => {
                let column = this.metas.listeners[event];

                if (typeof column === 'string') {
                    window.Architect.$on(column + '-' + event, value => {
                        Architect.request().post('/listener', {
                            blueprint: this.$route.params.blueprint,
                            event: column + '-' + event,
                            column: this.name,
                            value: JSON.stringify(value)
                        }).then(response => {
                            this.actualValue = response.data;
                        }).catch(error => {
                            Architect.$emit(error.response.data.message);
                        });
                    });
                }
            });
        }
    },

    watch: {
        emitterValue: function (newValue) {
            if (newValue !== '') {
                this.debouncedEvents();
            }
        },
        actualValue: function (newValue) {
            if (this.setEmitterValue) {
                this.emitterValue = newValue;
            }
        }
    }
});

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__traits_IsAFormField__ = __webpack_require__(0);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "IsAFormField", function() { return __WEBPACK_IMPORTED_MODULE_0__traits_IsAFormField__["a"]; });




/***/ })
/******/ ]);
});