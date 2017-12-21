'use strict';

export default class Plan{
	handleList = [];
	constructor(element, container) {
		this.element = element;
		this.container = container;
	}
	get handleList() {
		return this.handleList;
	}

	set handleList(handle) {
		this.handleList.push();
	}
}