export function openMenu(menu) {
	menu.classList.remove('menu__hidden')
	document.body.style.overflow = "hidden";
}

export function closeMenu(menu) {
	menu.classList.add('menu__hidden')
	document.body.style.overflow = "visible";
}