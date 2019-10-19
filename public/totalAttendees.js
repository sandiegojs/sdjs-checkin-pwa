function createView(attendees) {

    let eventAttendance = {};

    attendees.forEach(attendee => { 
        eventAttendance[attendee.event.id] = (eventAttendance[attendee.event.id] || 0)+1; 
    });

    let tr, td;
    let tableBody = document.getElementById('total-attendees-table');
    Object.keys(eventAttendance).map(event => {
        tr = document.createElement('tr');
        td = document.createElement('td');

        td.appendChild(document.createTextNode(`${eventAttendance.event}`));
        tr.appendChild(td);

        td = document.createElement('td');

        td.appendChild(document.createTextNode(`${event}`));
        tr.appendChild(td);

        tableBody.appendChild(td);
    });
}

fetch('/api/attendees')
  .then(response => response.json())
  .then(result => (createView(result))
  )
  .catch(error => console.log(error));
