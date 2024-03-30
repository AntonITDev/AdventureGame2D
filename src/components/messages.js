export function showMessage(element, text) {
	element.textContent = text
	element.classList.remove('hidden')
}

export function closeMessage(element) {
	element.classList.add('hidden')
}