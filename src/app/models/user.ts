export class User {
    public id: number;
    public name: string;
    public lastName: string;
    public age: number;
    public address: string;
    public email: string;
    public phone: number;
    public password: string;
    public typeUser: number;

    constructor(ID, Name, LastName, Age, Address, Email, Phone, Password, FK_TypeUser) {
        this.id = ID;
        this.name = Name;
        this.lastName = LastName;
        this.age = Age;
        this.address = Address;
        this.email = Email;
        this.phone = Phone;
        this.password = Password;
        this.typeUser = FK_TypeUser;
    }
}