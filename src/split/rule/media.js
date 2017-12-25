'use strict';

import { createRule } from '../class/rule';
import {getVisibleHeight} from '../../utils';

const mediaList = ['img', 'audio', 'video', 'textarea', 'input', 'radio', 'checkbox', 'select'];

createRule({
    test(element) {
        let flag = false;
    
        mediaList.forEach(media => {
            if (element.tagName.toLowerCase() === media) {
                flag = true;
            };
        });
    
        return flag;
    },
    handler(element, container) {
        const height = getVisibleHeight(element, container);
        const placeHolder = document.createElement('div');
        const clone = element.cloneNode(true);
        const fragment = [];
    
        if (element.offsetHeight > visibleHeight) {
            placeHolder.style.height = height + 'px';
            fragment.push(placeHolder, element);
        } else {
            fragment.push(clone);
        }
        return fragment;
    }
});