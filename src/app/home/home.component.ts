import { Component,ViewChild } from '@angular/core';
import {ActivatedRoute,Router}  from '@angular/router';
import { MatDialog } from '@angular/material';
  import { AngularFireAuth } from 'angularfire2/auth';
  import { Observable } from 'rxjs/Observable';
  import * as firebase from 'firebase/app';
import { AuthService } from '../providers/auth.service.ts.service';
import { NgxImageGalleryComponent, GALLERY_IMAGE, GALLERY_CONF } from "ngx-image-gallery";
import {sequence, trigger, stagger, animate, style, group, query, transition, keyframes, animateChild} from '@angular/animations';
import { LoginDialog } from '../login/login-dialog';

@Component({
    moduleId: module.id,
    selector: 'home',
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.scss'],
    animations: [
      trigger('explainerAnim', [
        transition('* => *', [
       
          query('.nav-item', style({ opacity: 0, transform: 'translateX(-40px)' })),
  
          query('.nav-item', stagger('500ms', [
            animate('800ms  ease-out', style({ opacity: 1, transform: 'translateX(0)' })),
          ])),
  
          query('.nav-item', [
            animate(1000, style('*'))
          ]),
         
        
        ])
      ]),

      trigger('titleAnimation', [
        transition('* => *', [
            style({
                transform: 'translateX(-50%)',
                opacity: 1
            }),
            animate('1s ease-in', keyframes([
              style({opacity: 0, transform: 'translateX(-70%)', offset: 0}),
              style({opacity: .5, transform: 'translateX(-40%)',  offset: 0.5}),
            
              style({opacity: 1, transform: 'translateX(0)',     offset: 1.0}),
            ]))
        ]),
       
    ]) ,
    trigger('buttonAnimation', [
      transition('* => *', [
          style({
              transform: 'translateY(80%)',
              opacity: 1
          }),
          animate('1s ease-in', keyframes([
            style({opacity: 0, transform: 'translateY(90%)', offset: 0}),
            style({opacity: .5, transform: 'translateY(-40%)',  offset: 0.5}),
          
            style({opacity: 1, transform: 'translateY(0)',     offset: 1.0}),
          ]))
      ]),
     
  ]) ,
    
        trigger('menuItemAnimation', [
          
          transition('void => *', [
            style({width: '0%'}),
            animate('4000ms', keyframes([
                style({width: '10%',        offset: 0}),
                style({width: '30%',    offset: 0.33}),
                style({width: '60%',  offset: 0.66}),
                style({width: '100%',                offset: 1.0})
              ])
          )
        ])
      ])
    ]
    
})
export class HomeComponent {
  @ViewChild(NgxImageGalleryComponent) ngxImageGallery: NgxImageGalleryComponent;
    user: Observable<firebase.User>;
    templateMappings: { [index: number]: String } = {0:'templates/template1',
  1:'templates/template2',2:'templates/template3',3:'templates/template4',4:'templates/template5',
  5:'templates/template6'
  };

     userDetails: firebase.User = null;
     conf: GALLERY_CONF = {
      // imageOffset: '0px',
       showDeleteControl: false,
       showImageTitle: true,
      
     };
     
