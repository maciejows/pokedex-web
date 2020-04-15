import { Component, OnInit } from '@angular/core';
import { PokemonDataService } from '../../services/pokemon-data.service'
import { PokemonPageService } from '../../services/pokemon-page.service'
import { PokemonPage } from '../../models/PokemonPage';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {
  subscription: Subscription;
  singlePokemonPage: PokemonPage;
  totalPages: number[] = [];
  pageArray: number[] = [];
  selectedPage: number = 1;
  selectedPokemon: string;

  constructor(
    private dataService: PokemonDataService,
    private pageService: PokemonPageService) {
      this.subscription = this.dataService.pokemonContent$.subscribe((name) => {
        this.selectedPokemon = name;
      });
    }

  ngOnInit(): void {
    this.pageArray = this.pageService.fillPages(3);
    this.getInitPage();
  }

  // Get first page and set Pagination
  getInitPage(): void {
    if (this.pageService.pokemonPages[this.selectedPage]) {
      this.singlePokemonPage = this.pageService.getPageStatic(this.selectedPage);
    }
    else {
      this.pageService.getPage(this.selectedPage).subscribe(
        (data) => {
          this.singlePokemonPage = data
          let pages = Math.ceil(parseInt(this.singlePokemonPage.count) / this.pageService.limit);
          this.totalPages = this.pageService.fillPages(pages);
        }
      );
    }
  }

  // Fetch data from server, if already fetched get static page from service
  getPageData(url?: string): void {
    if (this.pageService.pokemonPages[this.selectedPage]) {
      this.singlePokemonPage = this.pageService.getPageStatic(this.selectedPage);
    }
    else {
      this.pageService.getPage(this.selectedPage, url).subscribe(
        (data) => {
          this.singlePokemonPage = data
        }
      );
    }
  }

  selectPage(page: number): void{
    if(page > 1 && page < this.totalPages.length){
      this.pageArray[0] = page-1;
      this.pageArray[1] = page;
      this.pageArray[2] = page+1;
    }
    this.selectedPage = page;
    this.pageService.offset = (this.pageService.limit * (page-1));
    this.getPageData();
  }

  previousPage(): void {
    if (this.singlePokemonPage.previous) {
      if(this.selectedPage > 2 && this.selectedPage < this.totalPages.length) {
        for (let i=0; i<this.pageArray.length; i++){
          this.pageArray[i] -=1;
        }
      }
      this.selectedPage--;
      this.pageService.offset -= this.pageService.limit;
      this.getPageData(this.singlePokemonPage.previous);
    }
  }

  nextPage(): void {
    if(this.singlePokemonPage.next) {
      if(this.selectedPage >= 2 && this.selectedPage < this.totalPages.length-1) {
        for (let i=0; i<this.pageArray.length; i++){
          this.pageArray[i] +=1;
        }
      }
      this.selectedPage++;
      this.pageService.offset += this.pageService.limit;
      this.getPageData(this.singlePokemonPage.next);
    }
  }

  log(): void {
    console.log(this.pageArray[0]);
    console.log(this.pageArray[1]);
    console.log(this.pageArray[2]);
    console.log(this.selectedPage);
  }
}
