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

  useEffect(() => {
    if (isVisible && announcement) {
      document.documentElement.style.setProperty('--announcement-height', '40px');
    } else {
      document.documentElement.style.setProperty('--announcement-height', '0px');
    }
  }, [isVisible, announcement]);

  async function fetchLatestAnnouncement() {
    try {
      const now = new Date().toISOString();
      const { data, error } = await supabase
          .from('announcements')
          .select('*')
          .eq('is_public', true) // Filter hanya yang publik
          .or(`expires_at.is.null,expires_at.gt."${now}"`) 
          .order('created_at', { ascending: false })
          .limit(1);
      
      if (error) throw error;

      if (data && data.length > 0){
          setAnnouncement(data[0]);
      } else {
          setAnnouncement(null);
      }
    } catch (err) {
      console.error("Error fetching announcement:", err);
    }
  }

  if (!announcement || !isVisible) return null

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: '40px', opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        className="fixed top-0 left-0 w-full z-9999 bg-brand-primary text-white flex items-center shadow-md overflow-hidden"
      >
        <div className="max-w-7xl mx-auto w-full px-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 overflow-hidden">
            <Megaphone size={14} className="shrink-0 animate-bounce" />
            <div className="flex items-center text-[10px] md:text-xs font-bold truncate uppercase tracking-wider">
              <span className="opacity-70 mr-2 shrink-0">[{announcement.subject}]</span>
              <span className="truncate">{announcement.message}</span>
            </div>
          </div>
          <button 
            onClick={() => setIsVisible(false)}
            className="p-1 hover:bg-white/20 rounded-full transition-colors shrink-0"
          >
            <X size={14} />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}