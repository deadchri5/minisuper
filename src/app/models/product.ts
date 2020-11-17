export class Product {

    public ID: number;
    public Name: string;
    public Price: number;
    public Description: string;
    public Stock: number;
    public Image: string;
    public FK_Category: string;

    constructor(ID, Name, Price, Description, Stock, Image, FK_Category) {
        this.ID = ID;
        this.Name = Name;
        this.Price = Price;
        this.Description = Description;
        this.Stock = Stock;
        this.Image = Image;
        this.FK_Category = FK_Category;
    }
}