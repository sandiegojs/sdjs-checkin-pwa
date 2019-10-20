import React, {useCallback, useState} from "react";
import ReactDOM from "react-dom";

function formatPhoneNumber(val) {
  return val
    .replace(/\D/g, '')
    .replace(/(\d{1,3})(\d{1,3})?(\d{1,4})?/g, function(txt, firstSet, secondSet, thirdSet) {
      if (thirdSet) {
        return `(${firstSet}) ${secondSet}-${thirdSet}`;
      } else if (secondSet) {
        return `(${firstSet}) ${secondSet}`;
      } else if (firstSet) {
        return `(${firstSet})`;
      }
    });
}

function App(props) {

  const [formData, updateFormData] = useState({
    eventId: "",
    eventTitle: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: ""
  })

  const handleUpdateFormData = useCallback((e) => {
    const {name, value, textContent} = e.target
    updateFormData(currentFormData => ({
      ...currentFormData,
      [name]: value
    }))
  }, [])

  const handleEvent = useCallback((e) => {
    const {name, value, options, selectedIndex} = e.target
    const eventTitle = options[selectedIndex].textContent

    updateFormData(currentFormData => ({
      ...currentFormData,
      eventId: value,
      eventTitle
    }))
  }, [])

  const handlePhoneNumber = useCallback((e) => {
    const {name, value} = e.target

    updateFormData(currentFormData => ({
      ...currentFormData,
      phoneNumber: formatPhoneNumber(value)
    }))
  }, [])

  const handleCheckin = useCallback((e) => {
      e.preventDefault();

      const {eventId, eventTitle, email, firstName, lastName, phoneNumber} = formData

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

  }, [formData]);

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
              <input name="firstName" id="first-name" type="text" required onChange={handleUpdateFormData} />
          </div>

          <div className="field">
              <label htmlFor="last-name">Last Name</label>
              <input name="lastName" id="last-name" type="text" required onChange={handleUpdateFormData} />
          </div>

          <div className="field">
              <label htmlFor="email">Email</label>
              <input name="email" id="email" type="email" required onChange={handleUpdateFormData} />
          </div>

          <div className="field">
              <label htmlFor="phone-number">Phone Number</label>
               <input value={formData.phoneNumber} name="phoneNumber" id="phone-number" type='tel'  placeholder="(000) 000-0000" maxLength="14" onChange={handlePhoneNumber} />
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
