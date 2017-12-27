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
        const visibleHeight = getVisibleHeight(element, container);
        const placeHolder = document.createElement('div');
        const clone = element.cloneNode(true);
        const fragment = [];
    
        if (element.offsetHeight > visibleHeight) {
            placeHolder.style.height = visibleHeight + 'px';
            fragment.push(placeHolder, element);
            this.isSplit = true;
        } else {
            fragment.push(clone);
            this.isSplit = false;
        }

        return fragment;
    },
    handlerName: 'spliteMedia'
});