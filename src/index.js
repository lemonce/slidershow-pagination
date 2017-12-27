'use strict';

import {
	isAllOverflow,
	traversalElement,
	isReserved,
	hideElement,
	scrollNextPage,
	empty,
	getPadHeight,
	addChildNodes
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
				const value = splitElement(node, sourceContainer);
				const plan = new Plan(node.parentNode, value, node);
				
				//parent.clone.appendChild(value.replacement[0]);
				addChildNodes(parent.clone, value);
				//update(plan);	
				console.log(value.replacement);
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

	const height = getPadHeight(cloneView);
	const filling = document.createElement('div');

	filling.style.height = height + 'px';
	cloneView.appendChild(filling);
	cloneView.appendChild(filling);

	do {
		renderPageview(cloneView, collector);
	} while(scrollNextPage(cloneView))
	
	loadPageviewContainer(collector.pageviewList, element);
	hideElement(element);
	//element.parentNode.removeChild(cloneView);
}



//TODO deal with pageviewList
function loadPageviewContainer(pageviewList, container) {
	const element = document.createElement('div');

	element.style.backgroundColor = 'yellow';

	pageviewList.forEach(pageviewElement => {
		element.appendChild(pageviewElement);
		
	});

	container.parentNode.appendChild(element);

	pageviewList.forEach(pageviewElement => {
		pageviewElement.scrollTop = pageviewList.indexOf(pageviewElement) * container.offsetHeight;
	});
	
}
