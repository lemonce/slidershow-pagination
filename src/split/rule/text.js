'use strict';

import Rule from '../class/rule';

const priority = 1;

//TODO split paragaph
function test(element) {
	const isScroll = element.style.overflow;
}
	
function handle() {
	
}

const rule = new Rule(test, handle, priority);
rule.push();