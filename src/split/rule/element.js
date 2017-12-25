'use strict';

import { createRule } from '../class/rule';
import {
	getVisibleHeight,
	getHeight
} from '../../utils';

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
			elementCopyTwo.scrollTop = visibleHeight;
			elementCopyTwo.scrollTop = visibleHeight;
			fragment.push(elementCopyOne, elementCopyTwo);

		} else {
			fragment.push(clone);
		}
		
		return fragment;
	}
});
