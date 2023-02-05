import { Component, NgZone, OnInit } from '@angular/core';
import { gapi } from "gapi-script";
import { CalendarOptions } from '@fullcalendar/core'; // useful for typechecking
import dayGridPlugin from '@fullcalendar/daygrid';

@Component({
  selector: 'app-meetings',
  templateUrl: './meetings.component.html',
  styleUrls: ['./meetings.component.css'],
})

export class MeetingsComponent implements OnInit {
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin],
    events: [ 
      { title: 'event 1', date: '2023-02-05' },
      { title: 'event 2', date: '2023-02-04' },
    ],
    
  };

  isSignedIn:boolean = false;
  pre = '';

  constructor(private zone: NgZone) {}

  initClient() {
    const updateSigninStatus = this.updateSigninStatus.bind(this);
    
    gapi.client
      .init({
        apiKey: 'AIzaSyBscLiNAEWMFSjJy04ZTcLVj2qHANdSjLc',
        clientId:
          '276308802489-knb49rgq3t0ei0fkrm6g88o4i0algt10.apps.googleusercontent.com',
        discoveryDocs: [
          'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest',
        ],
        scope: 'https://www.googleapis.com/auth/calendar.readonly',
      })
      .then(() => {
        this.zone.run(() => {
          // Listen for sign-in state changes.
          gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

          // Handle the initial sign-in state.
          updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        });
      });
  }

  updateSigninStatus(isSignedIn:boolean) {
    console.log('updateSigninStatus', isSignedIn);
    this.isSignedIn = isSignedIn;
    if (isSignedIn) {
      this.listUpcomingEvents();
    }
  }

  handleAuthClick() {
    gapi.auth2.getAuthInstance().signIn();
  }

  handleSignoutClick() {
    gapi.auth2.getAuthInstance().signOut();
  }

  listUpcomingEvents() {
    const appendPre = this.appendPre.bind(this);
    gapi.client.calendar.events
      .list({
        calendarId: 'primary',
        timeMin: new Date().toISOString(),
        showDeleted: false,
        singleEvents: true,
        maxResults: 10,
        orderBy: 'startTime',
      })
      .then((response) => {
        this.zone.run(() => {
          if (response.result.items) {

            const events = response.result.items;
            appendPre('Upcoming events:');

            if (events.length > 0) {
              let events_list = "";
              for (const event of events) {
                if(event.start){
                  let when = event.start.dateTime;
                  if (!when) {
                    when = event.start.date;
                  }
                  
                  events_list += "{ title: '"+event.summary+"', date: '"+when?.slice(0, 10)+"' },";
                }
              }
              appendPre(events_list);
            } else {
              appendPre('No upcoming events found.');
            }
          }
        });
      });
  }

  appendPre(text:string) {
    this.pre += text + '\n';
  }

  loadGapi() {
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/api.js';
    window.document.body.appendChild(script);
    return new Promise<void>((resolve, reject) => {
      script.addEventListener('error', (error) => reject(error));
      script.addEventListener('load', () => resolve());
    });
  }

  async ngOnInit() {
    await this.loadGapi();
    gapi.load('client:auth2', this.initClient.bind(this));
  }
}
