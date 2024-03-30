import {drawMap} from "./mapGeneration.js";
import {getLevel} from './levels/levelController.js';
import {Player} from './player.js';
import {Wolf} from './enemies/wolf.js';
import {openMenu, closeMenu} from './menu.js';
import {startFight} from './fight.js';
import {showMessage, closeMessage} from './messages.js';


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
let stage = 0
let level = getLevel(stage)
let levelData = level['data']
let levelExists = level['exists']


//Player
const playerData = Player('NoNameNoName', "src/assets/mapItems/playerAvatar.png", levelData[0], levelData[1], levelData[2])
let playerObject = playerData.createObject()

//Enemy

const EnemiesArray = []
const mapEnemyCoordinates = []

function spawnEnemyWolf(count) {

	let enemyPositions = [mapRoadsCoordinates[1], mapRoadsCoordinates[5], mapRoadsCoordinates[10]]
	let levels = [3, 7, 12]
	for (let i = 0; i < count; i++) {
		const enemy = Wolf('Wolf', levels[i], enemyPositions[i][0], enemyPositions[i][1], enemyPositions[i][2])
	
		EnemiesArray.push(enemy)
		mapEnemyCoordinates.push(enemyPositions[i])
	}

	EnemiesArray.forEach(enemy => {
		mapContainer.children[enemy.getPosZ()].append(enemy.createObject())
	})
}

//Game data
let mapItems = [];
let mapRoadsCoordinates = [];

function restartMap() {
	mapContainer.innerHTML = '';
	playerData.setPosX(levelData[0]);
	playerData.setPosY(levelData[1]);
	playerData.setPosZ(levelData[2]);
	mapItems.splice(0, mapItems.length)
	mapRoadsCoordinates.splice(0, mapRoadsCoordinates.length)
	EnemiesArray.splice(0, EnemiesArray.length)
	mapEnemyCoordinates.splice(0, mapEnemyCoordinates.length)
	stage = 0
}

function start() {
	buttonPauseGame.style.opacity = "1";
	buttonStartGame.textContent = 'restart';

	restartMap()

	let mapData = drawMap(mapContainer, level['map'])
	mapItems = mapData['mapMatrix']
	mapRoadsCoordinates = mapData['roadsCoordinates']
	mapContainer.children[playerData.getPosZ()].append(playerObject)

	spawnEnemyWolf(3)
}

function exit() {
	buttonPauseGame.style.opacity = "0";
	buttonStartGame.classList.remove('start')
	gameContainer.classList.add('hidden')
	buttonStartGame.textContent = "start";
}

function isWall(posX, posY) {
	if (mapItems[posX][posY].classList.contains('map__item__wall')) { 
		showMessage(tooltipInfo, "Стена")
		return true 
	}

	return false
}

function isEnemy() {
	EnemiesArray.forEach(enemy => {
		if (playerData.getPosZ() == enemy.getPosZ()) {
			showMessage(tooltipInfo, "Враг")
			return true
		}
	})

	return false
}

function isExit() {
	if ([0,1,2].includes(levelExists[playerData.getPosZ()])) {
		leaveLevel(levelExists[playerData.getPosZ()])
	}
}

function changePlayerPositionZ() {
	let mapItems = mapContainer.querySelectorAll('.map__item')

	for (let i = 0; i < mapItems.length; i++) {
		if (mapItems[i].contains(playerObject)) {
			playerData.setPosZ(i)
		}
	}
}

function leaveLevel(LevelNumber) {
	showMessage(tooltipInfo, 'Выход')
	stage = LevelNumber
	level = getLevel(stage)
	levelData = level['data']
	levelExists = level['exists']
	start()
}

//Move events
document.addEventListener('keydown', (e)=> {
	
	if (e.code == 'Escape') {
		if (gameContainer.classList.contains("hidden")) {return}

		if (startMenu.classList.contains('menu__hidden')) {
			openMenu(startMenu)
		} else {
			closeMenu(startMenu)
		}
	}

	if (!startMenu.classList.contains('menu__hidden')) {return}

	if (!buttonStartGame.classList.contains('start')) {return}

	closeMessage(tooltipInfo)

	if (e.code == "KeyE") {
		if (isEnemy()) {return}
		else if (isExit()) {return}
		
	}

	if (e.code == 'KeyA') { playerData.moveLeft(playerObject, mapItems, isWall)} 
	else if (e.code == 'KeyD') { playerData.moveRight(playerObject, mapItems, isWall)} 
	else if (e.code == 'KeyW') { playerData.moveTop(playerObject, mapItems, isWall)} 
	else if (e.code == 'KeyS') { playerData.moveBottom(playerObject, mapItems, isWall)}

	changePlayerPositionZ()
})


// if (playerData.levelUP(20)) {
// 	playerObject.querySelector('.playerInfo').innerHTML = playerData.updateInfo()
// }