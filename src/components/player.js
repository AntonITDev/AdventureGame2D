export function Player(name, avatar, startPosX, startPosY, startPosZ) {
	let player = {
		"name": name,
		"level": 0,
		"HP": 100,
		"Damage": 5,
		"EXP": 0,
		"nextLevelExp": 100,
		"avatar": avatar,
		"posX": startPosX,
		"posY": startPosY,
		"posZ": startPosZ,
	
		renameName(newName) { this.name = newName },

		getPosX() { return this.posX },

		getPosY() { return this.posY },

		getPosZ() { return this.posZ },

		setPosX(NewPositionX) {this.posX = NewPositionX},

		setPosY(NewPositionY) { this.posY = NewPositionY },

		setPosZ(NewPositionZ) { this.posZ = NewPositionZ },

		createObject() {
			const playerElement = document.createElement('div')
			playerElement.classList.add('player')
	
			playerElement.innerHTML = `
			<img class='playerAvatar' src="${this.avatar}" alt="playerAvatar">
			<section class='playerInfo'>
				<section class="platerStatus">
					<h4 class="playerName">${this.name}</h4>
					<p class="playerLevel">${this.level}</p>
				</section>
				<section class="playerAttributes">
					<p class="playerDamage">${this.Damage}</p>
					<p class="playerHP">${this.HP}</p>
				</section>
			</section>
			`.trim()
	
			return playerElement
		},
	
		updateInfo() {
			let InfoElements = `
			<section class="platerStatus">
				<h4 class="playerName">${this.name}</h4>
				<p class="playerLevel">${this.level}</p>
			</section>
			<section class="playerAttributes">
				<p class="playerDamage">${this.Damage}</p>
				<p class="playerHP">${this.HP}</p>
			</section>
			`.trim()

			return InfoElements
		},

		levelUP(exp) {
			if (this.level == 100) { return false }

			this.EXP += exp; //200
	
			if (this.EXP >= this.nextLevelExp) {
				this.level += 1;
				this.Damage += 2;
				this.HP += 10;
				exp = +(this.nextLevelExp - this.EXP)
	
				this.EXP = 0;
				this.nextLevelExp += this.nextLevelExp * 0.1; //110
				this.levelUP(exp)

				return true
			}
		},

		moveTop(playerObject, mapRoads, isWall) {
			if(this.getPosY() - 1 < 0) {return}
		
			if (isWall(this.getPosY() - 1, this.getPosX())) { 
				return
			}
		
			this.setPosY(this.getPosY() - 1);
			mapRoads[this.getPosY()][this.getPosX()].append(playerObject)
		},

		moveRight(playerObject, mapRoads, isWall) {
			playerObject.querySelector(".playerAvatar").style.transform = "rotateY(0deg)";
		
			if(this.getPosX() + 1 == mapRoads[this.getPosY()].length) {return}
		
			if (isWall(this.getPosY(), this.getPosX() + 1)) { 
				return
			}
		
			this.setPosX(this.getPosX() + 1);
			mapRoads[this.getPosY()][this.getPosX()].append(playerObject)
		},
		
		moveLeft(playerObject, mapRoads,  isWall) {
			playerObject.querySelector(".playerAvatar").style.transform = "rotateY(180deg)";
		
			if(this.getPosX() - 1 < 0) {return}
		
			if (isWall(this.getPosY(), this.getPosX() - 1)) { 
				return
			}
		
			this.setPosX(this.getPosX() - 1);
			mapRoads[this.getPosY()][this.getPosX()].append(playerObject)
		},
		
		moveBottom(playerObject, mapRoads, isWall) {
			if(this.getPosY() + 1 == mapRoads.length) {return}
			if (isWall(this.getPosY() + 1, this.getPosX())) { 
				return
			}
		
			this.setPosY(this.getPosY() + 1);
			mapRoads[this.getPosY()][this.getPosX()].append(playerObject)
		}
	}

	return player
}