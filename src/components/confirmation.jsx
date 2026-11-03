export default function confirmation() {
  //need to confirm with badder if it is necessary to add the date being shown or simply gets shown in email reminders. Kivaan said not necessary but okay to add
  const location = useLocation(); //accesses the route's info
  const { date, time } = location.state || {}; //gets the date and time from the booking page, if there is none it is empty
  
  return (
    <div>
      <style>{`
        /* Main page colour and fonts */
        .booking-confirmation {
          background: #ffffff;
          font-family: 'Libre Franklin', sans-serif;
        }

        /* Pink heading */
        .booking-confirmation h1 {
          background: #f3e4e8;
          text-align: center;
          padding: 3rem;
          margin: 0;
          font-size: 3rem;
          font-weight: 500;
        }

        /* Booking confirmation message */
        .confirmation-message {
          text-align: center;
          padding: 8rem 2rem 1rem;
        }

        /* Thank you message */
        .confirmation-thank-you {
          font-size: 2rem;
          margin-top: 8rem;
        }

        /* confirmation message size*/
        .confirmation-message-styling {
          font-size: 2rem;
        }


        /* Done button colour, style and position */
        .confirmation-done {
          color: #715671;
          margin: 10rem 5rem 2rem auto;
          display: block;
          width: fit-content;
          text-decoration: none;
          font-size: 1.5rem;
          font-weight: 700;
        }

        .confirmation-done:hover {
          color: #715671;
        }

        /* Mobile layout for mobile display */
        @media (max-width: 600px) {
          .booking-confirmation h1 {
            font-size: 1.6rem;
          }

          .confirmation-content {
            padding-top: 6rem;
          }

          .confirmation-message {
            font-size: 1.3rem;
          }

          .confirmation-thank-you {
            margin-top: 5rem;
            font-size: 1.5rem;
          }

          .confirmation-done {
            margin-top: 6rem;
            margin-right: 1rem;
          }
        }
      `}</style>

      {/* Actual main */}
      <div className="booking-confirmation">

        {/* heading of the page */}
        <h1>Booking Confirmation</h1>

        {/* Booking confirmation message */}
        <section className="confirmation-message">
          <p className="confirmation-message-styling">You have registered for a screening!<br />A final reminder will be sent via email.</p>
          <p className="confirmation-thank-you">Thank you</p>
        </section>

        {/* Done button */}
        <a href="/" className="confirmation-done">Done →</a>
      </div>
    </div>
  );
}
