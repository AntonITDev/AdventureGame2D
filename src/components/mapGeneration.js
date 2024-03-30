export function drawMap(container, mapArray) {

	let mapItems = []
	let mapRoads = []
	let mapExits = []

	let X = 0
	let Y = 0
	let Z = 0

	mapArray.forEach(row => {
		let rowItems = [];
		row.forEach(column => {
			let mapClass = column ? "map__item__road" : "map__item__wall"
			const itemMap = document.createElement('div')
			itemMap.classList.add(mapClass)
			itemMap.classList.add("map__item")
			container.append(itemMap)

			if (mapClass == "map__item__road") { mapRoads.push([X, Y, Z]) }

			X++;
			Z++;
			rowItems.push(itemMap)
		})

		X = 0;
		Y++;
		
		mapItems.push(rowItems)
	})

	return {"mapMatrix": mapItems, "roadsCoordinates": mapRoads, "exitsCoordinates": mapExits};
}