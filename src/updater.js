'use strict'

export default function update(plan) {
	const destination = plan.destination;
	const replacement = plan.replacement;
	const element = plan.element;

	destination.replaceChild(replacement, element);
	
}