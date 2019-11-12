import { Component, OnInit } from "@angular/core";
import { FormGroup, FormArray, FormBuilder } from "@angular/forms";
import { FieldConfig } from "../../field.interface";
@Component({
  selector: "app-file",
  template: `
  <div class="demo-full-width margin-top" [formGroup]="group">
    <div formArrayName="images">
      <div *ngFor="let language of group.controls['images'].controls; let i=index" class="panel panel-default">
        <span>{{field.label}} {{i + 1}}</span><br/>
        <input #file name="{{field.name}}{{i + 1}}" placeholder="{{field.label}}{{i + 1}}" type="{{field.type}}" accept='image/*' (change)="preview(file.files,i)" />
        <img id="imgSrc{{i+1}}" [src]="imgURL" style="display: block;padding: 10px;width: 200px;height: 120px" *ngIf="imgURL">
        <span class="glyphicon glyphicon-remove pull-right" *ngIf="group.controls['images'].controls.length > 1 && i > 0" (click)="deleleteImage(i)">Remove</span>
      </div>
    </div>
    <div class="margin-20">
      <a (click)="addImages()" style="cursor: default">Add +</a>
    </div>
  </div>
`,
  styles: []
})
export class FileComponent implements OnInit {

  field: FieldConfig;
  group: FormGroup;
  constructor(private fb: FormBuilder) {}
  ngOnInit() {
    this.imgURL = "http://placehold.it/150x100?text=Image 1";
    this.group = this.fb.group({
      FrontEnd: ['',],
      images: this.fb.array([
          this.initimages(),
      ])
  });
  };

  public imagePath;
  imgURL: any;
  public message: string;
 
  preview(files, i: number) {
    if (files.length === 0)
      return;
 
    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }
 
    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]); 
    reader.onload = (_event) => { console.log(_event);
      this.imgURL = reader.result; 
    }
  }

  addImages() {
    //this.imgURL = '';
    const control = <FormArray>this.group.controls['images'];
    control.push(this.initimages());
}

deleleteImage(index: number): void {
  const control = <FormArray>this.group.controls['images'];
  control.removeAt(index);
}

initimages() {
  return this.fb.group({
      
  });
}
}
