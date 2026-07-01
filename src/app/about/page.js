import Image from "next/image";
import Link from "next/link";
import Testimonial from "@/components/Testimonial";

export default function About() {
    return (
        <div className="min-h-screen bg-white font-sans overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 right-0 -z-10 w-full h-full overflow-hidden">
                <div className="absolute top-[-10%] right-[-5%] w-[800px] h-[800px] rounded-full bg-blue-50/50 blur-3xl"></div>
                <div className="absolute top-[20%] right-[10%] w-[600px] h-[600px] rounded-full bg-purple-50/50 blur-3xl"></div>
            </div>

            {/* ─── HERO SECTION ─── */}
            <main className="max-w-7xl mx-auto px-6 pt-16 pb-16 lg:pt-24 relative">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                    {/* Left Content */}
                    <div className="flex flex-col items-start z-10">
                        {/* Top Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 mb-4">
                            <span className="text-xs font-bold text-blue-600 tracking-wider">ABOUT DEVCODEX</span>
                        </div>

                        {/* Heading */}
                        <h1 className="text-5xl font-extrabold text-[#0B1B3D] leading-[1.15] tracking-tight mb-6">
                            About{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-purple-800">
                                Devcodex
                            </span>
                        </h1>

                        {/* Description */}
                        <p className="text-lg text-gray-600 mb-5 max-w-xl leading-relaxed">
                            We help businesses build secure, scalable and future-ready digital solutions that drive growth and real results.
                        </p>

                        <p className="text-lg text-gray-600 mb-10 max-w-xl leading-relaxed">
                            From custom websites to AI-powered automation —{" "}
                            we turn your ideas into powerful digital products.
                        </p>

                        {/* Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                            <Link
                                href="/consultation"
                                className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3.5 rounded-xl font-medium transition-colors shadow-lg shadow-blue-200/50"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                Book free consultation
                            </Link>

                            <Link
                                href="/work"
                                className="flex items-center justify-center gap-2 bg-white text-[#0B1B3D] border-2 border-gray-300 hover:border-gray-500 px-6 py-3.5 rounded-xl font-medium transition-colors"
                            >
                                View our work
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </Link>
                        </div>
                    </div>

                    {/* Right Side — Image + Feature Cards side by side */}
                    <div className="z-10 w-full flex justify-center lg:justify-end">
                        <div className="flex flex-row items-stretch gap-4 w-full max-w-[620px]">

                            {/* Main Office Image */}
                            <div className="relative flex-1 rounded-3xl overflow-hidden shadow-2xl min-h-[380px]">
                                <Image
                                    src="/img5.png"
                                    alt="Devcodex Team Office"
                                    fill
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    className="object-cover"
                                    priority
                                />
                            </div>
                        </div>
                    </div>

                </div>
            </main>

            {/* ─── SERVICES SECTION ─── */}
            <section className="max-w-7xl mx-auto px-6 py-16 lg:py-24">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <span className="text-sm font-bold text-blue-600 tracking-widest uppercase mb-3 block">
                        WHAT WE DO
                    </span>
                    <h2 className="text-4xl font-extrabold text-[#0B1B3D] mb-4">
                        End-to-End Digital Solutions
                    </h2>
                    <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
                        We offer a wide range of services to help your business grow online with modern technology and smart strategies.
                    </p>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                    {/* Card 1 — WordPress */}
                    <div className="bg-white border-2 border-gray-300 rounded-3xl p-7  hover:-translate-y-1 transition-all duration-300">
                        <div className="flex flex-col sm:flex-row gap-5 h-full">
                            <div className="w-16 h-16 rounded-2xl bg-[#E8F3FF] flex items-center justify-center flex-shrink-0">
                                <img src="https://cdn.simpleicons.org/wordpress/21759B" alt="WordPress" className="w-8 h-8" />
                            </div>
                            <div className="flex flex-col flex-grow">
                                <h3 className="text-xl font-bold text-[#0B1B3D] mb-2 leading-tight">WordPress Development</h3>
                                <p className="text-sm text-gray-500 mb-6 leading-relaxed flex-grow">
                                    Custom WordPress websites that are fast, secure and easy to manage.
                                </p>
                                <Link href="#" className="inline-flex items-center gap-1.5 text-blue-600 font-semibold hover:text-blue-700 text-sm mt-auto">
                                    Learn more
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Card 2 — Shopify */}
                    <div className="bg-white border-2 border-gray-300 rounded-3xl p-7 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                        <div className="flex flex-col sm:flex-row gap-5 h-full">
                            <div className="w-16 h-16 rounded-2xl bg-[#E8FAED] flex items-center justify-center flex-shrink-0">
                                <img src="https://cdn.simpleicons.org/shopify/95BF47" alt="Shopify" className="w-8 h-8" />
                            </div>
                            <div className="flex flex-col flex-grow">
                                <h3 className="text-xl font-bold text-[#0B1B3D] mb-2 leading-tight">Shopify Development</h3>
                                <p className="text-sm text-gray-500 mb-6 leading-relaxed flex-grow">
                                    High-converting Shopify stores designed to boost your sales and brand.
                                </p>
                                <Link href="#" className="inline-flex items-center gap-1.5 text-blue-600 font-semibold hover:text-blue-700 text-sm mt-auto">
                                    Learn more
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Card 3 — Frontend */}
                    <div className="bg-white border-2 border-gray-300 rounded-3xl p-7 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                        <div className="flex flex-col sm:flex-row gap-5 h-full">
                            <div className="w-16 h-16 rounded-2xl bg-[#F0F5FF] flex items-center justify-center flex-shrink-0">
                                <svg className="w-8 h-8 text-[#4285F4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                                </svg>
                            </div>
                            <div className="flex flex-col flex-grow">
                                <h3 className="text-xl font-bold text-[#0B1B3D] mb-2 leading-tight">Frontend Development</h3>
                                <p className="text-sm text-gray-500 mb-6 leading-relaxed flex-grow">
                                    Modern, responsive and pixel-perfect websites using HTML, CSS, Bootstrap, JavaScript.
                                </p>
                                <Link href="#" className="inline-flex items-center gap-1.5 text-blue-600 font-semibold hover:text-blue-700 text-sm mt-auto">
                                    Learn more
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Card 4 — Backend */}
                    <div className="bg-white border-2 border-gray-300 rounded-3xl p-7 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                        <div className="flex flex-col sm:flex-row gap-5 h-full">
                            <div className="w-16 h-16 rounded-2xl bg-[#F8EEFF] flex items-center justify-center flex-shrink-0">
                                <svg className="w-8 h-8 text-[#9333EA]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                                </svg>
                            </div>
                            <div className="flex flex-col flex-grow">
                                <h3 className="text-xl font-bold text-[#0B1B3D] mb-2 leading-tight">Backend Development</h3>
                                <p className="text-sm text-gray-500 mb-6 leading-relaxed flex-grow">
                                    Robust, scalable and secure backend solutions with modern technologies.
                                </p>
                                <Link href="#" className="inline-flex items-center gap-1.5 text-blue-600 font-semibold hover:text-blue-700 text-sm mt-auto">
                                    Learn more
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Card 5 — AI SaaS */}
                    <div className="bg-white border-2 border-gray-300 rounded-3xl p-7 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                        <div className="flex flex-col sm:flex-row gap-5 h-full">
                            <div className="w-16 h-16 rounded-2xl bg-[#F8EEFF] flex items-center justify-center flex-shrink-0">
                                <svg className="w-7 h-7 text-[#9333EA]" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M4 4h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm0 2v12h16V6H4zm3 3h2v6H7V9zm5 0h4v2h-2v1h2v2h-2v1h2v-2h-2v-1h2v-2h-4V9z" />
                                </svg>
                            </div>
                            <div className="flex flex-col flex-grow">
                                <h3 className="text-xl font-bold text-[#0B1B3D] mb-2 leading-tight">AI SaaS Development</h3>
                                <p className="text-sm text-gray-500 mb-6 leading-relaxed flex-grow">
                                    We build smart AI-powered SaaS products that solve real business problems.
                                </p>
                                <Link href="#" className="inline-flex items-center gap-1.5 text-blue-600 font-semibold hover:text-blue-700 text-sm mt-auto">
                                    Learn more
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Card 6 — AI Automation */}
                    <div className="bg-white border-2 border-gray-300 rounded-3xl p-7 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                        <div className="flex flex-col sm:flex-row gap-5 h-full">
                            <div className="w-16 h-16 rounded-2xl bg-[#F8EEFF] flex items-center justify-center flex-shrink-0">
                                <svg className="w-8 h-8 text-[#9333EA]" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2a2 2 0 012 2c0 .74-.4 1.39-1 1.73V7h3a3 3 0 013 3v2h2a2 2 0 110 4h-2v1a3 3 0 01-3 3H8a3 3 0 01-3-3v-1H3a2 2 0 110-4h2v-2a3 3 0 013-3h3V5.73A2 2 0 0110 4a2 2 0 012-2zm-3 8a1 1 0 100 2 1 1 0 000-2zm6 0a1 1 0 100 2 1 1 0 000-2zm-6 4v1h6v-1H9z" />
                                </svg>
                            </div>
                            <div className="flex flex-col flex-grow">
                                <h3 className="text-xl font-bold text-[#0B1B3D] mb-2 leading-tight">AI Automation Systems</h3>
                                <p className="text-sm text-gray-500 mb-6 leading-relaxed flex-grow">
                                    Automate repetitive tasks and workflows using AI to save time and increase productivity.
                                </p>
                                <Link href="#" className="inline-flex items-center gap-1.5 text-blue-600 font-semibold hover:text-blue-700 text-sm mt-auto">
                                    Learn more
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            {/* ─── HOW WE WORK SECTION ─── */}
            <section className="max-w-7xl mx-auto px-6 py-16 lg:py-24">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <span className="text-sm font-bold text-blue-600 tracking-widest uppercase mb-3 block">
                        HOW WE WORK
                    </span>
                    <h2 className="text-4xl font-extrabold text-[#0B1B3D]">
                        Our Proven Process
                    </h2>
                </div>

                {/* Steps */}
                <div className="relative flex flex-col md:flex-row items-start justify-between gap-10 md:gap-4">

                    {/* Horizontal connector line (desktop only) */}
                    <div className="hidden md:block absolute top-[22px] left-[10%] right-[10%] h-0.5 bg-blue-100 z-0"></div>

                    {/* Step 1 — Discover */}
                    <div className="flex flex-col items-center text-center z-10 flex-1">
                        <div className="w-11 h-11 rounded-full bg-blue-600 flex items-center justify-center mb-5 shadow-md shadow-blue-200">
                            <span className="text-white text-xs font-bold tracking-widest">01</span>
                        </div>
                        <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center mb-4">
                            <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-bold text-[#0B1B3D] mb-2">Discover</h3>
                        <p className="text-sm text-gray-500 leading-relaxed max-w-[160px]">
                            We understand your goals, audience and requirements.
                        </p>
                    </div>

                    {/* Step 2 — Plan */}
                    <div className="flex flex-col items-center text-center z-10 flex-1">
                        <div className="w-11 h-11 rounded-full bg-blue-600 flex items-center justify-center mb-5 shadow-md shadow-blue-200">
                            <span className="text-white text-xs font-bold tracking-widest">02</span>
                        </div>
                        <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center mb-4">
                            <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-bold text-[#0B1B3D] mb-2">Plan</h3>
                        <p className="text-sm text-gray-500 leading-relaxed max-w-[160px]">
                            We create a smart strategy and project roadmap.
                        </p>
                    </div>

                    {/* Step 3 — Build */}
                    <div className="flex flex-col items-center text-center z-10 flex-1">
                        <div className="w-11 h-11 rounded-full bg-blue-600 flex items-center justify-center mb-5 shadow-md shadow-blue-200">
                            <span className="text-white text-xs font-bold tracking-widest">03</span>
                        </div>
                        <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center mb-4">
                            <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-bold text-[#0B1B3D] mb-2">Build</h3>
                        <p className="text-sm text-gray-500 leading-relaxed max-w-[160px]">
                            Our experts build, test and refine your solution.
                        </p>
                    </div>

                    {/* Step 4 — Launch */}
                    <div className="flex flex-col items-center text-center z-10 flex-1">
                        <div className="w-11 h-11 rounded-full bg-blue-600 flex items-center justify-center mb-5 shadow-md shadow-blue-200">
                            <span className="text-white text-xs font-bold tracking-widest">04</span>
                        </div>
                        <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center mb-4">
                            <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-bold text-[#0B1B3D] mb-2">Launch</h3>
                        <p className="text-sm text-gray-500 leading-relaxed max-w-[160px]">
                            We deploy with quality assurance and care.
                        </p>
                    </div>

                    {/* Step 5 — Grow */}
                    <div className="flex flex-col items-center text-center z-10 flex-1">
                        <div className="w-11 h-11 rounded-full bg-blue-600 flex items-center justify-center mb-5 shadow-md shadow-blue-200">
                            <span className="text-white text-xs font-bold tracking-widest">05</span>
                        </div>
                        <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center mb-4">
                            <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-bold text-[#0B1B3D] mb-2">Grow</h3>
                        <p className="text-sm text-gray-500 leading-relaxed max-w-[160px]">
                            We support, optimize and help you scale.
                        </p>
                    </div>

                </div>
            </section>

            {/* ─── TECH STACK SECTION ─── */}
            <section className="max-w-7xl mx-auto px-6 py-16 lg:py-24">
                <div className="text-center mb-10">
                    <span className="text-sm font-bold text-blue-600 tracking-widest uppercase mb-3 block">
                        TECHNOLOGIES WE USE
                    </span>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-[#0B1B3D]">
                        Modern Tech Stack for Modern Solutions
                    </h2>
                </div>
                
                <div className="bg-[#F8FAFC] rounded-3xl py-10 px-8 flex flex-wrap justify-center items-center gap-12 md:gap-16 lg:gap-20">
                    {/* WordPress */}
                    <div className="flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity hover:scale-110 duration-300">
                        <img src="https://cdn.simpleicons.org/wordpress/21759B" alt="WordPress" className="w-12 h-12" />
                    </div>
                    {/* Shopify */}
                    <div className="flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity hover:scale-110 duration-300">
                        <img src="https://cdn.simpleicons.org/shopify/95BF47" alt="Shopify" className="w-12 h-12" />
                    </div>
                    {/* React */}
                    <div className="flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity hover:scale-110 duration-300">
                        <img src="https://cdn.simpleicons.org/react/61DAFB" alt="React" className="w-12 h-12" />
                    </div>
                    {/* Node.js */}
                    <div className="flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity hover:scale-110 duration-300">
                        <img src="https://cdn.simpleicons.org/nodedotjs/339933" alt="Node.js" className="w-12 h-12" />
                    </div>
                    {/* PHP */}
                    <div className="flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity hover:scale-110 duration-300">
                        <img src="https://cdn.simpleicons.org/php/777BB4" alt="PHP" className="w-16 h-12" />
                    </div>
                    {/* JavaScript */}
                    <div className="flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity hover:scale-110 duration-300">
                        <img src="https://cdn.simpleicons.org/javascript/F7DF1E" alt="JavaScript" className="w-11 h-11 rounded" />
                    </div>
                    {/* Docker */}
                    <div className="flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity hover:scale-110 duration-300">
                        <img src="https://cdn.simpleicons.org/docker/2496ED" alt="Docker" className="w-14 h-14" />
                    </div>
                     {/* AWS */}
                    <div className="flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity hover:scale-110 duration-300">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg" alt="AWS" className="w-14 h-14" />
                    </div>
                </div>
            </section>

            {/* ─── TESTIMONIALS SECTION ─── */}
            <Testimonial />

        </div>
    );
}
