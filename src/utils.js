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

export function isScrollable({scrollTop, offsetHeight, scrollHeight}) {
	return scrollTop + offsetHeight < scrollHeight;
}

export function getPadHeight(element){
	const contentHeight = element.scrollHeight;
	const containerHeight = element.offsetHeight;
	
	return containerHeight - contentHeight % containerHeight;
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

export function dealWithPageView(pageviewElement, i, height, width) {
	const nodeList = pageviewElement.children;

	[].slice.call(nodeList).forEach(part => {
		if (Math.ceil(part.lang)) {
			part.scrollTop = Math.ceil(part.lang);
		}

		return;
	});

	const pageViewScrollTop = i * height;

	if (pageViewScrollTop + height > pageviewElement.scrollHeight) {
		const fillingHeight = pageViewScrollTop + height - pageviewElement.scrollHeight;
		const filling = document.createElement('div');
	
		filling.style.height = fillingHeight + 'px';
		pageviewElement.appendChild(filling);
	}

	pageviewElement.scrollTop = pageViewScrollTop;
	pageviewElement.style.position = 'absolute';
	pageviewElement.style.left = i * width + 'px';
	pageviewElement.style.width = width + 'px';
}

export function hideElement(element) {
	element.style.position = 'absolute';
	element.style.top = '0px';
	element.style.zIndex = -100;
	element.style.opacity = 0;
}