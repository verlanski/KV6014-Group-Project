export default function Footer() {
  return (
    <footer className="bg-linear-to-r from-bg-main via-bg-surface-alternative to-bg-main">
      <div className="flex flex-col gap-3 px-6 py-10 sm:flex-row sm:gap-16 md:px-10 md:py-14">
        <h2 className="font-semibold text-text-main">Contact us</h2>

        <address className="flex flex-col gap-1 text-sm not-italic text-text-main">
          <a href="mailto:roseorganisation@gmail.com" className="hover:underline">
            roseorganisation@gmail.com
          </a>
          <a href="tel:+447845275623" className="hover:underline">
            +44 7845 275623
          </a>
        </address>
      </div>
    </footer>
  );
}