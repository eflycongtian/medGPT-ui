class Drug{
	drugName:string = "";
	spec:string = "";
	company:string = "";
	usage:string = "";
	days:string = "";
	quantity:string = "";
	notice:string = "";
}

class Rx{
	drugs :Array<Drug>;

	constructor(drugs:Array<Drug>) {
		this.drugs = drugs;
	}
}

