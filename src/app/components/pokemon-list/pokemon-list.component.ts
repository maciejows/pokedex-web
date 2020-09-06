import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PokemonDataService } from '../../services/pokemon-data.service';
import { PokemonPageService } from '../../services/pokemon-page.service';
import { PokemonPage } from '../../models/PokemonPage';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {
  subscription: Subscription;
  // List of pokemons within single page
  singlePokemonPage: PokemonPage;
  // Number of pages
  pageServicePagesCounter: number;
  // Total number of pages of pokemons
  totalPages: number[] = [];
  // Array of page numbers (labeling purposes)
  pageArray: number[] = [];
  selectedPage = 1;
  selectedPokemon: string;

  constructor(
    private dataService: PokemonDataService,
    private pageService: PokemonPageService,
    private router: Router
  ) {
    // Subscription to pokemon route change
    this.subscription = this.dataService.pokemonContent$.subscribe((name) => {
      this.selectedPokemon = name;
    });
  }

  ngOnInit(): void {
    this.pageArray = this.pageService.fillPages(3);
    this.getInitPage();
  }

  // Get first page and set labels of pagination
  getInitPage(): void {
    this.singlePokemonPage = undefined;
    this.pageService.pokemonPages = {};
    this.pageService.resource = 'pokemon';

    if (this.pageService.pokemonPages[this.selectedPage]) {
      this.singlePokemonPage = this.pageService.getPageStatic(
        this.selectedPage
      );
    } else {
      this.pageService.getPage(this.selectedPage).subscribe((data) => {
        this.singlePokemonPage = data;
        const pages = Math.ceil(
          parseInt(this.singlePokemonPage.count) / this.pageService.limit
        );
        this.totalPages = this.pageService.fillPages(pages);
        this.pageArray = this.pageService.fillPages(3);
      });
    }
  }

  // Fetch data from server, if already fetched get static page from service
  getPageData(url?: string): void {
    if (this.pageService.pokemonPages[this.selectedPage]) {
      this.singlePokemonPage = this.pageService.getPageStatic(
        this.selectedPage
      );
    } else {
      this.pageService.getPage(this.selectedPage, url).subscribe((data) => {
        this.singlePokemonPage = data;
      });
    }
  }

  // Fetch filtered data from server
  getFilteredPages(name?: string, type?: string): void {
    // If filtering by name, go to specific pokemon
    if (name !== '') {
      this.router.navigate([`/pokemon/${name}`]);
    }
    // If filtering by type, get new list of pokemons by type and set pagination
    else if (type !== '') {
      this.pageService
        .getPage(this.selectedPage, '', type)
        .subscribe((data) => {
          this.selectedPage = 1;
          this.pageServicePagesCounter = Object.keys(
            this.pageService.pokemonPages
          ).length;
          this.singlePokemonPage = this.pageService.pokemonPages[
            this.selectedPage
          ];
          this.totalPages = this.pageService.fillPages(
            this.pageServicePagesCounter
          );
          if (this.pageServicePagesCounter < 3) {
            this.pageArray = this.pageService.fillPages(
              this.pageServicePagesCounter
            );
          } else {
            this.pageArray = this.pageService.fillPages(3);
          }
          // Navigate to first pokemon from new list
          this.router.navigate([
            `/pokemon/${this.singlePokemonPage.results[0].name}`
          ]);
        });
    }
    // If filters not set get initial page
    else {
      this.getInitPage();
    }
  }
  // Load pokemons for specific page, set pagination labels
  selectPage(page: number): void {
    if (page > 1 && page < this.totalPages.length) {
      this.pageArray[0] = page - 1;
      this.pageArray[1] = page;
      this.pageArray[2] = page + 1;
    }

    this.selectedPage = page;
    this.pageService.offset = this.pageService.limit * (page - 1);
    this.getPageData();
  }
  // Get previous page, set pagination labels
  previousPage(): void {
    if (this.singlePokemonPage.previous || this.selectedPage > 1) {
      if (this.selectedPage > 2 && this.selectedPage < this.totalPages.length) {
        for (let i = 0; i < this.pageArray.length; i++) {
          this.pageArray[i] -= 1;
        }
      }
      this.selectedPage--;
      this.pageService.offset -= this.pageService.limit;
      this.getPageData(this.singlePokemonPage.previous);
    }
  }
  // Get next page, set pagination labels
  nextPage(): void {
    if (
      this.singlePokemonPage.next ||
      this.selectedPage < this.pageServicePagesCounter
    ) {
      if (
        this.selectedPage >= 2 &&
        this.selectedPage < this.totalPages.length - 1
      ) {
        for (let i = 0; i < this.pageArray.length; i++) {
          this.pageArray[i] += 1;
        }
      }
      this.selectedPage++;
      this.pageService.offset += this.pageService.limit;
      this.getPageData(this.singlePokemonPage.next);
    }
  }
}
