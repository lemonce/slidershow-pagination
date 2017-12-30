'use strict';

export default class Plan{
	constructor(destination, replacement, element, sourceContainer, localClone) {
		this.$destination = destination;
		this.$replacement = replacement;
		this.$element = element;
		this.$sourceContainer = sourceContainer;
		this.$localClone = localClone;
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

	get sourceContainer() {
		return this.$sourceContainer;
	}

	get localClone() {
		return this.$localClone;
	}

}