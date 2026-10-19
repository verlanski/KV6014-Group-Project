export default function HomePage() {
  return (
    <div>

      <style>{`
       /* Main style for the page, keeps centered with some padding etc */
        .home-main {
          max-width: 900px;
          margin: 0 auto;
          padding: 2rem 1.5rem;
          line-height: 1.6;
        }

        /* The layout for each row, it pouts the label on the left and the content on the right */
        .home-section {
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: 2rem;
          padding: 3rem 0;
          align-items: start;
        }

        /* These are the lables on the left e.g. "About Us" etc. */
        .section-label {
          font-size: 1.2rem;
          font-weight: 800;
          margin: 0;
          text-decoration: underline
        }

        /* Small headings in the right column e.g "Rose Organisation" etc */
        .section-content h3 {
          font-size: 1rem;
          margin: 0 0 1rem;
        }

        /* Simple spacing between the paragraphs */
        .section-content p {
          margin: 0 0 1rem;
        }

        /* This is the black line that seperates the top from the bottom of the page. can be used for dividing other sections also */
        .home-line-divider {
          border: none;
          border-top: 1px solid #000;
          margin: 0;
        }

        /* Makes the text bold for event slots at the bottom */
        .event-slots {
          font-weight: 700;
        }

        /* Button stacking with a little bit of space between them */
        .event-buttons {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 0.75rem;
          margin-top: 2rem;
        }

        /* Button styling */
        .event-buttons button {
          padding: 0.6rem 1.2rem;
          font-size: 1rem;
          font-weight: 600;
          background: #fff;
          border: 1px solid #000;
          border-radius: 4px;
          cursor: pointer;
        }

        /* Simple colour flip/flop for buttons for visual feedback */
        .event-buttons button:hover {
          background: #000;
          color: #fff;
        }

        /* Stack the columns on small screens */
        @media (max-width: 600px) {
          .home-section {
            grid-template-columns: 1fr;
            gap: 1rem;
            padding: 2rem 0;
          }
        }
      `}</style>


      {/* Start Of Main*/}
      <main className="home-main">

        {/* About Us */}
        <section className="home-section">
          <h2 className="section-label">About Us</h2>
          <div className="section-content">
            <h3>Rose Organisation</h3>
            <p>
              Rose is a Non-governmental Organisation that provides free cervical cancer screenings for women in B40,
              underprivileged communities with household income below RM5,860.
            </p>
            <p>
              We organise with collaborators and community leaders across Malaysia to choose a location for the event,
              perform screenings, send it to the lab, and forward the results back to women.
            </p>
          </div>
        </section>

        {/* Cervical Cancer */}
        <section className="home-section">
          <h2 className="section-label">Why is screening important?</h2>
          <div className="section-content">
            <h3>Cervical Cancer</h3>
            <p>
              Targeted cancer screening is designed to test people without symptoms for early stage cancer, or for early changes
              that could develop into cancer if left untreated. While screening can not diagnose cancer it can identify signs that
              may need further investigation.
            </p>
          </div>
        </section>

        <hr className="home-line-divider" />

        {/* Upcoming Events */}
        <section className="home-section">
          <h2 className="section-label">Our upcoming event</h2>
          <div className="section-content">
            <p className="event-slots"><strong>Slots Left: [PLACEHOLDER - Needs to be dynamic]</strong></p>  {/*This will be dynamically generated from the admin dashboard. Left blank for now*/}
            <p><strong>Location: [PLACEHOLDER - Needs to be dynamic]</strong></p>                            {/*Same as above^^*/}
            <p><strong>Date: [PLACEHOLDER - Needs to be dynamic]</strong></p>                                {/*Same as above^^*/}
            <p><strong>Time: [PLACEHOLDER - Needs to be dynamic]</strong></p>                                {/*Same as above^^*/}

            <div className="event-buttons">
              <button>Register</button>                 {/*This will be linked to the Registration Page*/}
              <button>Already have an account?</button> {/*This will be linked to the Log-in page. What about admin? Do we have special link for that?*/}
            </div>
          </div>
        </section>

      </main>
      {/* End Of Main*/}


    </div>
  );
}