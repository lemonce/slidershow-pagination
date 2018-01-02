'use strict';

import {
	isAllOverflow,
	traversalElement,
	isReserved,
	hideElement,
	scrollNextPage,
	addChildNodes,
	dealWithPageView
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
				const replacement = splitElement(node, sourceContainer);
				const updateCloneViewPlan = new Plan(node.parentNode, replacement, node, sourceContainer);
				const updatePageViewPlan = new Plan(parent.clone, replacement, node, sourceContainer, local.clone);
				
				update(updateCloneViewPlan);
				update(updatePageViewPlan);				
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

	do {
		renderPageview(cloneView, collector);
		console.log(collector.pageviewList);
	} while(scrollNextPage(cloneView))

	loadPageviewContainer(collector.pageviewList, element);
	// hideElement(element);
	// element.parentNode.removeChild(cloneView);

}



//TODO deal with pageviewList
function loadPageviewContainer(pageviewList, container) {
	const element = document.createElement('div');
	const width = container.offsetWidth;
	const height = container.offsetHeight;

	element.style.backgroundColor = 'yellow';

	pageviewList.forEach(pageviewElement => {
		element.appendChild(pageviewElement);
		
	});

	container.parentNode.appendChild(element);
	container.parentNode.style.position = 'relative';

	pageviewList.forEach((pageviewElement, i) => {
		dealWithPageView(pageviewElement, i, height, width);

	});
	
}
