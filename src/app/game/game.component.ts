import { Component } from '@angular/core';
import { GameService } from '../game.service';
import {map, Observable} from 'rxjs';
import { CommonModule } from '@angular/common';

import { ActionsComponent } from '../actions/actions.component';
import { InventoryComponent } from '../inventory/inventory.component';
import {LocationComponent} from "../location/location.component";

@Component({
  selector: 'app-game',
  standalone: true,
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  // import app-actions and app-inventory components
  imports: [ActionsComponent, InventoryComponent, CommonModule, LocationComponent]
})
export class GameComponent {
  gameState$ = this.gameService.state$;
  inventory$ = this.gameService.state$.pipe(map(state => state.foundItems)); // Observable for inventory
  itemsAtCurrentLocation: string[] = []; // Items available at current location
  gameWon$: Observable<boolean> = this.gameService.isGameWon$;  // Observable for win state


  constructor(private gameService: GameService) {
    this.gameService.state$.subscribe(state => {
      this.itemsAtCurrentLocation = state.items[state.currentLocation] || [];
    });
  }

  goToLocation(location: string) {
    this.gameService.moveToLocation(location);
  }

  collectItem(item: string) {
    this.gameService.addItemToInventory(item);
  }
}
