class card {
	constructor(upSide, downSide, downSideContent) {
	  this.downSideContent = downSideContent;
	}
	
	name() {
	  console.log("Valor do lado de baixo: "+ this.downSideContent);
	}
}

let first = new card()