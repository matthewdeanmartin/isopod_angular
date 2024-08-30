// import { Component } from '@angular/core';
//
// @Component({
//   selector: 'app-location',
//   standalone: true,
//   imports: [],
//   templateUrl: './location.component.html',
//   styleUrl: './location.component.scss'
// })
// export class LocationComponent {
//
// }
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameService } from '../game.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-location',
  standalone: true,
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {
  locationName: string='';

  constructor(private route: ActivatedRoute, private gameService: GameService) {}

  ngOnInit(): void {
    this.locationName = this.route.snapshot.paramMap.get('name')!;
  }

  collectItem(item: string) {
    this.gameService.addItemToInventory(item);
  }
}

