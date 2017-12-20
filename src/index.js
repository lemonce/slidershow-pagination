const height = 300;
const container = document.querySelector('.container');

function traversalElement(rootElement, parentData, {pre, post}) {
	const childNodes = rootElement.childNodes;
	const data = {};
	
	pre(rootElement, data, parentData);
	childNodes.forEach(node => {
		traversalElement(node, data, {pre, post});
	});
	post(rootElement, data, parentData);
}

function isNecessary(sourceContainer, node) {
	if (sourceContainer === node) {
		return true;
	}



	//TODO valid necessary of node
	const nodeOffsetTop = node.offsetTop + node.height;

	return nodeOffsetTop <= height;
}

function push(destinationContainer, node) {
	const nodeCopy = node.cloneNode();

	destinationContainer.appendChild(nodeCopy);

}

function renderPageview(sourceContainer) {
	const fragment = PageviewFactory();
	let current = fragment;

	traversalElement(sourceContainer, {}, {
		pre(node, local, parent) {
			local.overflow = isNecessary(sourceContainer, node);
			local.visibleLength = node.childNodes.length;
		},
		post(node, local, parent) {
			if (local.overflow || local.visibleLength) {
				//TODO push, fill, split
				if (local.overflow) {
					push(fragment, node);
				} else if (!local.overflow && local.visibleLength) {
					//TODO split node
					const commit = document.createComment();
					
					node.parentNode.insertBefore(commit, node);
					const nodePaginative = paginate(node);
					push(fragment, nodePaginative);
					
					return false;
				} else if (!local.overflow && !local.visibleLength) {
					//TODO next page
				}
				
			} else {
				parent.visibleLength--;
			}
		}
	});

	return fragment;
}

function PageviewFactory() {
	const pageContainer =  document.createDocumentFragment();

	return pageContainer;
}

function paginate(node) {
	//TODO route
	const tagName = node.tagName;
	const pattern = /^[p,span,a,ul,ol,li]$/g;

	if (pattern.test(tagName)) {

		return splitContentRouter(node);
	} else {

		return unsplitContentRouter(node);
	}

}

function render() {
	//TODO copy, pad, mark, paginative, repeat, delete
	const copy = container.cloneNode(true);
	
	document.body.appendChild(copy);
	
	let copyHeight = copy.offsetHeight;

	const padHeight = copyHeight % height;
	const pageNumber = Math.ceil(copyHeight / height);
	const viewContainer = document.createElement('div');
	
	if (padHeight) {
		const padDiv = document.createElement('div');

		padDiv.style.height = padHeight + 'px';
		copy.appendChild(padDiv);
	}


	for (let i = 0; i < pageNumber; i++) {
		const pageView = renderPageview(copy);
		const allNodes = document.getElementsByTagName("*");

		//TODO find comment mark and start next renderPageveiw
		for (item in allNodes) {
			if (item.nodeType === 8) {
				const comment = item;

				document.removeChild(item);

				break;
			}
		}
		viewContainer.appendChild(pageView);
		document.body.appendChild(viewContainer);
	}
}

//TODO text-router, image-routers
function splitContentRouter(node) {
	const nodeOffsetTop = node.offsetTop;
	const visibleContent = height - nodeOffsetTop;
	const lineHeigt = node.style.lineHeigt;
	const lineNumber = Math.floor(visibleContent / lineHeigt);
	let nodeCopy = node.cloneNode();

	node.style.height = lineHeigt * lineNumber + 'px';

	return node;
	//TODO split
}

function unsplitContentRouter(node) {
	const nodeOffsetTop = node.offsetTop;
	const visibleContent = height - nodeOffsetTop;
	
	node.style.offsetTop = height + 'px';
}


//TODO event api thet emit render  
