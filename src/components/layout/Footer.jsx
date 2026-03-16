import React from 'react';
import { motion } from 'framer-motion';
import { 
    Facebook, 
    Instagram, 
    MessageCircle, 
    ChevronRight, 
    MapPin, 
    Phone, 
    Mail 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Logo from '../ui/Logo';

export default function Footer() {
    return (
        <footer className="bg-background-dark pt-24 pb-12 px-6 border-t border-white/5">
            <div className="max-w-7xl mx-auto space-y-24">
                {/* CTA Banner */}
                <motion.div
                    whileHover={{ scale: 1.01 }}
                    className="relative rounded-[3rem] overflow-hidden p-12 md:p-24 text-center group min-h-[500px] flex items-center justify-center border border-white/10"
                >
                    <div className="absolute inset-0">
                        <img 
                            src="/cta-background.png" 
                            alt="Action Background" 
                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
                        <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent" />
                    </div>

                    <div className="relative z-10 space-y-10 max-w-3xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            className="inline-flex items-center gap-3 px-5 py-2 rounded-full glass border border-gold/30 gold-text-gradient text-[10px] font-black uppercase tracking-[0.3em]"
                        >
                            <div className="size-2 bg-gold rounded-full animate-ping" />
                            Exclusive Slots Available
                        </motion.div>

                        <h2 className="text-5xl md:text-8xl font-black leading-[0.9] tracking-tighter text-white uppercase italic">
                            Ready to win <br /> 
                            <span className="gold-text-gradient">your next match?</span>
                        </h2>
                        
                        <p className="text-xl md:text-2xl font-medium text-slate-300 italic max-w-xl mx-auto">
                            Professional stringing takes 2-3 matches to get into your rhythm. <span className="text-white font-black">Start your streak today.</span>
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-6">
                            <a href="https://wa.me/919444606191" className="btn-gold px-12 py-6 rounded-2xl font-black text-xl hover:scale-110 active:scale-95 transition-all shadow-2xl royal-shadow">
                                Claim Your Slot
                            </a>
                            <div className="flex -space-x-3">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="size-10 rounded-full border-2 border-background-dark bg-slate-800 flex items-center justify-center overflow-hidden">
                                        <div className="w-full h-full bg-gradient-to-br from-slate-600 to-slate-800" />
                                    </div>
                                ))}
                                <div className="size-10 rounded-full border-2 border-background-dark bg-gold text-black text-[10px] font-black flex items-center justify-center">
                                    +50
                                </div>
                            </div>
                            <span className="text-slate-400 text-xs font-bold uppercase tracking-widest">Active Players this week</span>
                        </div>
                    </div>
                </motion.div>

                {/* Footer Links */}
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-12 lg:gap-8 pt-12">
                    {/* Brand Column */}
                    <div className="space-y-8">
                        <Logo className="w-12 h-12" showText={true} textClassName="text-3xl text-white" />
                        <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
                            Chennai's premier racket care facility. Specialized in digital stringing and performance optimization for professional badminton rackets.
                        </p>
                        <div className="flex gap-4">
                            {['Facebook', 'Instagram', 'MessageCircle'].map((icon, i) => {
                                const Icon = { Facebook, Instagram, MessageCircle }[icon];
                                return (
                                    <a key={i} href="#" className="size-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:bg-accent hover:text-black transition-all">
                                        <Icon className="size-5" />
                                    </a>
                                );
                            })}
                        </div>
                    </div>

                    {/* Resources Column */}
                    <div className="space-y-8">
                        <div className="flex items-center gap-3">
                            <div className="w-1 h-6 bg-accent rounded-full" />
                            <h4 className="text-white font-black uppercase tracking-widest text-sm text-[12px]">Resources</h4>
                        </div>
                        <nav className="flex flex-col gap-4">
                            {[
                                { name: 'Home', path: '/' },
                                { name: 'Pricing', path: '/#pricing' },
                                { name: 'Contact', path: '/contact' },
                                { name: 'FAQ', path: '/#faq' }
                            ].map((item) => (
                                <Link 
                                    key={item.name} 
                                    to={item.path} 
                                    className="text-slate-400 hover:text-accent transition-colors flex items-center gap-2 group text-sm"
                                >
                                    <ChevronRight className="size-3 text-accent group-hover:translate-x-1 transition-transform" />
                                    {item.name}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    {/* Services Column */}
                    <div className="space-y-8">
                        <div className="flex items-center gap-3">
                            <div className="w-1 h-6 bg-accent rounded-full" />
                            <h4 className="text-white font-black uppercase tracking-widest text-sm text-[12px]">Our Services</h4>
                        </div>
                        <nav className="flex flex-col gap-4">
                            {[
                                { name: 'Badminton Stringing', path: '/services/badminton' },
                                { name: 'High Tension Gutting', path: '#' },
                                { name: 'Grommet Service', path: '#' },
                                { name: 'Professional Gripping', path: '#' }
                                ].map((item) => (
                                    <Link key={item.name} to={item.path} className="text-slate-400 hover:text-accent transition-colors flex items-center gap-2 group text-sm">
                                        <ChevronRight className="size-3 text-accent group-hover:translate-x-1 transition-transform" />
                                        {item.name}
                                    </Link>
                                ))}
                            </nav>
                        </div>

                        {/* Brands Column */}
                        <div className="space-y-8">
                            <div className="flex items-center gap-3">
                                <div className="w-1 h-6 bg-accent rounded-full" />
                                <h4 className="text-white font-black uppercase tracking-widest text-sm text-[12px]">Top Brands</h4>
                            </div>
                            <nav className="flex flex-col gap-4">
                                {['Yonex', 'Victor', 'Li-Ning', 'Ashaway'].map((brand) => (
                                    <Link 
                                        key={brand} 
                                        to={`/brands/${brand.toLowerCase().replace(/ /g, '-')}`} 
                                        className="text-slate-400 hover:text-accent transition-colors flex items-center gap-2 group text-sm"
                                    >
                                        <ChevronRight className="size-3 text-accent group-hover:translate-x-1 transition-transform" />
                                        {brand}
                                    </Link>
                                ))}
                            </nav>
                        </div>

                        {/* Contact Column */}
                        <div className="space-y-8">
                            <div className="flex items-center gap-3">
                                <div className="w-1 h-6 bg-accent rounded-full" />
                                <h4 className="text-white font-black uppercase tracking-widest text-sm text-[12px]">Contact Us</h4>
                            </div>
                            <div className="space-y-6">
                                <a 
                                    href="https://share.google/76WsOZhpxNPNbosmc" 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="flex items-start gap-4 group/address"
                                >
                                    <MapPin className="size-5 text-accent shrink-0 mt-1 transition-transform group-hover/address:scale-110" />
                                    <p className="text-slate-400 text-sm leading-relaxed group-hover/address:text-white transition-colors">
                                        No. 13, 12th Street, Ashtalakshmi Nagar, Velachery, Chennai - 600 042.
                                    </p>
                                </a>
                                <div className="flex items-center gap-4">
                                    <Phone className="size-5 text-accent shrink-0" />
                                    <p className="text-slate-400 text-sm font-medium">+91 94446 06191</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <Mail className="size-5 text-accent shrink-0" />
                                    <p className="text-slate-400 text-sm font-medium italic">countrysports@gmail.com</p>
                                </div>
                            </div>
                        </div>
                    </div>

                {/* Bottom Copyright */}
                <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">
                    <p>© 2026 Country Sports Velachery. All Rights Reserved.</p>
                    <div className="flex gap-8">
                        <a href="#" className="hover:text-accent transition-colors">Privacy</a>
                        <a href="#" className="hover:text-accent transition-colors">Terms</a>
                        <a href="#" className="hover:text-accent transition-colors">Safety</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
