"use client"

import { useEffect, useState, useCallback, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import {
  X,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  Loader2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLeadPopup } from "@/contexts/LeadPopupContext"
import {
  saveHomepageLead,
  UserRole,
} from "@/lib/homepage-leads"
import { cn } from "@/lib/utils"
import { collection, addDoc, Timestamp } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { Step1, Step2, JobSeekerStep, SuccessStep } from "./lead-popup/steps"

type Step = 1 | 2 | "job-options" | "success"

interface FormData {
  name: string
  mobile: string
  role: UserRole | ""
  interest: string
}

const REDIRECT_DELAY_SECONDS = 2

export default function LeadCapturePopup() {
  const router = useRouter()
  const { isOpen, defaultLeadType, closePopup, markShown } = useLeadPopup()
  const [step, setStep] = useState<Step>(1)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [redirectPath, setRedirectPath] = useState<string>("/")
  const [countdown, setCountdown] = useState(REDIRECT_DELAY_SECONDS)

  const [formData, setFormData] = useState<FormData>({
    name: "",
    mobile: "",
    role: "",
    interest: "",
  })

  const [errors, setErrors] = useState<{ name?: string; mobile?: string }>({})

  const dialogRef = useRef<HTMLDivElement>(null)
  const nameInputRef = useRef<HTMLInputElement>(null)

  // Reset form when popup opens
  useEffect(() => {
    if (!isOpen) return
    setStep(1)
    setError(null)
    setErrors({})
    setCountdown(REDIRECT_DELAY_SECONDS)
    setRedirectPath("/")

    if (defaultLeadType === "Student") {
      setFormData({ name: "", mobile: "", role: "Student", interest: "" })
    } else if (defaultLeadType === "Business") {
      setFormData({ name: "", mobile: "", role: "Business Owner", interest: "" })
    } else {
      setFormData({ name: "", mobile: "", role: "", interest: "" })
    }
    setTimeout(() => nameInputRef.current?.focus(), 250)
  }, [isOpen, defaultLeadType])

  // Mark as shown
  useEffect(() => {
    if (isOpen) markShown()
  }, [isOpen, markShown])

  // Lock body scroll
  useEffect(() => {
    if (!isOpen) return
    const previous = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = previous
    }
  }, [isOpen])

  // Esc key handler
  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && step !== "success") closePopup()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [isOpen, step, closePopup])

  // Countdown for success redirect
  useEffect(() => {
    if (step !== "success") return
    if (countdown <= 0) {
      // Close popup first, then redirect with a small delay to ensure clean state
      closePopup()
      const redirectTimer = window.setTimeout(() => {
        try {
          router.push(redirectPath)
        } catch (e) {
          console.error("Redirect error:", e)
          window.location.href = redirectPath
        }
      }, 100)
      return () => window.clearTimeout(redirectTimer)
    }
    const t = window.setTimeout(() => setCountdown((c) => c - 1), 1000)
    return () => window.clearTimeout(t)
  }, [step, countdown, closePopup, router, redirectPath])

  const validateStep1 = useCallback(() => {
    const newErrors: { name?: string; mobile?: string } = {}
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      newErrors.name = "Name is required (min 2 characters)"
    }
    if (!formData.mobile.trim()) {
      newErrors.mobile = "Mobile number is required"
    } else if (!/^[+]?[\d\s-]{10,15}$/.test(formData.mobile.trim())) {
      newErrors.mobile = "Please enter a valid mobile number"
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }, [formData])

  const handleSubmit = useCallback(async () => {
    setSubmitting(true)
    setError(null)
    try {
      let leadType: "Student" | "Business" | "Job Seeker" | "Other" = "Other"
      let leadInterest = formData.interest
      let redirectTo = "/"

      if (formData.role === "Student") {
        leadType = "Student"
        redirectTo = "/student"
      } else if (formData.role === "Business Owner") {
        leadType = "Business"
        redirectTo = "/business"
      } else if (formData.role === "Job Seeker") {
        leadType = "Job Seeker"
        leadInterest = formData.interest || "General"
        redirectTo = "/student"
      } else {
        leadType = "Other"
        redirectTo = "/contact"
      }

      await saveHomepageLead({
        leadType,
        name: formData.name.trim(),
        mobile: formData.mobile.trim(),
        interest: leadInterest,
        source: "Homepage Popup",
        status: "New Inquiry",
      })

      // Also save to course_enrollments for Student leads with a course interest
      if (leadType === "Student" && leadInterest) {
        try {
          const enrollmentsRef = collection(db, "course_enrollments")
          const nameParts = formData.name.trim().split(/\s+/)
          await addDoc(enrollmentsRef, {
            firstName: nameParts[0] || formData.name.trim(),
            lastName: nameParts.slice(1).join(" ") || "",
            email: "",
            phone: formData.mobile.trim(),
            courseId: "",
            courseName: leadInterest,
            createdAt: Timestamp.now(),
            status: "New",
            read: false,
          })
        } catch (err) {
          console.error("Error saving to course_enrollments:", err)
        }
      }

      // Also save Business leads to contact_inquiries for admin visibility
      if (leadType === "Business" && leadInterest) {
        try {
          const inquiriesRef = collection(db, "contact_inquiries")
          const nameParts = formData.name.trim().split(/\s+/)
          await addDoc(inquiriesRef, {
            firstName: nameParts[0] || formData.name.trim(),
            lastName: nameParts.slice(1).join(" ") || "",
            email: "",
            phone: formData.mobile.trim(),
            subject: leadInterest,
            message: `Interested in: ${leadInterest}`,
            inquiryType: "Business",
            source: "Homepage Popup",
            createdAt: Timestamp.now(),
            status: "New",
            read: false,
          })
        } catch (err) {
          console.error("Error saving to contact_inquiries:", err)
        }
      }

      setRedirectPath(redirectTo)
      setCountdown(REDIRECT_DELAY_SECONDS)
      setStep("success")
    } catch (err) {
      console.error("Error saving lead:", err)
      setError("Something went wrong. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }, [formData])

  const handleNext = useCallback(async () => {
    setError(null)
    if (step === 1) {
      if (!validateStep1()) return
      if (!formData.role) {
        setError("Please select who you are")
        return
      }
      if (formData.role === "Job Seeker") {
        setStep("job-options")
        return
      }
      setStep(2)
      return
    }
    if (step === 2) {
      if (!formData.interest) {
        setError("Please select an option to continue")
        return
      }
      await handleSubmit()
    }
  }, [step, formData, validateStep1, handleSubmit])

  const handleBack = useCallback(() => {
    setError(null)
    if (step === 2 || step === "job-options") setStep(1)
  }, [step])

  const handleJobSeekerSelect = useCallback(
    async (option: string) => {
      setSubmitting(true)
      setError(null)
      try {
        await saveHomepageLead({
          leadType: "Job Seeker",
          name: formData.name.trim(),
          mobile: formData.mobile.trim(),
          interest: option,
          source: "Homepage Popup",
          status: "New Inquiry",
        })
        setRedirectPath("/student")
        setCountdown(REDIRECT_DELAY_SECONDS)
        setStep("success")
      } catch (err) {
        console.error("Error saving job seeker lead:", err)
        setError("Something went wrong. Please try again.")
      } finally {
        setSubmitting(false)
      }
    },
    [formData]
  )

  const handleManualRedirect = useCallback(() => {
    closePopup()
    try {
      router.push(redirectPath)
    } catch (e) {
      console.error("Manual redirect error:", e)
      window.location.href = redirectPath
    }
  }, [closePopup, router, redirectPath])

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        key="lead-popup-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6"
        onClick={(e) => {
          if (e.target === e.currentTarget && step !== "success") closePopup()
        }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="lead-popup-title"
      >
        {/* Backdrop with blur */}
        <div
          aria-hidden
          className="absolute inset-0 bg-black/60 backdrop-blur-md dark:bg-black/70"
        />

        {/* Decorative background blobs */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          <div className="absolute -top-32 -left-32 h-72 w-72 rounded-full bg-blue-500/30 blur-3xl" />
          <div className="absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-purple-500/25 blur-3xl" />
          <div className="absolute top-1/3 right-1/4 h-48 w-48 rounded-full bg-pink-500/20 blur-3xl" />
        </div>

        <motion.div
          key="lead-popup-content"
          ref={dialogRef}
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.97 }}
          transition={{ type: "spring", stiffness: 280, damping: 26 }}
          className={cn(
            "relative w-full max-w-lg overflow-hidden rounded-2xl",
            "border border-white/20 dark:border-white/10",
            "bg-white/80 dark:bg-gray-900/80",
            "backdrop-blur-xl backdrop-saturate-150",
            "shadow-2xl shadow-black/30"
          )}
        >
          {/* Decorative gradient ring */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-2xl"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0) 40%, rgba(255,255,255,0) 60%, rgba(255,255,255,0.4) 100%)",
              mixBlendMode: "overlay",
            }}
          />

          {/* Header */}
          <div className="relative flex items-center justify-between border-b border-white/20 dark:border-white/10 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 px-5 py-4 sm:px-6">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-md">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-600 dark:text-gray-400">
                  Procotech Technologies
                </p>
                <h2
                  id="lead-popup-title"
                  className="text-base font-semibold text-gray-900 dark:text-white sm:text-lg"
                >
                  {step === "success"
                    ? "Submission Successful"
                    : "Get Personalized Guidance"}
                </h2>
              </div>
            </div>
            {step !== "success" && (
              <button
                onClick={closePopup}
                aria-label="Close popup"
                className="rounded-md p-1.5 text-gray-500 transition-colors hover:bg-gray-200/60 hover:text-gray-800 dark:text-gray-400 dark:hover:bg-white/10 dark:hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>

          {/* Body */}
          <div className="relative px-5 py-5 sm:px-6 sm:py-6">
            <AnimatePresence mode="wait" initial={false}>
              {step === 1 && (
                <Step1
                  key="step-1"
                  formData={formData}
                  setFormData={setFormData}
                  errors={errors}
                  nameInputRef={nameInputRef}
                />
              )}
              {step === 2 && (
                <Step2
                  key="step-2"
                  formData={formData}
                  setFormData={setFormData}
                />
              )}
              {step === "job-options" && (
                <JobSeekerStep
                  key="job-step"
                  onSelect={handleJobSeekerSelect}
                  submitting={submitting}
                />
              )}
              {step === "success" && (
                <SuccessStep
                  key="success"
                  leadType={formData.role}
                  countdown={countdown}
                  onRedirect={handleManualRedirect}
                  redirectPath={redirectPath}
                />
              )}
            </AnimatePresence>

            {error && step !== "success" && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-3 rounded-md bg-red-500/10 px-3 py-2 text-sm text-red-600 dark:text-red-400"
              >
                {error}
              </motion.p>
            )}
          </div>

          {/* Footer */}
          {step !== "success" && (
            <div className="relative flex items-center justify-between gap-2 border-t border-white/20 dark:border-white/10 bg-white/40 px-5 py-4 dark:bg-white/5 sm:px-6">
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {step === 1 ? "Step 1 of 2" : "Step 2 of 2"}
              </div>
              <div className="flex items-center gap-2">
                {(step === 2 || step === "job-options") && (
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={handleBack}
                    disabled={submitting}
                    size="sm"
                    className="text-gray-700 dark:text-gray-300"
                  >
                    <ArrowLeft className="mr-1.5 h-4 w-4" />
                    Back
                  </Button>
                )}
                {step !== "job-options" && (
                  <Button
                    type="button"
                    onClick={handleNext}
                    disabled={submitting}
                    size="sm"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="mr-1.5 h-4 w-4 animate-spin" />
                        Submitting…
                      </>
                    ) : step === 1 ? (
                      <>
                        Continue
                        <ArrowRight className="ml-1.5 h-4 w-4" />
                      </>
                    ) : (
                      <>
                        Submit
                        <CheckCircle2 className="ml-1.5 h-4 w-4" />
                      </>
                    )}
                  </Button>
                )}
              </div>
            </div>
          )}

          {/* Progress dots */}
          {step !== "success" && step !== "job-options" && (
            <div className="relative flex items-center justify-center gap-1.5 pb-4">
              {[1, 2].map((s) => (
                <div
                  key={s}
                  className={cn(
                    "h-1.5 rounded-full transition-all",
                    s === step
                      ? "w-8 bg-gradient-to-r from-blue-500 to-purple-500"
                      : s < (step as number)
                      ? "w-3 bg-blue-400"
                      : "w-3 bg-gray-300 dark:bg-gray-600"
                  )}
                />
              ))}
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
