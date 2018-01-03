'use strict';

export function traversalElement(rootElement, {pre, post}, parentData = {}) {
	const childNodes = rootElement.childNodes;
	const data = {};
	
    pre(rootElement, data, parentData);
    
	childNodes.forEach(node => {
		traversalElement(node, {pre, post}, data);
    });
    
	post(rootElement, data, parentData);

	return data;
}

export function isScrollable({scrollTop, offsetHeight, scrollHeight}) {
	return scrollTop + offsetHeight < scrollHeight;
}

export function scrollNextPage(element) {
	if (isScrollable(element)) {
		element.scrollTop += element.offsetHeight;

		return true;
	} else {
		return false;
	}

}

export function elementOffsetTop(element, container) {
	let offsetTopValue = element.offsetTop;
	
	if (element.offsetParent === container) {
		return offsetTopValue;
	} else if (element.offsetParent !== container && ! isChild(element.offsetParent, container)) {
		offsetTopValue = offsetTopValue - container.offsetTop;

		return offsetTopValue;
	}

	while (isChild(element.offsetParent, container)) {
		offsetTopValue = element.offsetTop + elementOffsetTop(element.offsetParent, container);
		element = element.offsetParent;	
	}
	
	return offsetTopValue;

}

function isChild(element, container) {
	let mark = false;

	container.childNodes.forEach(node => {
		if (element === node) {
			mark = true;
		}
	});

	return mark;
}