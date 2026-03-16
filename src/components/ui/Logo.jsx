import React from 'react';

export default function Logo({ className = "w-10 h-10", showText = false, textClassName = "text-white text-2xl" }) {
    return (
        <div className={`flex items-center gap-3 group/logo`}>
            {/* SVG Logo */}
            <svg viewBox="0 0 100 100" className={`${className} transition-transform duration-500 group-hover/logo:scale-110`} fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="gold-grad-logo" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#D4AF37" />
                        <stop offset="20%" stopColor="#F9E29B" />
                        <stop offset="50%" stopColor="#B8860B" />
                        <stop offset="80%" stopColor="#FFD700" />
                        <stop offset="100%" stopColor="#D4AF37" />
                    </linearGradient>
                    <filter id="gold-glow" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="2" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                    <mask id="grid-mask-logo">
                        <rect x="0" y="0" width="100" height="100" fill="white" />
                        <line x1="20" y1="58" x2="80" y2="58" stroke="black" strokeWidth="3" />
                        <line x1="20" y1="69" x2="80" y2="69" stroke="black" strokeWidth="3" />
                        <line x1="43" y1="45" x2="47" y2="85" stroke="black" strokeWidth="3" />
                        <line x1="57" y1="45" x2="53" y2="85" stroke="black" strokeWidth="3" />
                        <line x1="20" y1="47" x2="80" y2="47" stroke="black" strokeWidth="3" />
                        <line x1="20" y1="81" x2="80" y2="81" stroke="black" strokeWidth="3" />
                    </mask>
                </defs>

                <g fill="url(#gold-grad-logo)" filter="url(#gold-glow)" mask="url(#grid-mask-logo)">
                    <polygon points="18,18 40,30 38,46 22,46" />
                    <polygon points="43,24 50,14 57,24 54,46 46,46" />
                    <polygon points="82,18 60,30 62,46 78,46" />
                    <polygon points="26,48 74,48 62,80 38,80" />
                    <path d="M 38,82 C 38,102 62,102 62,82 Z" />
                </g>
            </svg>
            {/* Text Logo - Stacked Gold Serif */}
            {showText && (
                <div className={`flex flex-col leading-none select-none ${textClassName}`}>
                    <span className="gold-text-gradient font-['Cormorant_Garamond'] font-bold uppercase tracking-[0.05em] text-[1.1em]">
                        Country
                    </span>
                    <span className="gold-text-gradient font-['Cormorant_Garamond'] font-bold uppercase tracking-[0.25em] text-[1.1em] -mt-1">
                        Sports
                    </span>
                </div>
            )}
        </div>
    );
}
