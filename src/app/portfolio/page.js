import Image from 'next/image';
import Link from 'next/link';

export default function Portfolio() {
  const projects = [
    { id: 1, title: 'Food Delivery App', category: 'Web Application', image: '/img22.png', link: 'https://motel-app-bay.vercel.app/' },
    { id: 2, title: 'Clone AI App', category: 'Web Application', image: '/img23.png', link: 'https://clone-ai-nine.vercel.app/' },
    { id: 3, title: 'Testherapy', category: 'Healthcare Website', image: '/img24.png', link: 'https://testherapy.com/' },
    { id: 4, title: 'A1 Cabs Transport', category: 'Transport Website', image: '/img25.png', link: 'https://a1cabs.uk/' },
    { id: 5, title: 'Marukhs Jewels', category: 'E-commerce Website', image: '/img27.png', link: 'https://marukhsjewels.com/home/' },
    { id: 6, title: 'Invoice Builder', category: 'Web Application', image: '/img28.png', link: 'https://invoice-builder-ujch.vercel.app/' },
  ];

  return (
    <main className="font-sans">
      {/* Hero Section */}
      <section className="bg-[#fafbff] min-h-[calc(100vh-80px)] flex items-center w-full relative overflow-hidden">
        {/* Subtle background circles for that premium feel */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/3 w-[800px] h-[800px] bg-indigo-50/60 rounded-full blur-[100px] -z-10"></div>
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/4 w-[600px] h-[600px] bg-blue-100/40 rounded-full blur-[80px] -z-10"></div>

        <div className="max-w-7xl mx-auto px-6 py-12 md:py-24 grid lg:grid-cols-2 gap-12 items-center w-full">
          {/* Left Content */}
          <div className="flex flex-col items-start gap-6 max-w-2xl z-10">
            <div className="bg-blue-100/50 text-blue-700 font-bold text-[10px] sm:text-xs tracking-wider uppercase px-4 py-1.5 rounded-full border border-blue-200/50 backdrop-blur-sm shadow-sm">
              Our Portfolio
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0f172a] leading-[1.1] tracking-tight">
              Our <span className="text-[#4338ca]">Work,</span> Their Success
            </h1>
            
            <p className="text-lg text-gray-600 leading-relaxed max-w-xl font-medium mt-2">
              Explore a selection of projects we've delivered for businesses across different industries. Every project is a story of innovation, dedication and results.
            </p>
            
            <div className="flex flex-wrap items-center gap-4 mt-4">
              <button className="group flex items-center gap-2 bg-[#1d4ed8] hover:bg-[#1e40af] text-white px-7 py-3.5 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                <svg className="w-5 h-5 text-blue-100 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Book free consultation
              </button>
              <button className="group flex items-center gap-2 bg-white text-[#1d4ed8] border-[1.5px] border-[#bfdbfe] hover:border-[#1d4ed8] hover:bg-blue-50/50 px-7 py-3.5 rounded-xl font-semibold transition-all shadow-sm hover:shadow-md">
                Discuss your project
                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative w-full h-[350px] mt-8 lg:mt-0 z-10 flex justify-end">
            <Image
              src="/img21.png"
              alt="Portfolio Showcase Laptop"
              fill
              className="object-contain lg:object-right-center drop-shadow-2xl scale-110 lg:scale-125 transform origin-right"
              priority
            />
          </div>
        </div>
      </section>

      {/* Projects Grid Section */}
      <section className="bg-white py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Featured Projects</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">Discover how we've helped businesses transform their digital presence and achieve their goals through innovative solutions.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div 
                key={project.id} 
                className="group relative bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer flex flex-col"
              >
                {/* Image Container with Link */}
                <Link href={project.link} target={project.link !== '#' ? "_blank" : "_self"} className="block relative h-64 w-full bg-gray-50 overflow-hidden group/link">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover/link:scale-110"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-gray-900/0 to-transparent opacity-0 group-hover/link:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white opacity-0 group-hover/link:opacity-100 font-medium bg-blue-600/90 px-4 py-2 rounded-full transform translate-y-4 group-hover/link:translate-y-0 transition-all duration-300 backdrop-blur-sm shadow-lg border border-blue-400/30 flex items-center gap-2">
                      Visit Site
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                    </span>
                  </div>
                </Link>
                
                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <p className="text-sm font-semibold text-blue-600 mb-2 tracking-wide uppercase">{project.category}</p>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-700 transition-colors">
                    {project.title}
                  </h3>
                  
                  {/* View Details Link */}
                  <div className="mt-auto pt-4 flex items-center text-sm font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                    View Project
                    <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
