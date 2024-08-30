// import { Component } from '@angular/core';
//
// @Component({
//   selector: 'app-inventory',
//   standalone: true,
//   imports: [],
//   templateUrl: './inventory.component.html',
//   styleUrl: './inventory.component.scss'
// })
// export class InventoryComponent {
//
// }
import { Component } from '@angular/core';
import { GameService } from '../game.service';
import {map} from "rxjs";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-inventory',
  standalone: true,
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss'],
  imports: [CommonModule]
})
export class InventoryComponent {
  inventory$ = this.gameService.state$.pipe(
    map(state => state.foundItems)
  );

  constructor(private gameService: GameService) {}
}

