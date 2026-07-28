"use client";

import { SVGProps } from "react";

// Elemento floral decorativo 1 - Ramo com flores
export function FloralLeft(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 200 400" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      {/* Caule principal */}
      <path d="M100 400 Q90 300 80 200 Q70 100 90 20" stroke="#8D9875" strokeWidth="2" fill="none" opacity="0.7"/>
      {/* Folhas */}
      <ellipse cx="75" cy="120" rx="30" ry="12" fill="#8D9875" opacity="0.5" transform="rotate(-30 75 120)"/>
      <ellipse cx="95" cy="180" rx="25" ry="10" fill="#59613A" opacity="0.4" transform="rotate(20 95 180)"/>
      <ellipse cx="72" cy="250" rx="28" ry="11" fill="#8D9875" opacity="0.5" transform="rotate(-25 72 250)"/>
      <ellipse cx="90" cy="320" rx="22" ry="9" fill="#59613A" opacity="0.4" transform="rotate(15 90 320)"/>
      {/* Flores peach */}
      <circle cx="68" cy="90" r="14" fill="#F1D0C7" opacity="0.8"/>
      <circle cx="68" cy="90" r="8" fill="#E7B2A7" opacity="0.7"/>
      <circle cx="68" cy="90" r="4" fill="#B98942" opacity="0.6"/>
      {/* Pétalas */}
      <ellipse cx="68" cy="74" rx="5" ry="9" fill="#F1D0C7" opacity="0.6"/>
      <ellipse cx="68" cy="106" rx="5" ry="9" fill="#F1D0C7" opacity="0.6"/>
      <ellipse cx="52" cy="90" rx="9" ry="5" fill="#F1D0C7" opacity="0.6"/>
      <ellipse cx="84" cy="90" rx="9" ry="5" fill="#F1D0C7" opacity="0.6"/>
      {/* Flores menores */}
      <circle cx="85" cy="155" r="10" fill="#E7B2A7" opacity="0.6"/>
      <circle cx="85" cy="155" r="5" fill="#B98942" opacity="0.5"/>
      <circle cx="65" cy="290" r="8" fill="#F1D0C7" opacity="0.7"/>
      <circle cx="65" cy="290" r="4" fill="#E7B2A7" opacity="0.6"/>
      {/* Pequenos corações */}
      <text x="100" y="200" fontSize="10" fill="#BE745B" opacity="0.4">♡</text>
      <text x="60" y="360" fontSize="8" fill="#BE745B" opacity="0.3">♡</text>
      {/* Ramos secundários */}
      <path d="M80 200 Q60 185 45 175" stroke="#8D9875" strokeWidth="1.5" fill="none" opacity="0.5"/>
      <path d="M85 280 Q65 265 50 260" stroke="#59613A" strokeWidth="1.5" fill="none" opacity="0.4"/>
    </svg>
  );
}

// Elemento floral decorativo 2 - Ramo direito
export function FloralRight(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 200 400" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      {/* Caule principal (espelhado) */}
      <path d="M100 400 Q110 300 120 200 Q130 100 110 20" stroke="#8D9875" strokeWidth="2" fill="none" opacity="0.7"/>
      {/* Folhas espelhadas */}
      <ellipse cx="125" cy="120" rx="30" ry="12" fill="#8D9875" opacity="0.5" transform="rotate(30 125 120)"/>
      <ellipse cx="105" cy="180" rx="25" ry="10" fill="#59613A" opacity="0.4" transform="rotate(-20 105 180)"/>
      <ellipse cx="128" cy="250" rx="28" ry="11" fill="#8D9875" opacity="0.5" transform="rotate(25 128 250)"/>
      <ellipse cx="110" cy="320" rx="22" ry="9" fill="#59613A" opacity="0.4" transform="rotate(-15 110 320)"/>
      {/* Flores rosa */}
      <circle cx="132" cy="90" r="14" fill="#F1D0C7" opacity="0.8"/>
      <circle cx="132" cy="90" r="8" fill="#E7B2A7" opacity="0.7"/>
      <circle cx="132" cy="90" r="4" fill="#B98942" opacity="0.6"/>
      <ellipse cx="132" cy="74" rx="5" ry="9" fill="#F1D0C7" opacity="0.6"/>
      <ellipse cx="132" cy="106" rx="5" ry="9" fill="#F1D0C7" opacity="0.6"/>
      <ellipse cx="116" cy="90" rx="9" ry="5" fill="#F1D0C7" opacity="0.6"/>
      <ellipse cx="148" cy="90" rx="9" ry="5" fill="#F1D0C7" opacity="0.6"/>
      {/* Flores menores */}
      <circle cx="115" cy="155" r="10" fill="#E7B2A7" opacity="0.6"/>
      <circle cx="115" cy="155" r="5" fill="#B98942" opacity="0.5"/>
      <circle cx="135" cy="290" r="8" fill="#F1D0C7" opacity="0.7"/>
      <circle cx="135" cy="290" r="4" fill="#E7B2A7" opacity="0.6"/>
      {/* Corações */}
      <text x="90" y="200" fontSize="10" fill="#BE745B" opacity="0.4">♡</text>
      <text x="130" y="360" fontSize="8" fill="#BE745B" opacity="0.3">♡</text>
      {/* Ramos */}
      <path d="M120 200 Q140 185 155 175" stroke="#8D9875" strokeWidth="1.5" fill="none" opacity="0.5"/>
      <path d="M115 280 Q135 265 150 260" stroke="#59613A" strokeWidth="1.5" fill="none" opacity="0.4"/>
    </svg>
  );
}

