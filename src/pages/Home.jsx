import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { 
    Trophy, MapPin, Clock, Zap, Hand, Cpu, Star, Check, MessageCircle, Home as HomeIcon, Briefcase, DollarSign, Info
} from 'lucide-react';
import { SectionTitle, ServiceCard, PricingCard } from '../components/ui/Cards';

export default function Home() {
    const [activeTab, setActiveTab] = useState('home');
    const navigate = useNavigate();

    return (
        <div className="selection:bg-gold selection:text-black bg-white min-h-screen relative">
            {/* Royal Perspective Frame */}
            <div className="fixed inset-0 pointer-events-none z-[1000] border-[12px] border-background-dark/10 ring-1 ring-gold/20" />
            
            {/* WhatsApp Floating Button */}
            <a 
                href="https://wa.me/919444606191" 
                className="fixed bottom-8 right-8 z-[300] size-16 bg-[#25D366] rounded-full flex items-center justify-center text-white shadow-2xl hover:scale-110 transition-transform"
                target="_blank"
                rel="noopener noreferrer"
            >
                <MessageCircle className="size-8 fill-current" />
            </a>

            {/* Hero Section */}
            <section id="home" className="pt-32 pb-24 px-6 bg-background-dark relative overflow-hidden">
                <div className="absolute inset-0 z-0 opacity-20">
                    <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-accent/20 blur-[120px] rounded-full" />
                </div>
                
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-10">
                    <div className="lg:col-span-7 space-y-8">
                        <motion.h3
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-cyan text-xs md:text-sm"
                        >
                            The Gold Standard in Racket Care
                        </motion.h3>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-6xl md:text-8xl font-black leading-[0.9] tracking-tighter text-white"
                        >
                            Premium <br />
                            <span className="gold-text-gradient italic">Stringing.</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-slate-300 text-xl leading-relaxed max-w-xl font-medium"
                        >
                            Experience Chennai's most precise digital racket care facility. Precision handled by experts.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="flex flex-wrap gap-6 text-sm font-bold text-slate-300"
                        >
                            <div className="flex items-center gap-2">
                                <div className="size-6 rounded-full bg-accent/20 flex items-center justify-center text-accent">
                                    <Zap className="size-3 fill-current" />
                                </div>
                                <span>5x Faster Service</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="size-6 rounded-full bg-accent/20 flex items-center justify-center text-accent">
                                    <Star className="size-3 fill-current" />
                                </div>
                                <span>99% Satisfaction</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="size-6 rounded-full bg-accent/20 flex items-center justify-center text-accent">
                                    <Trophy className="size-3 fill-current" />
                                </div>
                                <span>A+ Technicians</span>
                            </div>
                        </motion.div>

                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <button className="btn-gold font-black py-4 px-10 rounded-2xl transition-all duration-300 shadow-xl shadow-gold/30 flex items-center justify-center gap-2">
                                Book Your Slot
                                <Zap className="size-5 fill-current" />
                            </button>
                            <button className="btn-cyan-soft px-10 py-4 rounded-full font-black text-sm uppercase tracking-widest relative overflow-hidden transition-all duration-200 flex items-center justify-center gap-2">
                                <MessageCircle className="size-5 fill-current" />
                                WhatsApp Expert
                            </button>
                        </div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className="lg:col-span-5 relative"
                    >
                        <div className="relative aspect-square rounded-[3rem] overflow-hidden shadow-2xl bg-slate-900/50 border border-white/10 p-4 backdrop-blur-3xl">
                            <img 
                                src="/hero-illustration.png" 
                                alt="Premium Racket Stringing"
                                className="w-full h-full object-contain"
                            />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Expertise Section */}
            <section className="py-32 bg-background-dark relative overflow-hidden">
                <div className="absolute inset-0 z-0 opacity-10">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gold/20 blur-[150px] rounded-full" />
                </div>
                <div className="max-w-5xl mx-auto px-6 text-center space-y-10 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-gold/20 bg-gold/5 text-gold text-xs font-black uppercase tracking-widest mb-4"
                    >
                        <Trophy className="size-4" />
                        Technological Edge
                    </motion.div>
                    
                    <h2 className="text-4xl md:text-6xl font-black tracking-tight text-white gold-text-gradient">World-Class Craftsmanship</h2>
                    
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        viewport={{ once: true }}
                        className="text-2xl md:text-4xl font-medium text-slate-400 leading-tight"
                    >
                        We don't just pull strings. We optimize your racket's kinetic energy using <span className="gold-text-gradient italic font-black">industrial-grade constant pull electronics</span> to ensure 100% tension consistency across the entire string bed.
                    </motion.p>
                </div>
            </section>

            {/* Brands Section */}
            <section id="brands" className="py-24 px-6 bg-slate-50 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gold/5 -skew-x-12 translate-x-1/4 pointer-events-none" />
                <div className="max-w-7xl mx-auto relative z-10">
                    <SectionTitle subtitle="Precision care for every brand and every player level.">
                        Badminton Specialized Services
                    </SectionTitle>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        <motion.div 
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="bg-white p-10 md:p-14 rounded-[3rem] shadow-premium border border-slate-100 flex flex-col justify-between group hover:shadow-2xl transition-all duration-500"
                        >
                            <div className="space-y-8">
                                <div className="space-y-4">
                                    <h3 className="text-4xl font-black text-slate-900 tracking-tight">Racket Recovery & <span className="text-gold">Pro-Care</span></h3>
                                    <div className="h-1 w-20 bg-gold/30 rounded-full" />
                                </div>
                                <p className="text-slate-500 text-lg leading-relaxed">
                                    We specialize in restoring badminton rackets to their peak performance, covering everything from frame repairs to elite stringing. Our technicians use state-of-the-art diagnostic tools to identify and fix issues with surgical precision.
                                </p>
                                <ul className="space-y-5">
                                    {["High-Tension Digital Stringing", "Racket Frame Integrity Check", "Customized Grip Shaping & Leveling", "Professional Grommet Replacement", "Custom Weight & Balance Tuning"].map((item, i) => (
                                        <li key={i} className="flex items-center gap-4 text-slate-700 font-bold group/item">
                                            <div className="size-6 rounded-full bg-gold/10 flex items-center justify-center text-gold group-hover/item:bg-gold group-hover/item:text-black transition-colors">
                                                <Check className="size-3.5 stroke-[4]" />
                                            </div>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>

                        <motion.div 
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="bg-white p-10 md:p-14 rounded-[3rem] shadow-premium border border-slate-100 flex flex-col hover:shadow-2xl transition-all duration-500"
                        >
                            <div className="space-y-8 h-full">
                                <div className="space-y-4">
                                    <h3 className="text-4xl font-black text-slate-900 tracking-tight">Badminton Brands <span className="text-gold">We Master</span></h3>
                                    <div className="h-1 w-20 bg-gold/30 rounded-full" />
                                </div>
                                <div className="flex-grow">
                                    <div className="rounded-[3rem] overflow-hidden border border-slate-100 bg-white shadow-xl relative group">
                                        <img 
                                            src="/badminton-brands.png" 
                                            alt="Badminton Brands We Master" 
                                            className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-[1.02]" 
                                        />
                                        
                                        {/* Overlay Grid of invisible links matching the image slots */}
                                        <div className="absolute inset-0 grid grid-cols-2">
                                            {[
                                                "Yonex", "Victor", "Li-Ning", "Ashaway", 
                                                "Babolat", "Apacs", "Mizuno", "Kawasaki"
                                            ].map((brand) => (
                                                <Link 
                                                    key={brand}
                                                    to={`/brands/${brand.toLowerCase().replace(/ /g, '-')}`}
                                                    className="w-full h-full cursor-pointer hover:bg-gold/5 transition-colors"
                                                    title={`View ${brand} Series`}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                    
                                    <div className="mt-10 flex flex-wrap justify-center gap-4">
                                        {["Yonex", "Victor", "Li-Ning", "Ashaway"].map((b) => (
                                            <Link 
                                                key={b} 
                                                to={`/brands/${b.toLowerCase().replace(/ /g, '-')}`}
                                                className="px-6 py-2.5 rounded-full bg-slate-100 text-[11px] font-black uppercase tracking-widest text-slate-500 hover:bg-gold hover:text-black transition-all"
                                            >
                                                {b}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Services Grid */}
            <section id="services" className="py-24 px-6 max-w-7xl mx-auto bg-white">
                <SectionTitle subtitle="Professional stringing at the best market price.">
                    Services We Offer
                </SectionTitle>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <ServiceCard icon={Hand} title="Professional Gutting" description="Meticulous hand-threading and knotting techniques for all major brands." delay={0.1} />
                    <ServiceCard icon={Cpu} title="Digital Tension" description="Our machines use constant-pull technology accurate to within 0.1 lbs." delay={0.2} />
                    <ServiceCard icon={Trophy} title="Premium Strings" description="Full selection of BG65, BG80, EXBOLT, and specialized hybrids." delay={0.3} />
                    <ServiceCard icon={Clock} title="Rocket Delivery" description="Express same-day stringing to get you back on court by evening." delay={0.4} />
                </div>
            </section>

            {/* Why Section */}
            <section id="repairs" className="py-32 bg-background-dark border-y border-white/5">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <div className="space-y-12">
                        <h2 className="text-4xl md:text-5xl font-black text-white">Why trust <br /> Country Sports?</h2>
                        <div className="space-y-6">
                            {[
                                { title: "Digital Tension Precision", desc: "No more spring inconsistencies. 100% digital pull." },
                                { title: "Certified Stringing Pro", desc: "Handled by experts with 10+ years in the game." },
                                { title: "Grommet Integrity Check", desc: "We replace damaged grommets for free with every service." }
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    viewport={{ once: true }}
                                    className="flex gap-6 p-6 rounded-2xl bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors border-l-4 border-gold"
                                >
                                    <div className="size-10 rounded-full bg-gold flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(212,175,55,0.3)]">
                                        <Check className="size-5 text-black font-black" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg text-white">{item.title}</h4>
                                        <p className="text-slate-400 text-sm mt-1">{item.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                    <div className="relative">
                        <div className="absolute inset-0 bg-gold/20 blur-[120px] opacity-20" />
                        <div className="relative aspect-video rounded-[2.5rem] overflow-hidden border border-white/10 glass p-2 group">
                            <img src="/workshop-action.png" alt="Workshop" className="w-full h-full object-cover rounded-2xl transition-transform duration-700 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-gradient-to-t from-background-dark/80 via-transparent to-transparent opacity-60" />
                            <div className="absolute bottom-6 left-6 flex items-center gap-2">
                                <div className="size-2 bg-accent rounded-full animate-pulse" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-white/70">Live Workshop Precision</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing */}
            <section id="pricing" className="py-32 px-6 max-w-7xl mx-auto">
                <SectionTitle subtitle="Transparent labor costs. Strings charged at MRP.">
                    Premium Tiers
                </SectionTitle>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    <PricingCard title="Standard" price="350" features={["Digital Tensioning", "24h Turnaround", "Grommet Checkup", "Single Racket Care"]} delay={0.1} />
                    <PricingCard title="Express Pro" price="600" popular={true} features={["3-Hour Express", "Priority Stringing", "Tension Retention Coating", "Full Frame Cleaning"]} delay={0.2} />
                </div>
            </section>

            {/* Performance Path */}
            <section className="py-32 bg-background-dark relative overflow-hidden">
                <div className="absolute inset-0 z-0 opacity-10">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-accent/20 blur-[150px] rounded-full" />
                </div>
                <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
                    <div className="space-y-4 mb-24">
                        <h2 className="text-4xl md:text-6xl font-black tracking-tight text-white uppercase italic">The Performance Path</h2>
                        <div className="h-1.5 w-24 gold-gradient mx-auto rounded-full" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative">
                        {[
                            { n: 1, t: "Consultation", d: "Analyze playstyle to pick the right string & tension." },
                            { n: 2, t: "Preparation", d: "Deep cleaning and grommet replacement checkup." },
                            { n: 3, t: "Dynamic Pull", d: "Pinpoint accuracy using constant-pull electronics." },
                            { n: 4, t: "Ready for Match", d: "Pickup in 24h (Standard) or 3h (Express)." }
                        ].map((step, i) => (
                            <div key={i} className="relative z-10 space-y-8 group">
                                <div className="size-24 rounded-full bg-slate-900 border-2 border-gold/40 mx-auto flex items-center justify-center relative transition-transform duration-500 group-hover:scale-110">
                                    <span className="text-4xl font-black gold-text-gradient italic">{step.n}</span>
                                </div>
                                <div className="space-y-3">
                                    <h4 className="text-xl font-black text-white uppercase tracking-wider group-hover:text-accent">{step.t}</h4>
                                    <p className="text-slate-500 text-sm max-w-[200px] mx-auto">{step.d}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Location */}
            <section id="location" className="py-32 px-6 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="space-y-10">
                        <SectionTitle>Visit the Workshop</SectionTitle>
                        <div className="space-y-8 text-slate-400">
                               <a 
                                   href="https://share.google/76WsOZhpxNPNbosmc" 
                                   target="_blank" 
                                   rel="noopener noreferrer" 
                                   className="flex gap-6 group/location transition-all"
                               >
                                   <div className="size-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0 ring-1 ring-primary/20 group-hover/location:bg-gold/20 group-hover/location:text-gold transition-colors"><MapPin className="size-8" /></div>
                                   <div><h5 className="text-xl font-bold mb-2 text-slate-900 group-hover/location:text-gold transition-colors">Location</h5><p>Country Sports - Velachery</p><p className="text-sm">No. 13, 12th Street, Ashtalakshmi Nagar, Velachery, Chennai - 600 042</p></div>
                               </a>
                           <div className="flex gap-6">
                               <div className="size-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0 ring-1 ring-primary/20"><Clock className="size-8" /></div>
                               <div><h5 className="text-xl font-bold mb-2 text-slate-900">Hours</h5><p>Mon - Sat: 10:00 AM - 08:00 PM</p><p className="text-sm">Sunday: Appointment Only</p></div>
                           </div>
                        </div>
                    </div>
                    <a 
                        href="https://share.google/76WsOZhpxNPNbosmc" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="relative aspect-square md:aspect-video lg:aspect-square rounded-[3rem] overflow-hidden glass border border-white/10 group block"
                    >
                        <img src="/location-map.png" alt="Map" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-gold/0 group-hover:bg-gold/10 transition-colors flex items-center justify-center">
                            <div className="bg-white/90 backdrop-blur px-6 py-3 rounded-full text-black font-black uppercase tracking-widest text-xs opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0">Open in Maps</div>
                        </div>
                    </a>
                </div>
            </section>

            {/* Mobile Nav */}
            <nav className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-[90vw] z-[200] glass border border-white/5 rounded-3xl p-2 flex justify-around items-center shadow-2xl">
                {[
                    { icon: HomeIcon, label: "Home", id: "home" },
                    { icon: Briefcase, label: "Services", id: "services" },
                    { icon: DollarSign, label: "Pricing", id: "pricing" },
                    { icon: MessageCircle, label: "Contact", path: "/contact" }
                ].map(item => (
                    <button 
                        key={item.label} 
                        onClick={() => item.path ? navigate(item.path) : setActiveTab(item.id)} 
                        className={`flex flex-col items-center gap-1 p-3 rounded-2xl transition-all ${activeTab === item.id ? 'bg-primary text-background-dark' : 'text-slate-500'}`}
                    >
                        <item.icon className="size-5" />
                        <span className="text-[10px] font-black uppercase tracking-tighter">{item.label}</span>
                    </button>
                ))}
            </nav>
        </div>
    );
}
