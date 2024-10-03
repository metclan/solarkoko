import React from 'react'

interface LogoProps {
  width?: number
  height?: number
}

export default function SolarKokoLogo({ width = 200, height = 60 }: LogoProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 200 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="SolarKoko logo"
    >
      {/* Sun rays */}
      <g>
        <path d="M30 10L33 3" stroke="#F97316" strokeWidth="2" strokeLinecap="round" />
        <path d="M40 13L46 7" stroke="#F97316" strokeWidth="2" strokeLinecap="round" />
        <path d="M45 23H52" stroke="#F97316" strokeWidth="2" strokeLinecap="round" />
        <path d="M40 33L46 39" stroke="#F97316" strokeWidth="2" strokeLinecap="round" />
        <path d="M30 36L33 43" stroke="#F97316" strokeWidth="2" strokeLinecap="round" />
        <path d="M20 33L14 39" stroke="#F97316" strokeWidth="2" strokeLinecap="round" />
        <path d="M15 23H8" stroke="#F97316" strokeWidth="2" strokeLinecap="round" />
        <path d="M20 13L14 7" stroke="#F97316" strokeWidth="2" strokeLinecap="round" />
      </g>
      
      {/* Sun circle */}
      <circle cx="30" cy="23" r="15" fill="#F97316" />
      
      {/* Leaf shape inside sun */}
      <path
        d="M30 13C25 18 25 28 30 33C35 28 35 18 30 13Z"
        fill="white"
      />
      
      {/* Text */}
      <text x="60" y="35" fontFamily="Arial, sans-serif" fontSize="24" fontWeight="bold" fill="#333333">
        Solar
        <tspan fill="#F97316">Koko</tspan>
      </text>
    </svg>
  )
}