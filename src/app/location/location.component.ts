import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameService } from '../game.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-location',
  standalone: true,
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss'],
  imports: [CommonModule]
})
export class LocationComponent implements OnInit {
  locationName: string='';
  itemsAtLocation: string[] = [];

  constructor(private route: ActivatedRoute, private gameService: GameService) {}

  ngOnInit(): void {
    this.locationName = this.route.snapshot.paramMap.get('name')!;
  }

  collectItem(item: string) {
    this.gameService.addItemToInventory(item);
  }
}

