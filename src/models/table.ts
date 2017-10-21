export class Table {
	id: string;
	active: boolean;
	name: string;
	quantity: string;
	code: string;
	created_at: string;

	constructor(id: string,
				active: boolean,
				name: string,
				quantity: string,
				code: string,
				created_at: string,) {

		this.id = id;
		this.active = active;
		this.name = name;
		this.quantity = quantity;
		this.code = code;
		this.created_at = created_at;
	}
}