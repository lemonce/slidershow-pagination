'use strict';

import {getReplacement} from './class/rule';
import './rule/commonElementSplitRule';
import './rule/mediaElementSplitRule';

export function splitElement(element, container) {
	
	return getReplacement(element, container);
};
