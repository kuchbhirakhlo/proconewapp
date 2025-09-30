import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

// Generate certificate ID in format: PRC + 5 random numbers
export const generateCertificateId = (): string => {
    const randomNumbers = Math.floor(Math.random() * 100000).toString().padStart(5, '0');
    return `PRC${randomNumbers}`;
};

export interface CertificateData {
    studentName: string;
    courseTitle: string;
    courseDescription: string;
    completionDate: string;
    certificateId: string;
    courseDuration?: string;
}

export const generateCertificatePDF = async (data: CertificateData): Promise<void> => {
    // Create a temporary div for the certificate design
    const certificateDiv = document.createElement('div');
    certificateDiv.style.position = 'absolute';
    certificateDiv.style.left = '-9999px';
    certificateDiv.style.top = '0';
    certificateDiv.style.width = '800px';
    certificateDiv.style.background = 'white';
    certificateDiv.style.padding = '40px';
    certificateDiv.style.fontFamily = 'serif';
    certificateDiv.innerHTML = `
        <div style="text-align: center; border: 8px solid #1f2937; padding: 40px; background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); min-height: 600px; display: flex; flex-direction: column; justify-content: center;">
            <!-- Header -->
            <div style="margin-bottom: 40px;">
                <h1 style="color: #1f2937; font-size: 36px; margin: 0; font-weight: bold; text-transform: uppercase; letter-spacing: 2px;">Certificate of Completion</h1>
                <div style="width: 100px; height: 3px; background: #3b82f6; margin: 10px auto;"></div>
            </div>

            <!-- Content -->
            <div style="margin: 40px 0;">
                <p style="font-size: 20px; color: #374151; margin: 20px 0;">This is to certify that</p>
                <h2 style="font-size: 32px; color: #1f2937; margin: 20px 0; font-weight: bold; text-transform: uppercase;">${data.studentName}</h2>
                <p style="font-size: 18px; color: #374151; margin: 20px 0;">has successfully completed the course</p>
                <h3 style="font-size: 28px; color: #3b82f6; margin: 20px 0; font-weight: bold; font-style: italic;">"${data.courseTitle}"</h3>
                <p style="font-size: 16px; color: #6b7280; margin: 20px 0; max-width: 600px; margin-left: auto; margin-right: auto; line-height: 1.6;">${data.courseDescription}</p>
            </div>

            <!-- Details -->
            <div style="display: flex; justify-content: space-between; margin: 40px 0; max-width: 500px; margin-left: auto; margin-right: auto;">
                <div style="text-align: center;">
                    <p style="font-size: 14px; color: #6b7280; margin: 5px 0;">Completion Date</p>
                    <p style="font-size: 16px; color: #1f2937; font-weight: bold;">${data.completionDate}</p>
                </div>
                <div style="text-align: center;">
                    <p style="font-size: 14px; color: #6b7280; margin: 5px 0;">Certificate ID</p>
                    <p style="font-size: 16px; color: #1f2937; font-weight: bold;">${data.certificateId}</p>
                </div>
            </div>

            <!-- Course Duration -->
            ${data.courseDuration ? `
                <div style="text-align: center; margin: 20px 0;">
                    <p style="font-size: 14px; color: #6b7280; margin: 5px 0;">Course Duration</p>
                    <p style="font-size: 16px; color: #1f2937; font-weight: bold;">${data.courseDuration}</p>
                </div>
            ` : ''}

            <!-- Logo -->
            <div style="margin-top: 40px; text-align: center;">
                <div style="display: inline-block; text-align: center; margin: 0 40px;">
                    <img src="/logo.png" alt="Organization Logo" style="height: 60px; width: auto; margin-bottom: 10px; object-fit: contain;" />
                    <p style="font-size: 14px; color: #6b7280; margin: 5px 0;">Certified by</p>
                    <p style="font-size: 16px; color: #1f2937; font-weight: bold;">ProCo Tech</p>
                </div>
            </div>

            <!-- Footer -->
            <div style="margin-top: 40px; text-align: center;">
                <p style="font-size: 12px; color: #6b7280; margin: 5px 0;">This certificate is officially recognized and verified</p>
                <p style="font-size: 12px; color: #6b7280; margin: 5px 0;">Issued on ${new Date().toLocaleDateString()}</p>
            </div>
        </div>
    `;

    document.body.appendChild(certificateDiv);

    try {
        // Generate canvas from the certificate div
        const canvas = await html2canvas(certificateDiv, {
            useCORS: true,
            allowTaint: true,
            scale: 2,
            logging: false,
            removeContainer: true
        } as any);

        // Create PDF
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4'
        });

        // Calculate dimensions to fit A4
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const imgWidth = canvas.width;
        const imgHeight = canvas.height;
        const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
        const imgX = (pdfWidth - imgWidth * ratio) / 2;
        const imgY = (pdfHeight - imgHeight * ratio) / 2;

        pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
        pdf.save(`Certificate_${data.certificateId}_${data.courseTitle.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.pdf`);
    } catch (error) {
        console.error('Error generating certificate:', error);
        throw new Error('Failed to generate certificate');
    } finally {
        // Clean up
        document.body.removeChild(certificateDiv);
    }
};

