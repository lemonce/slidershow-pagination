'use strict';

import Rule from '../class/rule';
import {getVisibleHeight} from '../../utils';

const priority = 1;

//TODO split paragaph
function test(element) {
	return element.nodeType === 3;
}
	
function handle(element, container) {
	const visibleHeight = getVisibleHeight(element.parentNode, container);
	const number = getNumber(element.parentNode, visibleHeight, container);
	const fragment = [];

	fragment.push(element.substr(0,number), element.substr(number));

	return {
		splitedElement: fragment,
		splitType: 'textSplit'
	};
}

function getHeight(element, visibleHeight, container) {
	const fontSize = window.getComputedStyle(element, null).fontSize;
	let lineHeight = window.getComputedStyle(element, null).lineHeight;
	const width = container.scrollWidth;

	if (lineHeight === 'normal') {
		lineHeight = fontSize;
	}

	const rows = Math.floor(visibleHeight / parseInt(lineHeight));
	const columns = Math.floor(width / parseInt(fontSize));

	return rows * columns;
}

export default function splitText() {
	const rule = new Rule(test, handle, priority);
	rule.push();
}