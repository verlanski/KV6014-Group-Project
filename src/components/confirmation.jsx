import { useLocation, Link } from "react-router"; //to navigate and use info from the booking page

export default function Confirmation() {
  const location = useLocation(); //accesses the route's info
  const { date, time } = location.state || {}; //gets the date and time from the booking page, if there is none it is empty

  const displayDate = date //to format the date 
    ? new Date(date).toLocaleDateString('en-GB', {day: 'numeric', month: 'long', year: 'numeric'}) //if the date exists it converts and formats it properly to en-GB, if not, its invalid
    : "";

  return (
    <div>
      <style>{`
        /* CSS part for the confirmation page */

        /* white background and fonts */
        .booking-confirmation {
          background: #ffffff;
          font-family: 'Libre Franklin', sans-serif;
        }

        /* Pink heading */
        .booking-confirmation h1 {
          background: #f3e4e8;
          text-align: center;
          padding: 1rem;
          margin: 0;
          font-size: 2.5rem;
          font-weight: 500;
        }

        /* Booking confirmation message */
        .confirmation-message {
          text-align: center;
          padding: 9rem 2rem 0rem;
          font-family: 'Libre Franklin'
        }

        /* confirmation message size styling*/
        .confirmation-message-styling {
          font-size: 1.5rem;
        }

        /* Thank you text size and spaced out from the message*/
        .confirmation-thank-you {
          font-size: 1.5rem;
          margin-top: 2rem;
        }

        /* Done button colour, styl and position */
        .confirmation-done {
          color: #715671;
          margin: 10rem 5rem 2rem auto;
          display: block;
          width: fit-content;
          font-size: 1.5rem;
          font-weight: 700;
        }

        /*turns the done button a bright pink (feedback from Rozinia for accessibility/visibility )*/
        .confirmation-done:hover {
          color: #d69dd6;
        }

      `}</style>

      {/* Actual main */}
      <div className="booking-confirmation">
        <h1>Booking Confirmation</h1>

        {/* Booking confirmation message */}
        <section className="confirmation-message">
          {/**Displays on screen the confirmation message with the date and time the they chose*/}
          <p className = "confirmation-message-styling"> You have registered for a screening {date && time ? ` on ${displayDate} at ${time}` : "" } <br/> A final reminder will be sent via email</p>
          <p className = "confirmation-thank-you"> Thank you!</p>
        </section>

        {/* Done button takes you back to the homepage*/}
        <Link to="/" className="confirmation-done">Done →</Link>
      </div> 
    </div>
  );
}
