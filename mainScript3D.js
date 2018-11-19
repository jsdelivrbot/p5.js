let easycam;
let dataTable;
let maxValue;

let x = 0;
let y = 0;
let z = 0;

const titleWidth = 50;

function preload() {
	dataTable = loadTable("spectr2.csv", "csv");
}

function setup() { 
	createCanvas(windowWidth, windowHeight, WEBGL);
	doSomeStrangeMagic();
    easycam = createEasyCam();
    // easycam.setCenter([600, -1000, 2000]);
    // easycam.setCenter([0, -1000, 0]);
    

    initiateMaxValueVariable();
    console.log(maxValue);

} 

function initiateMaxValueVariable(){
	maxValue = dataTable.getRow(0).arr[1];
	for (let i = 0; i < dataTable.rows.length; i++) {
		for (let j = 1; j < dataTable.getRow(i).arr.length; j++) {
			//console.log(maxValue, dataTable.getRow(i).arr[j])
			if (maxValue < dataTable.getRow(i).arr[j]) {
				maxValue = dataTable.getRow(i).arr[j];
			}
		}
	}
}

function drawSpectr() {
	background(200);
	push();
	for (let i = 0; i < dataTable.rows.length; i++) {
		let currRow = dataTable.getRow(i).arr;
		push();
		for (let j = 1; j < currRow.length; j++) {
			if (currRow[j] != 0){
				push();
				translate(0, -currRow[j] * titleWidth / 2, 0);
				const x = 1.0 * currRow[j] / maxValue;
				const r = 255 * x;
				const g = 125 * (1 - x);
				const b = 255 * (1 - x);
				fill(r, g, b);
				box(titleWidth, currRow[j] * titleWidth, titleWidth);
				pop();
			}
			translate(titleWidth, 0, 0);
		}
		pop();
		translate(0, 0, titleWidth);
	}
	pop();
}

function draw() {
	drawSpectr();
	easycam.setCenter([x, y, z]);
}

function keyPressed() {
	if (keyCode == 87) z += titleWidth * 5;
	else if (keyCode == 65) x += titleWidth * 5;
	else if (keyCode == 83) z -= titleWidth * 5;
	else if (keyCode == 68) x -= titleWidth * 5;
	else if (keyCode == 17) y += titleWidth * 5;
	else if (keyCode == 16) y -= titleWidth * 5;
}

function doSomeStrangeMagic() {
	Dw.EasyCam.prototype.apply = function(n) {
		var o = this.cam;
		n = n || o.renderer,
		n && (this.camEYE = this.getPosition(this.camEYE), this.camLAT = this.getCenter(this.camLAT), this.camRUP = this.getUpVector(this.camRUP), n._curCamera.camera(this.camEYE[0], this.camEYE[1], this.camEYE[2], this.camLAT[0], this.camLAT[1], this.camLAT[2], this.camRUP[0], this.camRUP[1], this.camRUP[2]))
	};
}