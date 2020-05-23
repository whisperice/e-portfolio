import { Injectable, Component} from '@angular/core';
import { ModalIntroductionComponent } from 'src/app/cv-form/modal-introduction/modal-introduction.component';
import { of } from 'rxjs';
import { ModalEducationComponent } from 'src/app/cv-form/modal-education/modal-education.component';
import { ModalAboutComponent } from 'src/app/cv-form/modal-about/modal-about.component';
import { ModalFeatureComponent } from 'src/app/cv-form/modal-feature/modal-feature.component';
import { ModalWorkExperienceComponent } from 'src/app/cv-form/modal-work-experience/modal-work-experience.component';
import { ModalLicenseCertificationComponent } from 'src/app/cv-form/modal-license-certification/modal-license-certification.component';
import { ModalVolunteerExperienceComponent } from 'src/app/cv-form/modal-volunteer-experience/modal-volunteer-experience.component';
import { ModalSkillComponent } from 'src/app/cv-form/modal-skill/modal-skill.component';
import { ModalProjectComponent } from 'src/app/cv-form/modal-project/modal-project.component';
import { ModalHonourAwardComponent } from 'src/app/cv-form/modal-honour-award/modal-honour-award.component';
import { ModalPublicationComponent } from 'src/app/cv-form/modal-publication/modal-publication.component';
import { ModalLanguageComponent } from 'src/app/cv-form/modal-language/modal-language.component';
import { ModalRecommendationComponent } from 'src/app/cv-form/modal-recommendation/modal-recommendation.component';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(
    private ngbModalService: NgbModal,) {
  }

  lists: Record<string, string> = {
    "introduction": "Introduction",
    "about": "About",
    "feature": "Feature",
    "workexperience": "Work Experience",
    "education": "Education",
    "licensecertification": "License Certification",
    "volunteerexperience": "Volunteer Experience",
    "skill": "Skill",
    "project": "Project",
    "honouraward": "Honour Award",
    "publication": "Publication",
    "language": "Language",
    "recommendation": "Recommendation"
  }

  modals: Record<string, any> = {
    "introduction": ModalIntroductionComponent,
    "about": ModalAboutComponent,
    "feature": ModalFeatureComponent,
    "workexperience": ModalWorkExperienceComponent,
    "education": ModalEducationComponent,
    "licensecertification": ModalLicenseCertificationComponent,
    "volunteerexperience": ModalVolunteerExperienceComponent,
    "skill": ModalSkillComponent,
    "project": ModalProjectComponent,
    "honouraward": ModalHonourAwardComponent,
    "publication": ModalPublicationComponent,
    "language": ModalLanguageComponent,
    "recommendation": ModalRecommendationComponent
  };

  getModal(key: string) {
    return of(this.modals[key])
  }

  getTitle(key: string) {
    return this.lists[key]
  }

  getLists() {
    return this.lists
  }

  getKeys() {
    return Object.keys(this.lists) as Array<string>
  }

  closeResult = '';

  openModal<T>(classname: string, item: T | null, isNew: boolean) {
    var modalComp: Component;
    this.getModal(classname).subscribe(res => {
      modalComp = res;
    })
    this.ngbModalService.dismissAll;
    var modalRef = this.ngbModalService.open(modalComp, {backdrop: 'static', size: 'lg'})
    modalRef.componentInstance.classname = classname
    modalRef.componentInstance.title = this.getTitle(classname)
    modalRef.componentInstance.isNew = isNew
    if (!isNew) {
        modalRef.componentInstance.model = item as T
    }
    modalRef.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  
}