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
	
	return containerHeight - contentHeight % containerHeight;
}


export function isScrollable({scrollTop, offsetHeight, scrollHeight}) {
	return scrollTop + offsetHeight < scrollHeight;
}


export function getVisibleHeight(element, container) {
	const elementOffsetTop = element.offsetTop;
	const containerScrollTop = container.scrollTop;
	const containerOffsetHeight = container.offsetHeight;

	return containerOffsetHeight + containerScrollTop - elementOffsetTop;
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

export function empty(element) {
	while (element.firstChild) {
		element.removeChild(element.firstChild);
	}
}

export function getHeight(element, visibleHeight, container) {
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

export function addChildNodes(parent, value) {
	
	if (value.handlerName === 'spliteElement' && value.isSplit) {
		const fragment = document.createDocumentFragment();
		//const height = value.replacement[0].style.height;

		value.replacement.forEach(part => {
			fragment.appendChild(part);
		});

		parent.appendChild(fragment);

		value.replacement.forEach(part => {
			if (part.id) {
				part.scrollTop = part.id;
			}
		});
		//value.replacement[1].scrollTop = parseInt(height);
		
		return;
	}
	
	parent.appendChild(value.replacement[0]);
	
	if (value.replacement[0].id) {
		console.log(value.replacement[0]);
		value.replacement[0].scrollTop = value.replacement[0].id;
	}

}