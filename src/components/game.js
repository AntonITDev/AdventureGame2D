import {drawMap} from "./mapGeneration.js";
import {getLevel} from './levels/levelController.js';
import {Player} from './player.js';
import {openMenu, closeMenu} from './menu.js';


//Menu
const startMenu = document.querySelector('.menu')
const gameContainer = document.querySelector('.game')
const buttonPauseGame = document.querySelector('.button__pause')
const buttonStartGame = document.querySelector('.button__start')
const buttonExitGame = document.querySelector('.button__exit')

//Game UI
const mapContainer = document.querySelector('.map')
const tooltipInfo = document.querySelector('.tooltip__info')

//Button start game
buttonStartGame.addEventListener('click', (e)=> {
	buttonStartGame.classList.add('start')

	closeMenu(startMenu)

	mapContainer.innerHTML = "";
	startMenu.classList.add('menu__hidden')
	gameContainer.classList.remove('hidden')
	
	start()
})

buttonPauseGame.addEventListener('click', ()=> {
	if (startMenu.classList.contains('menu__hidden')) {
		openMenu(startMenu)
	} else {
		closeMenu(startMenu)
	}
})

buttonExitGame.addEventListener('click', ()=> {
	exit()
})


//Level
let level = getLevel(0)
let levelData = level['data']


//Player
const playerData = Player('NoNameNoName', "src/assets/mapItems/playerAvatar.png", levelData[3], levelData[0], levelData[1])

let playerObject = playerData.createPlayer()


//Game data
let mapRoads = [];

function start() {
	buttonPauseGame.style.opacity = "1";
	buttonStartGame.textContent = 'restart';

	playerData.setPosX(levelData[1]);
	playerData.setPosY(levelData[0]);
	mapRoads.splice(0, mapRoads.length)

	mapRoads = drawMap(mapContainer, level['map'])
	mapContainer.children[levelData[2]].append(playerObject)
}

function exit() {
	buttonStartGame.classList.remove('start')
	gameContainer.classList.add('hidden')
	buttonStartGame.textContent = "start";
}

//Move events
document.addEventListener('keydown', (e)=> {

	if (!startMenu.classList.contains('menu__hidden')) {return}

	if (!buttonStartGame.classList.contains('start')) {return}

	tooltipInfo.classList.add('hidden')

	if (e.code == 'KeyA') {
		playerObject.querySelector(".playerAvatar").style.transform = "rotateY(180deg)";
		if (playerData.direction != 'l') {playerData.changeDirection('l')}

		if(playerData.getPosX() - 1 < 0) {return}
		if (mapRoads[playerData.getPosY()][playerData.getPosX() - 1].classList.contains('map__item__wall')) {
			tooltipInfo.textContent = "Стена"
			tooltipInfo.classList.remove('hidden')
			return 
		}

		playerData.setPosX(playerData.getPosX() - 1);
		mapRoads[playerData.getPosY()][playerData.getPosX()].append(playerObject)
	} else if (e.code == 'KeyD') {
		playerObject.querySelector(".playerAvatar").style.transform = "rotateY(0deg)";
		if (playerData.direction != 'r') {playerData.changeDirection('r')}

		if(playerData.getPosX() + 1 == mapRoads[playerData.getPosY()].length) {return}
		if (mapRoads[playerData.getPosY()][playerData.getPosX() + 1].classList.contains('map__item__wall')) {
			tooltipInfo.textContent = "Стена"
			tooltipInfo.classList.remove('hidden')
			return 
		}

		playerData.setPosX(playerData.getPosX() + 1);
		mapRoads[playerData.getPosY()][playerData.getPosX()].append(playerObject)
	} else if (e.code == 'KeyW') {
		if (playerData.direction != 't') {playerData.changeDirection('t')}

		if(playerData.getPosY() - 1 < 0) {return}

		if (mapRoads[playerData.getPosY() - 1][playerData.getPosX()].classList.contains('map__item__wall')) {
			tooltipInfo.textContent = "Стена"
			tooltipInfo.classList.remove('hidden')
			return 
		}

		playerData.setPosY(playerData.getPosY() - 1);
		mapRoads[playerData.getPosY()][playerData.getPosX()].append(playerObject)

	} else if (e.code == 'KeyS') {
		if (playerData.direction != 'b') {playerData.changeDirection('b')}

		if(playerData.getPosY() + 1 == mapRoads.length) {return}
		if (mapRoads[playerData.getPosY() + 1][playerData.getPosX()].classList.contains('map__item__wall')) {
			tooltipInfo.textContent = "Стена"
			tooltipInfo.classList.remove('hidden')
			return 
		}

		playerData.setPosY(playerData.getPosY() + 1);
		mapRoads[playerData.getPosY()][playerData.getPosX()].append(playerObject)
	}
})


// if (playerData.levelUP(20)) {
// 	playerObject.querySelector('.playerInfo').innerHTML = playerData.updateInfo()
// }