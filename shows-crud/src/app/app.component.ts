import { Component, OnInit } from '@angular/core';
import { Show } from './models/show';
import { ShowService } from './services/show.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,  // Add this if you're using standalone components
  imports: [        // Add this if you're using standalone components
    CommonModule,
    ReactiveFormsModule
  ]
})
export class AppComponent implements OnInit {
  shows: Show[] = [];
  showForm: FormGroup;
  editMode = false;
  currentShowId: number | null = null;

  constructor(
    private showService: ShowService,
    private fb: FormBuilder
  ) {
    this.showForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      episodes: [0, [Validators.required, Validators.min(1)]]
    });
  }
  ngOnInit(): void {
    this.showService.getShows().subscribe(shows => {
      this.shows = shows;
    });
  }

  onSubmit(): void {
    if (this.showForm.valid) {
      if (this.editMode && this.currentShowId) {
        this.showService.updateShow({
          id: this.currentShowId,
          ...this.showForm.value
        });
      } else {
        this.showService.addShow(this.showForm.value);
      }
      this.showForm.reset();
      this.editMode = false;
      this.currentShowId = null;
    }
  }

  editShow(show: Show): void {
    this.editMode = true;
    this.currentShowId = show.id;
    this.showForm.patchValue({
      title: show.title,
      description: show.description,
      episodes: show.episodes
    });
  }

  deleteShow(id: number): void {
    this.showService.deleteShow(id);
  }
}