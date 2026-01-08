"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, AlertCircle, Search, Award } from "lucide-react"
import { verifyCertificateByEnrollmentId, CertificateVerification } from "@/lib/certificate-verification"

export default function VerifyCertificatePage() {
    const [enrollmentId, setEnrollmentId] = useState("")
    const [certificateData, setCertificateData] = useState<CertificateVerification | null>(null)
    const [loading, setLoading] = useState(false)
    const [searched, setSearched] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)
        setCertificateData(null)
        setSearched(true)

        try {
            const result = await verifyCertificateByEnrollmentId(enrollmentId.trim())
            if (result) {
                setCertificateData(result)
            } else {
                setError("Certificate not found or not yet approved. Please check the enrollment ID.")
            }
        } catch (err) {
            setError("An error occurred while verifying the certificate. Please try again.")
            console.error("Verification error:", err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <div className="container mx-auto px-4 py-16">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="flex justify-center mb-4">
                        <Award className="h-12 w-12 text-indigo-600" />
                    </div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">Verify Certificate</h1>
                    <p className="text-gray-600 text-lg">
                        Check if a Proco Technologies certificate is genuine and valid
                    </p>
                </div>

                {/* Search Card */}
                <div className="max-w-2xl mx-auto mb-8">
                    <Card className="shadow-lg">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Search className="h-5 w-5 text-indigo-600" />
                                Search Certificate
                            </CardTitle>
                            <CardDescription>
                                Enter the enrollment ID to verify the certificate authenticity
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleVerify} className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">
                                        Enrollment ID
                                    </label>
                                    <Input
                                        type="text"
                                        placeholder="Enter enrollment ID (e.g., abc123def456...)"
                                        value={enrollmentId}
                                        onChange={(e) => setEnrollmentId(e.target.value)}
                                        disabled={loading}
                                        className="text-base"
                                    />
                                </div>
                                <Button
                                    type="submit"
                                    disabled={!enrollmentId.trim() || loading}
                                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
                                >
                                    {loading ? "Verifying..." : "Verify Certificate"}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>

                {/* Results */}
                <div className="max-w-2xl mx-auto">
                    {searched && loading && (
                        <Card className="shadow-lg">
                            <CardContent className="p-8 text-center">
                                <div className="animate-spin h-8 w-8 text-indigo-600 mx-auto mb-2"></div>
                                <p className="text-gray-600">Verifying certificate...</p>
                            </CardContent>
                        </Card>
                    )}

                    {searched && !loading && error && (
                        <Card className="shadow-lg border-red-200">
                            <CardContent className="p-8">
                                <div className="flex items-start gap-4">
                                    <AlertCircle className="h-6 w-6 text-red-600 flex-shrink-0 mt-1" />
                                    <div>
                                        <h3 className="font-semibold text-red-900 mb-1">Certificate Not Found</h3>
                                        <p className="text-red-700">{error}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {certificateData && <CertificateDisplayCard certificate={certificateData} />}
                </div>

                {/* Footer Info */}
                <div className="max-w-2xl mx-auto mt-12 text-center text-gray-600 text-sm">
                    <p>
                        This verification service is provided by Proco Technologies. For security, only verified
                        certificates will be displayed.
                    </p>
                </div>
            </div>
        </div>
    )
}

// Certificate Display Card Component
function CertificateDisplayCard({ certificate }: { certificate: CertificateVerification }) {
    return (
        <Card className="shadow-lg border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
            <CardHeader className="border-b border-green-200">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <CheckCircle className="h-6 w-6 text-green-600" />
                        <CardTitle className="text-green-900">Certificate Verified</CardTitle>
                    </div>
                    <Badge className="bg-green-600 text-white">Genuine</Badge>
                </div>
                <CardDescription className="text-green-700">
                    This certificate has been verified as authentic
                </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
                <div className="space-y-6">
                    {/* Student & Course Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h4 className="font-semibold text-gray-700 mb-2">Student Name</h4>
                            <p className="text-xl text-gray-900 font-bold">{certificate.studentName}</p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-700 mb-2">Certificate ID</h4>
                            <p className="text-lg text-gray-900 font-mono bg-gray-100 p-2 rounded">
                                {certificate.certificateId}
                            </p>
                        </div>
                    </div>

                    {/* Course Info */}
                    <div>
                        <h4 className="font-semibold text-gray-700 mb-2">Course</h4>
                        <div className="bg-white p-4 rounded-lg border border-green-200">
                            <p className="text-lg font-bold text-gray-900">{certificate.courseTitle}</p>
                            <p className="text-gray-600 mt-2">{certificate.courseDescription}</p>
                        </div>
                    </div>

                    {/* Details Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <div className="bg-white p-3 rounded-lg border border-green-200">
                            <p className="text-xs text-gray-600 uppercase font-semibold mb-1">Duration</p>
                            <p className="text-lg font-bold text-gray-900">{certificate.courseDuration}</p>
                        </div>
                        <div className="bg-white p-3 rounded-lg border border-green-200">
                            <p className="text-xs text-gray-600 uppercase font-semibold mb-1">
                                Completion Date
                            </p>
                            <p className="text-lg font-bold text-gray-900">{certificate.completionDate}</p>
                        </div>
                        <div className="bg-white p-3 rounded-lg border border-green-200">
                            <p className="text-xs text-gray-600 uppercase font-semibold mb-1">Approval Date</p>
                            <p className="text-lg font-bold text-gray-900">
                                {certificate.certificateApprovedAt || "Pending"}
                            </p>
                        </div>
                    </div>

                    {/* Verification Details */}
                    <div className="bg-white p-4 rounded-lg border border-green-200">
                        <h4 className="font-semibold text-gray-700 mb-3">Verification Details</h4>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Enrollment ID:</span>
                                <span className="font-mono text-gray-900 break-all">{certificate.enrollmentId}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Status:</span>
                                <Badge className="bg-green-600 text-white">Approved</Badge>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Issued By:</span>
                                <span className="font-semibold text-gray-900">ProCo Tech</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-indigo-50 border border-indigo-200 p-4 rounded-lg">
                        <p className="text-sm text-indigo-800">
                            ✓ This certificate has been verified against our official database and is authentic.
                            The certificate was issued on {certificate.certificateApprovedAt} by Proco Technologies.
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
