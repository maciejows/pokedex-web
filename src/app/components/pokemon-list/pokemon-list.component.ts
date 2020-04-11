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
  pageArray: number[] = [];
  selectedPage: number = 1;
  window: Window;
  constructor(private dataService: PokemonDataService) { }

  ngOnInit(): void {
    this.getInitPage();
  }

  fillPages(counter: number): void {
    for (let i=1; i<= counter; i++){
       this.pageArray.push(i);
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
          this.fillPages(pages);
        }
      );
    }
  }

  // Fetch data from server, if already fetched get static page from service
  getData(): void {
    if (this.dataService.pokemonPages[this.selectedPage]) {
      this.singlePokemonPage = this.dataService.getPageStatic(this.selectedPage);
    }
    else {
      this.dataService.getPage(this.selectedPage).subscribe(
        (data) => {
          this.singlePokemonPage = data
        }
      );
    }
  }

  selectPage(page: number): void{
    this.selectedPage = page;
    this.dataService.offset = (this.dataService.limit * (page-1));
    this.getData();
  }

  previousPage(): void {
    if (this.selectedPage > 1) {
      this.selectedPage--;
      this.dataService.offset -= this.dataService.limit;
      this.getData();
    }
  }

  nextPage(): void {
    if(this.selectedPage < this.pageArray.length) {
      this.selectedPage++;
      this.dataService.offset += this.dataService.limit;
      this.getData();
    }
  }

  selectPokemon(pokemon: string) {
    this.dataService.selectedPokemon = pokemon;
  }

  log(): void {
    console.log(this.singlePokemonPage);
    console.log(this.pageArray);
    console.log(this.dataService.pokemonPages);
  }
}
