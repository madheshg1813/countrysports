import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
    Zap, Star, Check, MessageCircle, 
    Award, Wrench, Shield, ChevronRight
} from 'lucide-react';
import { SectionTitle, PricingCard } from '../components/ui/Cards';
import { BRANDS } from '../constants';

export default function BrandLandingPage() {
    const { brandName } = useParams();
    const brandDisplay = BRANDS.find(b => b.toLowerCase().replace(/ /g, '-') === brandName) || 
                        brandName.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    
    return (
        <div className="selection:bg-gold selection:text-black bg-[#0A0F1C] min-h-screen relative overflow-x-hidden text-white font-display">
            {/* Top Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 px-6 overflow-hidden">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    <div className="lg:col-span-7 space-y-8">
                        {/* Brand Kicker */}
                        <motion.div 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="inline-flex flex-col gap-0.5 border-l-2 border-gold pl-4 py-1"
                        >
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-accent/60">Authorized Strings & Care</span>
                            <span className="text-xs font-black uppercase tracking-widest text-gold">{brandDisplay} Specialist</span>
                        </motion.div>

                        <motion.h1 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-2xl md:text-5xl font-black leading-tight tracking-tight text-white mb-0 uppercase italic"
                        >
                            Expert <br />
                            <span className="gold-text-gradient">{brandDisplay} Racket</span> <br />
                            Stringing Services
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-slate-400 text-lg md:text-xl leading-relaxed max-w-xl font-medium"
                        >
                            Get the best out of your {brandDisplay} racket with our precision digital stringing and genuine {brandDisplay} high-performance strings.
                        </motion.p>

                        <div className="flex flex-col sm:flex-row gap-4 pt-2">
                            <a href="https://wa.me/919444606191" className="flex items-center justify-center gap-3 bg-white text-black px-8 py-4 rounded-[2rem] text-base font-bold hover:scale-105 active:scale-95 transition-all shadow-lg hover:shadow-white/10">
                                <MessageCircle className="size-5 fill-[#25D366] text-[#25D366]" />
                                WhatsApp Enquiry
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
                                alt={`${brandDisplay} Service`}
                                className="w-full h-full object-cover opacity-90"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1C] via-transparent to-transparent opacity-40" />
                         </div>
                    </motion.div>
                </div>
            </section>

            {/* Brand Expertise Section - White Background */}
            <section className="py-24 px-6 bg-white">
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16">
                    <div className="lg:w-2/3 space-y-12">
                        <div className="space-y-6">
                            <h2 className="text-3xl md:text-4xl font-black text-slate-900 italic uppercase tracking-tighter leading-tight">
                                Specialized {brandDisplay} <br />
                                <span className="text-primary-dark">Performance Optimization</span>
                            </h2>
                            <p className="text-slate-600 text-base md:text-lg leading-relaxed font-medium">
                                Every {brandDisplay} racket has a unique frame characteristic and grommet pattern design. Our technicians are specialized in handling the delicate high-tension requirements of {brandDisplay}'s top-tier frames.
                            </p>
                            <p className="text-slate-500 text-lg md:text-xl leading-relaxed font-medium">
                                We utilize <span className="text-slate-900 font-black">Genuine {brandDisplay} Strings</span> and advanced digital constant-pull equipment to ensure your racket holds the intended tension longer and provides the exact "feel" the brand intended.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-12 border-t border-slate-100">
                            {[
                                { title: "Custom Tensioning", desc: `Precise tensioning tailored to ${brandDisplay}'s frame health and player style.` },
                                { title: "Grommet Care", desc: `Complete inspection and replacement of ${brandDisplay} proprietary grommet sets.` }
                            ].map((item, i) => (
                                <div key={i} className="p-8 rounded-[2rem] bg-slate-50 border border-slate-100 hover:border-gold/40 hover:shadow-xl transition-all group">
                                    <h4 className="text-xl font-black text-slate-900 mb-3">{item.title}</h4>
                                    <p className="text-slate-500 text-sm font-medium leading-relaxed">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <aside className="lg:w-1/3 space-y-8">
                        <div className="sticky top-24 space-y-8">
                            <div className="bg-[#161C2C] rounded-[2.5rem] p-10 shadow-2xl space-y-8 relative overflow-hidden border border-white/5">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 rounded-full -mr-16 -mt-16 blur-3xl pointer-events-none" />
                                <div className="space-y-2 relative z-10">
                                    <h4 className="text-2xl font-black text-white leading-none italic uppercase tracking-tighter">Instant Booking</h4>
                                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest leading-none">For {brandDisplay} Gear</p>
                                </div>
                                <form className="space-y-4 relative z-10">
                                    <input type="text" placeholder="Your Name *" className="w-full px-6 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 font-bold focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all text-sm" />
                                    <input type="tel" placeholder="Phone Number *" className="w-full px-6 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 font-bold focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all text-sm" />
                                    <button className="w-full py-5 btn-gold shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all">Book Service</button>
                                </form>
                            </div>
                        </div>
                    </aside>
                </div>
            </section>

            {/* Service Process - Reverted to Dark for Zebra Effect */}
            <section className="py-32 px-6 bg-[#0E1322] border-y border-white/5 relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />
                <div className="max-w-7xl mx-auto space-y-16 relative z-10">
                    <SectionTitle dark={true} subtitle={`Our specialized workflow designed specifically for ${brandDisplay} engineering.`}>
                        Workflow Expertise
                    </SectionTitle>
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                        {[
                            { step: "01", icon: Wrench, title: "Frame Diagnostic", desc: `Deep check for ${brandDisplay} frame integrity and grommet wear.` },
                            { step: "02", icon: Zap, title: "Precision Pull", desc: "Constant pull digital tensioning for zero drop-off." },
                            { step: "03", icon: Star, title: "Tension Lock", desc: "Specialized knotting techniques for brand-spec performance." },
                            { step: "04", icon: Award, title: "Quality Check", desc: "Final inspection under high-intensity light for perfection." }
                        ].map((item, i) => (
                            <div key={i} className="p-8 rounded-[2rem] bg-white/5 border border-white/10 space-y-4 hover:border-gold/30 transition-all group relative">
                                <span className="text-4xl font-black gold-text-gradient block">{item.step}</span>
                                <item.icon className="size-8 text-accent group-hover:scale-110 transition-transform" />
                                <h4 className="text-xl font-black text-white">{item.title}</h4>
                                <p className="text-slate-500 text-sm leading-relaxed font-medium">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Brand Series - White Background */}
            <section className="py-32 px-6 bg-white border-b border-slate-100">
                <div className="max-w-7xl mx-auto">
                    <SectionTitle dark={false} subtitle={`Explore our specialized services for various ${brandDisplay} series.`}>
                        {brandDisplay} Series Expertise
                    </SectionTitle>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            { title: "Pro Series", desc: "Ultra-high tension support for professional rackets." },
                            { title: "Power Series", desc: "Enhanced sweetness spot optimization for heavy hitters." },
                            { title: "Control Series", desc: "Soft-feel stringing for maximum precision shots." }
                        ].map((item, i) => (
                            <div key={i} className="p-10 rounded-[2.5rem] bg-slate-50 border border-slate-100 shadow-sm space-y-4 hover:shadow-xl hover:-translate-y-2 transition-all group">
                                <h4 className="text-2xl font-black text-slate-900 uppercase italic tracking-tighter">{item.title}</h4>
                                <p className="text-slate-500 text-sm font-medium leading-relaxed">{item.desc}</p>
                                <div className="flex items-center gap-2 text-gold-dark font-black text-xs uppercase tracking-[0.2em] pt-4">
                                    <span>Expert certified</span>
                                    <Check className="size-4" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Brands We Service Section - Now using the logo grid for consistency */}
            <section className="py-12 px-6 bg-[#0E1322] border-t border-white/5">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white/5 rounded-[2.5rem] p-8 md:p-10 border border-white/10 text-center space-y-8 group relative overflow-hidden shadow-2xl">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full -mr-32 -mt-32 blur-[60px] pointer-events-none" />
                        
                        <div className="space-y-3 relative z-10">
                            <h3 className="text-2xl md:text-3xl font-black text-white uppercase italic tracking-tighter leading-none">Explore Other Premium Brands</h3>
                            <div className="h-1 w-16 bg-gold mx-auto rounded-full" />
                        </div>

                        <div className="relative rounded-[2rem] overflow-hidden bg-white shadow-xl group-hover:scale-[1.01] transition-all duration-700 max-w-lg mx-auto border-4 border-white/5">
                            <img 
                                src="/badminton-brands.png" 
                                alt="Badminton Brands We Service" 
                                className="w-full h-auto object-contain p-4 md:p-6"
                            />
                            {/* Interactive Link Overlay */}
                            <div className="absolute inset-0 grid grid-cols-2">
                                {[
                                    "Yonex", "Victor", "Li-Ning", "Ashaway", 
                                    "Babolat", "Apacs", "Mizuno", "Kawasaki"
                                ].map((brand) => (
                                    <Link 
                                        key={brand}
                                        to={`/brands/${brand.toLowerCase().replace(/ /g, '-')}`}
                                        className="w-full h-full cursor-pointer hover:bg-gold/5 transition-colors"
                                        title={`Expertise in ${brand}`}
                                    />
                                ))}
                            </div>
                        </div>

                        <p className="text-slate-500 font-bold uppercase text-[9px] tracking-[0.3em] relative z-10">
                            Authorized specialist for all major professional series
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}
