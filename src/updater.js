'use strict'

export default function update(plan) {
	const value = plan.replacement;
	const destination = plan.destination;
	const element = plan.element;

	
	if (value.handlerName === 'spliteContainer') {
		return;
	}

	if (value.handlerName === 'spliteElement' && value.isSplit) {
		const height = value.replacement[0].style.height;
		const fragment = document.createDocumentFragment();

		value.replacement.forEach(part => {
			fragment.appendChild(part);
		});

		destination.replaceChild(fragment, element);
		
		value.replacement[1].scrollTop = parseInt(height);
		
		return;
	}

}