'use strict'

export default function update(plan) {
	const value = plan.replacement;
	const destination = plan.destination;
	const element = plan.element;
	const fragment = document.createDocumentFragment();

	if (value.isContainer) {
		return;
	}

	value.replacement.forEach(part => {
		fragment.appendChild(part);
	});

	destination.replaceChild(fragment, element);
}