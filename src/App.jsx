export default function ChanakyaTechnicalSolutionsWebsite() {
  const services = [
    "Water Treatment Plant - Equipments",
    "Effluent Treatment Plant - Equipments",
    "Sewage Treatment Plant - Equipments",
    "Speciality Chemicals",
    "Water Audit",
    "Sustainability Solutions",
    "Rain Water Harvesting",
  ];

  const products = [
    "Industrial RO Systems",
    "Water Softening Systems",
    "Pressure Sand Filters",
    "Activated Carbon Filters",
    "DM Plants",
    "Sewage Treatment Systems",
  ];

  const googleMapsUrl =
    "https://www.google.com/maps/search/?api=1&query=Flat%20No.%20201%2C%202nd%20Floor%2C%20Plot%20No.%2051C%2C%20Sahiti%20Enclave%2C%20Gauthampur%20Colony%2C%20Opp.%20Model%20City%20School%2C%20Moti%20Nagar%2C%20Erragadda%2C%20Hyderabad%20500018";

  const whatsappUrl =
    "https://wa.me/918187824283?text=Hello%20Chanakya%20Technical%20Solutions%2C%20I%20would%20like%20to%20know%20more%20about%20your%20water%20and%20waste%20treatment%20services.";

  return (
    <div className="font-sans text-gray-800 bg-white">
      <header className="border-b border-gray-200 sticky top-0 bg-white z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/assets/images/logo.png"
              alt="Chanakya Technical Solutions"
              className="w-14 h-14 object-contain"
            />

            <div>
              <h1 className="text-xl font-bold text-sky-700 leading-tight">
                Chanakya Technical Solutions
              </h1>
              <p className="text-sm text-gray-600 italic">
                Sustaining the future. One drop at a time
              </p>
            </div>
          </div>

          <nav className="hidden md:flex gap-8 text-[15px] font-medium">
            <a href="#home" className="hover:text-sky-700">
              Home
            </a>
            <a href="#about" className="hover:text-sky-700">
              About
            </a>
            <a href="#services" className="hover:text-sky-700">
              Services
            </a>
            <a href="#products" className="hover:text-sky-700">
              Products
            </a>
            <a href="#contact" className="hover:text-sky-700">
              Contact
            </a>
          </nav>
        </div>
      </header>

      <section
        id="home"
        className="relative bg-[url('/assets/images/hero-banner.jpg')] bg-cover bg-center"
      >
        <div className="bg-black/50">
          <div className="max-w-7xl mx-auto px-4 py-28 md:py-36 text-white">
            <div className="max-w-3xl">
              <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
                Water & Waste Treatment Services
              </h2>

              <p className="text-lg md:text-xl leading-relaxed text-gray-200 mb-8">
                Professional solutions for water treatment, sewage treatment,
                effluent management and industrial water systems.
              </p>

              <div className="flex flex-wrap gap-4">
                <a
                  href="#services"
                  className="bg-sky-700 hover:bg-sky-800 px-7 py-3 rounded text-white font-medium"
                >
                  Our Services
                </a>

                <a
                  href="#contact"
                  className="border border-white hover:bg-white hover:text-black px-7 py-3 rounded font-medium transition"
                >
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-3xl font-bold text-sky-700 mb-6">About Us</h3>

            <p className="text-gray-700 leading-8 mb-5 text-justify">
              Chanakya Technical Solutions provides reliable and professional
              water and waste treatment services for industrial and commercial
              applications. We focus on quality equipment, efficient treatment
              systems and sustainable environmental solutions.
            </p>

            <p className="text-gray-700 leading-8 text-justify">
              Our services include water treatment plants, effluent treatment
              systems, sewage treatment systems, speciality chemicals, water
              audits and sustainability solutions tailored to customer
              requirements.
            </p>
          </div>

          <div>
            <img
              src="/assets/images/about-image.jpg"
              alt="Water Treatment"
              className="rounded shadow-lg w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      <section id="services" className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <h3 className="text-3xl font-bold text-sky-700 mb-4">
              Our Services
            </h3>

            <p className="text-gray-600 max-w-3xl mx-auto leading-7">
              Complete water and waste treatment solutions for industrial,
              commercial and environmental applications.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div
                key={service}
                className="bg-white border border-gray-200 p-6 rounded shadow-sm hover:shadow-md transition"
              >
                <h4 className="text-lg font-semibold leading-7 mb-3">
                  {service}
                </h4>

                <p className="text-gray-600 text-sm leading-7 mb-5">
                  Professional and reliable solutions designed for industrial,
                  commercial and environmental water treatment requirements.
                </p>

                <a
                  href="#contact"
                  className="inline-block bg-sky-700 hover:bg-sky-800 text-white px-5 py-2 rounded text-sm"
                >
                  Enquiry Now
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="products" className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <h3 className="text-3xl font-bold text-sky-700 mb-4">
              Products & Equipments
            </h3>

            <p className="text-gray-600 max-w-3xl mx-auto leading-7">
              We supply high-quality industrial equipment and treatment systems
              designed for efficient performance and long-term reliability.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div
                key={product}
                className="border border-gray-200 rounded overflow-hidden bg-white shadow-sm"
              >
                <img
                  src="/assets/images/product-placeholder.jpg"
                  alt={product}
                  className="w-full h-56 object-cover"
                />

                <div className="p-5">
                  <h4 className="text-lg font-semibold mb-3">{product}</h4>

                  <p className="text-gray-600 leading-7 text-sm">
                    High-performance industrial treatment equipment suitable for
                    commercial and industrial applications.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-sky-700 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <h3 className="text-3xl font-bold mb-4">Why Choose Us</h3>
            <p className="max-w-3xl mx-auto leading-7 text-sky-100">
              Reliable solutions, experienced support and customer-focused
              service for every project.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div className="bg-white/10 p-6 rounded">
              <h4 className="text-xl font-semibold mb-3">Quality Service</h4>
              <p className="text-sky-100 text-sm leading-7">
                Reliable and professional project execution.
              </p>
            </div>

            <div className="bg-white/10 p-6 rounded">
              <h4 className="text-xl font-semibold mb-3">Expert Solutions</h4>
              <p className="text-sky-100 text-sm leading-7">
                Customized treatment systems for every need.
              </p>
            </div>

            <div className="bg-white/10 p-6 rounded">
              <h4 className="text-xl font-semibold mb-3">Customer Support</h4>
              <p className="text-sky-100 text-sm leading-7">
                Dedicated assistance and technical support.
              </p>
            </div>

            <div className="bg-white/10 p-6 rounded">
              <h4 className="text-xl font-semibold mb-3">Sustainable Focus</h4>
              <p className="text-sky-100 text-sm leading-7">
                Environment-friendly treatment solutions.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-3xl font-bold text-sky-700 mb-6">
              Contact Us
            </h3>

            <div className="space-y-5 text-gray-700 leading-7">
              <div>
                <h4 className="font-semibold text-lg mb-1">Address</h4>
                <p>
                  Flat No. 201, 2nd Floor, Plot No. 51C,
                  <br />
                  Sahiti Enclave, Gauthampur Colony,
                  <br />
                  Opp. Model City School, Moti Nagar,
                  <br />
                  Erragadda, Hyderabad - 500018
                </p>
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-3 text-sky-700 font-medium hover:text-sky-800"
                >
                  View on Google Maps
                </a>
              </div>

              <div>
                <h4 className="font-semibold text-lg mb-1">Phone</h4>
                <p>+91 9490316328</p>
              </div>

              <div>
                <h4 className="font-semibold text-lg mb-1">Email</h4>
                <p>chanakyatechsol@gmail.com</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded shadow-sm border border-gray-200">
            <form className="grid gap-5">
              <input
                type="text"
                placeholder="Your Name"
                className="border border-gray-300 px-4 py-3 rounded outline-none focus:border-sky-700"
              />

              <input
                type="email"
                placeholder="Email Address"
                className="border border-gray-300 px-4 py-3 rounded outline-none focus:border-sky-700"
              />

              <input
                type="text"
                placeholder="Phone Number"
                className="border border-gray-300 px-4 py-3 rounded outline-none focus:border-sky-700"
              />

              <textarea
                rows="5"
                placeholder="Message"
                className="border border-gray-300 px-4 py-3 rounded outline-none focus:border-sky-700"
              ></textarea>

              <button className="bg-sky-700 hover:bg-sky-800 text-white py-3 rounded font-medium">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-gray-300 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h4 className="text-xl font-semibold text-white mb-3">
            Chanakya Technical Solutions
          </h4>

          <p className="mb-3 text-sm">
            Sustaining the future. One drop at a time
          </p>

          <p className="text-sm text-gray-400">
            © 2026 Chanakya Technical Solutions. All Rights Reserved.
          </p>
        </div>
      </footer>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-5 right-5 bg-green-500 hover:bg-green-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg z-50"
      >
        <svg
          viewBox="0 0 32 32"
          aria-hidden="true"
          className="w-8 h-8 fill-current"
        >
          <path d="M16.01 3.2c-7.04 0-12.77 5.69-12.77 12.69 0 2.24.59 4.43 1.7 6.35L3.14 28.8l6.75-1.77a12.85 12.85 0 0 0 6.12 1.55c7.04 0 12.77-5.69 12.77-12.69S23.05 3.2 16.01 3.2Zm0 23.25c-1.94 0-3.83-.52-5.49-1.51l-.39-.23-4.01 1.05 1.07-3.89-.25-.4a10.45 10.45 0 0 1-1.57-5.58c0-5.83 4.78-10.57 10.64-10.57s10.64 4.74 10.64 10.57-4.78 10.56-10.64 10.56Zm5.83-7.9c-.32-.16-1.89-.93-2.18-1.04-.29-.11-.5-.16-.71.16-.21.32-.82 1.04-1 1.25-.18.21-.37.24-.69.08-.32-.16-1.35-.49-2.57-1.57-.95-.84-1.59-1.88-1.78-2.2-.18-.32-.02-.49.14-.65.14-.14.32-.37.48-.56.16-.18.21-.32.32-.53.11-.21.05-.4-.03-.56-.08-.16-.71-1.7-.97-2.33-.26-.61-.52-.53-.71-.54h-.61c-.21 0-.56.08-.85.4-.29.32-1.11 1.08-1.11 2.63s1.14 3.05 1.3 3.26c.16.21 2.24 3.4 5.42 4.77.76.33 1.35.52 1.81.67.76.24 1.45.21 2 .13.61-.09 1.89-.77 2.16-1.51.26-.74.26-1.38.18-1.51-.08-.13-.29-.21-.61-.37Z" />
        </svg>
      </a>
    </div>
  );
}
