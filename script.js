import data from "./data.js"
new Vue({
  el: '#app',
  vuetify: new Vuetify(),
  data: () => ({
    list: data,
    undated:[],
    type: 'month',
    types: ['month', 'week', 'day', '4day'],
    mode: 'stack',
    modes: ['stack', 'column'],
    focus: '',
    typeToLabel: {
      month: 'Month',
      week: 'Week',
      day: 'Day',
      '4day': '4 Days',
    },
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
    weekday: [0, 1, 2, 3, 4, 5, 6],
    weekdays: [
      { text: 'Sun - Sat', value: [0, 1, 2, 3, 4, 5, 6] },
      { text: 'Mon - Sun', value: [1, 2, 3, 4, 5, 6, 0] },
      { text: 'Mon - Fri', value: [1, 2, 3, 4, 5] },
      { text: 'Mon, Wed, Fri', value: [1, 3, 5] },
    ],
    value: '',
    events: [],
    colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1'],
    names: ['Meeting', 'Holiday', 'PTO', 'Travel', 'Event', 'Birthday', 'Conference', 'Party'],
  }),
  methods: {
    showEvent ({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event
        this.selectedElement = nativeEvent.target
        requestAnimationFrame(() => requestAnimationFrame(() => this.selectedOpen = true))
        console.log(event.id);
      }

      if (this.selectedOpen) {
        this.selectedOpen = false
        requestAnimationFrame(() => requestAnimationFrame(() => open()))
      } else {
        open()
      }

      nativeEvent.stopPropagation()
    },
    getEvents () {
      this.events = this.calendarItems;
    },
    getEventColor (event) {
      return event.color
    },
    rnd (a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a
    },
    viewDay ({ date }) {
      this.focus = date
      this.type = 'day'
    },
    getEventColor (event) {
      return event.color
    },
    setToday () {
      this.focus = ''
    },
    prev () {
      this.$refs.calendar.prev()
    },
    next () {
      this.$refs.calendar.next()
    },
  },
  computed:{
    calendarItems() {
        if (!this.calendarViewMap) return;
        const allEvents=[];
        let event;
          this.list.items.forEach(item => {
            if(item[this.calendarViewMap.map.startDate] == '' || item[this.calendarViewMap.map.startDate] == undefined){
              this.undated.push(item);
            }else{
              event = {
                id: item._id,
                name:  item[this.calendarViewMap.map.title].toString(),
                start: item[this.calendarViewMap.map.startDate],
                end: item[this.calendarViewMap.map.endDate],
                color: this.colors[this.rnd(0, this.colors.length - 1)],
                // timed: !allDay,
              };
              allEvents.push(event);
            }
          });
          // console.log(this.undated);
          // console.log(allEvents);
          return allEvents;
    },
    calendarViewMap() {
      const fields = this.list.fields;
      if (!fields) return;

      const allDateFields = _.filter(fields, o => o.type === "date");

      // if (!allChoiceFields.length) return;

      const viewmap = {
              name: "calendar",
              map: {},
          }
          viewmap.map["id"] = "_id";
      viewmap.map["title"] = fields[0]["name"];
      // viewmap.map["id"] = "_id";

      viewmap.map["startDate"] = (_.filter(fields, {
          type: "date",
      })[0] || "")["name"];

      if (allDateFields.length > 1) {
        viewmap.map["endDate"] = (_.filter(fields, {
            type: "date",
        })[1] || "")["name"];
      }
      return viewmap;
  },
  },
})


// const app = new Vue({
//     el: "#app",
//     components: {
//       FullCalendar // make the <FullCalendar> tag available
//     },
//     data: () => ({
//       calendarOptions: {
//         initialView: 'dayGridMonth',
//         weekends: false, // initial value
//         editable: true,
//         droppable: true,
//         dayMaxEvents: true,
//         // eventDrop: function(info){
//         //   allDataItems.forEach(item => {
//         //     if(info.event.id == item._id){
//         //       item[mapItems.map.startDate] = info.event.start;
//         //       console.log(item[mapItems.map.startDate]);
//         //     }
//         //   });
//         // },
//         headerToolbar: {
//           left: 'prev,next today',
//           center: 'title',
//           right: 'dayGridMonth,timeGridWeek,timeGridDay'
//         },
//         events: [],
//         eventClick: function(eventInfo) {
//           console.log(eventInfo.event);
//         },
//       }
//       // drop: function(info) {
//       //     info.draggedEl.parentNode.removeChild(info.draggedEl);
//       // },
//     }),
//     // data() {
//     //     return {
//     //         list: data,
//     //         undated:[],
//     //     };
//     // },
//     mounted() {
//       // this.setUpCalenderView()
//     },

