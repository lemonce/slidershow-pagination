'use strict';

import { createRule } from '../class/rule';
import {
	getVisibleHeight,
	getHeight
} from '../../utils';
import { splitElement } from '../index';

createRule({
	test(element, container) {
		return element.childNodes.length >= 0 && element !== container;
	},
	handler(element, container) {
		const visibleHeight = getVisibleHeight(element, container);
		const fragment = [];
		const clone = element.cloneNode(true);
		const elementCopyOne = element.cloneNode(true);
		const elementCopyTwo = element.cloneNode(true);

		if (element.offsetHeight > visibleHeight) {
			elementCopyOne.style.height = visibleHeight + 'px';
			elementCopyOne.style.overflow = 'hidden';
			elementCopyTwo.style.height = element.offsetHeight - visibleHeight + 'px';
			elementCopyTwo.style.overflow = 'hidden';
			elementCopyTwo.id = visibleHeight;
			
			fragment.push(elementCopyOne, elementCopyTwo);
			this.isSplit = true;
		} else {
			fragment.push(clone);
			this.isSplit = false;
		}
		
		return fragment;
	},
	handlerName: 'spliteElement'
});