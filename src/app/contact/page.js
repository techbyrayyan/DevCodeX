import Image from "next/image";

export default function ContactUs() {
  return (
    <div className="min-h-screen bg-white font-sans overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 -z-10 w-full h-full overflow-hidden">
        <div className="absolute top-0 right-[-10%] w-[800px] h-[800px] rounded-full bg-indigo-50/70 blur-3xl"></div>
        <div className="absolute top-[20%] right-[15%] w-[600px] h-[600px] rounded-full bg-blue-50/50 blur-3xl"></div>
      </div>

      {/* ─── HERO SECTION ─── */}
      <main className="max-w-7xl mx-auto px-6 pt-16 lg:pt-24 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column - Content */}
          <div className="max-w-xl">
            <div className="inline-block bg-blue-50 text-blue-600 font-bold px-3 py-1.5 rounded-md text-xs tracking-widest uppercase mb-6">
              CONTACT US
            </div>
            
            <h1 className="text-5xl lg:text-[3.5rem] font-extrabold text-[#0B1B3D] leading-[1.1] mb-6">
              Let's Build Something <br className="hidden md:block" />
              Amazing <span className="text-blue-600">Together</span>
            </h1>
            
            <p className="text-gray-600 text-lg leading-relaxed mb-12 pr-4">
              Have a project in mind or need expert advice? We're here to help you bring your ideas to life with modern technology and smart solutions.
            </p>

            <div className="flex flex-col sm:flex-row gap-8 sm:gap-12">
              {/* Feature 1 */}
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 flex-shrink-0">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#0B1B3D] mb-1">Free Consultation</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    Discuss your idea with<br />our experts
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600 flex-shrink-0">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#0B1B3D] mb-1">Quick Response</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    We reply within<br />24 business hours
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column - Image */}
          <div className="relative w-full h-[400px] flex justify-end items-center">
            <div className="relative w-full h-full">
              <Image
                src="/img19.png"
                alt="Contact Us Illustration"
                fill
                className="object-contain lg:object-right scale-110 lg:scale-125 origin-center lg:origin-right mix-blend-multiply"
                priority
              />
            </div>
          </div>

        </div>

        {/* ─── CONTACT FORM & SIDEBAR ─── */}
        <section className="py-20 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
            
            {/* Left: Contact Form */}
            <div className="lg:col-span-2 bg-white border border-gray-200 rounded-3xl p-8 lg:p-10 shadow-sm">
              <h2 className="text-2xl font-extrabold text-[#0B1B3D] mb-2">Send us a message</h2>
              <p className="text-gray-500 text-sm mb-8">Fill out the form below and we'll get back to you as soon as possible.</p>

              <form className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <input 
                    type="text" 
                    placeholder="Your Name" 
                    className="w-full bg-white border border-gray-200 rounded-xl px-5 py-3.5 text-sm text-gray-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all placeholder-gray-400"
                  />
                  <input 
                    type="email" 
                    placeholder="Your Email" 
                    className="w-full bg-white border border-gray-200 rounded-xl px-5 py-3.5 text-sm text-gray-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all placeholder-gray-400"
                  />
                  <input 
                    type="tel" 
                    placeholder="Phone Number" 
                    className="w-full bg-white border border-gray-200 rounded-xl px-5 py-3.5 text-sm text-gray-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all placeholder-gray-400"
                  />
                  <input 
                    type="text" 
                    placeholder="Subject" 
                    className="w-full bg-white border border-gray-200 rounded-xl px-5 py-3.5 text-sm text-gray-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all placeholder-gray-400"
                  />
                </div>
                
                <textarea 
                  placeholder="Tell us about your project..." 
                  rows="6"
                  className="w-full bg-white border border-gray-200 rounded-xl px-5 py-3.5 text-sm text-gray-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all placeholder-gray-400 resize-none"
                ></textarea>

                <button 
                  type="button" 
                  className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl text-sm transition-colors shadow-md"
                >
                  Send Message
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>

                <div className="flex items-center gap-2 mt-4 text-xs text-gray-500 font-medium">
                  <svg className="w-3.5 h-3.5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                  We respect your privacy. Your information is safe with us.
                </div>
              </form>
            </div>

            {/* Right: Sidebar Info */}
            <div className="space-y-8">
              
              {/* Get in touch */}
              <div>
                <h3 className="text-xl font-extrabold text-[#0B1B3D] mb-6">Get in touch</h3>
                <div className="space-y-6">
                  
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-blue-600 flex-shrink-0">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#0B1B3D]">Call Us</p>
                      <p className="text-sm text-gray-500 mt-0.5">+92 300 1234567</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-blue-600 flex-shrink-0">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#0B1B3D]">Email Us</p>
                      <p className="text-sm text-gray-500 mt-0.5">hello@devcodex.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-blue-600 flex-shrink-0">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#0B1B3D]">Visit Us</p>
                      <p className="text-sm text-gray-500 mt-0.5">Lahore, Pakistan</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-blue-600 flex-shrink-0">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#0B1B3D]">Working Hours</p>
                      <p className="text-sm text-gray-500 mt-0.5">Mon - Sat: 9:00 AM - 6:00 PM</p>
                    </div>
                  </div>

                </div>
              </div>

              {/* Why Contact */}
              <div className="bg-[#F8FAFC] border border-gray-100 rounded-3xl p-8">
                <h3 className="text-lg font-extrabold text-[#0B1B3D] mb-5">Why contact Devcodex?</h3>
                <ul className="space-y-3">
                  {[
                    "Experienced and certified team",
                    "Tailored solutions for your business",
                    "On-time delivery and reliable support",
                    "100% satisfaction guaranteed"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600 font-medium">
                      <span className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

            </div>

          </div>
        </section>

      </main>
    </div>
  );
}
