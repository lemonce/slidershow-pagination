'use strict';

import {createRule} from '../class/rule';
import {
	getVisibleHeight,
	dealWithVisibleHeight
} from './util';

createRule({
	test: function(element, container) {
		if (element.nodeType !== 1 || element === container) {
			return false;
		} else {
			return true;
		}
	},
	handler: function(element, container) {
		const visibleHeight = getVisibleHeight(element, container);
		const elementHeight = element.offsetHeight;
		const elementCopy = element.cloneNode(true);
		const fragmentList = [];
		if (visibleHeight <= 0 || visibleHeight >= elementHeight) {
			fragmentList.push(element);
		} else {
			const copyTwo = element.cloneNode(true);
			const elementCopyHeight = dealWithVisibleHeight(visibleHeight, element);
			const filling = document.createElement('div');
			
			if (elementCopyHeight > 0) {
				dealWithElementAfterSplit(elementCopy, elementCopyHeight);
				dealWithElementAfterSplit(filling, visibleHeight - elementCopyHeight);
				dealWithElementAfterSplit(copyTwo, elementHeight - elementCopyHeight);
				
			   copyTwo.lang = elementCopyHeight;
			   fragmentList.push(elementCopy, filling, copyTwo);
			} else {
				dealWithElementAfterSplit(filling, visibleHeight);

				fragmentList.push(filling, element);
			}

		}

		return fragmentList;
	}
});
function dealWithElementAfterSplit(element, height) {
	element.style.height = height + 'px';
	element.style.overflow = 'hidden';

	return element;
}

function dealWithElementHeight(computedHeight, element) {
	const fontSize = window.getComputedStyle(element, null).fontSize;
	const displayType = window.getComputedStyle(element, null).display;
	let height;
	
	if (height === 'auto') {
		height = parseFloat(fontSize);
	} else {
		height = parseFloat(computedHeight);
	}

	return height;
}