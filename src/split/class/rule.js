'use strict';
const ruleList = [];

class Rule {
	constructor({test, handler, priority = 1000}) {
		this.$test = test;
		this.$handler = handler;
		this.priority = priority;
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

	let fragmentList = [];
	if (targetRuleList.length) {
		targetRuleList.forEach(rule => {
			fragmentList = rule.render(elementInCloneView, container);
		});

	} else {
		fragmentList.push(elementInCloneView);
	}

	return fragmentList;
};