'use strict';

import {getReplacement} from './class/rule';

import './rule/commonElementSplitRule';

export function splitElement(element, container) {
	
	return getReplacement(element, container);
};
