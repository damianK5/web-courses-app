import { Component, inject, OnInit } from '@angular/core';
import { CourseService } from '../../core/service/course.service';
import { UserService } from '../../core/service/user.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Course } from '../../core/model/entities/course';
import { HomeworkService } from '../../core/service/homework.service';
import { Homework } from '../../core/model/entities/homework';
import { Asset } from '../../core/model/entities/asset';
import { AssetService } from '../../core/service/asset.service';

// Interface for combined items
interface CourseItem {
  id: number;
  name: string;
  description?: string;
  date: Date;
  type: 'homework' | 'asset';
  originalItem: Homework | Asset;
}

@Component({
  selector: 'app-course',
  imports: [CommonModule, RouterModule],
  templateUrl: './course.component.html',
  styleUrl: './course.component.scss'
})
export class CourseComponent implements OnInit {
  private courseService = inject(CourseService);
  private homeworkService = inject(HomeworkService);
  private route = inject(ActivatedRoute);
  private userService = inject(UserService);
  private assetService = inject(AssetService);
  id: string = "";
  isLoading = true;
  
  isStudent = this.userService.isStudent();
  isTeacher = this.userService.isTeacher();
  isAdmin = this.userService.isAdmin();

  course: Course | undefined;
  homeworks: Homework[] | undefined;
  assets: Asset[] | undefined;
  combinedItems: CourseItem[] = [];

  ngOnInit(): void {
    this.loadCourse();
  }

  private loadCourse(){
    const id = this.route.snapshot.paramMap.get('id');
    this.id = id!;
    this.courseService.getCoursesById(+id!).subscribe({
      next: (course) => {
        this.course = course;
        this.loadHomeworksAndAssets();
      }
    });
  }

  private loadHomeworksAndAssets() {
    let homeworksLoaded = false;
    let assetsLoaded = false;

    this.homeworkService.getHomeworksByCourse(+this.id).subscribe({
      next: (homeworks) => {
        this.homeworks = homeworks;
        homeworksLoaded = true;
        if (assetsLoaded) {
          this.combineCourseItems();
          this.isLoading = false;
        }
      }
    });

    this.assetService.getAssetsByCourse(+this.id).subscribe({
      next: (assets) => {
        this.assets = assets;
        assetsLoaded = true;
        if (homeworksLoaded) {
          this.combineCourseItems();
          this.isLoading = false;
        }
      }
    });
  }

  private combineCourseItems() {
    const items: CourseItem[] = [];

    if (this.homeworks) {
      this.homeworks.forEach(homework => {
        items.push({
          id: homework.id,
          name: homework.name,
          description: homework.description,
          date: new Date(homework.deadline), 
          type: 'homework',
          originalItem: homework
        });
      });
    }

    if (this.assets) {
      this.assets.forEach(asset => {
        items.push({
          id: asset.id,
          name: asset.name,
          description: asset.comment,
          date: new Date(asset.relevantDate), 
          type: 'asset',
          originalItem: asset
        });
      });
    }

    this.combinedItems = items.sort((a, b) => a.date.getTime() - b.date.getTime());
  }

  formatDate(date: Date): string {
    return date.toLocaleDateString('pl-PL', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  getItemLink(item: CourseItem): string[] {
    if (item.type === 'homework') {
      return this.isStudent 
        ? ['/homework', item.id.toString()] 
        : ['/homework', item.id.toString(), 'see-admissions'];
    } else {

      return ['/asset', item.id.toString()];
    }
  }

  isOverdue(item: CourseItem): boolean {
    if (item.type === 'homework') {
      return new Date() > item.date;
    }
    return false;
  }
}