import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
    Trophy, MapPin, Clock, Zap, Star, Check, MessageCircle, 
    ArrowRight, Settings, ShieldCheck, HelpCircle, Activity, 
    Phone, Award, Wrench, Shield, ChevronRight, DollarSign
} from 'lucide-react';
import { SectionTitle, PricingCard } from '../components/ui/Cards';
import { CITIES } from '../constants';

export default function CityLandingPage({ defaultCity }) {
    const { cityName } = useParams();
    const citySlug = cityName || (defaultCity ? defaultCity.toLowerCase().replace(/ /g, '-') : 'velachery');
    const currentCity = CITIES.find(c => c.toLowerCase().replace(/ /g, '-') === citySlug) || 
                       citySlug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    
    return (
        <div className="selection:bg-gold selection:text-black bg-[#0A0F1C] min-h-screen relative overflow-x-hidden text-white font-display">
            {/* Top Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />

            {/* Hero Section - Exactly matching Reference Scale */}
            <section className="relative pt-32 pb-20 px-6 overflow-hidden">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    <div className="lg:col-span-7 space-y-8">
                        {/* Status Badge - Moved from corner to top */}
                        <motion.div 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="inline-flex flex-col gap-0.5 border-l-2 border-gold pl-4 py-1"
                        >
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-accent/60">Top Rated Facility</span>
                            <span className="text-xs font-black uppercase tracking-widest text-gold">Serving {currentCity}</span>
                        </motion.div>

                        <motion.h1 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-2xl md:text-5xl font-black leading-tight tracking-tight text-white mb-0 uppercase italic"
                        >
                            Professional <br />
                            <span className="gold-text-gradient">Badminton Stringing</span> <br />
                            In {currentCity}
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-slate-400 text-lg md:text-xl leading-relaxed max-w-xl font-medium"
                        >
                            Trusted by thousands in Chennai for fast, reliable, and professional racket stringing services.
                        </motion.p>

                        <div className="flex flex-col sm:flex-row gap-4 pt-2">
                            <a href="https://wa.me/919444606191" className="flex items-center justify-center gap-3 bg-white text-black px-8 py-4 rounded-[2rem] text-base font-bold hover:scale-105 active:scale-95 transition-all shadow-lg hover:shadow-white/10">
                                <MessageCircle className="size-5 fill-[#25D366] text-[#25D366]" />
                                WhatsApp
                            </a>
                        </div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="lg:col-span-5 relative"
                    >
                         <div className="relative w-full aspect-[4/3] rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl bg-[#161C2C]">
                            <img 
                                src="/hero-illustration.png" 
                                alt="Service Illustration"
                                className="w-full h-full object-cover opacity-90"
                            />
                            {/* Decorative Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1C] via-transparent to-transparent opacity-40" />
                         </div>
                    </motion.div>
                </div>
            </section>

            {/* About & Enquiry Section - White Background for Differentiation */}
            <section className="py-24 px-6 bg-white">
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16">
                    {/* Main Content Area */}
                    <div className="lg:w-2/3 space-y-12">
                        <div className="space-y-6">
                            <h2 className="text-3xl md:text-4xl font-black text-slate-900 italic uppercase tracking-tighter leading-tight">
                                About Our Badminton <br />
                                <span className="text-primary-dark">Stringing Services In {currentCity}</span>
                            </h2>
                            <p className="text-slate-600 text-base md:text-lg leading-relaxed font-medium">
                                Are you facing issues with your racket's performance? We provide top-notch <span className="text-slate-900 font-black decoration-gold/30 decoration-4">Badminton Stringing Services in {currentCity}</span>. Whether it's a tension drop, snapped strings, or grommet damage, our skilled technicians are equipped to handle it all.
                            </p>
                            <p className="text-slate-500 text-lg md:text-xl leading-relaxed font-medium">
                                We use only genuine high-performance strings like Yonex, Li-Ning, and Ashaway, paired with advanced constant-pull digital machines to ensure your racket is restored to its peak performance condition. Experience hassle-free, elite-level service with <span className="text-gold-dark font-black">Country Sports</span>.
                            </p>
                        </div>

                        {/* Why Choose Section Inner */}
                        <div className="space-y-12 pt-12 border-t border-slate-100">
                            <div className="text-center lg:text-left space-y-3">
                                <h3 className="text-4xl font-black text-slate-900 uppercase italic tracking-tighter">Why Choose Country Sports?</h3>
                                <p className="text-slate-400 font-bold uppercase text-xs tracking-[0.3em]">Your trusted partner for reliable, fast, and pro-grade care.</p>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {[
                                    { icon: DollarSign, title: "Affordable Cost", desc: "We provide budget-friendly stringing services with transparent pricing—no hidden charges." },
                                    { icon: Zap, title: "Fast Service", desc: "Our technicians ensure quick diagnosis and pick-up to restore your racket to power without delays." },
                                    { icon: Award, title: "Experience", desc: "With 10+ years of experience, our experts handle all major brands including Yonex, Victor, and Li-Ning." }
                                ].map((item, i) => (
                                    <div key={i} className="p-8 rounded-[2.5rem] bg-slate-50 border border-slate-100 hover:border-gold/40 hover:shadow-xl transition-all group">
                                        <div className="size-14 rounded-2xl bg-gold/10 flex items-center justify-center text-gold-dark mb-6 group-hover:bg-gold group-hover:text-black transition-all">
                                            <item.icon className="size-7" />
                                        </div>
                                        <h4 className="text-xl font-black text-slate-900 mb-3">{item.title}</h4>
                                        <p className="text-slate-500 text-sm font-medium leading-relaxed">{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar Area - Refined Alignment */}
                    <aside className="lg:w-1/3">
                        <div className="sticky top-24 space-y-6">
                            {/* Get a Callback Form */}
                            <div className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-2xl space-y-8 relative overflow-hidden border border-slate-100">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 rounded-full -mr-16 -mt-16 blur-3xl pointer-events-none" />
                                <div className="space-y-2 relative z-10">
                                    <h4 className="text-2xl font-black text-slate-900 leading-none italic uppercase tracking-tighter">Get a Callback</h4>
                                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Priority queue for {currentCity}</p>
                                </div>
                                <form className="space-y-4 relative z-10">
                                    <input type="text" placeholder="Your Name *" className="w-full px-6 py-4 rounded-xl bg-slate-50 border border-slate-100 text-slate-900 placeholder:text-slate-400 font-bold focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all text-sm" />
                                    <input type="tel" placeholder="Phone Number *" className="w-full px-6 py-4 rounded-xl bg-slate-50 border border-slate-100 text-slate-900 placeholder:text-slate-400 font-bold focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all text-sm" />
                                    <div className="relative">
                                        <select className="w-full px-6 py-4 rounded-xl bg-slate-50 border border-slate-100 text-slate-500 font-bold focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all appearance-none cursor-pointer text-sm">
                                            <option>Select Service</option>
                                            <option>Badminton Gutting</option>
                                            <option>High-Tension Stringing</option>
                                        </select>
                                        <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                            <ChevronRight className="size-4 rotate-90" />
                                        </div>
                                    </div>
                                    <textarea placeholder="Message (Optional)" rows="3" className="w-full px-6 py-4 rounded-xl bg-slate-50 border border-slate-100 text-slate-900 placeholder:text-slate-400 font-bold focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all text-sm"></textarea>
                                    <button className="w-full py-5 btn-gold shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all">Request Call</button>
                                </form>
                            </div>

                            {/* Service Area Map - Better Aligned */}
                            <div className="bg-[#161C2C] rounded-[2.5rem] p-8 border border-white/10 space-y-6 overflow-hidden relative shadow-2xl">
                                <div className="space-y-1 relative z-10">
                                    <h4 className="text-xl font-black text-white italic uppercase tracking-tighter">Service Area: {currentCity}</h4>
                                    <div className="flex items-center gap-2">
                                        <div className="size-2 bg-accent rounded-full animate-pulse" />
                                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Active Technician Nearby</span>
                                    </div>
                                </div>
                                <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-white/5 relative group shadow-inner bg-slate-900">
                                    <img src="/location-map.png" alt="Service Map" className="w-full h-full object-cover grayscale opacity-50 group-hover:opacity-80 group-hover:grayscale-0 transition-all duration-700" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#161C2C] to-transparent opacity-60" />
                                    <a href="https://share.google/76WsOZhpxNPNbosmc" target="_blank" rel="noopener noreferrer" className="absolute bottom-4 right-4 glass px-4 py-2 rounded-full text-[10px] font-black uppercase text-accent border border-accent/30 hover:bg-accent hover:text-white transition-all">Open in Maps</a>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </section>

            {/* Brands We Service Section - Compact & Refined */}
            <section className="py-12 px-6 bg-[#0E1322] border-t border-white/5">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white/5 rounded-[2.5rem] p-8 md:p-10 border border-white/10 text-center space-y-8 group relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full -mr-32 -mt-32 blur-[60px] pointer-events-none" />
                        
                        <div className="space-y-3 relative z-10">
                            <h3 className="text-2xl md:text-3xl font-black text-white uppercase italic tracking-tighter leading-none">Racket Brands We Service</h3>
                            <div className="h-1 w-16 bg-gold mx-auto rounded-full" />
                        </div>

                        <div className="relative rounded-[2rem] overflow-hidden bg-white shadow-xl group-hover:scale-[1.01] transition-all duration-700 max-w-lg mx-auto border-4 border-white/5">
                            <img 
                                src="/badminton-brands.png" 
                                alt="Badminton Brands We Service" 
                                className="w-full h-auto object-contain p-4 md:p-6"
                            />
                            {/* Link Overlay */}
                            <div className="absolute inset-0 grid grid-cols-2">
                                {[
                                    "Yonex", "Victor", "Li-Ning", "Ashaway", 
                                    "Babolat", "Apacs", "Mizuno", "Kawasaki"
                                ].map((brand) => (
                                    <Link 
                                        key={brand}
                                        to={`/brands/${brand.toLowerCase().replace(/ /g, '-')}`}
                                        className="w-full h-full cursor-pointer hover:bg-gold/5 transition-colors"
                                        title={`View ${brand} Expertise`}
                                    />
                                ))}
                            </div>
                        </div>

                        <p className="text-slate-500 font-bold uppercase text-[9px] tracking-[0.3em] relative z-10">
                            Expert handling for all professional series
                        </p>
                    </div>
                </div>
            </section>

            {/* Service Process - White background for contrast */}
            <section className="py-32 px-6 bg-white border-y border-slate-100">
                <div className="max-w-7xl mx-auto space-y-16">
                    <SectionTitle dark={false} subtitle="A specialized workflow designed for professional series rackets.">
                        Our Service Process
                    </SectionTitle>
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                        {[
                            { step: "01", icon: MessageCircle, title: "Book Appointment", desc: "Contact us on WhatsApp to secure your service slot." },
                            { step: "02", icon: Wrench, title: "Expert Inspection", desc: "Free frame health check and tension consultation." },
                            { step: "03", icon: Zap, title: "Digital Stringing", desc: "Electronic constant pull tensioning for precision." },
                            { step: "04", icon: Star, title: "Ready to Play", desc: "Pick up your racket and dominate the court." }
                        ].map((item, i) => (
                            <div key={i} className="p-10 rounded-[2.5rem] bg-slate-50 border border-slate-100 space-y-6 hover:shadow-2xl hover:-translate-y-2 transition-all group overflow-hidden relative">
                                <div className="absolute -top-4 -right-4 text-6xl font-black text-slate-100 group-hover:text-gold/10 transition-colors pointer-events-none">{item.step}</div>
                                <div className="size-14 rounded-2xl bg-white shadow-sm flex items-center justify-center text-gold-dark group-hover:bg-gold group-hover:text-black transition-all">
                                    <item.icon className="size-7" />
                                </div>
                                <h4 className="text-2xl font-black text-slate-900">{item.title}</h4>
                                <p className="text-slate-500 text-sm leading-relaxed font-medium">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Specialized Service Labor */}
            <section className="py-24 px-6 max-w-7xl mx-auto">
                <SectionTitle subtitle={`Premium racket care at the best rates in ${currentCity}.`}>
                    Specialized Service Labor
                </SectionTitle>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
                    <PricingCard 
                        title="Standard Service" 
                        price="350" 
                        features={[
                            "Digital Precision Pull",
                            "Free Frame Health Check",
                            "24-48 Hour Turnaround",
                            "All Racket Brands Supported",
                            "Free Tension Consultation"
                        ]} 
                        delay={0.1} 
                    />
                    <PricingCard 
                        title="Express Elite" 
                        price="600" 
                        popular={true} 
                        features={[
                            "3-Hour Urgent Stringing",
                            "Full Grommet Replacement",
                            "Priority Slot Booking",
                            "Advanced Protective Coating",
                            "Premium Overgrip Included"
                        ]} 
                        delay={0.2} 
                    />
                </div>
            </section>

            {/* FAQ Section - White background */}
            <section className="py-24 px-6 bg-slate-50 border-t border-slate-100">
                <div className="max-w-4xl mx-auto space-y-16">
                     <SectionTitle dark={false} subtitle="Frequently asked questions about our racket care services.">
                        Common Queries
                     </SectionTitle>
                     <div className="grid grid-cols-1 gap-4">
                        {[
                            { q: `Is doorstep stringing available in ${currentCity}?`, a: `Yes, for players in ${currentCity}, we offer doorstep pickup and drop-off services for orders of 2 or more rackets. Standard service can be done at our Velachery hub with 24-hour turnaround.` },
                            { q: "What machines do you use for stringing?", a: "We use professional electronic constant-pull machines (Yonex Protech standard) that eliminate the tension drops associated with manual crank machines." },
                            { q: "Do you have strings in stock?", a: "We carry a full range of Yonex, Li-Ning, and Victor strings including popular models like BG65, BG80, and Exbolt 65." },
                            { q: "What is the turnaround time?", a: "Standard stringing takes 24-48 hours. Express Elite service can be completed in as little as 3 hours." }
                        ].map((faq, i) => (
                            <div key={i} className="p-10 rounded-3xl bg-white border border-slate-100 shadow-sm space-y-4 hover:shadow-md transition-all">
                                <h4 className="text-xl font-black italic text-slate-900 flex items-center gap-3">
                                    <HelpCircle className="size-5 text-gold" />
                                    {faq.q}
                                </h4>
                                <p className="text-slate-500 font-medium leading-relaxed pl-8">{faq.a}</p>
                            </div>
                        ))}
                     </div>
                </div>
            </section>

            {/* Serving All Areas - SEO Web */}
            <section className="py-32 px-6 border-t border-white/5 text-center relative overflow-hidden bg-background-dark/50">
                {/* Subtle Background Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />
                
                <div className="max-w-7xl mx-auto space-y-16 relative z-10">
                    <div className="space-y-4">
                        <motion.h5 
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="text-[12px] font-black uppercase tracking-[0.5em] text-accent/60"
                        >
                            Serving All Major Areas Near {currentCity}
                        </motion.h5>
                        <div className="h-px w-20 bg-accent/20 mx-auto" />
                    </div>

                    <div className="flex flex-wrap justify-center gap-x-10 gap-y-6 max-w-5xl mx-auto">
                        {CITIES.map((city, i) => (
                            <motion.div
                                key={city}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.01 }}
                            >
                                <Link 
                                    to={`/chennai/badminton-stringing-services-in-${city.toLowerCase().replace(/ /g, '-')}`}
                                    className="relative group text-[13px] font-black text-slate-400 hover:text-white uppercase tracking-widest transition-all duration-300 flex items-center gap-2"
                                >
                                    <span className="size-1 rounded-full bg-accent/30 group-hover:bg-accent transition-colors" />
                                    {city}
                                    <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-accent transition-all duration-300 group-hover:w-full" />
                                </Link>
                            </motion.div>
                        ))}
                    </div>

                    <p className="text-slate-500 text-[10px] uppercase tracking-[0.3em] pt-8">
                        Professional Racket Care Available Across Chennai
                    </p>
                </div>
            </section>
        </div>
    );
}


