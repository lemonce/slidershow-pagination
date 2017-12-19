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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var height = 300;
var container = document.querySelector('container');

function traversalElement(rootElement, parentData, _ref) {
	var pre = _ref.pre,
	    post = _ref.post;

	var childNodes = rootElement.childNodes;
	var data = {};

	pre(node, data, parentData);
	childNodes.forEach(function (node) {
		traversalElement(node, data, { pre: pre, post: post });
	});
	post(node, data, parentData);
}

function isNecessary(sourceContainer, node) {
	if (sourceContainer === node) {
		return true;
	}

	//TODO valid necessary of node
	var nodeOffsetTop = node.offsetTop + node.height;

	return nodeOffsetTop <= height;
}

function push(destinationContainer, node) {
	var nodeCopy = node.cloneNode();

	destinationContainer.appendChild(node);
}

function renderPageview(sourceContainer) {
	var fragment = PageviewFactory();
	var current = fragment;

	traversalElement(sourceContainer, {}, {
		pre: function pre(node, local, parent) {
			local.overflow = isNecessary(sourceContainer, node);
			local.visibleLength = node.childNodes.length;
		},
		post: function post(node, local, parent) {
			if (local.overflow || local.visibleLength) {
				//TODO push, fill, split
				if (local.overflow) {
					push(fragment, node);
				} else if (!local.overflow && local.visibleLength) {
					//TODO split node
					var commit = document.createComment();

					node.parentNode.insertBefore(commit, node);
					var nodePaginative = paginate(node);
					push(fragment, nodePaginative);

					return false;
				} else if (!local.overflow && !local.visibleLength) {
					//TODO next page
				}
			} else {
				parent.visibleLength--;
			}
		}
	});

	return fragment;
}

function PageviewFactory() {
	var pageContainer = document.createElement('div');

	return pageContainer;
}

function paginate(node) {
	//TODO route
	var tagName = node.tagName;
	var pattern = /^[p,span,a,ul,ol,li]$/g;

	if (pattern.test(tagName)) {

		return splitContentRouter(node);
	} else {

		return unsplitContentRouter(node);
	}
}

function render() {
	//TODO copy, pad, mark, paginative, repeat, delete
	var copy = container.cloneNode(true);
	var copyHeight = copy.height;
	var padHeight = copyHeight % height;
	var pageNumber = Math.ceil(copyHeight / height);
	var viewContainer = document.createElement('div');

	if (padHeight) {
		var padDiv = document.createElement('div');

		padDiv.style.height = padHeight + 'px';
		copy.appendChild(padDiv);
	}

	for (var i = 0; i < pageNumber; i++) {
		var pageView = renderPageview(copy);
		var allNodes = document.getElementsByTagName("*");

		//TODO find comment mark and start next renderPageveiw
		for (item in allNodes) {
			if (item.nodeType === 8) {
				var comment = item;

				document.removeChild(item);

				break;
			}
		}
		viewContainer.appendChild(pageView);
	}
}

//TODO text-router, image-routers
function splitContentRouter(node) {
	var nodeOffsetTop = node.offsetTop;
	var visibleContent = height - nodeOffsetTop;
	var lineHeigt = node.style.lineHeigt;
	var lineNumber = Math.floor(visibleContent / lineHeigt);
	var nodeCopy = node.cloneNode();

	node.style.height = lineHeigt * lineNumber + 'px';

	return node;
	//TODO split
}

function unsplitContentRouter(node) {
	var nodeOffsetTop = node.offsetTop;
	var visibleContent = height - nodeOffsetTop;

	node.style.offsetTop = height + 'px';
}

//TODO event api thet emit render

/***/ })
/******/ ]);