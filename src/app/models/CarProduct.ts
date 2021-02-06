export class CarProduct {

    ID: number;
    Name: string;
    Price: number;
    Image: string;
    Quantity: number;

    constructor(ID, Name, Price, Image, Quantity) {
        this.Name = Name;
        this.Price = Price;
        this.ID = ID;
        this.Image = Image;
        this.Quantity = Quantity;
    }
}