'use strict';

export function traversalElement(rootElement, {pre, post}, parentData = {}) {
	const childNodes = rootElement.childNodes;
	const data = {};
	
    pre(rootElement, data, parentData);
    
	childNodes.forEach(node => {
		traversalElement(node, {pre, post}, data);
    });
    
	post(rootElement, data, parentData);
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

export function empty(element) {
	while (element.firstChild) {
		element.removeChild(element.firstChild);
	}

	return element;
}

export function getPadHeight(element){
	const contentHeight = element.scrollHeight;
	const containerHeight = element.offsetHeight;
	
	return contentHeight - contentHeight % containerHeight;
}


export function isScrollable({scrollTop, offsetHeight, scrollHeight}) {
	return scrollTop + offsetHeight < scrollHeight;
}

