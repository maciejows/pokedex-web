import { Component, OnInit } from '@angular/core';
import { PokemonDataService } from '../../services/pokemon-data.service'
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pokedex-display',
  templateUrl: './pokedex-display.component.html',
  styleUrls: ['./pokedex-display.component.scss']
})
export class PokedexDisplayComponent implements OnInit {

  id: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private location: Location
    ) { }

  ngOnInit(): void {
    // Preserve wrong type
    this.id = +this.activatedRoute.snapshot.paramMap.get('id');
  }

  goBack(): void {
    this.location.back();
  }

}