// Divisor floral ornamental
export function FloralDivider(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 400 40" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <line x1="0" y1="20" x2="160" y2="20" stroke="#B98942" strokeWidth="0.8" opacity="0.4"/>
      <circle cx="200" cy="20" r="4" fill="#B98942" opacity="0.5"/>
      <circle cx="185" cy="20" r="2.5" fill="#E7B2A7" opacity="0.5"/>
      <circle cx="215" cy="20" r="2.5" fill="#E7B2A7" opacity="0.5"/>
      <circle cx="172" cy="20" r="1.5" fill="#B98942" opacity="0.4"/>
      <circle cx="228" cy="20" r="1.5" fill="#B98942" opacity="0.4"/>
      <line x1="240" y1="20" x2="400" y2="20" stroke="#B98942" strokeWidth="0.8" opacity="0.4"/>
      {/* Pequena flor no centro */}
      <circle cx="200" cy="20" r="2" fill="#B98942" opacity="0.6"/>
    </svg>
  );
}

// Flor pequena decorativa
export function SmallFlower({ color = "#E7B2A7", size, width, height, ...props }: SVGProps<SVGSVGElement> & { color?: string; size?: number }) {
  return (
    <svg viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" width={size || width} height={size || height} {...props}>
      <ellipse cx="15" cy="8" rx="4" ry="7" fill={color} opacity="0.7"/>
      <ellipse cx="15" cy="22" rx="4" ry="7" fill={color} opacity="0.7"/>
      <ellipse cx="8" cy="15" rx="7" ry="4" fill={color} opacity="0.7"/>
      <ellipse cx="22" cy="15" rx="7" ry="4" fill={color} opacity="0.7"/>
      <ellipse cx="9.5" cy="9.5" rx="4" ry="6" fill={color} opacity="0.5" transform="rotate(45 9.5 9.5)"/>
      <ellipse cx="20.5" cy="9.5" rx="4" ry="6" fill={color} opacity="0.5" transform="rotate(-45 20.5 9.5)"/>
      <ellipse cx="9.5" cy="20.5" rx="4" ry="6" fill={color} opacity="0.5" transform="rotate(-45 9.5 20.5)"/>
      <ellipse cx="20.5" cy="20.5" rx="4" ry="6" fill={color} opacity="0.5" transform="rotate(45 20.5 20.5)"/>
      <circle cx="15" cy="15" r="4" fill="#B98942" opacity="0.8"/>
    </svg>
  );
}

// Folhagem decorativa de canto
export function FloralCorner(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M10 10 Q40 40 80 30 Q50 60 20 90" stroke="#8D9875" strokeWidth="1.5" fill="none" opacity="0.5"/>
      <path d="M10 10 Q50 20 60 60 Q30 50 10 80" stroke="#59613A" strokeWidth="1" fill="none" opacity="0.4"/>
      <ellipse cx="55" cy="35" rx="18" ry="8" fill="#8D9875" opacity="0.4" transform="rotate(-20 55 35)"/>
      <ellipse cx="30" cy="65" rx="15" ry="7" fill="#8D9875" opacity="0.3" transform="rotate(30 30 65)"/>
      <circle cx="70" cy="25" r="10" fill="#F1D0C7" opacity="0.7"/>
      <circle cx="70" cy="25" r="5" fill="#E7B2A7" opacity="0.6"/>
      <circle cx="70" cy="25" r="2.5" fill="#B98942" opacity="0.5"/>
      <circle cx="20" cy="80" r="7" fill="#E7B2A7" opacity="0.5"/>
      <circle cx="20" cy="80" r="3" fill="#B98942" opacity="0.4"/>
      <text x="45" y="75" fontSize="10" fill="#BE745B" opacity="0.4">♡</text>
    </svg>
  );
}

// Logo SVG inline do DVJ com monograma oval
export function DVJLogo({ size = 48, dark = false }: { size?: number; dark?: boolean }) {
  const color = dark ? "#3E4728" : "#59613A";
  const textColor = dark ? "#3D3A36" : "#59613A";
  return (
    <div className="flex items-center gap-3">
      {/* Monograma oval */}
      <svg width={size * 0.7} height={size * 0.85} viewBox="0 0 42 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="21" cy="25" rx="19" ry="23" stroke={color} strokeWidth="1.5" fill="none"/>
        <ellipse cx="21" cy="25" rx="14" ry="18" stroke={color} strokeWidth="0.7" fill="none" opacity="0.5"/>
        <text x="21" y="31" textAnchor="middle" fontFamily="Cormorant Garamond, serif" fontSize="18" fontWeight="600" fill={color}>DVJ</text>
      </svg>
      {/* Texto do logo */}
      <div className="flex flex-col leading-none">
        <span style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, fontSize: size * 0.35, color: textColor, letterSpacing: "0.05em" }}>DVJ</span>
        <span style={{ fontFamily: "'Great Vibes', cursive", fontSize: size * 0.32, color: color, lineHeight: 1 }}>De Volta ao Jardim</span>
      </div>
    </div>
  );
}
