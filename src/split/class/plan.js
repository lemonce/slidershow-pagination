'use strict';

export default class Plan{
	constructor(element, container) {
		this.element = element;
		this.fragment = [];
		this.container = container;
		this.handleList = [];
	}
	getHandleList() {
		return this.handleList;
	}

	setHandleList(handle) {
		this.handleList.push(handle);
	}
}