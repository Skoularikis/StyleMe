import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ImageService } from '../image.service';
import { Image } from '../image.model';

@Component({
  selector: 'app-add-file',
  template: `
  <div class="notgetover">
  <div class="col-md-4 col-md-offset-4">
  <div class="thumbnail">
      <h4> Upload your image </h4>
   <form [formGroup]="myForm" (ngSubmit)="onSubmit()">
        <div class="form-group">

          <input type="text" id="text" class="form-control" formControlName="desc" placeholder="Put a description for your photo">
        </div>
        <button class="btn btn-primary"
                type="submit"
                [disabled]="!myForm.valid">Submit</button>
      </form>
      <hr>
    <input type="file" placeholder="Upload file" multiple (change)="fileChange(input)" #input />

  </div>

    </div>
        </div>

  `,
  styles: [`
    .notgetover {
      margin-top: 2em;
    }
    hr {
    display: block;
    height: 0.5px;
    border: 0;
    border-top: 1px solid #ccc;
    margin: 0.4em 0;
    padding: 0;
    }


  `]


})

export class AddFileComponent implements OnInit {
  images: Image[];
  image = new Image('go','go','go','go','go',1,'go',null,null);
    myForm: FormGroup;

  constructor(private imageService: ImageService) {}

  onSubmit() {
    console.log(this.myForm)
    this.image.desc=this.myForm.value.desc;
    console.log(this.image.desc);
    this.myForm.reset();
  }

  ngOnInit() {
    this.myForm = new FormGroup({
      desc: new FormControl(null, Validators.required)
    });
  }

  fileChange(input): void {
    this.readFiles(input.files);
  }


  readFile(file: File, reader: FileReader, callback): void {
    reader.onload = () => {
      callback(reader.result);
    }
    reader.readAsDataURL(file);
  }

  readFiles(files: FileList, index=0): void {
    let reader = new FileReader();

    if (index in files) {
      this.readFile(files[index], reader, (result) => {
        this.image.content = result;

        console.log(this.image.desc)
        this.imageService.addImage(this.image)
        .subscribe(
          data => console.log(data),
          error => console.log(error)
          );
        this.readFiles(files, index+1);
      });
    }

}


}
