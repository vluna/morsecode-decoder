"use strict"

const FREQUENCY = 750;
class CreateSound {
	constructor() {
		this.sound;
		this.start_time;
		this.end_time;
		this.total;
		this.word = "";
		this.space;
		console.log("Saaa");
		this.getAlphabet();
		this.addClickEvents();
	}

	addClickEvents() {
		let input = $("#morse-input");

		input.on('mousedown', () => {
			this.sound = this.createNode();
			this.sound.start();
			this.start_time = new Date();
			this.start_time = this.start_time.getTime();
			this.space = this.start_time - this.end_time;
			if(this.total != 0 && this.space >= 220) {
				this.dashDotOrWait(this.space);
			}
		})

		input.on('mouseup', () => {
			this.sound.stop();
			this.end_time = new Date;
			this.end_time = this.end_time.getTime();
			this.total = this.end_time - this.start_time;
			this.dashDotOrWait(this.total);
		})
	}

	getAlphabet() {
		$.getJSON('alphabet.json', (data) => {
			this.alphabet = data;
		})
	}

	createNode() {
		let context = new AudioContext();
		let node = context.createOscillator();
		node.frequency.setValueAtTime(FREQUENCY, context.currentTime);
		node.type = "sine";
		node.connect(context.destination);

		return node;
	}

	dashDotOrWait(time) {
		if(time <= 120) {
			this.word += '.';
		} else if (time <= 220) {
			this.word += '-';
		} else {
			if(this.word in this.alphabet) {
				$("#morse-output").append(this.alphabet[this.word]);
				this.word = "";
			}
		}
	}
}

$(document).ready(function() {
	new CreateSound;
})
