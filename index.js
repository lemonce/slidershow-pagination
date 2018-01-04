import {Paginator} from './src';

export function createPaginator(element) {
    //TODO validate
    if (element.nodeType !== 1) {
        return;
    }

    return new Paginator(element);
}