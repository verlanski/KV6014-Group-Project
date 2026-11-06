


export default function HomePage() {
  return (
    <div>

      {/* Start Of Main*/}
      <div className="home-main">

        {/* Upcoming Events */}
        <section className="home-section">
          <h2 className="section-label">Our upcoming event</h2>
          <div className="section-content">
            <p className="event-slots"><strong>Slots Left: [PLACEHOLDER - Needs to be dynamic]</strong></p>  {/*This will be dynamically generated from the admin dashboard. Left blank for now*/}
            <p><strong>Location: [PLACEHOLDER - Needs to be dynamic]</strong></p>                            {/*Same as above^^*/}
            <p><strong>Date: [PLACEHOLDER - Needs to be dynamic]</strong></p>                                {/*Same as above^^*/}
            <p><strong>Time: [PLACEHOLDER - Needs to be dynamic]</strong></p>                                {/*Same as above^^*/}

            <div className="event-buttons">
              <button label="Register" onClick={() => window.location.href = '/register'}>
                Register
              </button>               {/*This will be linked to the Registration Page*/}
              <button label="Log in" onClick={() => window.location.href = '/login'}>
                Already have an account? Log in!
              </button> {/*This will be linked to the Log-in page. What about admin? Do we have special link for that?*/}
            </div>
          </div>
        </section>

        <hr className="home-line-divider" />

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

      </div>
      {/* End Of Main*/}


    </div>
  );
}