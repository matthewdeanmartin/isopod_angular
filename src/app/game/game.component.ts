import { Component } from '@angular/core';
import { GameService } from '../game.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

import { ActionsComponent } from '../actions/actions.component';
import { InventoryComponent } from '../inventory/inventory.component';

@Component({
  selector: 'app-game',
  standalone: true,
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  // import app-actions and app-inventory components
  imports: [ActionsComponent, InventoryComponent, CommonModule]
})
export class GameComponent {
  gameState$ = this.gameService.state$;

  constructor(private gameService: GameService) {}

  goToLocation(location: string) {
    this.gameService.moveToLocation(location);
  }
}
