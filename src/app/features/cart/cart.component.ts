import { Component, OnInit, inject } from '@angular/core';
import { ProductsService } from '../../shared/services/products.service';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';
import { Product } from '../../shared/types/product';
import { AsyncPipe } from '@angular/common';
import { CartService } from '../../shared/services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [ProductCardComponent, AsyncPipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  private readonly productsService = inject(ProductsService);
  private readonly cartService = inject(CartService);

  cart$ = this.cartService.cart$;

  ngOnInit(): void {
    this.cartService.getCart();
  }

  onDeleteProduct(id: string) {
    this.productsService.deleteFromCart(id);
  }
}
