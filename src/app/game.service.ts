import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

export interface GameState {
  currentLocation: string;
  foundItems: string[];
  locations: { [key: string]: string[] }; // key: location, value: adjacent locations
  items: { [key: string]: string[] }; // key: location, value: items available at that location
}

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private requiredItems = ['Cookie Crumb', 'Place to Hide', 'Isopod Friend'];

  private initialState: GameState = {
    currentLocation: 'Forest',
    foundItems: [],
    locations: {
      'Forest': ['Cave', 'River'],
      'Cave': ['Forest', 'Mountain'],
      'River': ['Forest', 'Beach'],
      'Mountain': ['Cave'],
      'Beach': ['River']
    },
    items: {
      'Forest': ['Cookie Crumb'],
      'Cave': ['Place to Hide'],
      'River': [],
      'Mountain': ['Isopod Friend'],
      'Beach': []
    }
  };

  private gameState$ = new BehaviorSubject<GameState>(this.initialState);
  private gameWon$ = new BehaviorSubject<boolean>(false);  // Observable to track win state

  get isGameWon$() {
    return this.gameWon$.asObservable();
  }

  get state$() {
    return this.gameState$.asObservable();
  }

  moveToLocation(location: string) {
    const state = this.gameState$.getValue();
    if (state.locations[state.currentLocation].includes(location)) {
      this.gameState$.next({...state, currentLocation: location});
    }
  }

  addItemToInventory(item: string) {
    const state = this.gameState$.getValue();
    const currentLocationItems = state.items[state.currentLocation];

    // Check if the item is in the current location and not already found
    if (currentLocationItems.includes(item) && !state.foundItems.includes(item)) {
      // Remove the item from the location's items list after picking it up
      const updatedLocationItems = currentLocationItems.filter(i => i !== item);

      // Update the state with the new item in inventory and removed from location
      this.gameState$.next({
        ...state,
        foundItems: [...state.foundItems, item],
        items: {...state.items, [state.currentLocation]: updatedLocationItems}
      });
    }

    // Check for the win condition after adding an item
    this.checkWinCondition();
  }

  private checkWinCondition() {
    const state = this.gameState$.getValue();
    const hasWon = this.requiredItems.every(item => state.foundItems.includes(item));
    if (hasWon) {
      this.gameWon$.next(true);  // Update the win state to true
    }
  }
}
