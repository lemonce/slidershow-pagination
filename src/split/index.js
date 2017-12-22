'use strict';

import Plan from './class/plan';
import Rule from './class/rule';
import splitText from './rule/text';
import splitMedia from './rule/media';
import splitNonEmptyElement from './rule/element';

export function splitElement(element, container) {
	splitText();
	splitMedia();
	splitNonEmptyElement();

	//TODO choose spliter
	const plan = new Plan(element, container);
	const ruleList = getRuleList(element);

	ruleList.sort((previous, next) => next.priority - previous.priority);
	
	//something in doubt

	// ruleList.forEach(rule => {
	// 	const result = rule.handle(element, container);

	// 	plan.setHandleList(result.splitType);
	// });

	const result = ruleList[0].handler(element, container);

	plan.setHandleList(result.splitType);
	plan.fragment = result.splitedElement;

	return plan;
}

function getRuleList(element) {
	return Rule.ruleList.filter(rule => rule.test(element));
}

