export class NavbarObject {

    address: string;
    email: string;
    exp: number;
    iat: number;
    id: number;
    lastName: string;
    name: string;
    phone: number;
    type: number;

    constructor(adress, email, exp, iat, id, lastName, name, phone, type) {
        this.address = adress;
        this.email = email;
        this.exp = exp;
        this.iat = iat;
        this.id = id;
        this.lastName = lastName;
        this.name = name;
        this.phone = phone;
        this.type = type;
    }



}