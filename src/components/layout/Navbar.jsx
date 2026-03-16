import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, MessageCircle, MapPin } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { CITIES, BRANDS } from '../../constants';
import Logo from '../ui/Logo';

export default function Navbar() {
    const [navScrolled, setNavScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => setNavScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = [
        { label: 'Services', type: 'dropdown', items: CITIES, pathPrefix: '/services' },
        { label: 'Brands', type: 'dropdown', items: BRANDS, pathPrefix: '/brands' },
        { label: 'Pricing', path: '/#pricing' }
    ];

    return (
        <header className={`fixed top-0 w-full z-[100] py-4 transition-all duration-300 ${navScrolled ? 'bg-background-dark/95 backdrop-blur-xl border-b border-white/5 shadow-2xl' : 'bg-transparent'}`}>
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                <Link to="/">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center"
                    >
                        <Logo className="w-8 h-8 md:w-10 md:h-10" showText={true} textClassName="text-xl md:text-2xl text-white" />
                    </motion.div>
                </Link>

                <NavigationMenu.Root className="relative">
                    <NavigationMenu.List className="hidden md:flex items-center gap-8 text-sm font-bold tracking-tight text-slate-300 list-none">
                        {navItems.map((item) => (
                            <NavigationMenu.Item key={item.label}>
                                {item.type === 'dropdown' ? (
                                    <>
                                        <NavigationMenu.Trigger className="group hover:text-accent transition-colors flex items-center gap-1 uppercase tracking-widest text-[11px] focus:outline-none">
                                            {item.label}
                                            <ChevronRight className="size-3 rotate-90 transition-transform group-data-[state=open]:rotate-[270deg]" />
                                        </NavigationMenu.Trigger>
                                        <NavigationMenu.Content className="absolute top-[3.5rem] left-0 w-[280px] bg-background-dark/98 backdrop-blur-3xl rounded-[2rem] shadow-[0_30px_60px_rgba(0,0,0,0.8)] border border-white/10 py-6 overflow-hidden data-[motion=from-start]:animate-enterFromLeft data-[motion=from-end]:animate-enterFromRight data-[motion=to-start]:animate-exitToLeft data-[motion=to-end]:animate-exitToRight">
                                            <div className="max-h-[500px] overflow-y-auto custom-scrollbar px-2">
                                                {item.items.map((subItem) => (
                                                    <NavigationMenu.Link asChild key={subItem}>
                                                        <Link
                                                            to={item.label === 'Services' 
                                                                ? `/chennai/badminton-stringing-services-in-${subItem.toLowerCase().replace(/ /g, '-')}`
                                                                : `${item.pathPrefix}/${subItem.toLowerCase().replace(/ /g, '-')}`
                                                            }
                                                            className="block px-6 py-4 rounded-xl text-[13px] font-bold text-slate-300 hover:text-gold hover:bg-gold/5 transition-all uppercase tracking-widest border-b border-white/5 last:border-0"
                                                        >
                                                            {subItem}
                                                        </Link>
                                                    </NavigationMenu.Link>
                                                ))}
                                            </div>
                                        </NavigationMenu.Content>
                                    </>
                                ) : (
                                    <NavigationMenu.Link asChild>
                                        <a href={item.path} className="hover:text-accent transition-colors flex items-center gap-1 uppercase tracking-widest text-[11px]">
                                            {item.label}
                                            <ChevronRight className="size-3 rotate-90 opacity-30" />
                                        </a>
                                    </NavigationMenu.Link>
                                )}
                            </NavigationMenu.Item>
                        ))}
                    </NavigationMenu.List>

                    <div className="perspective-[2000px] absolute top-full left-0 flex w-full justify-center">
                        <NavigationMenu.Viewport className="relative mt-2 h-[var(--radix-navigation-menu-viewport-height)] w-full origin-[top_center] overflow-hidden transition-[width,_height] duration-300 data-[state=closed]:animate-scaleOut data-[state=open]:animate-scaleIn sm:w-[var(--radix-navigation-menu-viewport-width)]" />
                    </div>
                </NavigationMenu.Root>

                <div className="flex items-center gap-4">
                    <a href="https://wa.me/919444606191" className="hidden sm:flex items-center gap-2 btn-gold px-6 py-2.5 text-sm hover:scale-105 active:scale-95 transition-all">
                        Book Slot
                    </a>
                </div>
            </div>
        </header>
    );
}
