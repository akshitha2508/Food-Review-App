
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { HeaderComponent } from '../header/header.component';

interface Review {
  author: string;
  review: string;
  published_on: string;
}

interface FoodItem {
  id: number;
  name: string;
  cover: string;
  reviews: Review[];
  newReview?: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule,
    HeaderComponent  // Add HeaderComponent to imports
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  TrendingCombo: FoodItem[] = [];
  NonVegItems: FoodItem[] = [];
  VegItems: FoodItem[] = [];  // Add this line

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.getTrendingCombo();
    this.getNonVegItems();
    this.getVegItems();  // Add this line
  }

  // Add this method
  getVegItems() {
    this.http.get<FoodItem[]>('assets/data/Veg.json').subscribe({
      next: (items) => {
        this.VegItems = items;
      },
      error: (error) => {
        console.error('Error loading Veg items:', error);
      }
    });
  }

  getNonVegItems() {
    this.http.get<FoodItem[]>('assets/data/Non-veg.json').subscribe({
      next: (items) => {
        this.NonVegItems = items;
      },
      error: (error) => {
        console.error('Error loading Non-veg items:', error);
      }
    });
  }

  getTrendingCombo() {
    this.http.get<FoodItem[]>('assets/data/trending-combo.json').subscribe({
      next: (food) => {
        this.TrendingCombo = food;
      },
      error: (error) => {
        console.error('Error loading Trending Combo:', error);
      }
    });
  }

  addReview(food: FoodItem) {
    if (!food.newReview?.trim()) return;

    const newReview: Review = {
      author: 'User', // You can get this from your auth service
      review: food.newReview,
      published_on: new Date().toISOString()
    };

    if (!food.reviews) {
      food.reviews = [];
    }
    
    food.reviews.push(newReview);
    food.newReview = ''; // Clear the input
  }

  goToFood(type: string, id: string) {
    this.router.navigate(['food', type, id]);
  }

  handleImageError(event: any) {
    event.target.src = 'assets/images/placeholder.jpg';
  }
}
  



  


