'use strict';

import Rule from '../class/rule';
import {getVisibleHeight} from '../../utils';

const priority = 2;
const mediaList = ['img', 'audio', 'video', 'textarea', 'input', 'radio', 'checkbox', 'select'];

function test(element) {
    let flag = false;

    mediaList.forEach(media => {
        if (element.tagName.toLowerCase() === media) {
            flag = true;
        };
    });

    return flag;
}

function handle(element, container) {
    const height = getVisibleHeight(element, container);
    const placeHolder = document.createElement('div');
    const fragment = [];

    placeHolder.style.height = height + 'px';
    fragment.push(fragment, element);

    return {
		splitedElement: fragment,
		splitType: 'mediaSplit'
	};
}

export default function splitMedia() {
	const rule = new Rule(test, handle, priority);
	rule.push();
}