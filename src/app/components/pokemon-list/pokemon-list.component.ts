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

  constructor(private dataService: PokemonDataService) { }

  ngOnInit(): void {
    this.dataService.getPage().subscribe(
      (data) => {
        this.singlePokemonPage = data
        let pages = Math.ceil(parseInt(this.singlePokemonPage.count) / this.dataService.limit);
        this.fillPages(pages);
      }
    );
  }

  fillPages(counter: number): void {
    for (let i=1; i<= counter; i++){
       this.pageArray.push(i);
    }
  }

  selectPage(page: number): void{
    this.selectedPage = page;
    this.dataService.offset = (this.dataService.limit * (page-1));
    this.dataService.getPage().subscribe(
      (data) => {
        this.singlePokemonPage = data
      }
    );
  }
  previousPage(): void {
    if (this.selectedPage > 1) {
      this.selectedPage--;
      this.dataService.offset -= this.dataService.limit;
      this.dataService.getPage().subscribe(
        (data) => {
          this.singlePokemonPage = data
        }
      );
    }
  }

  nextPage(): void {
    if(this.selectedPage < this.pageArray.length) {
      this.selectedPage++;
      this.dataService.offset += this.dataService.limit;
      this.dataService.getPage().subscribe(
        (data) => {
          this.singlePokemonPage = data
        }
      );
    }
  }

  log(): void {
    console.log(this.singlePokemonPage);
    console.log(this.pageArray);
  }
}
