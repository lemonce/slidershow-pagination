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

export function isAllOverflow(container, node) {
	if (container === node) {
		return true;
    }
    
	return node.offsetTop - container.scrollTop < container.offsetHeight;
}

export function isReserved({isAllOverflow, reservedLength}) {
	return isAllOverflow || reservedLength;
}

export function getPadHeight(element){
	const contentHeight = element.scrollHeight;
	const containerHeight = element.offsetHeight;
	
	return contentHeight - contentHeight % containerHeight;
}


export function isScrollable({scrollTop, offsetHeight, scrollHeight}) {
	return scrollTop + offsetHeight < scrollHeight;
}


export function getVisibleHeight(element, container) {
	const offsetTop = element.offsetTop;
	const scrollTop = container.scrollTop;
	const offsetHeight = container.offsetHeight;

	return offsetHeight - (offsetTop - scrollTop);
}

export function hideElement(element) {
	element.style.position = 'absolute';
	element.style.top = '0px';
	element.style.zIndex = -100;
	element.style.opacity = 0;
}

export function scrollNextPage(element) {
	if (isScrollable(element)) {
		element.scrollTop += element.offsetHeight;

		return true;
	}

	return false;
}