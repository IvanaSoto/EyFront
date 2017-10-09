export class Table {
	id: string;
	name: string;
	quantity: string;
	code: string;
	created_at: string;
	waiter: Waiter;

	constructor(id: string,
				name: string,
				quantity: string,
				code: string,
				created_at: string,
				waiter: Waiter,) {

		this.id = id;
		this.name = name;
		this.quantity = quantity;
		this.code = code;
		this.created_at = created_at;
		this.waiter = waiter;
	}
}