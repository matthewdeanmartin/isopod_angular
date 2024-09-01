import { Component } from '@angular/core';
import {GameService, GameState} from '../game.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-actions',
  standalone: true,
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss'],
  imports: [CommonModule]
})
export class ActionsComponent {
  gameState$: Observable<GameState>;
  itemsAtCurrentLocation: string[] = []; // Items available at current location

  constructor(private gameService: GameService) {
    this.gameState$ = this.gameService.state$;
    this.gameService.state$.subscribe(state => {
      this.itemsAtCurrentLocation = state.items[state.currentLocation] || [];
    });
  }

  moveTo(location: string) {
    this.gameService.moveToLocation(location);
  }

  collectItem(item: string) {
    this.gameService.addItemToInventory(item);
  }
}
