const COLS = 11
const ROWS = 11
const FIELD_SIZE = 30
const PADDING = 10
let game_status = "pregame"
let win = 0
let loss = 0
let inf = document.querySelector('.info')
let statW = document.querySelector('.statW')
let statL = document.querySelector('.statL')
let res = document.querySelector('.prevres')

const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')
let map = genMaze(COLS, ROWS)

init()
start()

function init () {
	canvas.width = PADDING * 2 + COLS * FIELD_SIZE
	canvas.height = PADDING * 2 + ROWS * FIELD_SIZE
}

function start() {
	let score = win - loss
	console.log(score)
	$.ajax({
		method: "POST",
		url: '/GameRecords/Add',
		data: {
			Score: score
		}
	});

	canvas.style.cursor = "auto"
	map = genMaze(COLS, ROWS)
	game_status = 'pregame'
	inf.innerText = "Hover your mouse over the green square to start"
	statW.innerText = "Wins: " + win.toString()
	statL.innerText = "Losses: " + loss.toString()
	clearCanvas()
	preDrawMap()
	requestAnimationFrame(prep)

	mouseWatcher(canvas, function (mouse) {
		if (mouse.x <= PADDING
			|| mouse.y <= PADDING
			|| mouse.x >= canvas.width - PADDING
			|| mouse.y >= canvas.height - PADDING
		) {
			if(game_status === 'ingame')
				game_status = 'lost'
			return
		}

		const coordinats = {
			x: parseInt((mouse.x - PADDING) / FIELD_SIZE),
			y: parseInt((mouse.y - PADDING) / FIELD_SIZE)
		}

		if (getField(coordinats.x, coordinats.y) === 'start') {
			if(game_status === 'pregame')
				game_status = 'ingame'
		}
		else if (getField(coordinats.x, coordinats.y) === 'finish') {
			if(game_status === 'ingame')
				game_status = 'won'
		}
		else if (getField(coordinats.x, coordinats.y) === 'wall') {
			if(game_status === 'ingame')
				game_status = 'lost'
		}
	})
}

function prep () {
	switch(game_status){
		case "pregame":
			requestAnimationFrame(prep)
			break
		case "ingame":
			inf.innerText = "Guide your mouse to finish. It's invisible, so use the eyes"
			drawMap()
			canvas.style.cursor = "none"
			requestAnimationFrame(tick)
			break
	}
}

function tick () {
	if(game_status === 'won'){
		win++
		res.style.color = 'rgb(237, 202, 59)'
		res.innerText = "VICTORY ACHIEVED"
		start()
	}
	else if(game_status === 'lost'){
		loss++
		res.style.color = 'rgb(171, 17, 17)'
		res.innerText = "YOU DIED"
		start()
	}
	else
		requestAnimationFrame(tick)
}



function preDrawMap () {
	for (let x = 0; x < COLS; x++) {
		for (let y = 0; y < ROWS; y++) {
			if (getField(x, y) === 'start'){
				context.fillStyle = 'green'
				context.beginPath()
				context.rect(PADDING + x * FIELD_SIZE, PADDING + y * FIELD_SIZE, FIELD_SIZE, FIELD_SIZE)
				context.fill()
			}
		}
	}
}

function drawMap () {
	for (let x = 0; x < COLS; x++) {
		for (let y = 0; y < ROWS; y++) {
			if (getField(x, y) === 'wall') {
				context.fillStyle = 'black'
				context.beginPath()
				context.rect(PADDING + x * FIELD_SIZE, PADDING + y * FIELD_SIZE, FIELD_SIZE, FIELD_SIZE)
				context.fill()
			}
			else if (getField(x, y) === 'finish'){
				context.fillStyle = 'blue'
				context.beginPath()
				context.rect(PADDING + x * FIELD_SIZE, PADDING + y * FIELD_SIZE, FIELD_SIZE, FIELD_SIZE)
				context.fill()
			}
		}
	}
}

function clearCanvas () {
	context.fillStyle = 'black'
	context.beginPath()
	context.rect(0, 0, canvas.width, canvas.height)
	context.fill()

	context.fillStyle = 'white'
	context.beginPath()
	context.rect(PADDING, PADDING, canvas.width - PADDING * 2, canvas.height - PADDING * 2)
	context.fill()
}

function getField (x, y) {
	if (!(x < 0 || x >= COLS || y < 0 || y >= ROWS)) 
		return map[y][x]
}

function setField (x, y, value) {
	if (!(x < 0 || x >= COLS || y < 0 || y >= ROWS))
		map[y][x] = value
}

document.querySelector("body").addEventListener("mousemove", eyeball)
function eyeball() {
	var eye = document.querySelectorAll(".eye")
	eye.forEach(function (eye) {
		let x = eye.getBoundingClientRect().left + eye.clientWidth / 2
		let y = eye.getBoundingClientRect().top + eye.clientHeight / 2
		let radian = Math.atan2(event.pageX - x, event.pageY - y)
		let rot = radian * (180 / Math.PI) * -1 + 270
		eye.style.transform = "rotate(" + rot + "deg)"
	})
}