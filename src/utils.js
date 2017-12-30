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

	if (node.nodeType === 3) {
		node = node.parentNode;
	}
	return node.offsetTop - container.scrollTop >= container.offsetHeight;
}

export function isReserved({isAllOverflow, reservedLength}) {
    
	return !isAllOverflow || reservedLength;
}

export function getPadHeight(element){
	const contentHeight = element.scrollHeight;
	const containerHeight = element.offsetHeight;
	
	return containerHeight - contentHeight % containerHeight;
}


export function isScrollable({scrollTop, offsetHeight, scrollHeight}) {
	return scrollTop + offsetHeight < scrollHeight;
}

function isFill({scrollTop, offsetHeight, scrollHeight}) {
	return scrollHeight - scrollTop < offsetHeight;
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
	} else {
		return false;
	}

}

export function empty(element) {
	while (element.firstChild) {
		element.removeChild(element.firstChild);
	}
}

export function dealWithPageView(pageview) {
	const nodeList = pageview.children;

	[].slice.call(nodeList).forEach(part => {
		if (part.lang) {
			part.scrollTop = Math.ceil(part.lang);
		}

		return;
	});
}