import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface GameState {
  currentLocation: string;
  foundItems: string[];
  locations: { [key: string]: string[] }; // key: location, value: adjacent locations
}

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private initialState: GameState = {
    currentLocation: 'Forest',
    foundItems: [],
    locations: {
      'Forest': ['Cave', 'River'],
      'Cave': ['Forest', 'Mountain'],
      'River': ['Forest', 'Beach'],
      'Mountain': ['Cave'],
      'Beach': ['River']
    }
  };

  private gameState$ = new BehaviorSubject<GameState>(this.initialState);

  get state$() {
    return this.gameState$.asObservable();
  }

  moveToLocation(location: string) {
    const state = this.gameState$.getValue();
    if (state.locations[state.currentLocation].includes(location)) {
      this.gameState$.next({ ...state, currentLocation: location });
    }
  }

  addItemToInventory(item: string) {
    const state = this.gameState$.getValue();
    if (!state.foundItems.includes(item)) {
      this.gameState$.next({ ...state, foundItems: [...state.foundItems, item] });
    }
  }
}
