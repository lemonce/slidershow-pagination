'use strict';

export default class Rule {
	constructor(test, handler, priority) {
		this.test = test;
		this.handler = handler;
		this.priority = priority;
	}
	push() {
		Rule.ruleList.push(this);
	}
}

Rule.ruleList = [];