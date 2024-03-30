import {LevelOneMapArray, LevelOneData, LevelOneExists} from './level__1.js';
import {LevelTwoMapArray, LevelTwoData, LevelTwoExists} from './level__2.js';
import {LevelThreeMapArray, LevelThreeData, LevelThreeExists} from './level__3.js';


export function getLevel(levelNumber) {
	return [
		{"map": LevelOneMapArray, "data": LevelOneData, "exists": LevelOneExists}, 
		{"map": LevelTwoMapArray, "data": LevelTwoData, "exists": LevelTwoExists}, 
		{"map": LevelThreeMapArray, "data": LevelThreeData, "exists": LevelThreeExists}
	] [levelNumber]
}