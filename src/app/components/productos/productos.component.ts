import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../services/producto.service';
import { NgForm } from '@angular/forms';
import { Producto } from '../../models/producto';

declare var M: any;

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css'],
  providers: [ProductoService]
})
export class ProductosComponent implements OnInit {
  productos: Producto[] = [];

  constructor(public productoService: ProductoService) {}

  ngOnInit(): void {
    this.obtenerProductos(); // Cargar todos los productos al iniciar el componente
  }

  guardarOActualizarProducto(form?: NgForm) {
    if (this.productoService.selectedProducto._id) {
      console.log("Producto con ID encontrado, se procede a actualizar:", this.productoService.selectedProducto._id);
      this.actualizarProducto(form);
    } else {
      console.log("Producto sin ID, se procede a agregar uno nuevo");
      this.agregarProducto(form);
    }
  }


  obtenerProductos() {
    this.productoService.getProducto().subscribe((res: Producto[]) => {
      this.productos = res; // Asignar la lista de productos
    });
  }

  agregarProducto(form?: NgForm) {
    this.productoService.postProducto(form?.value).subscribe(
      (res) => {
        this.resetForm(form);
        M.toast({ html: 'Guardado satisfactoriamente' });
        this.obtenerProductos(); // Actualizar la lista después de agregar
      },
      (error) => {
        if (error.status === 400 && error.error.message) {
          M.toast({ html: error.error.message }); // Mostrar el mensaje de error del backend
        } else {
          M.toast({ html: 'Error al guardar el producto' });
        }
      }
    );
  }


  mostrarProducto(producto: Producto) {
    this.productoService.selectedProducto = { ...producto };
    M.updateTextFields(); // Llamada a Materialize para actualizar los campos de texto
  }

  actualizarProducto(form?: NgForm) {
    if (form && form.value._id) { // Verificar que el producto tenga un ID válido
      this.productoService.putProducto(form.value).subscribe(
        (res) => {
          M.toast({ html: 'Producto actualizado satisfactoriamente' });
          this.resetForm(form); // Limpia el formulario después de actualizar
          this.obtenerProductos(); // Recargar lista de productos después de actualizar
        },
        (error) => {
          console.error('Error al actualizar el producto:', error);
          M.toast({ html: 'Error al actualizar el producto' });
        }
      );
    } else {
      M.toast({ html: 'Producto no tiene un ID válido' });
    }
  }


  eliminarProducto(id: string) {
    if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      this.productoService.deleteProducto(id).subscribe((res) => {
        M.toast({ html: 'Producto eliminado satisfactoriamente' });
        this.obtenerProductos(); // Actualizar la lista después de eliminar
      });
    }
  }

  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
      this.productoService.selectedProducto = {
        _id: '',
        producto: '',
        descripcion: '',
        ubicacionStock: '',
        stock: 0,
      };
    }
  }
}
