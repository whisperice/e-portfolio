import { Component, OnInit } from '@angular/core';
import { UniqueApiService } from "../core/services/unique-api.service";
import { userID, refreshJwt } from "../../global";
import * as globals from "../../global";
import { ModalService } from '../core/services/modal.service';
import { Cv } from '../core/models/cv.model';
import { AlertService } from '../core/services/alert.service';
import { NzMessageService } from 'ng-zorro-antd';
import {Router} from "@angular/router";

@Component({
  selector: 'app-cv',
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.css']
})
export class CvComponent implements OnInit{

  cvForms: Cv;
  cvItems: Array<string> = this.modalService.getKeys();
  avartarUrl: string = "../../assets/untitled.png"

  parentMessage: string;

  constructor(
    public modalService: ModalService,
    private apiService: UniqueApiService,
    private alertService: AlertService,
    private pop: NzMessageService,
    private router: Router
  ) {
      this.alertService.messageSuObserve.subscribe((res: string) => {
        this.refresh(true, res);
      })
      this.alertService.messageErObserve.subscribe((res: string) => {
        this.refresh(false, res);
      })
      this.alertService.messageObserve.subscribe((res: string) => {
        this.ngOnInit();
      })
   };

  ngOnInit(): void {
    if(globals.username == 'admin' && globals.userID == 1){
      this.router.navigate(['/my_account'])
    }
    refreshJwt();
    this.getCv();
  }

  refresh(isSuccess: boolean, msg: string): void {
    if (isSuccess && msg) {
      this.pop.success(msg, {nzDuration: 2000});
    } else {
      // this.pop.error(msg, {nzDuration: 2000});
    }
    this.ngOnInit();
  }

  getCv(): void {
    this.apiService.get(userID, "cv")
      .subscribe((result: Cv) => {
        this.cvForms = result;
        this.setAvartar();
        console.log("Cv get response:", JSON.stringify(result));
        },
        (err)=>{
          if (err.message) {
            this.alertService.error(err.message)
          }
        })
  }

  editForm(className: string): void {
    this.modalService.openModal(className, true);
  }

  setAvartar(): void {
    if (this.cvForms.introduction.profilePhoto) {
      this.avartarUrl = this.cvForms.introduction.profilePhoto;
    }
  }

}
