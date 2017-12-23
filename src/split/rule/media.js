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
    handle(element, container) {
        const height = getVisibleHeight(element, container);
        const placeHolder = document.createElement('div');
        const fragment = [];
    
        placeHolder.style.height = height + 'px';
        fragment.push(placeHolder, element);
    
        return {
            splitedElement: fragment,
            splitType: 'mediaSplit'
        };
    }
});