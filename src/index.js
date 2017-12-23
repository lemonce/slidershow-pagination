'use strict';

import {
	isAllOverflow,
	traversalElement,
	isReserved,
	hideElement,
	scrollNextPage
} from './utils';
import {splitElement} from './split/index';
import update from './updater';
import Plan from './split/class/plan';

function renderPageview(sourceContainer, collector) {
	const rootData = {
		clone: collector
	};
	
	traversalElement(sourceContainer, {
		pre(node, local, parent) {
			local.isAllOverflow = isAllOverflow(sourceContainer, node);
			local.reservedLength = node.childNodes.length;
			local.clone = node.cloneNode();
		},
		post(node, local, parent) {
			if (isReserved(local)) {
				const replace = splitElement(node, sourceContainer);
				const plan = new Plan(node.parentNode, replace, node);

				parent.clone.appendChild(replace);
				update(plan);
			} else {
				parent.reservedLength--;
			}
		} 
	}, rootData);

	return rootData.clone;	
}

export function render(element) {
	const cloneView = element.cloneNode(true);
	const collector = {
		pageviewList: [],
		appendChild(element) {
			this.pageviewList.push(element);
		}
	};

	element.parentNode.insertBefore(cloneView, element);

	do {
		renderPageview(cloneView, collector);
	} while(scrollNextPage(cloneView))

	console.log(collector.pageviewList);
	//return pageviewList;
	
	handlePageviewList(collector.pageviewList, cloneView);
}



//TODO deal with pageviewList
function handlePageviewList(pageviewList, element) {
	const width = element.offsetWidth;
	const height = element.offsetHeight;
	
	pageviewList.forEach(pageviewElement => {
		const destination = document.createElement(element.tagName);

		destination.style.width = width + 'px';
		destination.style.height = height + 'px';
		destination.style.float = 'left';
		destination.appendChild(pageviewElement);
		destination.style.marginTop = - pageviewList.indexOf(pageviewElement) * height + 'px';
       
		element.parentNode.appendChild(pageviewElement);
	});
}