export const previewCertificate = (data: CertificateData): void => {
    const previewWindow = window.open('', '_blank');
    if (!previewWindow) return;

    previewWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Certificate Preview - ${data.courseTitle}</title>
            <meta charset="UTF-8">
            <style>
                body {
                    font-family: serif;
                    margin: 0;
                    padding: 20px;
                    background: #f5f5f5;
                }
                .certificate {
                    max-width: 800px;
                    margin: 0 auto;
                    background: white;
                    padding: 40px;
                    box-shadow: 0 0 20px rgba(0,0,0,0.1);
                    border: 8px solid #1f2937;
                    background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
                }
                .certificate h1 {
                    color: #1f2937;
                    font-size: 36px;
                    margin: 0;
                    font-weight: bold;
                    text-transform: uppercase;
                    letter-spacing: 2px;
                    text-align: center;
                    margin-bottom: 40px;
                }
                .certificate .divider {
                    width: 100px;
                    height: 3px;
                    background: #3b82f6;
                    margin: 10px auto 40px;
                }
                .certificate .content {
                    text-align: center;
                    margin: 40px 0;
                }
                .certificate .student-name {
                    font-size: 32px;
                    color: #1f2937;
                    margin: 20px 0;
                    font-weight: bold;
                    text-transform: uppercase;
                }
                .certificate .course-title {
                    font-size: 28px;
                    color: #3b82f6;
                    margin: 20px 0;
                    font-weight: bold;
                    font-style: italic;
                }
                .certificate .details {
                    display: flex;
                    justify-content: space-between;
                    margin: 40px 0;
                    max-width: 500px;
                    margin-left: auto;
                    margin-right: auto;
                }
                .certificate .detail-item {
                    text-align: center;
                }
                .certificate .detail-label {
                    font-size: 14px;
                    color: #6b7280;
                    margin: 5px 0;
                }
                .certificate .detail-value {
                    font-size: 16px;
                    color: #1f2937;
                    font-weight: bold;
                }
                .certificate .signature {
                    margin-top: 40px;
                    text-align: center;
                }
                .certificate .signature-line {
                    border-top: 2px solid #3b82f6;
                    width: 200px;
                    margin: 0 auto;
                    height: 60px;
                    margin-bottom: 10px;
                }
                .certificate .footer {
                    margin-top: 40px;
                    text-align: center;
                }
                .certificate .footer p {
                    font-size: 12px;
                    color: #6b7280;
                    margin: 5px 0;
                }
                @media print {
                    body { background: white; }
                    .certificate { box-shadow: none; }
                }
            </style>
        </head>
        <body>
            <div class="certificate">
                <h1>Certificate of Completion</h1>
                <div class="divider"></div>

                <div class="content">
                    <p style="font-size: 20px; color: #374151; margin: 20px 0;">This is to certify that</p>
                    <div class="student-name">${data.studentName}</div>
                    <p style="font-size: 18px; color: #374151; margin: 20px 0;">has successfully completed the course</p>
                    <div class="course-title">"${data.courseTitle}"</div>
                    <p style="font-size: 16px; color: #6b7280; margin: 20px 0; max-width: 600px; margin-left: auto; margin-right: auto; line-height: 1.6;">${data.courseDescription}</p>
                </div>

                <div class="details">
                    <div class="detail-item">
                        <div class="detail-label">Completion Date</div>
                        <div class="detail-value">${data.completionDate}</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">Certificate ID</div>
                        <div class="detail-value">${data.certificateId}</div>
                    </div>
                </div>

                ${data.courseDuration ? `
                    <div class="detail-item" style="margin: 20px auto; text-align: center;">
                        <div class="detail-label">Course Duration</div>
                        <div class="detail-value">${data.courseDuration}</div>
                    </div>
                ` : ''}

                <div class="signature">
                    <img src="/logo.png" alt="Organization Logo" style="height: 60px; width: auto; margin: 0 auto 10px; object-fit: contain; display: block;" />
                    <div class="detail-label">Certified by</div>
                    <div class="detail-value">ProCo Tech</div>
                </div>

                <div class="footer">
                    <p>This certificate is officially recognized and verified</p>
                    <p>Issued on ${new Date().toLocaleDateString()}</p>
                </div>
            </div>
        </body>
        </html>
    `);

    previewWindow.document.close();
};