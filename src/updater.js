'use strict'

export default function update(plan) {
	const handleList = plan.getHandleList();
	const element = plan.element;
	const container = plan.container;
	const fragment = document.createDocumentFragment();

	handleList.forEach(handle => {
		switch (handle) {
			case 'textSplit':
				let content = '';

				plan.fragment.forEach(part => content = content + part + '<br/>');
				fragment.innerHTML = content;

				break;
			case 'mediaSplit':
				plan.fragment.forEach(part => fragment.appendChild(part));

				break;
			case 'nonemptyElementSplit':
				plan.fragment.forEach(part => fragment.appendChild(part));
			
				break;
		}
	});

	return fragment;
}