/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/_app";
exports.ids = ["pages/_app"];
exports.modules = {

/***/ "./Redux/AuthReducer.tsx":
/*!*******************************!*\
  !*** ./Redux/AuthReducer.tsx ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"AuthSlice\": () => (/* binding */ AuthSlice),\n/* harmony export */   \"SetLogIn\": () => (/* binding */ SetLogIn),\n/* harmony export */   \"SetMode\": () => (/* binding */ SetMode),\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @reduxjs/toolkit */ \"@reduxjs/toolkit\");\n/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__);\n\nconst InitialState = {\n    Mode: \"Light\",\n    User: null,\n    Token: null,\n    Posts: []\n};\nconst AuthSlice = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__.createSlice)({\n    name: \"Auth\",\n    initialState: InitialState,\n    reducers: {\n        SetMode: (State)=>{\n            State.Mode = State.Mode === \"Light\" ? \"Dark\" : \"Light\";\n        },\n        SetLogIn: (State, Action)=>{\n            State.User = Action.payload.User;\n            State.Token = Action.payload.Token;\n        }\n    }\n});\nconst { SetMode , SetLogIn  } = AuthSlice.actions;\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AuthSlice.reducer);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9SZWR1eC9BdXRoUmVkdWNlci50c3guanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQStDO0FBRS9DLE1BQU1DLGVBQWE7SUFDZkMsTUFBSztJQUNMQyxNQUFLLElBQUk7SUFDVEMsT0FBTSxJQUFJO0lBQ1ZDLE9BQU0sRUFBRTtBQUNaO0FBRU8sTUFBTUMsWUFBVU4sNkRBQVdBLENBQUM7SUFDL0JPLE1BQUs7SUFDTEMsY0FBYVA7SUFDYlEsVUFBUztRQUNMQyxTQUFRLENBQUNDLFFBQVE7WUFDYkEsTUFBTVQsSUFBSSxHQUFHUyxNQUFNVCxJQUFJLEtBQUcsVUFBVSxTQUFPLE9BQU87UUFDdEQ7UUFDQVUsVUFBUyxDQUFDRCxPQUFNRSxTQUFTO1lBQ3JCRixNQUFNUixJQUFJLEdBQUNVLE9BQU9DLE9BQU8sQ0FBQ1gsSUFBSTtZQUM5QlEsTUFBTVAsS0FBSyxHQUFDUyxPQUFPQyxPQUFPLENBQUNWLEtBQUs7UUFDcEM7SUFDSjtBQUVKLEdBQUU7QUFFSyxNQUFNLEVBQUNNLFFBQU8sRUFBQ0UsU0FBUSxFQUFDLEdBQUVOLFVBQVVTLE9BQU8sQ0FBQztBQUNuRCxpRUFBZVQsVUFBVVUsT0FBTyxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vQ2xpZW50Ly4vUmVkdXgvQXV0aFJlZHVjZXIudHN4PzFhZTIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3JlYXRlU2xpY2UgfSBmcm9tIFwiQHJlZHV4anMvdG9vbGtpdFwiO1xyXG5cclxuY29uc3QgSW5pdGlhbFN0YXRlPXtcclxuICAgIE1vZGU6XCJMaWdodFwiLFxyXG4gICAgVXNlcjpudWxsLFxyXG4gICAgVG9rZW46bnVsbCxcclxuICAgIFBvc3RzOltdXHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBBdXRoU2xpY2U9Y3JlYXRlU2xpY2Uoe1xyXG4gICAgbmFtZTpcIkF1dGhcIixcclxuICAgIGluaXRpYWxTdGF0ZTpJbml0aWFsU3RhdGUsXHJcbiAgICByZWR1Y2Vyczp7XHJcbiAgICAgICAgU2V0TW9kZTooU3RhdGUpPT57XHJcbiAgICAgICAgICAgIFN0YXRlLk1vZGUgPSBTdGF0ZS5Nb2RlPT09XCJMaWdodFwiID8gXCJEYXJrXCI6XCJMaWdodFwiO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgU2V0TG9nSW46KFN0YXRlLEFjdGlvbik9PntcclxuICAgICAgICAgICAgU3RhdGUuVXNlcj1BY3Rpb24ucGF5bG9hZC5Vc2VyO1xyXG4gICAgICAgICAgICBTdGF0ZS5Ub2tlbj1BY3Rpb24ucGF5bG9hZC5Ub2tlbjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59KVxyXG5cclxuZXhwb3J0IGNvbnN0IHtTZXRNb2RlLFNldExvZ0lufSA9QXV0aFNsaWNlLmFjdGlvbnM7XHJcbmV4cG9ydCBkZWZhdWx0IEF1dGhTbGljZS5yZWR1Y2VyOyJdLCJuYW1lcyI6WyJjcmVhdGVTbGljZSIsIkluaXRpYWxTdGF0ZSIsIk1vZGUiLCJVc2VyIiwiVG9rZW4iLCJQb3N0cyIsIkF1dGhTbGljZSIsIm5hbWUiLCJpbml0aWFsU3RhdGUiLCJyZWR1Y2VycyIsIlNldE1vZGUiLCJTdGF0ZSIsIlNldExvZ0luIiwiQWN0aW9uIiwicGF5bG9hZCIsImFjdGlvbnMiLCJyZWR1Y2VyIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./Redux/AuthReducer.tsx\n");

