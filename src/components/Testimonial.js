import Image from "next/image";

export default function Testimonial() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16 lg:py-24 relative">
        <div className="text-center mb-16 flex flex-col items-center">
          <span className="text-sm font-bold text-blue-600 tracking-wider uppercase mb-3 block">What Our Clients Say</span>
          <h2 className="text-4xl lg:text-5xl font-bold text-[#0B1B3D] mb-6">Client Testimonials</h2>
          <div className="w-12 h-1 bg-blue-300 rounded-full"></div>
        </div>

        <div className="flex flex-col md:flex-row justify-center gap-6">
          
          {/* Testimonial Card 1 */}
          <div className="bg-white border border-gray-200 p-6 md:px-8 md:py-6 rounded-[2rem] shadow-[0_4px_25px_-5px_rgba(0,0,0,0.05)] hover:shadow-lg transition-shadow relative max-w-lg mx-auto w-full">
            <div className="flex justify-between items-start mb-6">
              <div className="flex gap-1 text-[#FFC107]">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <svg className="w-10 h-10 text-gray-200" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
            </div>
            
            <p className="text-gray-600 text-lg leading-relaxed mb-8 min-h-[90px]">
              TechNova built an amazing website for our business. Their professionalism, attention to detail and quick support exceeded our expectations.
            </p>

            <div className="flex items-center gap-4">
              <div className="relative w-14 h-14 rounded-full overflow-hidden flex-shrink-0 bg-gray-100">
                <Image src="/img2.jpg" alt="Ali Raza" fill className="object-cover object-top" />
              </div>
              <div>
                <h4 className="font-bold text-[#0B1B3D] text-lg leading-tight">Ali Raza</h4>
                <p className="text-sm text-gray-500 mt-1">CEO, Digitize Solutions</p>
              </div>
            </div>
          </div>

          {/* Testimonial Card 2 */}
          <div className="bg-white border border-gray-200 p-6 md:px-8 md:py-6 rounded-[2rem] shadow-[0_4px_25px_-5px_rgba(0,0,0,0.05)] hover:shadow-lg transition-shadow relative max-w-lg mx-auto w-full">
            <div className="flex justify-between items-start mb-6">
              <div className="flex gap-1 text-[#FFC107]">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <svg className="w-10 h-10 text-gray-200" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
            </div>
            
            <p className="text-gray-600 text-lg leading-relaxed mb-8 min-h-[90px]">
              The AI automation system they developed has completely transformed our workflow. We save hours of manual work every day!
            </p>

            <div className="flex items-center gap-4">
              <div className="relative w-14 h-14 rounded-full overflow-hidden flex-shrink-0 bg-gray-100">
                <Image src="/img3.jpg" alt="Sarah Khan" fill className="object-cover object-top" />
              </div>
              <div>
                <h4 className="font-bold text-[#0B1B3D] text-lg leading-tight">John Doe</h4>
                <p className="text-sm text-gray-500 mt-1">Operations Manager, TechSync</p>
              </div>
            </div>
          </div> 

        </div>
      </section>
  );
}
