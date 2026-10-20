export default function BookingPage() {
  return (
    <div>
      <style>{`
        /* style and fonts for the admin login page*/
        .adminLogin {
          background: #ffff;
          font-family: 'Libre Franklin', sans-serif;
          padding: 0;
          margin: 0 auto;
        }

        /* pink header where the login title goes */
        .adminLogin h1 {
          background: #f3e4e8;
          padding: 3rem;
          text-align: center;
        }

        /* login form sizing and position */
        .adminLoginForm {
          max-width: 600px;
          margin: 10rem auto;
          padding: 2rem;
        }
        
        /** spaces out each field group and the label from the box */
        .adminLoginBox {
          margin-bottom: 1rem;
        }

        /** labels for email and password */
        .adminLoginBox label {
          display: block;
          margin-bottom: 2rem;
        }
        /** email and password boxes */
        .adminLoginBox input {
          width: 100%;
          padding: 1rem;
        }
        /** login button that shows a pointer when hovering over it */
        .adminLoginButton {
          padding: 1rem 2rem;
          cursor: pointer;
        }

        /* mobile layout if it gets launched on a phone*/
        @media (max-width: 600px) {
          .booking-confirmation {
            font-size: 1.5rem;
            padding: 0;
          }
        }
      `}</style>


      {/* actual admin login page */}
      <main className="adminLogin">
        <h1>Log In</h1>

        {/**form for the admin to login with email and password*/}
        <form
          className="adminLoginForm"
          onSubmit={(event) => {
            event.preventDefault();
          }}
        >
          {/** email input section */}  
          <div className="adminLoginBox">
            <label htmlFor="email">Enter your email:</label>
            <input
              type="email"
              id="email"
              name="email"
              required
            />
          </div>

          {/** password input section */}
          <div className="adminLoginBox">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              required
            />
          </div>

          {/** button to submit the form */}
          <button
            type="submit"
            className="adminLoginButton"
          >
            Log In →
          </button>
        </form>
      </main>
    </div>
  );
}
