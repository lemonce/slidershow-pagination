'use strict';

import {isAllOverflow, traversalElement} from './utils';
import {split} from './split/index'

function isReserved({isAllOverflow, reservedLength}) {
	return isAllOverflow || reservedLength;
}

function empty(element) {
	while (element.firstChild) {
		element.removeChild(element.firstChild);
	}

	return element;
}

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
				const splited = split(local.clone);

				parent.clone.appendChild(splited);
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

	while (0/* scrollable */) {
		//TODO scroll

		pageviewList.push(renderPageview(clone));
		
	}

	return pageviewList;
}

//TODO event api that emit render  
