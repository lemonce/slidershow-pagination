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

	if (node.nodeType === 3 || node.nodeType === 8) {
		node = node.parentNode;
	}

	return elementOffsetTop(node, container) - container.scrollTop >= container.offsetHeight;
}

export function isReserved({isAllOverflow, reservedLength}) {
    
	return !isAllOverflow || reservedLength;
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

export function dealWithPageView(pageviewElement, i, height, width) {
	const nodeList = pageviewElement.children;

	[].slice.call(nodeList).forEach(part => {
		if (parseFloat(part.lang)) {
			part.scrollTop = parseFloat(part.lang);
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