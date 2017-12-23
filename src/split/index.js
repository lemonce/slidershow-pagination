'use strict';

import {getReplacement} from './class/rule';

import './rule/text';
import './rule/media';
import './rule/element';

export function splitElement(element, container) {
	const clone = element.cloneNode(true);
	
	return getReplacement(clone);
};
