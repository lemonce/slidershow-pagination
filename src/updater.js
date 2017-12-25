'use strict'

export default function update(plan) {
	const replacement = plan.replacement;
	const destination = plan.destination;
	const element = plan.element;
	const fragment = document.createDocumentFragment();

	if (replacement[0].id === 'clone-view') {
		return;
	}

	console.log(replacement[0].id === 'clone-view');

	replacement.forEach(part => {
		fragment.appendChild(part);
	});

	destination.replaceChild(fragment, element);
	//destination.appendChild(fragment);	
}