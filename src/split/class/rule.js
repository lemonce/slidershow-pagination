'use strict';
const ruleList = [];

export class Rule {
	constructor({test, handler, priority = 1000, handlerName, isSplit = false}) {
		this.$test = test;
		this.$handler = handler;
		this.priority = priority;
		this.handlerName = handlerName;
		this.isSplit = isSplit;
	}

	test(element, container) {
		return this.$test(element, container);
	}

	render(element, container) {
		return this.$handler(element, container);
	}
}

export function createRule(...args) {
	const newRule = new Rule(...args);

	ruleList.push(newRule);

	return newRule;
};

export function getReplacement(elementInCloneView, container) {
	//TODO sort it
	const targetRuleList = ruleList.filter(rule => {
		return rule.test(elementInCloneView, container);
	});

	let value;

	targetRuleList.forEach(rule => {
		value = {
			replacement: rule.render(elementInCloneView, container),
			handlerName: rule.handlerName,
			isSplit: rule.isSplit
		}
	});

	return value;
};