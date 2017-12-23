'use strict';

import { createRule } from '../class/rule';
import {getVisibleHeight} from '../../utils';

createRule({
	test(element) {
		return element.childNodes.length >= 0;
	},
	handle(element, container) {
		const visibleHeight = getVisibleHeight(element, container);
		const fragment = [];
		const elementCopyOne = element.cloneNode(true);
		const elementCopyTwo = element.cloneNode(true);

		elementCopyOne.style.height = visibleHeight + 'px';
		elementCopyOne.style.overflow = 'hidden';
		elementCopyTwo.style.marginTop = - visibleHeight + 'px';
		fragment.push(elementCopyOne, elementCopyTwo);

		return {
			splitedElement: fragment,
			splitType: 'nonemptyElementSplit'
		};
	}
});