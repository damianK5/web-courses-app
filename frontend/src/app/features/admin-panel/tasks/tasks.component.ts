import { CommonModule, DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { HomeworkService } from '../../../core/service/homework.service';
import { Homework } from '../../../core/model/entities/homework';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-tasks',
  imports: [CommonModule, DatePipe],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss'
})
export class TasksComponent {
  private homeworkService = inject(HomeworkService);

  isLoading = true;
  homeworks: Homework[] = [];

  ngOnInit(): void {
    this.loadHomeworks();
  }

  loadHomeworks(): void {
    this.isLoading = true;

    this.homeworkService.getHomeworks().pipe(
      finalize(() => this.isLoading = false)
    ).subscribe({
      next: (homeworks) => this.homeworks = homeworks,
      error: (err) => {
        console.error('Error loading homeworks:', err);
      }
    });
  }

  deleteHomework(homework: Homework) {
    if (!confirm(`Czy na pewno chcesz usunąć ${homework.name}?`)) {
      return;
    }

    this.isLoading = true;

    this.homeworkService.deleteHomework(homework.id).subscribe({
      next: () => {
        this.isLoading = false;
        this.loadHomeworks(); // Update UI after deletion
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Failed to delete homework:', err);
      }
    });
  }
}
