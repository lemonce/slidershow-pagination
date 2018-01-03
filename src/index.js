'use strict';

import {
	traversalElement,
	scrollNextPage,
	addChildNodes,
	elementOffsetTop
} from './utils';
import {splitElement} from './split/index';
import update from './updater';
import Plan from './split/class/plan';
import {EventEmitter} from 'events';

const DEFAULT_WATCHER_INTERVAL = 500;
const DEFAULT_CHANGE_CHECKER = function () {
	return false;
};

export class Paginator extends EventEmitter {
	constructor(element, {
		interval = DEFAULT_WATCHER_INTERVAL,
		isChanged = DEFAULT_CHANGE_CHECKER
	} = {}) {
		super();
		hideElement(element);

		this._isChanged = isChanged;

		this.state = {};
		this.sourceElement = element;
		this.pageviewList = [];
		this.$watcherId = null;
	}

	$initWatcher(interval) {
		this.$watcherId = setInterval(() => {
			if (this.$isRemoved()) {
				return this.destroy();
			}

			if (!this.$isChanged()) {
				return;
			}

			this.render();

		}, interval);
	}

	
	destroy() {
		clearInterval(this.$watcherId);

		this.emit('destroy');
	}
	
	$isChanged() {
		return this._isChanged(this.sourceElement, this.state);
	}

	$cloneSource() {
		const cloneView = this.sourceElement.cloneNode(true);
		cloneView.removeAttribute('paginator-hide');
		cloneView.style.overflow = 'hidden';
		//TODO deal with video and specific width height
		return cloneView;
	}

	render() {
		const element = this.sourceElement;
		const cloneView = this.$cloneSource();

		this.pageviewList.length = 0;
		
		const collector = {
			pageviewList: this.pageviewList,
			appendChild(pageviewElement) {
				this.pageviewList.push(pageviewElement);
			}
		};
		
		this.emit('pre-render', this);
		element.parentNode.insertBefore(cloneView, element);
	
		do {
			renderPageview(cloneView, collector);
		} while(scrollNextPage(cloneView))
		
		element.parentNode.removeChild(cloneView);
		this.emit('post-render', this);

		return collector.pageviewList;
	
	}
}

function hideElement(element) {
	element.setAttribute('paginator-hide', true);
}

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

function isAllOverflow(container, node) {
	if (container === node) {
		return true;
    }

	if (node.nodeType === 3 || node.nodeType === 8) {
		node = node.parentNode;
	}

	return elementOffsetTop(node, container) - container.scrollTop >= container.offsetHeight;
}

function isReserved({isAllOverflow, reservedLength}) {
    
	return !isAllOverflow || reservedLength;
}