'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { X, Megaphone } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function AnnouncementBar() {
  const [announcement, setAnnouncement] = useState<any>(null)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    fetchLatestAnnouncement()
  }, [])

  async function fetchLatestAnnouncement() {
    const { data } = await supabase
      .from('announcements')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(1)
      .single()
    
    if (data) setAnnouncement(data)
  }

  if (!announcement || !isVisible) return null

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -50, opacity: 0 }}
        className="fixed top-0 left-0 w-full z-200 bg-brand-primary text-white py-3 px-6 shadow-xl"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 overflow-hidden">
            <Megaphone size={18} className="shrink-0 animate-bounce" />
            <p className="text-xs md:text-sm font-bold truncate tracking-wide">
              <span className="uppercase opacity-80 mr-2">[{announcement.subject}]</span>
              {announcement.message}
            </p>
          </div>
          
          <button 
            onClick={() => setIsVisible(false)}
            className="p-1 hover:bg-white/20 rounded-full transition-colors shrink-0"
          >
            <X size={18} />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}