import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import * as html2canvas from 'html2canvas';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    @ViewChild('video1', { static: true }) videoElement1: ElementRef;
    @ViewChild('canvas1', { static: true }) canvas1: ElementRef;
    @ViewChild('canvasImg1', { static: true }) canvasImg1: ElementRef;
    @ViewChild('downloadLink1', { static: true }) downloadLink1: ElementRef;
    
    @ViewChild('video2', { static: true }) videoElement2: ElementRef;
    @ViewChild('canvas2', { static: true }) canvas2: ElementRef;
    @ViewChild('canvasImg2', { static: true }) canvasImg2: ElementRef;
    @ViewChild('downloadLink2', { static: true }) downloadLink2: ElementRef;

    videoWidth = 0;
    videoHeight = 0;
    constraints1 = {
        video: {
            deviceId: "a21b9f49f5e476bb6ec1565e4081697cc0ca7e31f85dfaf8218766a5c459b754",
            facingMode: "environment",
            width: { ideal: 4096 },
            height: { ideal: 2160 }
        }
    };

    constraints2 = {
        video: {
            deviceId: "1831e20b68dccdc7ca6943c1c01eaa8f6267ce908a7cb8a93b65922994b59ec3",
            facingMode: "environment",
            width: { ideal: 4096 },
            height: { ideal: 2160 }
        }
    };

    constructor(private renderer: Renderer2) {}

    ngOnInit() {
        this.startCamera();
    }

    startCamera() {

        let deviceIds = [];
        navigator.mediaDevices.enumerateDevices()
            .then(function(devices) {

            devices.forEach(function(device) {
                console.log(device.kind + ": " + device.label +
                            " id = " + device.deviceId);
                if (device.kind == 'videoinput')
                {
                    deviceIds.push({
                        video: {
                            deviceId: device.deviceId,
                            facingMode: "environment",
                            width: { ideal: 4096 },
                            height: { ideal: 2160 }
                        }
                    });            
                }
            });
            })
            .catch(function(err) {
            console.log(err.name + ": " + err.message);
            });

            deviceIds.forEach(function(device) {
                console.log("here" + device);
            });

            //console.log(deviceIds);
            //console.log(deviceIds[0].video.deviceId);

            


            if (!!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)) {            
                navigator.mediaDevices.getUserMedia(this.constraints1).then(this.attachVideo.bind(this)).catch(this.handleError);
            } else {
                alert('Sorry, camera not available.');
            }
    

            if (!!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)) {            
                navigator.mediaDevices.getUserMedia(this.constraints2).then(this.attachVideo2.bind(this)).catch(this.handleError);
            } else {
                alert('Sorry, camera not available.');
            }

    }

    attachVideo(stream) {
        console.log(`tracks`);
        console.log(stream.getTracks());
        this.renderer.setProperty(this.videoElement1.nativeElement, 'srcObject', stream);
        this.renderer.listen(this.videoElement1.nativeElement, 'play', (event) => {
            this.videoHeight = this.videoElement1.nativeElement.videoHeight;
            this.videoWidth = this.videoElement1.nativeElement.videoWidth;
        });
    }

    attachVideo2(stream) {
        this.renderer.setProperty(this.videoElement2.nativeElement, 'srcObject', stream);
        this.renderer.listen(this.videoElement2.nativeElement, 'play', (event) => {
            this.videoHeight = this.videoElement2.nativeElement.videoHeight;
            this.videoWidth = this.videoElement2.nativeElement.videoWidth;
        });
    }

    capture() {
        
        this.renderer.setProperty(this.canvas1.nativeElement, 'width', this.videoWidth * 2);
        this.renderer.setProperty(this.canvas1.nativeElement, 'height', this.videoHeight);
        
        //for (let i = 0; i ++; i < 1000)    
        {
        //https://stackblitz.com/edit/angular-html2canvas
        //console.log(this.canvas.nativeElement.getContext('2d').;

        this.canvas1.nativeElement.getContext('2d').drawImage(this.videoElement1.nativeElement, 0, 0)
  

        // this.renderer.setProperty(this.canvas2.nativeElement, 'width', this.videoWidth);
        // this.renderer.setProperty(this.canvas2.nativeElement, 'height', this.videoHeight);
        this.canvas1.nativeElement.getContext('2d').drawImage(this.videoElement2.nativeElement, this.videoWidth, 0)

        html2canvas(this.canvas1.nativeElement).then(canvas => {                
            // this.canvasImg.nativeElement.src = canvas.toDataURL();
            this.downloadLink1.nativeElement.href = canvas.toDataURL('image/png');
            this.downloadLink1.nativeElement.download = 'marble-diagram.png';
            this.downloadLink1.nativeElement.click();
            });

        // html2canvas(this.canvas2.nativeElement).then(canvas => {                
        //     // this.canvasImg.nativeElement.src = canvas.toDataURL();
        //     this.downloadLink2.nativeElement.href = canvas.toDataURL('image/png');
        //     this.downloadLink2.nativeElement.download = 'marble-diagram.png';
        //     this.downloadLink2.nativeElement.click();
        //     });
        }
    }

    handleError(error) {
        console.log('Error: ', error);
    }

}
