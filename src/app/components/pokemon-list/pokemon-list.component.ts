import { Component, OnInit } from '@angular/core';
import { PokemonDataService } from '../../services/pokemon-data.service'
import { PokemonPage } from '../../models/PokemonPage';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {

  singlePokemonPage: PokemonPage;
  totalPages: number[] = [];
  pageArray: number[] = [];
  selectedPage: number = 1;
  constructor(private dataService: PokemonDataService) { }

  ngOnInit(): void {
    this.fillPages(3, this.pageArray);
    this.getInitPage();
  }

  fillPages(counter: number, array: number[]): void {
    for (let i=1; i<= counter; i++){
      array.push(i);
    }
  }

  // Get first page and set Pagination
  getInitPage(): void {
    if (this.dataService.pokemonPages[this.selectedPage]) {
      this.singlePokemonPage = this.dataService.getPageStatic(this.selectedPage);
    }
    else {
      this.dataService.getPage(this.selectedPage).subscribe(
        (data) => {
          this.singlePokemonPage = data
          let pages = Math.ceil(parseInt(this.singlePokemonPage.count) / this.dataService.limit);
          console.log(pages);
          this.fillPages(pages, this.totalPages);
          console.log(pages);
        }
      );
    }
  }

  // Fetch data from server, if already fetched get static page from service
  getData(url?: string): void {
    if (this.dataService.pokemonPages[this.selectedPage]) {
      this.singlePokemonPage = this.dataService.getPageStatic(this.selectedPage);
    }
    else {
      this.dataService.getPage(this.selectedPage, url).subscribe(
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
    this.dataService.offset = (this.dataService.limit * (page-1));
    this.getData();
  }

  previousPage(): void {
    if (this.singlePokemonPage.previous) {
      if(this.selectedPage > 2 && this.selectedPage < this.totalPages.length) {
        for (let i=0; i<this.pageArray.length; i++){
          this.pageArray[i] -=1;
        }
      }
      this.selectedPage--;
      this.dataService.offset -= this.dataService.limit;
      this.getData(this.singlePokemonPage.previous);
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
      this.dataService.offset += this.dataService.limit;
      this.getData(this.singlePokemonPage.next);
    }
  }

  selectPokemon(pokemon: string) {
    this.dataService.selectedPokemon = pokemon;
  }

  log(): void {
    console.log(this.pageArray[0]);
    console.log(this.pageArray[1]);
    console.log(this.pageArray[2]);
    console.log(this.selectedPage);
  }
}
