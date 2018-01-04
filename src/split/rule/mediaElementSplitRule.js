'use strict';

import {createRule} from '../class/rule';
import {
	getVisibleHeight,
	dealWithVisibleHeight,
	dealWithElementAfterSplit
} from './util';

const mediaList = ['IMG', 'AUDIO', 'VIDEO', 'TR', 'INPUT', 'TEXTAREA', 'RADIO', 'CHECKBOX', 'SELECT', 'OPTION'];

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
		if (element.offsetHeight > container.offsetHeight) {
			console.log('warning');

			return;
		}

		const visibleHeight = getVisibleHeight(element, container);
		const elementHeight = element.offsetHeight;
		const fragmentList = [];

		if (visibleHeight <= 0 || visibleHeight >= elementHeight) {
			fragmentList.push(element);
		} else {
			let filling;

			if (window.getComputedStyle(element, null).display === 'inline') {

				filling = document.createElement(element.tagName);
				filling.style.visibility = 'hidden';
				
			} else {
				filling = document.createElement('div');	
			}
            
            dealWithElementAfterSplit(filling, visibleHeight, container.offsetWidth);
            fragmentList.push(filling, element);
		}
		
		return fragmentList;
    },
    priority:1
});