/***/ }),

/***/ "./pages/_app.tsx":
/*!************************!*\
  !*** ./pages/_app.tsx ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../styles/globals.css */ \"./styles/globals.css\");\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_styles_globals_css__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/head */ \"next/head\");\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _Redux_AuthReducer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Redux/AuthReducer */ \"./Redux/AuthReducer.tsx\");\n/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @reduxjs/toolkit */ \"@reduxjs/toolkit\");\n/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-redux */ \"react-redux\");\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var redux_persist__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! redux-persist */ \"redux-persist\");\n/* harmony import */ var redux_persist__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(redux_persist__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var redux_persist_lib_storage__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! redux-persist/lib/storage */ \"redux-persist/lib/storage\");\n/* harmony import */ var redux_persist_lib_storage__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(redux_persist_lib_storage__WEBPACK_IMPORTED_MODULE_7__);\n/* harmony import */ var redux_persist_integration_react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! redux-persist/integration/react */ \"redux-persist/integration/react\");\n/* harmony import */ var redux_persist_integration_react__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(redux_persist_integration_react__WEBPACK_IMPORTED_MODULE_8__);\n\n\n\n\n\n\n\n\n\nconst PersistConfig = {\n    key: \"root\",\n    storage: (redux_persist_lib_storage__WEBPACK_IMPORTED_MODULE_7___default()),\n    version: 1\n};\nconst PersistReducer = (0,redux_persist__WEBPACK_IMPORTED_MODULE_6__.persistReducer)(PersistConfig, _Redux_AuthReducer__WEBPACK_IMPORTED_MODULE_3__[\"default\"]);\nconst Store = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_4__.configureStore)({\n    reducer: PersistReducer,\n    middleware: (GetDefaultMiddleware)=>GetDefaultMiddleware({\n            serializableCheck: {\n                ignoredActions: [\n                    redux_persist__WEBPACK_IMPORTED_MODULE_6__.FLUSH,\n                    redux_persist__WEBPACK_IMPORTED_MODULE_6__.REHYDRATE,\n                    redux_persist__WEBPACK_IMPORTED_MODULE_6__.PAUSE,\n                    redux_persist__WEBPACK_IMPORTED_MODULE_6__.PERSIST,\n                    redux_persist__WEBPACK_IMPORTED_MODULE_6__.PURGE,\n                    redux_persist__WEBPACK_IMPORTED_MODULE_6__.REGISTER\n                ]\n            }\n        })\n});\nfunction MyApp({ Component , pageProps  }) {\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_head__WEBPACK_IMPORTED_MODULE_2___default()), {\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"link\", {\n                    rel: \"shortcut icon\",\n                    href: \"/Favicon/Favicon.png\",\n                    type: \"image/x-icon\"\n                }, void 0, false, {\n                    fileName: \"C:\\\\Users\\\\Zubair Gujjar\\\\Desktop\\\\Social Media App\\\\Client\\\\pages\\\\_app.tsx\",\n                    lineNumber: 39,\n                    columnNumber: 9\n                }, this)\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\Zubair Gujjar\\\\Desktop\\\\Social Media App\\\\Client\\\\pages\\\\_app.tsx\",\n                lineNumber: 38,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_redux__WEBPACK_IMPORTED_MODULE_5__.Provider, {\n                store: Store,\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(redux_persist_integration_react__WEBPACK_IMPORTED_MODULE_8__.PersistGate, {\n                    loading: null,\n                    persistor: (0,redux_persist__WEBPACK_IMPORTED_MODULE_6__.persistStore)(Store),\n                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {\n                        ...pageProps\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\Zubair Gujjar\\\\Desktop\\\\Social Media App\\\\Client\\\\pages\\\\_app.tsx\",\n                        lineNumber: 48,\n                        columnNumber: 11\n                    }, this)\n                }, void 0, false, {\n                    fileName: \"C:\\\\Users\\\\Zubair Gujjar\\\\Desktop\\\\Social Media App\\\\Client\\\\pages\\\\_app.tsx\",\n                    lineNumber: 47,\n                    columnNumber: 9\n                }, this)\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\Zubair Gujjar\\\\Desktop\\\\Social Media App\\\\Client\\\\pages\\\\_app.tsx\",\n                lineNumber: 46,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"C:\\\\Users\\\\Zubair Gujjar\\\\Desktop\\\\Social Media App\\\\Client\\\\pages\\\\_app.tsx\",\n        lineNumber: 37,\n        columnNumber: 5\n    }, this);\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MyApp);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9fYXBwLnRzeC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQStCO0FBRUY7QUFFa0I7QUFDRztBQUNYO0FBVWhCO0FBQ3lCO0FBQ2M7QUFFOUQsTUFBTWMsZ0JBQWdCO0lBQUVDLEtBQUs7SUFBUUgsT0FBT0Esb0VBQUFBO0lBQUVJLFNBQVM7QUFBRTtBQUN6RCxNQUFNQyxpQkFBaUJaLDZEQUFjQSxDQUFDUyxlQUFlYiwwREFBV0E7QUFDaEUsTUFBTWlCLFFBQVFoQixnRUFBY0EsQ0FBQztJQUMzQmlCLFNBQVNGO0lBRVRHLFlBQVksQ0FBQ0MsdUJBQ1hBLHFCQUFxQjtZQUNuQkMsbUJBQW1CO2dCQUNqQkMsZ0JBQWdCO29CQUFDakIsZ0RBQUtBO29CQUFFQyxvREFBU0E7b0JBQUVDLGdEQUFLQTtvQkFBRUMsa0RBQU9BO29CQUFFQyxnREFBS0E7b0JBQUVDLG1EQUFRQTtpQkFBQztZQUNyRTtRQUNGO0FBQ0o7QUFFQSxTQUFTYSxNQUFNLEVBQUVDLFVBQVMsRUFBRUMsVUFBUyxFQUFZLEVBQUU7SUFFakQscUJBQ0UsOERBQUNDOzswQkFDQyw4REFBQzNCLGtEQUFJQTswQkFDSCw0RUFBQzRCO29CQUNDQyxLQUFJO29CQUNKQyxNQUFLO29CQUNMQyxNQUFLOzs7Ozs7Ozs7OzswQkFJVCw4REFBQzVCLGlEQUFRQTtnQkFBQzZCLE9BQU9kOzBCQUNmLDRFQUFDTCx3RUFBV0E7b0JBQUNvQixTQUFTLElBQUk7b0JBQUVDLFdBQVc5QiwyREFBWUEsQ0FBQ2M7OEJBQ2xELDRFQUFDTzt3QkFBVyxHQUFHQyxTQUFTOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBS2xDO0FBRUEsaUVBQWVGLEtBQUtBLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9DbGllbnQvLi9wYWdlcy9fYXBwLnRzeD8yZmJlIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBcIi4uL3N0eWxlcy9nbG9iYWxzLmNzc1wiO1xuaW1wb3J0IHR5cGUgeyBBcHBQcm9wcyB9IGZyb20gXCJuZXh0L2FwcFwiO1xuaW1wb3J0IEhlYWQgZnJvbSBcIm5leHQvaGVhZFwiO1xuXG5pbXBvcnQgQXV0aFJlZHVjZXIgZnJvbSBcIi4uL1JlZHV4L0F1dGhSZWR1Y2VyXCI7XG5pbXBvcnQgeyBjb25maWd1cmVTdG9yZSB9IGZyb20gXCJAcmVkdXhqcy90b29sa2l0XCI7XG5pbXBvcnQgeyBQcm92aWRlciB9IGZyb20gXCJyZWFjdC1yZWR1eFwiO1xuaW1wb3J0IHtcbiAgcGVyc2lzdFN0b3JlLFxuICBwZXJzaXN0UmVkdWNlcixcbiAgRkxVU0gsXG4gIFJFSFlEUkFURSxcbiAgUEFVU0UsXG4gIFBFUlNJU1QsXG4gIFBVUkdFLFxuICBSRUdJU1RFUixcbn0gZnJvbSBcInJlZHV4LXBlcnNpc3RcIjtcbmltcG9ydCBzdG9yYWdlIGZyb20gXCJyZWR1eC1wZXJzaXN0L2xpYi9zdG9yYWdlXCI7XG5pbXBvcnQgeyBQZXJzaXN0R2F0ZSB9IGZyb20gXCJyZWR1eC1wZXJzaXN0L2ludGVncmF0aW9uL3JlYWN0XCI7XG5cbmNvbnN0IFBlcnNpc3RDb25maWcgPSB7IGtleTogXCJyb290XCIsIHN0b3JhZ2UsIHZlcnNpb246IDEgfTtcbmNvbnN0IFBlcnNpc3RSZWR1Y2VyID0gcGVyc2lzdFJlZHVjZXIoUGVyc2lzdENvbmZpZywgQXV0aFJlZHVjZXIpO1xuY29uc3QgU3RvcmUgPSBjb25maWd1cmVTdG9yZSh7XG4gIHJlZHVjZXI6IFBlcnNpc3RSZWR1Y2VyLFxuXG4gIG1pZGRsZXdhcmU6IChHZXREZWZhdWx0TWlkZGxld2FyZSkgPT5cbiAgICBHZXREZWZhdWx0TWlkZGxld2FyZSh7XG4gICAgICBzZXJpYWxpemFibGVDaGVjazoge1xuICAgICAgICBpZ25vcmVkQWN0aW9uczogW0ZMVVNILCBSRUhZRFJBVEUsIFBBVVNFLCBQRVJTSVNULCBQVVJHRSwgUkVHSVNURVJdLFxuICAgICAgfSxcbiAgICB9KSxcbn0pO1xuXG5mdW5jdGlvbiBNeUFwcCh7IENvbXBvbmVudCwgcGFnZVByb3BzIH06IEFwcFByb3BzKSB7XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2PlxuICAgICAgPEhlYWQ+XG4gICAgICAgIDxsaW5rXG4gICAgICAgICAgcmVsPVwic2hvcnRjdXQgaWNvblwiXG4gICAgICAgICAgaHJlZj1cIi9GYXZpY29uL0Zhdmljb24ucG5nXCJcbiAgICAgICAgICB0eXBlPVwiaW1hZ2UveC1pY29uXCJcbiAgICAgICAgLz5cbiAgICAgIDwvSGVhZD5cblxuICAgICAgPFByb3ZpZGVyIHN0b3JlPXtTdG9yZX0+XG4gICAgICAgIDxQZXJzaXN0R2F0ZSBsb2FkaW5nPXtudWxsfSBwZXJzaXN0b3I9e3BlcnNpc3RTdG9yZShTdG9yZSl9PlxuICAgICAgICAgIDxDb21wb25lbnQgey4uLnBhZ2VQcm9wc30gLz5cbiAgICAgICAgPC9QZXJzaXN0R2F0ZT5cbiAgICAgIDwvUHJvdmlkZXI+XG4gICAgPC9kaXY+XG4gICk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IE15QXBwO1xuIl0sIm5hbWVzIjpbIkhlYWQiLCJBdXRoUmVkdWNlciIsImNvbmZpZ3VyZVN0b3JlIiwiUHJvdmlkZXIiLCJwZXJzaXN0U3RvcmUiLCJwZXJzaXN0UmVkdWNlciIsIkZMVVNIIiwiUkVIWURSQVRFIiwiUEFVU0UiLCJQRVJTSVNUIiwiUFVSR0UiLCJSRUdJU1RFUiIsInN0b3JhZ2UiLCJQZXJzaXN0R2F0ZSIsIlBlcnNpc3RDb25maWciLCJrZXkiLCJ2ZXJzaW9uIiwiUGVyc2lzdFJlZHVjZXIiLCJTdG9yZSIsInJlZHVjZXIiLCJtaWRkbGV3YXJlIiwiR2V0RGVmYXVsdE1pZGRsZXdhcmUiLCJzZXJpYWxpemFibGVDaGVjayIsImlnbm9yZWRBY3Rpb25zIiwiTXlBcHAiLCJDb21wb25lbnQiLCJwYWdlUHJvcHMiLCJkaXYiLCJsaW5rIiwicmVsIiwiaHJlZiIsInR5cGUiLCJzdG9yZSIsImxvYWRpbmciLCJwZXJzaXN0b3IiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./pages/_app.tsx\n");

