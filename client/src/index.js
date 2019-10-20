import React, {useCallback, useState} from "react";
import ReactDOM from "react-dom";

function App(props) {

  const [system, updateSystem] = useState({
    eventId: "",
    eventTitle: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: ""
  })

  const handleUpdateSystem = useCallback((e) => {
    const {name, value, textContent} = e.target
    updateSystem(currentSystemState => ({
      ...currentSystemState,
      [name]: value
    }))
  }, [])

  const handleEvent = useCallback((e) => {
    const {name, value, options, selectedIndex} = e.target
    const eventTitle = options[selectedIndex].textContent

    updateSystem(currentSystemState => ({
      ...currentSystemState,
      eventId: value,
      eventTitle
    }))
  }, [])

  const handleCheckin = useCallback((e) => {
      e.preventDefault();

      const {eventId, eventTitle, email, firstName, lastName, phoneNumber} = system

      const attendeeInfo = {
        email,
        first_name: firstName,
        last_name: lastName,
        phone_number: phoneNumber,
        event: {
          id: eventId,
          title: eventTitle
        },
      };

      fetch('/api/Attendees', {
        method: 'POST',
        body: JSON.stringify(attendeeInfo),
        headers: {
          'Content-Type': 'application/json'
        },
      })
        .then(res => res.json())
        .then(res => window.location.replace('confirmation.html'))
        .catch(error => {
          console.error('Error:', error);
        });

  }, [system]);


  return (
    <main>
    <div className="container">
      <form onSubmit={handleCheckin}>
          <div>
              <h1>Welcome to the Meetup!</h1>
              <p className="banner">Please Sign In</p>
          </div>

          <div>
              <select name="eventId" id='event_dropdown' onChange={handleEvent}>
                  <option value="">Select your event</option>
                  <option value="1">San Diego Tech Coffee</option>
                  <option value="2">Blockchain & Brews</option>
                  <option value="3">Robot Framework San Diego</option>
              </select>
          </div>

          <div className="field">
              <label htmlFor="first-name">First Name</label>
              <input name="firstName" id="first-name" type="text" required onChange={handleUpdateSystem} />
          </div>

          <div className="field">
              <label htmlFor="last-name">Last Name</label>
              <input name="lastName" id="last-name" type="text" required onChange={handleUpdateSystem} />
          </div>

          <div className="field">
              <label htmlFor="email">Email</label>
              <input name="email" id="email" type="email" required onChange={handleUpdateSystem} />
          </div>

          <div className="field">
              <label htmlFor="phone-number">Phone Number</label>
               <input name="phoneNumber" id="phone-number" type='tel'  placeholder="(000) 000-0000" maxLength="14" onChange={handleUpdateSystem} />
          </div>

          <div>
              <p id="disclaimer">
                  * By submitting your phone number, you agree to receive text messages from
                  SDJS. Standard text message rates may apply.
              </p>
          </div>

          <button type="submit">Submit</button>
      </form>
  </div>
  <div className="image-wrapper">
      <a href="https://www.sdcs.io/" target="_blank">
          <img id='logo' src="images/sdcs_logo.png" alt="San Diego Code School logo" />
      </a>
      <p>Made by awesome students at San Diego Code School.</p>
  </div>
</main>
)
};

ReactDOM.render(<App />, document.getElementById("root"))
