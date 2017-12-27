'use strict';

import { createRule } from '../class/rule';
import {
	getVisibleHeight,
	getHeight
} from '../../utils';

createRule({
	test(element) {
		return element.nodeType === 3;
	},
	handler(element, container) {
		const visibleHeight = getVisibleHeight(element.parentNode, container);
		const number = getHeight(element.parentNode, visibleHeight, container);
		const clone = element.cloneNode(true);
		const fragment = [];

		if (element.offsetHeight > visibleHeight) {
			const string = element.substr(0,number) + '<br/>' +	element.substr(number);

			fragment.push(string);
			this.isSplit = true;
		} else {
			fragment.push(clone);
			this.isSplit = false;
		}

		return fragment;
	},
	handlerName:'spliteText'
});