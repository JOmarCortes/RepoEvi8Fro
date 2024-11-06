export class Producto {
  constructor(_id = "", producto = "", descripcion = "", ubicacionStock = "", stock = 0) {
    this._id =_id;
    this.producto = producto;
    this.descripcion = descripcion;
    this.ubicacionStock = ubicacionStock;
    this.stock = stock;
}

_id: string; // Sub guión id porque los datos van a venir de MOngodb
producto: string;
descripcion: string;
ubicacionStock: string;
stock: Number;
}
