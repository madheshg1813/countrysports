import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

export const SectionTitle = ({ children, subtitle, centered = true, dark = true }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className={`mb-16 space-y-4 ${centered ? 'text-center' : 'text-left'}`}
    >
        <div className={`flex flex-col ${centered ? 'items-center' : 'items-start'} gap-2`}>
            <div className="w-12 h-1 bg-gold rounded-full mb-2" />
            <h2 className={`text-4xl md:text-5xl font-black tracking-tight gold-text-gradient uppercase italic ${dark ? 'text-white' : 'text-slate-900'}`}>{children}</h2>
        </div>
        {subtitle && <p className={`${dark ? 'text-slate-400' : 'text-slate-500'} text-lg max-w-2xl mx-auto font-medium`}>{subtitle}</p>}
    </motion.div>
);

export const ServiceCard = ({ icon: Icon, title, description, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.5 }}
        viewport={{ once: true }}
        whileHover={{ y: -5 }}
        className="p-8 rounded-3xl transition-all group relative overflow-hidden shadow-sm hover:shadow-xl royal-border"
    >
        <div className="size-14 rounded-2xl bg-gold/10 flex items-center justify-center text-gold mb-6">
            <Icon className="size-8" />
        </div>
        <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
        <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
    </motion.div>
);

export const PricingCard = ({ title, price, features, popular, delay }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ delay, duration: 0.5 }}
        viewport={{ once: true }}
        className={`p-10 rounded-[2.5rem] border-2 transition-all relative ${popular
            ? 'royal-border royal-shadow shadow-gold/20'
            : 'bg-white border-slate-100 shadow-premium'
            }`}
    >
        {popular && (
            <div className="absolute top-6 right-8 bg-gold text-black text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest shadow-lg shadow-gold/20">
                Best Choice
            </div>
        )}
        <h3 className={`text-xl font-bold text-white`}>{title}</h3>
        <div className="mt-6 mb-8">
            <div className="flex items-baseline gap-2">
                <span className={`text-5xl font-black ${popular ? 'gold-text-gradient' : 'text-gold'}`}>₹{price}</span>
                <span className={`text-sm font-medium ${popular ? 'text-slate-400' : 'text-slate-500'}`}>+ string cost</span>
            </div>
        </div>
        <ul className="space-y-4 mb-10">
            {features.map((f, i) => (
                <li key={i} className={`flex items-center gap-3 text-sm font-medium ${popular ? 'text-slate-300' : 'text-slate-600'}`}>
                    <div className={`p-1 rounded-full ${popular ? 'bg-gold/10' : 'bg-gold/5'}`}>
                        <Check className={`size-3 ${popular ? 'text-gold' : 'text-gold-dark'}`} />
                    </div>
                    {f}
                </li>
            ))}
        </ul>
        <button className={`w-full transition-all ${popular
            ? 'btn-gold'
            : 'btn-cyan-soft'
            }`}>
            Select Plan
        </button>
    </motion.div>
);