     // gallery images
     images: GALLERY_IMAGE[] = [
       {
         url: "assets/img/templates/template1.png", 
         altText: 'Select this template for your resume', 
         title: 'Select this template for your resume',
         thumbnailUrl: "assets/img/templates/template1.png"
       },
       {
         url: "assets/img/templates/template2.png", 
         altText: 'Select this template for your resume', 
         title: 'Select this template for your resume',
         thumbnailUrl: "assets/img/templates/template2.png"
       },
       {
         url: "assets/img/templates/template3.png", 
         altText: 'Select this template for your resume', 
         title: 'Select this template for your resume',
         thumbnailUrl: "assets/img/templates/template3.png"
       },
       {
         url: "assets/img/templates/template4.png", 
         altText: 'Select this template for your resume', 
         title: 'Select this template for your resume',
         thumbnailUrl: "assets/img/templates/template4.png"
       },
       {
         url: "assets/img/templates/template5.png", 
         altText: 'Select this template for your resume', 
         title: 'Select this template for your resume',
         thumbnailUrl: "assets/img/templates/template5.png"
       }
       ,
       {
         url: "assets/img/templates/template6.png", 
         altText: 'Select this template for your resume', 
         title: 'Select this template for your resume',
         thumbnailUrl: "assets/img/templates/template6.png"
       }
     ];
    state="in";
    menuItems = [
        {
          name: 'Templates',
          icon:'collections'
          
        },
        {
          name: 'About',
          icon:'present_to_all'
        
        },
        
        {
          name: 'Learn More',
          icon:'speaker_notes'
        
        },
        {
            name: 'Contact',
          icon:'contact_mail'
          }
      ];
     
    constructor( public dialog: MatDialog,private route: ActivatedRoute,
        private router: Router,afAuth: AngularFireAuth,private authService:AuthService) {
            this.user = afAuth.authState;
            
             this.user.subscribe(
                     (user) => {
                       if (user) {
                         this.userDetails = user;
                        
                        
                       }
                       else {
                         this.userDetails = null;
                       }
                     }
                   );
           
        }
    onNavClick(pathtoNavigate:string){
       // this.router.navigate([pathtoNavigate]);
       this.openGallery();
    }

    login(){
       // this.authService.loginWithGoogle();

       this.openLoginDialog();

       
    }

    openLoginDialog(): void {
      let dialogRef = this.dialog.open(LoginDialog, {
        width: '550px',
       
      });
  
      dialogRef.afterClosed().subscribe(result => {
  
  
      });
    }
  
    openMySavedWork(){
        this.router.navigate(['/templates/mywork']);
    }
    logout(){
        this.authService.logout();
    }
    ngAfterViewInit(){
     
    }
    
     
    openGallery(index: number = 0) {
      this.ngxImageGallery.open(index);
    }
     showSlides(n) {
       /*
      var i;
      var slides = document.getElementsByClassName("mySlides");
      var dots = document.getElementsByClassName("demo");
      var captionText = document.getElementById("caption");
      if (n > slides.length) {this.slideIndex = 1}
      if (n < 1) {this.slideIndex = slides.length}
      for (i = 0; i < slides.length; i++) {
          slides[i].style.display = "none";
      }
      for (i = 0; i < dots.length; i++) {
          dots[i].className = dots[i].className.replace(" active", "");
      }
      slides[this.slideIndex-1].style.display = "block";
      dots[this.slideIndex-1].className += " active";
      captionText.innerHTML = dots[this.slideIndex-1].alt;
    */
    }
    closeGallery() {
        this.ngxImageGallery.close();
      }
      
      // set new active(visible) image in gallery
      newImage(index: number = 0) {
        this.ngxImageGallery.setActiveImage(index);
      }
      
      // next image in gallery
    
      
      /**************************************************/
      
      // EVENTS
      // callback on gallery opened
      galleryOpened(index) {
        console.info('Gallery opened at index ', index);
        //this.router.navigate([ this.templateMappings[index]]);

      }
    
      // callback on gallery closed
      galleryClosed() {
        console.info('Gallery closed.');
      }
    
      // callback on gallery image clicked
      galleryImageClicked(index) {
        console.info('Gallery image clicked with index ', index);
        //RESET THEME SETTINGS
        
        this.router.navigate([ this.templateMappings[index]]);
      }
      
      // callback on gallery image changed
      galleryImageChanged(index) {
        console.info('Gallery image changed to index ', index);
      }
    
      // callback on user clicked delete button
      deleteImage(index) {
        console.info('Delete image at index ', index);
      }
      openMyProfile(){
        this.router.navigate(['myprofile']);
      }
  
}
