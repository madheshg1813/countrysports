import React from 'react';
import { motion } from 'framer-motion';
import { 
    Zap, Trophy, Star, Check, MessageCircle, ChevronRight, Activity, Target, ShieldCheck
} from 'lucide-react';
import { SectionTitle, ServiceCard } from '../components/ui/Cards';

export default function BadmintonService() {
    return (
        <div className="selection:bg-gold selection:text-black bg-white min-h-screen relative pt-20">
            {/* Hero Section */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-background-dark">
                <div className="absolute inset-0 z-0">
                    <img 
                        src="/cta-background.png" 
                        alt="Badminton Action" 
                        className="w-full h-full object-cover opacity-40 scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-background-dark/20 via-background-dark/60 to-background-dark" />
                </div>
                
                <div className="relative z-10 max-w-7xl mx-auto px-6 text-center space-y-8">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-gold/20 bg-gold/5 text-gold text-xs font-black uppercase tracking-widest mb-4"
                    >
                        <Activity className="size-4" />
                        Professional Grade
                    </motion.div>
                    
                    <motion.h1 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-6xl md:text-9xl font-black text-white italic tracking-tighter"
                    >
                        BADMINTON <br />
                        <span className="gold-text-gradient">STRINGING.</span>
                    </motion.h1>
                    
                    <motion.p 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-slate-300 text-xl md:text-2xl max-w-2xl mx-auto font-medium"
                    >
                        Precision handled by certified stringers using world-class digital constant-pull technology.
                    </motion.p>
                </div>
            </section>

            {/* Core Tech Section */}
            <section className="py-24 px-6 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <div className="space-y-12">
                        <div className="space-y-4">
                            <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight">
                                Why Our Stringing <br /> 
                                <span className="text-gold italic">Feels Different</span>
                            </h2>
                            <div className="h-1.5 w-24 gold-gradient rounded-full" />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {[
                                { icon: Zap, title: "Electronic Pull", desc: "No spring error. 100% digital accuracy." },
                                { icon: ShieldCheck, title: "Frame Safety", desc: "6-point mounting prevents frame distortion." },
                                { icon: Target, title: "Knot Precision", desc: "Pro-style starting and finishing knots." },
                                { icon: Activity, title: "Grommet Care", desc: "Every grommet is inspected & replaced for free." }
                            ].map((item, i) => (
                                <motion.div 
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="p-6 rounded-2xl bg-slate-50 border border-slate-100 space-y-4 group hover:bg-white hover:shadow-xl transition-all"
                                >
                                    <div className="size-12 rounded-xl bg-gold/10 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-white transition-colors">
                                        <item.icon className="size-6" />
                                    </div>
                                    <h4 className="font-black text-lg text-slate-900 uppercase tracking-tight">{item.title}</h4>
                                    <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                    
                    <div className="relative aspect-square rounded-[3rem] overflow-hidden royal-border p-4 shadow-2xl">
                        <img 
                            src="/workshop-action.png" 
                            alt="Badminton Stringing" 
                            className="w-full h-full object-cover rounded-[2.5rem]"
                        />
                        <div className="absolute inset-0 bg-gold/10 mix-blend-overlay" />
                    </div>
                </div>
            </section>

            {/* Premium Strings Catalog */}
            <section className="py-24 bg-background-dark text-white relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <SectionTitle subtitle="Original strings sourced directly from authorized brand distributors.">
                        <span className="text-white">The Pro Inventory</span>
                    </SectionTitle>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { brand: "Yonex", model: "BG65", type: "Durability", colors: ["White", "Yellow", "Lavender"] },
                            { brand: "Yonex", model: "EXBOLT 65", type: "Sound & Repulsion", colors: ["White", "Yellow", "Black"] },
                            { brand: "Li-Ning", model: "No. 1", type: "Power & Tension", colors: ["Cyan", "Black", "Pink"] }
                        ].map((string, i) => (
                            <motion.div 
                                key={i}
                                whileHover={{ y: -10 }}
                                className="p-10 rounded-[2.5rem] bg-white/5 border border-white/10 space-y-6"
                            >
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="text-gold font-black uppercase tracking-widest text-[10px] mb-2">{string.brand}</p>
                                        <h3 className="text-3xl font-black italic">{string.model}</h3>
                                    </div>
                                    <Trophy className="size-6 text-gold" />
                                </div>
                                <div className="space-y-4">
                                    <p className="text-slate-400 text-sm font-medium">Primary Focus: <span className="text-white">{string.type}</span></p>
                                    <div className="flex gap-2">
                                        {string.colors.map(c => (
                                            <span key={c} className="px-3 py-1 rounded-full bg-white/10 text-[10px] uppercase font-black text-slate-300 border border-white/5">{c}</span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-32 px-6 max-w-5xl mx-auto text-center space-y-12">
                <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight">Need a restring <br /> <span className="text-gold italic">before your next game?</span></h2>
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                    <button className="btn-gold px-12 py-5 rounded-2xl text-xl">Book a Quick Slot</button>
                    <button className="btn-cyan-soft px-12 py-5 rounded-2xl text-xl">
                        <MessageCircle className="size-6" />
                        Talk to Expert
                    </button>
                </div>
            </section>
        </div>
    );
}
