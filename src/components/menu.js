export function openMenu(menu) {
	menu.classList.remove('menu__hidden')
	document.body.style.overflow = "hidden";
	setTimeout(()=> {
		menu.height = '100dvh';
	}, 200)
}

export function closeMenu(menu) {
	menu.classList.add('menu__hidden')
	document.body.style.overflow = "visible";
	setTimeout(()=> {
		menu.height = '0';
	}, 200)
}