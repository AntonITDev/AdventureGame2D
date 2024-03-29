export function Wolf(name, avatar, direction, startPosX, startPosY) {
	let player = {
		"name": name,
		"level": 0,
		"HP": 100,
		"Damage": 5,
		"EXP": 0,
		"nextLevelExp": 100,
		"avatar": avatar,
		"direction": direction,
		"posX": startPosX,
		"posY": startPosY,
	
		renameName(newName) {
			this.name = newName
		},

		getPosX() {
			return this.posX
		},

		getPosY() {
			return this.posY
		},

		setPosX(NewPositionX) {
			this.posX = NewPositionX
		},
		setPosY(NewPositionY) {
			this.posY = NewPositionY
		},
	
		createPlayer() {
			const playerElement = document.createElement('div')
			playerElement.classList.add('player')
	
			playerElement.innerHTML = `
			<img class='playerAvatar' src="${this.avatar}" alt="playerAvatar">
			<section class='playerInfo'>
				<h4 class="playerName">${this.name}</h4>
				<p class="playerLevel">${this.level}</p>
				<p class="playerDamage">${this.Damage}</p>
				<p class="playerHP">${this.HP}</p>
			</section>
			`.trim()
	
			return playerElement
		},
	
		updateInfo() {
			let InfoElements = `
			<h4 class="playerName">${this.name}</h4>
			<p class="playerLevel">${this.level}</p>
			<p class="playerDamage">${this.Damage}</p>
			<p class="playerHP">${this.HP}</p>
			`.trim()

			return InfoElements
		},

		levelUP(exp) {
			
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

		changeDirection(new_direction) {
			this.direction = new_direction;
		}
	}

	return player
}	

