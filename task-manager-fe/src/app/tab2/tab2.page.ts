import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false,
})
export class Tab2Page {
  addTask!: FormGroup;

  get title(){return this.addTask.get('title')}
  get description(){return this.addTask.get('description')}
  get category(){return this.addTask.get('category')}
  get dueDate(){return this.addTask.get('dueDate')}

  constructor(private fb: FormBuilder) {
    this.addTask = this.fb.group({
      title: [''],
      description: [''],
      category: [''],
      dueDate: [''],
      priority: [''],
      progress: ['']
    });
  }

  closeForm(){}
  onSubmit(){}

}
