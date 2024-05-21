import { Component, OnInit } from '@angular/core';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';
import { FormsModule } from '@angular/forms';
import { ProductsFilterPipe } from '../../shared/pipes/products-filter.pipe';
import { ProductsService } from '../../shared/services/products.service';
import { Product } from '../../shared/types/product';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductCardComponent, FormsModule, ProductsFilterPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  filterKey = '';
  products: Product[] = [];

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.productsService.products$.subscribe((products) => {
      this.products = products;
    });
  }

  onAddToCart(id: string) {
    this.productsService.addToCart(id);
  }
}
