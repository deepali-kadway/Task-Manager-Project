import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Capacitor } from '@capacitor/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false,
})
export class Tab2Page {
  addTask!: FormGroup;
  attachedImages: string[] = []; // Array to store attached images

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

  async takePicture(){
    try {
      // Check if we're running on web during development
      if (Capacitor.getPlatform() === 'web') {
        // getPlatform() can return androin, ios or web
        this.selectFileForWeb();
        return;
      }

      // Using Capacitor Camera for mobile devices
      const image = await Camera.getPhoto({
        quality: 90, //compression rate
        allowEditing: true, // user can crop or edit the image before sending
        resultType: CameraResultType.Uri, // returns file URI(path) used to display or upload the image
        source: CameraSource.Prompt   // This automatically shows: On Mobile: "Camera" or "Photo Library" options
      });
      
      if (image.webPath) {
        // Add the image to the attachments array
        this.attachedImages.push(image.webPath);
        console.log('Image attached:', image.webPath);
        console.log('Total attachments:', this.attachedImages.length);
      }
    } catch (error) {
      console.log('Error taking picture:', error);
      // Handle error if user cancelled, no permission, etc.
    }
  }

  // For web development
  selectFileForWeb() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.multiple = false;
    
    input.onchange = (event: any) => {
      const file = event.target.files[0]; // get the first file user selected
      if (file) {
        const reader = new FileReader(); // create fileReader object to read file contents stored on users computer
        reader.onload = (e: any) => { // function to run when file is finished loading
          const imageUrl = e.target.result;   // contains the image as a base64-encoded data URL. This format can be used directly as the src for an <img> tag to display the image in your app.
          this.attachedImages.push(imageUrl);
          console.log('Image attached (web):', imageUrl.substring(0, 50) + '...');
          console.log('Total attachments:', this.attachedImages.length);
        };
        reader.readAsDataURL(file); // converts the file to base64 data url to display it as an image
      }
    };
    
    input.click();  // open file picker dialog for user
  }
}
