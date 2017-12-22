'use strict';

import {
	isAllOverflow,
	traversalElement,
	isReserved,
	empty,
	isScrollable
} from './utils';
import {splitElement} from './split/index';
import update from './updater';

function renderPageview(sourceContainer) {
	const rootData = {};

	traversalElement(sourceContainer, {
		pre(node, local, parent) {
			local.isAllOverflow = isAllOverflow(sourceContainer, node);
			local.reservedLength = node.childNodes.length;
			local.clone = empty(node.cloneNode());
		},
		post(node, local, parent) {
			if (isReserved(local)) {
				const splited = splitElement(local.clone, sourceContainer);
				const afterUpdate = update(splited);
				
				if(parent.clone != null) {
					parent.clone.appendChild(afterUpdate);	
				}
			} else {
				parent.reservedLength--;
			}
		}
	}, rootData);

	return rootData.clone;
}

export function render(element) {
	const clone = element.cloneNode(true);
	const pageviewList = [];

	element.parentNode.insertBefore(clone, element);

	while (isScrollable(clone)) {
		scrollNextPage(clone);
		pageviewList.push(renderPageview(clone));
	}

	return pageviewList;
}

function scrollNextPage(element) {
	return element.scrollTop += element.offsetHeight;
}

//TODO deal with pageviewList
function handlePageviewList(pageviewList, element) {
	const fragment = document.createDocumentFragment();
	pageviewListe.forEach(pageviewElement => {
		
	});
}