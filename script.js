import data from "./data.js"
const app = new Vue({
    el: "#app",
    data() {
        return {
            list: data,
            undated:[],
        };
    },

    mounted() {
      this.setUpCalenderView(),
      this.calendarItems
    },

    methods: {
      setUpCalenderView(){
        // console.log(this.calendarItems);
        let allItems = this.calendarItems;
        let allDataItems = this.list.items;
        let mapItems =this.calendarViewMap;
    
        document.addEventListener('DOMContentLoaded', function() {
            var Draggable = FullCalendar.Draggable;
            var calendarEl = document.getElementById('calendar');
            let dragableContainer = document.getElementById('mydraggable');
            var calendar = new FullCalendar.Calendar(calendarEl,{
            initialView: 'dayGridMonth',
            editable: true,
            droppable: true,
            dayMaxEvents: true,
            eventDrop: function(info){
              allDataItems.forEach(item => {
                if(info.event.id == item._id){
                  item[mapItems.map.startDate] = info.event.start;
                  console.log(item[mapItems.map.startDate]);
                }
              });
            },
            headerToolbar: {
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay'
            },
            events: allItems,
            eventClick: function(eventInfo) {
              console.log(eventInfo.event);
            },
            drop: function(info) {
                info.draggedEl.parentNode.removeChild(info.draggedEl);
            },
          });
          calendar.render();
          new Draggable(dragableContainer, {
            itemSelector: '.fc-event',
            eventData: function(eventEl) {
              return {
                title: eventEl.innerText
              };
            }
          });

        });
      },
        getformatedDate(str) {
            if (!str) {
                console.log("undefined date string", str);
                return "--";
            }

            const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", ];

            const year = new Date(str).getFullYear().toString();
            const monthNumber = new Date(str).getMonth().toString();
            const day = new Date(str).getDate().toString();

            if (day == undefined || monthNames[monthNumber] == undefined || year == undefined) return;
            return `${monthNames[monthNumber]} ${day}`;
        },
    },

    computed: {
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
                    title: item[this.calendarViewMap.map.title].toString(),
                    start: item[this.calendarViewMap.map.startDate],
                    end:item[this.calendarViewMap.map.endDate]
                  };
                  allEvents.push(event);
                }
              });
              console.log(this.undated);
              console.log(allEvents);
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
    }
});

//use this when changing data
// calendar.fullCalendar('refetchEvents');