/***/ }),

/***/ "./styles/globals.css":
/*!****************************!*\
  !*** ./styles/globals.css ***!
  \****************************/
/***/ (() => {



/***/ }),

/***/ "@reduxjs/toolkit":
/*!***********************************!*\
  !*** external "@reduxjs/toolkit" ***!
  \***********************************/
/***/ ((module) => {

"use strict";
module.exports = require("@reduxjs/toolkit");

/***/ }),

/***/ "next/head":
/*!****************************!*\
  !*** external "next/head" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/head");

/***/ }),

/***/ "react-redux":
/*!******************************!*\
  !*** external "react-redux" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("react-redux");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-dev-runtime");

/***/ }),

/***/ "redux-persist":
/*!********************************!*\
  !*** external "redux-persist" ***!
  \********************************/
/***/ ((module) => {

"use strict";
module.exports = require("redux-persist");

/***/ }),

/***/ "redux-persist/integration/react":
/*!**************************************************!*\
  !*** external "redux-persist/integration/react" ***!
  \**************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("redux-persist/integration/react");

/***/ }),

/***/ "redux-persist/lib/storage":
/*!********************************************!*\
  !*** external "redux-persist/lib/storage" ***!
  \********************************************/
/***/ ((module) => {

"use strict";
module.exports = require("redux-persist/lib/storage");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("./pages/_app.tsx"));
module.exports = __webpack_exports__;

})();