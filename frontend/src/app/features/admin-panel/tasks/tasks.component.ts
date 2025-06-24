import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { HomeworkService } from '../../../core/service/homework.service';
import { Homework } from '../../../core/model/entities/homework';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-tasks',
  imports: [CommonModule],
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
        console.error('Error loading users:', err);
      }
    });
  }

  deleteHomework(homework: Homework) {
    console.log(homework.id);
  }
}
