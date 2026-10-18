export default function HomePage() {
  return (
    <div>

      <header>
        <h1>Home Page</h1>
      </header>

      {/* Start Of Main*/}
      <main>

        <h2><strong><u>About Us</u></strong></h2>

        <h3><strong>Rose Organisation</strong></h3>
        <p>
          Rose is a Non-governmental Organisation that provides free cervical cancer screenings for women in B40, 
          underprivileged communities with household income below RM5,860. We organise with collaborators and community 
          leaders across Malaysia to choose a location for the event, perform screenings, send it to the lab, and forward the 
          results back to women
        </p>

        <h2><strong><u>Cervical Cancer</u></strong></h2>

        <h3><strong>Why is screening so important?</strong></h3>
        <p>
          Targeted cancer screening is designed to test people without symptoms for early stage cancer, or for early changes 
          that could develop into cancer if left untreated. While screening can not diagnose cancer it can identify signs that 
          may need further investigation.
        </p>

        <h2><strong><u>Upcoming Events</u></strong></h2>

        <h5><strong>Slots Left: </strong></h5> {/*This will be dynamically generated from the admin dashboard*/}
        <h5><strong>Location: </strong></h5>   {/*This will be dynamically generated from the admin dashboard*/}
        <h5><strong>Date: </strong></h5>       {/*This will be dynamically generated from the admin dashboard*/}
        <h5><strong>Time: </strong></h5>       {/*This will be dynamically generated from the admin dashboard*/}

        <button>Register</button>                 {/*This will be linked to the Registration Page*/}
        <button>Already have an account?</button> {/*This will be linked to the Log-in page. What about admin? Do we have special link for that?*/}

      </main>
      {/* End Of Main*/}

      <footer>
        <p>&copy; 2023 Something something this is an exmaple. All rights reserved.</p>
      </footer>

    </div>
  );
}