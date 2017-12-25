'use strict';

import {
	isAllOverflow,
	traversalElement,
	isReserved,
	hideElement,
	scrollNextPage,
	empty
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
				
				parent.clone.appendChild(replace[0]);
				
				//console.log(replace);
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

	cloneView.style.overflow = 'hidden';
	element.parentNode.insertBefore(cloneView, element);
	cloneView.id = 'clone-view'

	do {
		renderPageview(cloneView, collector);
	} while(scrollNextPage(cloneView))
	
	console.log(collector.pageviewList);
	loadPageviewContainer(collector.pageviewList, document.body);

	hideElement(element);
	// hideElement(cloneView);
}



//TODO deal with pageviewList
function loadPageviewContainer(pageviewList, container) {
	const element = document.createElement('div');

	element.style.backgroundColor = 'yellow';

	pageviewList.forEach(pageviewElement => {
		element.appendChild(pageviewElement);
	});

	container.appendChild(element);
}
