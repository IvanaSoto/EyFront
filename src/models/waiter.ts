export class Waiter {
	name: string;
	lastname: string;
	email: string;
	password: string;
	dni: string;

	constructor(name: string,
				lastname: string,
				email: string,
				password: string,
				dni: string) {

		this.name = name;
		this.lastname = lastname;
		this.email = email;
		this.password = password;
		this.dni = dni;
	}
}