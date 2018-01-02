'use strict';

import {elementOffsetTop} from '../../utils';

export function getVisibleHeight(element, container) {
    const containerScrollTop = container.scrollTop;
    const containerOffsetHeight = container.offsetHeight;
    
    return containerScrollTop + containerOffsetHeight - elementOffsetTop(element, container);
}

export function dealWithVisibleHeight(visibleHeight, element) {
    const fontSize = window.getComputedStyle(element, null).fontSize;
    const fontValue = parseFloat(fontSize);
    const lineHeight = window.getComputedStyle(element, null).lineHeight;
    const lineHeightValue = dealWithLineHeight(lineHeight, fontValue);
    const rowNumber = Math.floor(visibleHeight / lineHeightValue);

    return rowNumber * lineHeightValue;
}

function dealWithLineHeight(lineHeight, fontSize) {
    if (lineHeight === 'normal') {
        lineHeight = fontSize * 1.31;
    } else {
        lineHeight = parseFloat(lineHeight);
    }

    return lineHeight
}