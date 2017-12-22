'use strict';

import Rule from '../class/rule';
import {getVisibleHeight} from '../../utils';

const priority = 3;

function test(element) {
	return element.childNodes.length >= 0;
}

function handle(element, container) {
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

export default function splitElement() {
	const rule = new Rule(test, handle, priority);
	rule.push();
}