let dataTable;
let i = 0;

function setup(){
	createCanvas(1300, 600);
	dataTable = loadTable("spectr.csv", "csv", ep);
}

function ep(){
	drawNextHyst(i);
}

function drawNextHyst(n){
	i = n;
	background(200);
	const row = dataTable.getRow(n).arr;
	const w = (width - 50) / row[0];
	fill(0);
	textSize(30);
	text("" + row[0], 20, 50);
	textSize(8);
	const maxElem = max(row.slice(1));
	for(let i = 1; i <= row[0]; i++){
		const h = (height - 90) * row[i] / maxElem;
		fill(255);
		rect(25 + w * (i - 1), height - 10, w, -h);
		fill(0);
		push();
		translate(26 + w * (i - 1) + 10, height - 10);
		rotate(-HALF_PI);
		text("" + (i - 1) + " ( " + row[i] + " )", 0, 0);
		pop();
	}
}

function mouseClicked(){
	i++;
	drawNextHyst(i);
}