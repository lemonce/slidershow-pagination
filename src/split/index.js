'use strict';

import Plan from './class/plan';
import Rule from './class/rule';

export function splitElement(element, container) {
	//TODO choose spliter
	const plan = new Plan(element, container);
	const ruleList = ruleList();

	ruleList.sort((previous, next) => previous.priority - next.priority);
	ruleList[0].handle();
	ruleList.forEach(rule => {
		plan.handleList = rule.handle;
	});
	
	return plan;
}

function ruleList() {
	return ruleList.forEach(rule => rule.test());
}

