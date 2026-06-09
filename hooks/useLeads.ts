"use client"

import { useState, useEffect } from "react"
import { getLeads, getLeadsRealTime, getLeadStats } from "@/lib/lead-management"
import type { Lead } from "@/lib/lead-management"

export function useLeads() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = getLeadsRealTime((leadsData) => {
      setLeads(leadsData)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  return { leads, loading }
}

export function useLeadStats() {
  const [stats, setStats] = useState({
    totalLeads: 0,
    newLeads: 0,
    contactedLeads: 0,
    interestedLeads: 0,
    quotationSentLeads: 0,
    wonLeads: 0,
    lostLeads: 0,
    todaysFollowUps: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getLeadStats()
        setStats(data)
      } catch (error) {
        console.error("Error fetching lead stats:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  return { stats, loading }
}