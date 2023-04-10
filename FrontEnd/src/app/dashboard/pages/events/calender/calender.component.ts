import { ChangeDetectorRef, Component } from '@angular/core';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi, EventInput } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { INITIAL_EVENTS, createEventId } from './event-utils';
import { BackendService } from '../../../backend.service';
import { Events } from './events';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.scss']
})
export class CalenderComponent {


  error: any;
  events!: Events;

  calendarVisible = true;
  calendarOptions: CalendarOptions = {
    plugins: [
      interactionPlugin,
      dayGridPlugin,
      timeGridPlugin,
      listPlugin,
    ],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    initialView: 'dayGridMonth',
    // events: this.initializeEvents[0], // alternatively, use the `events` setting to fetch from a feed
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    select: this.handleDateClick.bind(this),
    // eventClick: this.handleEventClick.bind(this),
    // eventsSet: this.handleEvents.bind(this)

    /* you can update a remote database when these fire:
    eventAdd: this.api.addCalender(this)
    eventChange: this.api.getOneCalender(this)
    eventRemove:this.api.addCalender(this)
    */
  };
  currentEvents: EventApi[] = [];
  handleDateClick(arg: any) {

  }

  onSelectx(event: any) {

  }

  constructor(private changeDetector: ChangeDetectorRef, private api: BackendService , private auth:AuthService) {

  }

  ngOnInit(): void {
    this.getAllEvents();
  }

  isAuthorized():boolean {
    return this.auth.isAdmin()
  }

  getAllEvents(): void {
    this.api.getCalender().subscribe((res: any) => {
      const self = this;
      this.calendarOptions = {

        // dateClick: this.handleDateClick.bind(this),

        events: res.data, //Loading existing data from backend
        eventClick(eventData) { //deleting event
          // tslint:disable-next-line:variable-name
          if(!self.isAuthorized()) throw ('Unauthorized')
          
          const event_id = eventData.event._def.extendedProps['_id'];
          Swal.fire({
            title: 'Are you sure?',
            text: 'You won\'t be able to revert this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
            timer: 30000,
          }).then((result) => {
            if (result.value) {
              self.deleteEvent(event_id);
              Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                
              );
              self.getAllEvents();
            }

          }).catch(() => {
            Swal.fire('Failed!', 'There was something went wrong.');
          });
        }
      };
    });
  }




  deleteEvent(id: any) {
    this.api.deleteCalender(id).subscribe((data: any) => { });
  }

}
