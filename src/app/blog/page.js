import Image from "next/image";
import Link from "next/link";

export default function Blog() {
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
                            OUR BLOG
                        </div>
                        <h1 className="text-5xl font-extrabold text-[#0B1B3D] leading-tight mb-6">
                            Insights, Tips & <br /> Trends  for <span className="text-blue-600">Digital Success</span>
                        </h1>
                        <p className="text-gray-600 text-lg leading-relaxed mb-10 pr-4">
                            Stay updated with the latest insights on web development, AI, SEO, automation and digital strategy to grow your business online.
                        </p>
                        
                        {/* Search Bar */}
                        <div className="flex items-center w-full max-w-md bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:border-blue-300 hover:shadow-md transition-all duration-300">
                            <input 
                                type="text" 
                                placeholder="Search articles..." 
                                className="flex-grow px-5 py-4 outline-none text-gray-700 placeholder-gray-400"
                            />
                            <button className="bg-blue-600 text-white p-4 hover:bg-blue-700 transition-colors flex-shrink-0 h-full">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Right Column - Image */}
                    <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] flex justify-end items-center">
                        <div className="relative w-full h-full">
                           <Image 
                               src="/img26.png" 
                               alt="Blog Hero Image" 
                               fill
                               className="object-contain lg:object-right scale-110 lg:scale-125 origin-center lg:origin-right"
                               priority
                           />
                        </div>
                    </div>

                </div>

                {/* Categories Navigation Bar */}
                <div className=" mb-10 w-full overflow-x-auto no-scrollbar">
                    <div className="flex items-center justify-between min-w-max gap-8 px-6 py-4 bg-[#F8FAFC] rounded-2xl">
                        <button className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-semibold text-sm shadow-md hover:bg-blue-700 transition-colors">
                            All Articles
                        </button>
                        <button className="text-gray-600 font-semibold text-sm hover:text-blue-600 transition-colors">
                            Web Development
                        </button>
                        <button className="text-gray-600 font-semibold text-sm hover:text-blue-600 transition-colors">
                            SEO
                        </button>
                        <button className="text-gray-600 font-semibold text-sm hover:text-blue-600 transition-colors">
                            AI & Automation
                        </button>
                        <button className="text-gray-600 font-semibold text-sm hover:text-blue-600 transition-colors">
                            Digital Strategy
                        </button>
                        <button className="text-gray-600 font-semibold text-sm hover:text-blue-600 transition-colors">
                            Business Growth
                        </button>
                        <button className="text-gray-600 font-semibold text-sm hover:text-blue-600 transition-colors">
                            Tools & Resources
                        </button>
                    </div>
                </div>

                {/* ─── BLOG GRID SECTION ─── */}
                <section className="grid grid-cols-1 lg:grid-cols-4 gap-6 pb-20">
                    
                    {/* Main Content (Left 3 Columns) */}
                    <div className="lg:col-span-3 space-y-6">
                        
                        {/* Top Row (Featured + Stacked) */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            
                            {/* Featured Post */}
                            <div className="md:col-span-2 bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col hover:shadow-lg transition-shadow">
                                <div className="relative h-64 md:h-80 w-full p-4 pb-0">
                                     <div className="relative w-full h-full rounded-2xl overflow-hidden">
                                         
                                         <Image src="/img8.png" alt="Featured SEO" fill className="object-cover" />
                                     </div>
                                </div>
                                <div className="p-6 md:p-8 flex-grow flex flex-col">
                                    <div className="flex items-center gap-3 text-xs font-semibold text-gray-500 mb-4">
                                        <span className="text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md">SEO</span>
                                        <span>•</span>
                                        <span>May 10, 2024</span>
                                        <span>•</span>
                                        <span>8 min read</span>
                                    </div>
                                    <h2 className="text-2xl md:text-3xl font-extrabold text-[#0B1B3D] mb-4 leading-tight">
                                        New SEO Strategies to Rank Higher in 2024
                                    </h2>
                                    <p className="text-gray-600 mb-6 leading-relaxed flex-grow">
                                        Discover the latest SEO techniques, Google algorithm updates, and proven strategies to boost your website ranking and organic traffic.
                                    </p>
                                    <Link href="#" className="text-blue-600 font-bold hover:text-blue-700 flex items-center gap-1.5 mt-auto">
                                        Read More 
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                                    </Link>
                                </div>
                            </div>

                            {/* Stacked Small Posts */}
                            <div className="md:col-span-1 flex flex-col gap-4 justify-between">
                                {[
                                    { img: "/img9.png", cat: "AI & Automation", date: "May 8, 2024", read: "6 min read", title: "How AI Automation Can Transform Your Business" },
                                    { img: "/img10.png", cat: "Web Development", date: "May 5, 2024", read: "7 min read", title: "Top 10 Web Development Trends in 2024" },
                                    { img: "/img11.png", cat: "Digital Strategy", date: "May 3, 2024", read: "5 min read", title: "Digital Strategy That Drives Real Business Growth" }
                                ].map((post, i) => (
                                    <div key={i} className="bg-white rounded-3xl border border-gray-100 shadow-sm p-4 flex flex-col md:flex-row lg:flex-col xl:flex-row gap-4 hover:shadow-md transition-shadow h-full justify-center">
                                        <div className="relative w-full h-32 md:h-auto md:w-24 lg:w-full lg:h-32 xl:w-24 xl:h-24 rounded-2xl overflow-hidden flex-shrink-0">
                                            <Image src={post.img} alt={post.title} fill className="object-cover" />
                                        </div>
                                        <div className="flex flex-col justify-center flex-grow">
                                            <div className="flex items-center gap-2 text-[10px] text-gray-500 mb-2 flex-wrap font-medium">
                                                <span className="text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">{post.cat}</span>
                                                <span>•</span>
                                                <span>{post.date}</span>
                                            </div>
                                            <h3 className="text-sm font-bold text-[#0B1B3D] leading-snug mb-2 line-clamp-2">
                                                {post.title}
                                            </h3>
                                            <Link href="#" className="text-blue-600 font-bold hover:text-blue-700 text-xs flex items-center gap-1 mt-auto">
                                                Read More 
                                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            
                        </div>

                        {/* Bottom Rows (Standard Cards) */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[
                                { img: "/img12.png", cat: "Web Development", date: "Apr 30, 2024", read: "6 min read", title: "Clean Code Practices for Better Web Development", desc: "Write cleaner, scalable, and maintainable code with these best practices every developer should follow." },
                                { img: "/img13.png", cat: "Tools & Resources", date: "Apr 28, 2024", read: "5 min read", title: "Best Tools Every Developer Should Use in 2024", desc: "Boost your productivity with these must-have tools for coding, testing, and project management." },
                                { img: "/img14.png", cat: "Web Development", date: "Apr 25, 2024", read: "9 min read", title: "UI/UX Design Trends That Users Love", desc: "Explore the latest UI/UX design trends that enhance user experience and drive better engagement." },
                                { img: "/img15.png", cat: "E-commerce", date: "Apr 22, 2024", read: "6 min read", title: "How to Increase Sales on Shopify Store", desc: "Proven tips and strategies to optimize your Shopify store and increase conversions." },
                                { img: "/img16.png", cat: "Web Development", date: "Apr 20, 2024", read: "5 min read", title: "WordPress Performance Optimization Guide", desc: "Speed up your WordPress website with these simple and effective optimization techniques." },
                                { img: "/img17.png", cat: "Security", date: "Apr 18, 2024", read: "6 min read", title: "Website Security Best Practices in 2024", desc: "Protect your website from common threats and keep your data and users safe." },
                            ].map((post, i) => (
                                <div key={i} className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col hover:shadow-lg transition-shadow p-3">
                                    <div className="relative h-48 w-full rounded-2xl overflow-hidden mb-5">
                                        <Image src={post.img} alt={post.title} fill className="object-cover hover:scale-105 transition-transform duration-500" />
                                    </div>
                                    <div className="px-3 pb-4 flex-grow flex flex-col">
                                        <div className="flex items-center gap-2 text-[10px] text-gray-500 mb-3 flex-wrap font-medium">
                                            <span className="text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">{post.cat}</span>
                                            <span>•</span>
                                            <span>{post.date}</span>
                                            <span>•</span>
                                            <span>{post.read}</span>
                                        </div>
                                        <h3 className="text-lg font-bold text-[#0B1B3D] leading-tight mb-3 line-clamp-2 min-h-[2.8rem]">
                                            {post.title}
                                        </h3>
                                        <p className="text-gray-500 text-sm mb-5 leading-relaxed line-clamp-2">
                                            {post.desc}
                                        </p>
                                        <Link href="#" className="text-blue-600 font-bold hover:text-blue-700 text-sm flex items-center gap-1.5 mt-auto">
                                            Read More 
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>

                    {/* Sidebar (Right 1 Column) */}
                    <div className="lg:col-span-1 space-y-20">
                        
                        {/* Search Widget */}
                        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
                            <h3 className="text-lg font-bold text-[#0B1B3D] mb-4">Search</h3>
                            <div className="flex items-center w-full bg-white border border-gray-200 rounded-xl overflow-hidden focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all">
                                <input 
                                    type="text" 
                                    placeholder="Search articles..." 
                                    className="flex-grow px-4 py-3 outline-none text-gray-700 placeholder-gray-400 bg-transparent text-sm"
                                />
                                <button className="bg-blue-600 text-white p-3 hover:bg-blue-700 transition-colors m-1 rounded-lg">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* Categories Widget */}
                        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
                            <h3 className="text-lg font-bold text-[#0B1B3D] mb-4">Categories</h3>
                            <ul className="space-y-4">
                                {[
                                    { name: "Web Development", count: 24 },
                                    { name: "SEO", count: 18 },
                                    { name: "AI & Automation", count: 16 },
                                    { name: "Digital Strategy", count: 14 },
                                    { name: "Business Growth", count: 12 },
                                    { name: "Tools & Resources", count: 10 },
                                ].map((cat, i) => (
                                    <li key={i}>
                                        <Link href="#" className="flex justify-between items-center group">
                                            <span className="text-gray-600 text-sm font-semibold group-hover:text-blue-600 flex items-center gap-3 transition-colors">
                                                <svg className="w-3.5 h-3.5 text-gray-400 group-hover:text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
                                                {cat.name}
                                            </span>
                                            <span className="bg-gray-50 text-gray-500 text-xs font-medium py-1 px-3 rounded-full group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                                                {cat.count}
                                            </span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Popular Posts Widget */}
                        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
                            <h3 className="text-lg font-bold text-[#0B1B3D] mb-6">Popular Posts</h3>
                            <div className="space-y-6">
                                {[
                                    { img: "/img8.png",  date: "May 10, 2024", title: "New SEO Strategies to Rank Higher in 2024" },
                                    { img: "/img9.png",  date: "May 8, 2024",  title: "How AI Automation Can Transform Your Business" },
                                    { img: "/img10.png", date: "May 5, 2024",  title: "Top 10 Web Development Trends in 2024" },
                                    { img: "/img11.png", date: "May 3, 2024",  title: "Digital Strategy That Drives Real Growth" },
                                ].map((post, i) => (
                                    <div key={i} className="flex gap-4 group cursor-pointer items-center">
                                        <div className="relative w-16 h-16 rounded-2xl overflow-hidden flex-shrink-0">
                                            <Image src={post.img} alt={post.title} fill className="object-cover group-hover:scale-110 transition-transform duration-300" />
                                        </div>
                                        <div className="flex flex-col justify-center">
                                            <h4 className="text-sm font-bold text-[#0B1B3D] leading-snug mb-1 group-hover:text-blue-600 transition-colors">
                                                {post.title}
                                            </h4>
                                            <span className="text-[11px] font-medium text-gray-400">{post.date}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Newsletter Widget */}
                        <div className="bg-gradient-to-br from-[#F5F3FF] to-[#EDE9FE] rounded-3xl border border-purple-100 p-8 shadow-sm relative overflow-hidden">
                            <div className="absolute top-6 right-6 bg-white p-2.5 rounded-2xl shadow-sm text-blue-600 rotate-12">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M21 2.5a1.5 1.5 0 00-1.85-.45L2.15 9.05a1.5 1.5 0 00-.23 2.68l4.48 2.69 2.5 6.24a1.5 1.5 0 002.73.18l3.05-4.27 4.17 2.5A1.5 1.5 0 0021 17.5V4a1.5 1.5 0 000-1.5zM6.55 12.33L3.8 10.68l13.6-5.44-10.85 7.1z"/></svg>
                            </div>
                            <h3 className="text-xl font-extrabold text-[#0B1B3D] mb-3 leading-tight relative z-10 w-4/5">
                                Subscribe to <span className="text-blue-600">Our Newsletter</span>
                            </h3>
                            <p className="text-sm text-gray-600 mb-6 relative z-10 font-medium">
                                Get the latest insights and updates delivered to your inbox.
                            </p>
                            <div className="flex flex-col gap-3 relative z-10">
                                <input 
                                    type="email" 
                                    placeholder="Enter your email" 
                                    className="w-full px-5 py-3.5 rounded-xl border-none bg-white text-sm outline-none text-gray-700 focus:ring-2 focus:ring-blue-600 shadow-sm font-medium placeholder-gray-400"
                                />
                                <button className="w-full bg-blue-600 text-white font-bold py-3.5 rounded-xl hover:bg-blue-700 transition-colors shadow-md text-sm">
                                    Subscribe
                                </button>
                            </div>
                        </div>

                    </div>

                </section>

            </main>
        </div>
    );
}
