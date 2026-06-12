"use client"

import * as React from "react"
import { useState, useRef } from "react"
import { motion } from "framer-motion"
import {
  User,
  Phone,
  GraduationCap,
  Briefcase as BriefcaseIcon,
  UserCircle2,
  CheckCircle2,
  Rocket,
  PartyPopper,
  Building2,
  Sparkles,
  ArrowRight,
  Loader2,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  STUDENT_COURSES,
  BUSINESS_SERVICES,
  JOB_SEEKER_OPTIONS,
  UserRole,
} from "@/lib/homepage-leads"
import { cn } from "@/lib/utils"

interface FormData {
  name: string
  mobile: string
  role: UserRole | ""
  interest: string
}

interface Step1Props {
  formData: FormData
  setFormData: React.Dispatch<React.SetStateAction<FormData>>
  errors: { name?: string; mobile?: string }
  nameInputRef: React.RefObject<HTMLInputElement>
}

export function Step1({ formData, setFormData, errors, nameInputRef }: Step1Props) {
  const roleOptions: Array<{
    value: UserRole
    label: string
    description: string
    icon: React.ReactNode
    color: string
  }> = [
    {
      value: "Student",
      label: "Student",
      description: "Looking to learn new skills",
      icon: <GraduationCap className="h-5 w-5" />,
      color: "from-blue-500 to-cyan-500",
    },
    {
      value: "Business Owner",
      label: "Business Owner",
      description: "Need tech or marketing solutions",
      icon: <BriefcaseIcon className="h-5 w-5" />,
      color: "from-emerald-500 to-green-500",
    },
    {
      value: "Job Seeker",
      label: "Job Seeker",
      description: "Looking for opportunities",
      icon: <UserCircle2 className="h-5 w-5" />,
      color: "from-purple-500 to-pink-500",
    },
    {
      value: "Other",
      label: "Other",
      description: "Just exploring",
      icon: <Sparkles className="h-5 w-5" />,
      color: "from-amber-500 to-orange-500",
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -10 }}
      transition={{ duration: 0.2 }}
      className="space-y-4"
    >
      <div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
          Tell Us About Yourself
        </h3>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          We'll connect you with the right expert in seconds
        </p>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="popup-name" className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Full Name <span className="text-red-500">*</span>
        </Label>
        <div className="relative">
          <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            id="popup-name"
            ref={nameInputRef}
            value={formData.name}
            onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
            placeholder="Priya Singh"
            className={cn(
              "h-11 border-gray-300 bg-white/70 pl-9 text-gray-900 placeholder:text-gray-400 focus-visible:ring-blue-500 dark:border-gray-700 dark:bg-white/5 dark:text-white",
              errors.name && "border-red-500 focus-visible:ring-red-500"
            )}
            autoComplete="name"
          />
        </div>
        {errors.name && (
          <p className="text-xs text-red-600 dark:text-red-400">{errors.name}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="popup-mobile" className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Mobile Number <span className="text-red-500">*</span>
        </Label>
        <div className="relative">
          <Phone className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            id="popup-mobile"
            type="tel"
            inputMode="tel"
            value={formData.mobile}
            onChange={(e) => setFormData((p) => ({ ...p, mobile: e.target.value }))}
            placeholder="+91 98765 43210"
            className={cn(
              "h-11 border-gray-300 bg-white/70 pl-9 text-gray-900 placeholder:text-gray-400 focus-visible:ring-blue-500 dark:border-gray-700 dark:bg-white/5 dark:text-white",
              errors.mobile && "border-red-500 focus-visible:ring-red-500"
            )}
            autoComplete="tel"
          />
        </div>
        {errors.mobile && (
          <p className="text-xs text-red-600 dark:text-red-400">{errors.mobile}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Who are you? <span className="text-red-500">*</span>
        </Label>
        <div className="grid grid-cols-2 gap-2">
          {roleOptions.map((opt) => {
            const active = formData.role === opt.value
            return (
              <button
                type="button"
                key={opt.value}
                onClick={() => setFormData((p) => ({ ...p, role: opt.value }))}
                className={cn(
                  "group relative flex items-start gap-2.5 rounded-lg border p-2.5 text-left transition-all",
                  "hover:border-blue-400 hover:shadow-sm",
                  active
                    ? "border-blue-500 bg-blue-50/80 shadow-sm ring-1 ring-blue-500/40 dark:border-blue-400 dark:bg-blue-500/10"
                    : "border-gray-200 bg-white/60 dark:border-gray-700 dark:bg-white/5"
                )}
              >
                <div
                  className={cn(
                    "flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-md bg-gradient-to-br text-white shadow-sm",
                    opt.color
                  )}
                >
                  {opt.icon}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    {opt.label}
                  </p>
                  <p className="text-[11px] leading-tight text-gray-500 dark:text-gray-400">
                    {opt.description}
                  </p>
                </div>
                {active && (
                  <CheckCircle2 className="absolute right-1.5 top-1.5 h-3.5 w-3.5 text-blue-500" />
                )}
              </button>
            )
          })}
        </div>
      </div>
    </motion.div>
  )
}

interface Step2Props {
  formData: FormData
  setFormData: React.Dispatch<React.SetStateAction<FormData>>
}

export function Step2({ formData, setFormData }: Step2Props) {
  const isStudent = formData.role === "Student"
  const options = isStudent ? STUDENT_COURSES : BUSINESS_SERVICES
  const title = isStudent ? "Which Course Are You Interested In?" : "Which Service Do You Need?"
  const accent = isStudent ? "from-blue-500 to-cyan-500" : "from-emerald-500 to-green-500"
  const Icon = isStudent ? GraduationCap : Building2

  return (
    <motion.div
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -10 }}
      transition={{ duration: 0.2 }}
      className="space-y-4"
    >
      <div className="flex items-start gap-3">
        <div className={cn("flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br text-white shadow-md", accent)}>
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            {title}
          </h3>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            {isStudent
              ? "Choose a course and our academic counselor will help you"
              : "Select a service and our business consultant will reach out"}
          </p>
        </div>
      </div>

      <div className="space-y-1.5">
        <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {isStudent ? "Course" : "Service"} <span className="text-red-500">*</span>
        </Label>
        <Select
          value={formData.interest}
          onValueChange={(value) => setFormData((p) => ({ ...p, interest: value }))}
        >
          <SelectTrigger className="h-11 border-gray-300 bg-white/70 text-gray-900 dark:border-gray-700 dark:bg-white/5 dark:text-white">
            <SelectValue placeholder={isStudent ? "Select a course" : "Select a service"} />
          </SelectTrigger>
          <SelectContent>
            {options.map((opt) => (
              <SelectItem key={opt} value={opt}>
                {opt}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-lg border border-blue-200/50 bg-blue-50/60 p-3 dark:border-blue-900/40 dark:bg-blue-950/20">
        <p className="text-xs text-blue-700 dark:text-blue-300">
          💡 Your information is safe with us. We'll only use it to contact you about your inquiry.
        </p>
      </div>
    </motion.div>
  )
}

interface JobSeekerStepProps {
  onSelect: (option: string) => void
  submitting: boolean
}

export function JobSeekerStep({ onSelect, submitting }: JobSeekerStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -10 }}
      transition={{ duration: 0.2 }}
      className="space-y-4"
    >
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-md">
          <UserCircle2 className="h-5 w-5" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            What are you looking for?
          </h3>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Pick the opportunity that best fits your goals
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-2.5">
        {JOB_SEEKER_OPTIONS.map((option) => (
          <button
            key={option}
            type="button"
            disabled={submitting}
            onClick={() => onSelect(option)}
            className="group flex items-center justify-between rounded-lg border border-gray-200 bg-white/60 p-3.5 text-left transition-all hover:border-purple-400 hover:bg-purple-50/60 hover:shadow-sm disabled:opacity-50 dark:border-gray-700 dark:bg-white/5 dark:hover:border-purple-500 dark:hover:bg-purple-950/20"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-md bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-sm">
                <Rocket className="h-4 w-4" />
              </div>
              <span className="text-sm font-semibold text-gray-900 dark:text-white">
                {option}
              </span>
            </div>
            <ArrowRight className="h-4 w-4 text-gray-400 transition-transform group-hover:translate-x-0.5 group-hover:text-purple-500" />
          </button>
        ))}
      </div>
    </motion.div>
  )
}

interface SuccessStepProps {
  leadType: UserRole | ""
  countdown: number
  onRedirect: () => void
  redirectPath: string
}

export function SuccessStep({ leadType, countdown, onRedirect, redirectPath }: SuccessStepProps) {
  const isStudent = leadType === "Student" || leadType === "Job Seeker"
  const headline = isStudent ? "Thank You!" : "Thank You!"
  const message = isStudent
    ? "Our Academic Counselor Will Contact You Shortly."
    : "Our Business Consultant Will Contact You Shortly."
  const Icon = isStudent ? GraduationCap : BriefcaseIcon
  const cta = isStudent ? "Explore Courses" : "Explore Services"
  const color = isStudent ? "from-blue-500 to-cyan-500" : "from-emerald-500 to-green-500"

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center justify-center py-4 text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.1 }}
        className="relative mb-4"
      >
        <div
          className={cn(
            "absolute inset-0 rounded-full bg-gradient-to-br opacity-30 blur-xl",
            color
          )}
        />
        <div
          className={cn(
            "relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br text-white shadow-xl",
            color
          )}
        >
          <PartyPopper className="h-10 w-10" />
        </div>
      </motion.div>

      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{headline}</h3>
      <p className="mt-2 max-w-xs text-sm text-gray-600 dark:text-gray-300">{message}</p>

      <div className="mt-5 flex items-center gap-2 rounded-full border border-gray-200 bg-white/60 px-3 py-1.5 text-xs text-gray-600 dark:border-gray-700 dark:bg-white/5 dark:text-gray-300">
        <Loader2 className="h-3 w-3 animate-spin" />
        <span>
          Redirecting in {countdown}s…
        </span>
      </div>

      <Button
        type="button"
        onClick={onRedirect}
        className="mt-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700"
        size="lg"
      >
        <Icon className="mr-2 h-4 w-4" />
        {cta}
      </Button>

      <p className="mt-3 text-[11px] text-gray-400">
        Taking you to{" "}
        <span className="font-mono text-gray-500 dark:text-gray-400">{redirectPath}</span>
      </p>
    </motion.div>
  )
}
