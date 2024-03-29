import {LevelOneMapArray, LevelOneStartPosition} from './level__1.js';
import {LevelTwoMapArray, LevelTwoStartPosition} from './level__2.js';
import {LevelThreeMapArray, LevelThreeStartPosition} from './level__3.js';


export function getLevel(levelNumber) {
	return [
		{"map": LevelOneMapArray, "data": LevelOneStartPosition}, 
		{"map": LevelTwoMapArray, "data": LevelTwoStartPosition}, 
		{"map": LevelThreeMapArray, "data": LevelThreeStartPosition}
	] [levelNumber]
}