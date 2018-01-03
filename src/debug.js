'use strict';

import {Paginator} from './index';

function loadPageviewContainer(pageviewList, container) {
	const element = document.createElement('div');
	const width = container.offsetWidth;
	const height = container.offsetHeight;

	pageviewList.forEach(pageviewElement => {
		element.appendChild(pageviewElement);
		
	});

	container.parentNode.appendChild(element);
	container.parentNode.style.position = 'relative';

	pageviewList.forEach((pageviewElement, index) => {
		dealWithPageView(pageviewElement, index, height, width);

	});
	
}

function dealWithPageView(pageviewElement, index, height, width) {
	const nodeList = pageviewElement.children;

	[].slice.call(nodeList).forEach(part => {
		if (parseFloat(part.lang)) {
			part.scrollTop = parseFloat(part.lang);
		}

		return;
	});

	const pageViewScrollTop = index * height;

	if (pageViewScrollTop + height > pageviewElement.scrollHeight) {
		const fillingHeight = pageViewScrollTop + height - pageviewElement.scrollHeight;
		const filling = document.createElement('div');
		filling.style.height = fillingHeight + 'px';
		pageviewElement.appendChild(filling);
	}

	pageviewElement.scrollTop = pageViewScrollTop;
	pageviewElement.style.position = 'absolute';
	pageviewElement.style.left = index * width + 'px';
	pageviewElement.style.width = width + 'px';
}


window.onload = function() {

    const element = document.querySelector('.container');
    const page = new Paginator(element);

    page.on('post-render', ({pageviewList, sourceElement}) => {
        loadPageviewContainer(pageviewList, sourceElement);
    });

    page.render();
}