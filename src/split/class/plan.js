'use strict';

export default class Plan{
	constructor(destination, replacement, element) {
		this.$destination = destination;
		this.$replacement = replacement;
		this.$element = element;
	}
	
	get destination() {
		return this.$destination;
	}

	get replacement() {
		return this.$replacement;
	}

	get element() {
		return this.$element;
	}
}