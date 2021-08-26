import data from "./data.js"
const app = new Vue({
    el: "#app",
    data() {
        return {
            list: data,
        };
    },

    mounted() {
      this.setUpCalenderView(),
      this.calendarItems
    },

    methods: {
      setUpCalenderView(){
        console.log(this.calendarItems);
    
          $('#calendar').fullCalendar({
            header: {
              left: 'prev,next today',
              center: 'title',
              right: 'month,basicWeek,basicDay'
            },
            // defaultDate: '2016-12-12',
            navLinks: true, // can click day/week names to navigate views
            editable: true,
            eventLimit: true, // allow "more" link when too many events
            events: this.calendarItems
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
        }
    },

    computed: {
        calendarItems() {
            if (!this.calendarViewMap) return;
            const allEvents=[];
            let event;
              this.list.items.forEach(item => {
                event = {
                  id: item._id,
                  title: item[this.calendarViewMap.map.title].toString(),
                  start: item.createdAt,
                  end: item[this.calendarViewMap.map.startDate],
                };
                allEvents.push(event);
              });
              // console.log(typeof(allEvents));
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
console.log(app.setUpCalenderView.events)