'use strict';

import {createRule} from '../class/rule';
import {
	getVisibleHeight,
	dealWithVisibleHeight
} from './util';

const mediaList = ['IMG', 'AUDIO', 'VODEO', 'TR', 'TD', 'INPUT', 'TEXTAREA', 'RADIO', 'CHECKBOX', 'SELECT', 'OPTION']

createRule({
	test: function(element, container) {
        let flag = false;

        mediaList.forEach(listElement => {
            if (element.tagName === listElement) {
                flag = true;
            }
        });

        return flag;
	},
	handler: function(element, container) {
		const visibleHeight = getVisibleHeight(element, container);
		const elementHeight = element.offsetHeight;
		const fragmentList = [];

		if (visibleHeight <= 0 || visibleHeight >= elementHeight) {
			fragmentList.push(element);
		} else {
            const filling = document.createElement('div');
            
            dealWithElementAfterSplit(filling, visibleHeight);
            fragmentList.push(filling, element);
		}
		
		return fragmentList;
    },
    priority:1
});

function dealWithElementAfterSplit(element, height) {
	element.style.height = height + 'px';
	element.style.overflow = 'hidden';

	return element;
}