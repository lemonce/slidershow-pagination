'use strict';

import { createRule } from '../class/rule';

createRule({
	test(element, container) {
		return  element === container;
	},
    handler(element, container) {
        const fragment = [];
	
		fragment.push(element.cloneNode(true));

        return fragment;
	},
	isContainer: true
});