export class CarProduct {

    ID: number;
    Name: string;
    Price: number;
    Quantity: number;

    constructor(ID, Name, Price, Quantity) {
        this.Name = Name;
        this.Price = Price;
        this.ID = ID;
        this.Quantity = Quantity;
    }
}