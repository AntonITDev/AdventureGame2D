export function Wolf(name, level,startPosX, startPosY, startPosZ) {
	let player = {
		"name": name,
		"level": level,
		"HP": NaN,
		"Damage": NaN,
		"EXP": NaN,
		"avatar": NaN,
		"posX": startPosX,
		"posY": startPosY,
		"posZ": startPosZ,

		getPosX() { return this.posX },

		getPosY() { return this.posY },

		getPosZ() { return this.posZ },

		setPosX(NewPositionX) { this.posX = NewPositionX },
		setPosY(NewPositionY) { this.posY = NewPositionY },
		setPosZ(NewPositionZ) { this.posZ = NewPositionZ },

		setAvatar() {
			this.avatar = this.level < 10 ? 'src/assets/enemies/wolfs/wolf__common.png' : 'src/assets/enemies/wolfs/wolf__rare.png'
		},

		setExp() {
			this.exp = this.level * 25
		},

		setDamage() {
			this.Damage = this.level * 5
		},

		setHealth() {
			this.HP = this.level * 10
		},

		createObject() {
			const playerElement = document.createElement('div')
			playerElement.classList.add('enemy')

			this.setDamage()
			this.setHealth()
			this.setExp()
			this.setAvatar()

			playerElement.innerHTML = `
			<img class='enemyAvatar' src="${this.avatar}" alt="enemyAvatar">
			<section class='enemyInfo'>
				<section class="enemyStatus">
					<h4 class="enemyName">${this.name}</h4>
					<p class="enemyLevel">${this.level}</p>
				</section>
				<section class="enemyAttributes">
					<p class="enemyDamage">${this.Damage}</p>
					<p class="enemyHP">${this.HP}</p>
				</section>
			</section>
			`.trim()
	
			return playerElement
		},
	
		updateInfo() {
			let InfoElements = `
				<section class="enemyStatus">
					<h4 class="enemyName">${this.name}</h4>
					<p class="enemyLevel">${this.level}</p>
				</section>
				<section class="enemyAttributes">
					<p class="enemyDamage">${this.Damage}</p>
					<p class="enemyHP">${this.HP}</p>
				</section>
			`.trim()

			return InfoElements
		},
	}

	return player
}	

