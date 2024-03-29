export function drawMap(container, mapArray) {

	let mapItems = []

	mapArray.forEach(row => {
		let rowItems = [];
		row.forEach(column => {
			let mapClass = column ? "map__item__road" : "map__item__wall"
			const itemMap = document.createElement('div')
			itemMap.classList.add(mapClass)
			itemMap.classList.add("map__item")
			container.append(itemMap)

			rowItems.push(itemMap)
		})

		mapItems.push(rowItems)
	})

	return mapItems;
}