const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const day = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

const d = new Date();
var date = day[d.getDay()]
let month = months[d.getMonth()];
document.querySelectorAll("p")[0].textContent = month.toUpperCase()
document.querySelectorAll("p")[1].textContent = date
document.querySelectorAll("p")[2].textContent = d.getDate()

fetch("media/timetable.json")
    .then(Response => Response.json())
    .then(data => {
        if (data[date] == undefined) {
            document.querySelector(".timetable").innerHTML = "<h1>No Class Today</h1>"
        } else {
            var timetable = document.createElement("table")

            var tr = document.createElement("tr")
            var th1 = document.createElement("th")
            var th2 = document.createElement("th")

            th1.textContent = "Time"
            th2.textContent = "Class"

            tr.appendChild(th1)
            tr.appendChild(th2)
            timetable.appendChild(tr)

            data[date].forEach((e) => {
                var tr = document.createElement("tr")
                var th1 = document.createElement("td")
                var th2 = document.createElement("td")

                th1.textContent = e["start"]+"-"+e["end"]
                th2.textContent = e["name"]

                tr.appendChild(th1)
                tr.appendChild(th2)
                timetable.appendChild(tr)
            })

            document.querySelector(".timetable").appendChild(timetable)
        }
    });

fetch("media/classroom.json")
    .then(Response => Response.json())
    .then(data => {
        document.querySelector(".classTitle").textContent = "My Classes ("+data.length+")"
        data.forEach((e) => {
            document.querySelector(".classes").innerHTML += "<h1><a href='https://uwcsealearning.theteamie.com/dash/#/classroom/"+e.nid+"'>"+e.name+"</a></h1>"
        })
    })