//     methods: {
//       // setUpCalenderView(){
//       //   // console.log(this.calendarItems);
//       //   let allItems = this.calendarItems;
//       //   let allDataItems = this.list.items;
//       //   let mapItems =this.calendarViewMap;
    
//       //   document.addEventListener('DOMContentLoaded', function() {
//       //     var Draggable = FullCalendar.Draggable;
//       //     var calendarEl = document.getElementById('calendar');
//       //     let dragableContainer = document.getElementById('mydraggable');
//       //     var calendar = new FullCalendar.Calendar(calendarEl,{
//       //       initialView: 'dayGridMonth',
//       //       editable: true,
//       //       droppable: true,
//       //       dayMaxEvents: true,
//       //       eventDrop: function(info){
//       //         allDataItems.forEach(item => {
//       //           if(info.event.id == item._id){
//       //             item[mapItems.map.startDate] = info.event.start;
//       //             console.log(item[mapItems.map.startDate]);
//       //           }
//       //         });
//       //       },
//       //       headerToolbar: {
//       //         left: 'prev,next today',
//       //         center: 'title',
//       //         right: 'dayGridMonth,timeGridWeek,timeGridDay'
//       //       },
//       //       events: allItems,
//       //       eventClick: function(eventInfo) {
//       //         console.log(eventInfo.event);
//       //       },
//       //       drop: function(info) {
//       //           info.draggedEl.parentNode.removeChild(info.draggedEl);
//       //       },
//       //     });
//       //     calendar.render();
          
//       //     new Draggable(dragableContainer, {
//       //       itemSelector: '.fc-event',
//       //       eventData: function(eventEl) {
//       //         var id = document.getElementById('dragEvent').getAttribute('data-id');
//       //         console.log(id);
//       //         return {
//       //           id: id,
//       //           title: eventEl.innerText
//       //         };
//       //       }
//       //     });

//       //   });
//       // },

//       getformatedDate(str) {
//           if (!str) {
//               console.log("undefined date string", str);
//               return "--";
//           }

//           const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", ];

//           const year = new Date(str).getFullYear().toString();
//           const monthNumber = new Date(str).getMonth().toString();
//           const day = new Date(str).getDate().toString();

//           if (day == undefined || monthNames[monthNumber] == undefined || year == undefined) return;
//           return `${monthNames[monthNumber]} ${day}`;
//       },
//     },

//     computed: {
//         calendarItems() {
//             if (!this.calendarViewMap) return;
//             const allEvents=[];
//             let event;
//               this.list.items.forEach(item => {
//                 // if(item[this.calendarViewMap.map.startDate] == '' || item[this.calendarViewMap.map.startDate] == undefined){
//                   // this.undated.push(item);
//                 // }else{
//                   event = {
//                     id: item._id,
//                     title: item[this.calendarViewMap.map.title].toString(),
//                     start: item[this.calendarViewMap.map.startDate],
//                     end:item[this.calendarViewMap.map.endDate]
//                   };
//                   allEvents.push(event);
//                 // }
//               });
//               // console.log(this.undated);
//               // console.log(allEvents);
//               return allEvents;
//         },

//         calendarViewMap() {
//             const fields = this.list.fields;
//             if (!fields) return;

//             const allDateFields = _.filter(fields, o => o.type === "date");

//             // if (!allChoiceFields.length) return;

//             const viewmap = {
//                     name: "calendar",
//                     map: {},
//                 }
//                 viewmap.map["id"] = "_id";
//             viewmap.map["title"] = fields[0]["name"];
//             // viewmap.map["id"] = "_id";

//             viewmap.map["startDate"] = (_.filter(fields, {
//                 type: "date",
//             })[0] || "")["name"];

//             if (allDateFields.length > 1) {
//               viewmap.map["endDate"] = (_.filter(fields, {
//                   type: "date",
//               })[1] || "")["name"];
//             }
//             return viewmap;
//         },
//     }
// });

//use this when changing data
// calendar.fullCalendar('refetchEvents');