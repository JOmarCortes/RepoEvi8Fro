import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../models/producto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  readonly URL_API = 'https://repo-evi8.vercel.app/api/productos';
  selectedProducto: Producto;
  productos: Producto[];


  constructor(private http: HttpClient) {
    this.selectedProducto = new Producto();
    this.productos = [];
  }

  // Método para obtener todos los productos
  getProducto(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.URL_API);
  }

  // Método para agregar un nuevo producto
  postProducto(producto: Producto): Observable<Producto> {
    return this.http.post<Producto>(this.URL_API, producto);
  }

  // Método para actualizar un producto existente
  putProducto(producto: Producto): Observable<any> {
    return this.http.put(`${this.URL_API}/${producto._id}`, producto);
  }


  // Método para eliminar un producto
  deleteProducto(_id: string): Observable<Producto> {
    return this.http.delete<Producto>(`${this.URL_API}/${_id}`);
  }
}

