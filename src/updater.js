import { dealWithPageView } from "./utils";

'use strict'

export default function update({destination, replacement, element, sourceContainer,localClone}) {
    const destinationView = destination;
    const fragmentList = replacement;
    const originalElement = element;
    const elementParent = originalElement.parentNode;
    const fragmentNumber = replacement.length;

    if (destinationView === elementParent) {
        switch (fragmentNumber) {
            case 1:
                break;
            case 2:
                console.log(destinationView,fragmentList[0],originalElement);
                destinationView.insertBefore(fragmentList[0], originalElement);
                console.log(destinationView,fragmentList[0],originalElement);

                break;
            case 3:
                const fragmentContainer = document.createDocumentFragment();

                fragmentList.forEach(member => {
                    fragmentContainer.appendChild(member); 
                });
                destinationView.replaceChild(fragmentContainer, originalElement);
                fragmentList.forEach(member => {
                    if (Math.ceil(member.lang)) {
                        member.scrollTop = Math.ceil(member.lang);
                    }
                });

                break;
        }

    } else {
        const container = sourceContainer;
        const cloneView = localClone;

        switch (fragmentNumber) {
            case 1:
                if (fragmentList[0] === container || fragmentList[0].tagName === 'TABLE' || fragmentList[0].tagName === 'TBODY' || fragmentList[0].tagName === 'TFOOT' || fragmentList[0].tagName === 'FORM') {
                    destinationView.appendChild(cloneView);

                    return;
                }
                 destinationView.appendChild(fragmentList[0].cloneNode(true));

                break;
            case 2:
                destinationView.appendChild(fragmentList[0].cloneNode(true));

                break;
            case 3:
                destinationView.appendChild(fragmentList[0].cloneNode(true), fragmentList[1]);

                break;
        }
    }
}