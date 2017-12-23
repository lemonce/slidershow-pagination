'use strict';
const ruleList = [];

export class Rule {
	constructor({test, handler, priority = 1000}) {
		this.$test = test;
		this.$handler = handler;

		this.priority = priority;
	}

	test(element) {
		this.$test(element);
	}

	render(element) {

	}
}

export function createRule(...args) {
	const newRule = new Rule(...args);

	ruleList.push(newRule);

	return newRule;
};

export function getReplacement(replacement) {
	//TODO sort it
	const targetRuleList = ruleList.filter(rule => rule.test(replacement));

	targetRuleList.forEach(rule => {
		replacement = rule.render(replacement);
	});

	return replacement;
};