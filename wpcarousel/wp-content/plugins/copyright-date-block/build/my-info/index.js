/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/my-info/block.json"
/*!********************************!*\
  !*** ./src/my-info/block.json ***!
  \********************************/
(module) {

module.exports = /*#__PURE__*/JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"name":"create-block/my-info","version":"0.1.0","title":"My Info","category":"fursi-block","icon":"smiley","attributes":{"title":{"type":"string","default":"default content is here !"}},"description":"Example block scaffolded with Create Block tool.","example":{},"supports":{"html":false},"textdomain":"my-info","editorScript":"file:./index.js","editorStyle":"file:./index.css","style":"file:./style-index.css"}');

/***/ },

/***/ "./src/my-info/edit.js"
/*!*****************************!*\
  !*** ./src/my-info/edit.js ***!
  \*****************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Edit)
/* harmony export */ });
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);
// import { __ } from '@wordpress/i18n';

// import { useBlockProps } from '@wordpress/block-editor';

// import './editor.scss';

// export default function Edit({attributes}) {
// 	  const { content9 } = attributes || {};
//     return (
//         <div {...useBlockProps.save()}>

//             <div>{content9 || ' content 9 is here !'}</div>
//         </div>
//     );
// }

// import { __ } from '@wordpress/i18n';

// import { __ } from '@wordpress/i18n';

// import { useBlockProps } from '@wordpress/block-editor';

// import './editor.scss';

// export default function Edit({attributes}) {
// 	  const { content9 } = attributes || {};
//     return (
//         <div {...useBlockProps.save()}>

//             <div>{content9 || ' content 9 is here !'}</div>
//         </div>
//     );
// }

// import { __ } from '@wordpress/i18n';



function Edit({
  attributes,
  setAttributes
}) {
  const {
    title
  } = attributes;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
    ...(0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__.useBlockProps)(),
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__.RichText, {
      tagName: "h2",
      value: title,
      onChange: value => setAttributes({
        title: value
      }),
      placeholder: "Enter title"
    })
  });
}

/***/ },

/***/ "./src/my-info/save.js"
/*!*****************************!*\
  !*** ./src/my-info/save.js ***!
  \*****************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ save)
/* harmony export */ });
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__);


// export default function save({ attributes }) {
//     const { heading, text, content,content5 } = attributes || {};
//     return (
//         <div {...useBlockProps.save()}>
//             <h2>{heading || 'Default Heading'}</h2>
//             <p>{text || 'Default text'}</p>
//             <div>{content || 'Default content'}</div>
//             <div>{content5 || ' content no 5 !'}</div>
//         </div>
//     );
// }

// export default function save({ attributes }) {
//     const { content9 } = attributes || {};
//     return (
//         <div {...useBlockProps.save()}>

//             <div>{content9 || ' content 9 is here !'}</div>
//         </div>
//     );
// }

// for invalid error solve we will use dynamic callback as alternative of deprecation
function save({
  attributes
}) {
  return null;
}

/***/ },

/***/ "@wordpress/block-editor"
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
(module) {

module.exports = window["wp"]["blockEditor"];

/***/ },

/***/ "@wordpress/blocks"
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
(module) {

module.exports = window["wp"]["blocks"];

/***/ },

/***/ "react/jsx-runtime"
/*!**********************************!*\
  !*** external "ReactJSXRuntime" ***!
  \**********************************/
(module) {

module.exports = window["ReactJSXRuntime"];

/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Check if module exists (development only)
/******/ 		if (__webpack_modules__[moduleId] === undefined) {
/******/ 			var e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!******************************!*\
  !*** ./src/my-info/index.js ***!
  \******************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./edit */ "./src/my-info/edit.js");
/* harmony import */ var _save__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./save */ "./src/my-info/save.js");
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./block.json */ "./src/my-info/block.json");
// import { registerBlockType } from '@wordpress/blocks';
// import { useBlockProps } from '@wordpress/block-editor';
// import Edit from './edit';
// import save from './save';
// import metadata from './block.json';
// const deprecatedV1 = {
// 	attributes: {
// 		text: { type: 'string', default: 'My Info – hello from the saved content!' },
// 		heading: { type: 'string', default: 'heading' },
// 	},

// 	migrate({ text, heading }) {
// 		return {
// 			heading,
// 			content: text,
// 		};
// 	},

// 	save({ attributes }) {
// 		return (
// 			<div {...useBlockProps.save()}>
// 				<h>{attributes.heading}</h>
// 				<p>{attributes.text}</p>
// 			</div>
// 		);
// 	},
// };

// const deprecatedV2 = {
// 	attributes: {
// 		heading: { type: 'string', selector: 'h2' },
// 		text: { type: 'string', selector: 'p' },
// 		content2: { type: 'string', selector: 'div' }
// 	},
// 	migrate({ heading, text, content }) {
// 		return {
// 			heading,
// 			text,
// 			content2: content || 'Default content'
// 		};
// 	},
// 	save({ attributes }) {
// 		const { heading, text, content2 } = attributes;
// 		return (
// 			<div {...useBlockProps.save()}>
// 				<h2>{heading}</h2>
// 				<p>{text}</p>
// 				<div>{content2}</div>
// 			</div>
// 		);
// 	}
// };

// const deprecatedV3 = {
// 	save({ attributes }) {
// 		const { heading, text, content } = attributes;
// 		return (
// 			<div {...useBlockProps.save()}>
// 				<h2>{heading || 'Default Heading'}</h2>
// 				<p>{text || 'Default text'}</p>
// 				<div>{content || 'Default content'}</div>
// 			</div>
// 		);
// 	}
// };

// const deprecatedV4 = {
// 	attributes: {
// 		heading: { type: 'string', selector: 'h2' },
// 		text: { type: 'string', selector: 'p' },
// 		content: { type: 'string', selector: 'div' },
// 		content2: { type: 'string', selector: 'p' },
// 		content5: { type: 'string', selector: 'p' },
// 	},
// 	migrate({ heading, text, content, content2, content5 }) {
// 		return {
// 			heading,
// 			text,
// 			content9: `${content || ''} ${content2 || ''} ${content5 || ''}`.trim(),
// 		};
// 	},
// 	save({ attributes }) {
// 		const { heading, text, content, content5 } = attributes || {};
// 		return (
// 			<div {...useBlockProps.save()}>
// 				<h2>{heading || 'Default Heading'}</h2>
// 				<p>{text || 'Default text'}</p>
// 				<div>{content || 'Default content'}</div>
// 				<div>{content5 || ' content no 5 !'}</div>
// 			</div>
// 		)
// 	}
// };

// registerBlockType(metadata.name, {
// 	edit: Edit,
// 	save,
// 	deprecated: [deprecatedV1, deprecatedV2, deprecatedV3, deprecatedV4],
// });





(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)(_block_json__WEBPACK_IMPORTED_MODULE_3__.name, {
  edit: _edit__WEBPACK_IMPORTED_MODULE_1__["default"],
  save: _save__WEBPACK_IMPORTED_MODULE_2__["default"],
  attributes: {
    title: {
      type: 'string',
      default: 'default content is here !'
    }
  }
});
})();

/******/ })()
;
//# sourceMappingURL=index.js.map