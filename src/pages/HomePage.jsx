


export default function HomePage() {
  return (
    <div>

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