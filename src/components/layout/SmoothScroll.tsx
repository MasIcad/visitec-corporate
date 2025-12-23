'use client'
import { ReactLenis } from '@studio-freight/react-lenis'

export default function SmoothScroll({ children }: { children: any }) {
  return (
    <ReactLenis 
      root 
      options={{ 
        lerp: 0.1,         // Efek kelembutan (0.1 = sangat halus)
        duration: 1.5,      // Durasi scroll
        smoothWheel: true,  // Aktifkan scroll halus untuk mouse wheel
      }}
    >
      {children}
    </ReactLenis>
  )
}