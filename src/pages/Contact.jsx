import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
    Phone, Mail, MapPin, Clock, MessageCircle, Send, 
    Facebook, Instagram, Youtube, Globe, ArrowRight
} from 'lucide-react';
import { SectionTitle } from '../components/ui/Cards';

export default function Contact() {
    const [formState, setFormState] = useState({ name: '', email: '', phone: '', message: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        // In a real app, this would send the data to a backend
        alert('Thank you! Your message has been sent.');
    };

    return (
        <div className="selection:bg-gold selection:text-black bg-[#0A0F1C] min-h-screen relative overflow-x-hidden pt-20">
            {/* Background Glows */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gold/5 blur-[120px] rounded-full pointer-events-none" />

            {/* Hero Section */}
            <section className="relative py-24 px-6 overflow-hidden border-b border-white/5">
                <div className="max-w-7xl mx-auto text-center space-y-8">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-gold/20 bg-gold/5 text-gold text-xs font-black uppercase tracking-[0.3em] mb-4"
                    >
                        Contact Our Experts
                    </motion.div>
                    
                    <motion.h1 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-6xl md:text-8xl font-black text-white italic tracking-tighter uppercase leading-[0.9]"
                    >
                        GET IN <br />
                        <span className="gold-text-gradient">TOUCH.</span>
                    </motion.h1>
                    
                    <motion.p 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-slate-400 text-xl md:text-2xl max-w-2xl mx-auto font-medium"
                    >
                        Have a question about tension? Need a bulk restring? Our master stringers are ready to help.
                    </motion.p>
                </div>
            </section>

            {/* Main Contact Area */}
            <section className="py-24 px-6 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
                    
                    {/* Left: Contact Info */}
                    <div className="lg:col-span-5 space-y-12">
                        <div className="space-y-6">
                            <h2 className="text-3xl md:text-4xl font-black text-white italic uppercase tracking-tighter leading-tight">
                                Reach <span className="text-gold">Country Sports</span>
                            </h2>
                            <p className="text-slate-400 text-lg leading-relaxed font-medium">
                                Visit our premium workshop in Chennai or connect with us online for expert racket consultation.
                            </p>
                        </div>

                        <div className="space-y-8">
                            {[
                                { 
                                    icon: Phone, 
                                    title: "Call / WhatsApp", 
                                    value: "+91 94446 06191", 
                                    desc: "Quick response for bookings",
                                    link: "https://wa.me/919444606191"
                                },
                                { 
                                    icon: Mail, 
                                    title: "Email Us", 
                                    value: "contact@countrysports.in", 
                                    desc: "For corporate/bulk enquiries",
                                    link: "mailto:contact@countrysports.in"
                                },
                                { 
                                    icon: MapPin, 
                                    title: "Workshop Location", 
                                    value: "Velachery, Chennai", 
                                    desc: "No. 13, 12th St, Ashtalakshmi Nagar",
                                    link: "https://share.google/76WsOZhpxNPNbosmc"
                                }
                            ].map((item, i) => (
                                <motion.a
                                    key={i}
                                    href={item.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="flex gap-6 p-8 rounded-[2.5rem] bg-white/5 border border-white/10 hover:border-gold/40 hover:bg-white/[0.07] transition-all group"
                                >
                                    <div className="size-14 rounded-2xl bg-gold/10 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-black transition-all shadow-lg group-hover:shadow-gold/20">
                                        <item.icon className="size-6" />
                                    </div>
                                    <div>
                                        <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-1">{item.title}</h4>
                                        <p className="text-xl font-bold text-white mb-1 group-hover:text-gold transition-colors">{item.value}</p>
                                        <p className="text-sm text-slate-400">{item.desc}</p>
                                    </div>
                                </motion.a>
                            ))}
                        </div>

                        {/* Social Links */}
                        <div className="pt-8 space-y-6">
                            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">Professional Network</h4>
                            <div className="flex gap-4">
                                {[Instagram, Facebook, Youtube, Globe].map((Icon, i) => (
                                    <button key={i} className="size-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-gold hover:border-gold/40 hover:bg-gold/5 transition-all">
                                        <Icon className="size-5" />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right: Contact Form */}
                    <div className="lg:col-span-7">
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            className="bg-white rounded-[3rem] p-10 md:p-14 shadow-2xl relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 rounded-full -mr-32 -mt-32 blur-[80px]" />
                            
                            <div className="relative z-10 space-y-10">
                                <div className="space-y-2">
                                    <h3 className="text-4xl font-black text-slate-900 leading-none italic uppercase tracking-tighter">Send a Message</h3>
                                    <p className="text-slate-400 text-xs font-black uppercase tracking-widest">Average response time: 30 minutes</p>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Full Name</label>
                                            <input 
                                                required
                                                type="text" 
                                                placeholder="Enter name"
                                                className="w-full px-8 py-5 rounded-2xl bg-slate-50 border border-slate-100 text-slate-900 placeholder:text-slate-300 font-bold focus:outline-none focus:ring-4 focus:ring-gold/10 focus:border-gold/30 transition-all"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Phone Number</label>
                                            <input 
                                                required
                                                type="tel" 
                                                placeholder="+91"
                                                className="w-full px-8 py-5 rounded-2xl bg-slate-50 border border-slate-100 text-slate-900 placeholder:text-slate-300 font-bold focus:outline-none focus:ring-4 focus:ring-gold/10 focus:border-gold/30 transition-all"
                                            />
                                        </div>
                                    </div>
                                    
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Email Address</label>
                                        <input 
                                            required
                                            type="email" 
                                            placeholder="your@email.com"
                                            className="w-full px-8 py-5 rounded-2xl bg-slate-50 border border-slate-100 text-slate-900 placeholder:text-slate-300 font-bold focus:outline-none focus:ring-4 focus:ring-gold/10 focus:border-gold/30 transition-all"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Message / Requirements</label>
                                        <textarea 
                                            required
                                            rows="5" 
                                            placeholder="Tell us about your racket issue..."
                                            className="w-full px-8 py-5 rounded-2xl bg-slate-50 border border-slate-100 text-slate-900 placeholder:text-slate-300 font-bold focus:outline-none focus:ring-4 focus:ring-gold/10 focus:border-gold/30 transition-all resize-none"
                                        ></textarea>
                                    </div>

                                    <button 
                                        type="submit"
                                        className="w-full py-6 btn-gold text-lg rounded-2xl shadow-2xl shadow-gold/20 flex items-center justify-center gap-3 transition-transform hover:scale-[1.02] active:scale-[0.98]"
                                    >
                                        Send Professional Enquiry
                                        <Send className="size-5" />
                                    </button>
                                </form>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Bottom Map Section */}
            <section className="py-24 px-6 border-t border-white/5 bg-background-dark/50 overflow-hidden relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-gold/5 blur-[120px] rounded-full pointer-events-none" />
                
                <div className="max-w-7xl mx-auto space-y-16 relative z-10">
                    <div className="text-center space-y-4">
                        <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter">Visit the Hub</h2>
                        <div className="h-1 w-16 bg-gold mx-auto rounded-full" />
                    </div>

                    <a 
                        href="https://share.google/76WsOZhpxNPNbosmc" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="block relative aspect-video rounded-[3rem] overflow-hidden royal-border group shadow-2xl"
                    >
                        <img 
                            src="/location-map.png" 
                            alt="Map Location"
                            className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110 opacity-60 group-hover:opacity-100"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent opacity-60" />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="bg-white px-8 py-4 rounded-full text-black font-black uppercase tracking-widest text-xs shadow-2xl">Open in Google Maps</div>
                        </div>
                    </a>
                </div>
            </section>
        </div>
    );
}
