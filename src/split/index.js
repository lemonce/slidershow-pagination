export default function splitElement(element, options) {

    return element;
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

