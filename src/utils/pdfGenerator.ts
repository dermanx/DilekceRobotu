import { jsPDF } from 'jspdf';

export const generatePDF = (
  content: string,
  formData: {
    ad: string;
    soyad: string;
    email: string;
    telefon: string;
  }
): string => {
  const doc = new jsPDF();
  
  // Use built-in font
  doc.setFont('helvetica');
  doc.setFontSize(12);

  // Page margins and dimensions
  const margin = 20;
  const pageWidth = doc.internal.pageSize.width;
  const maxWidth = pageWidth - (2 * margin);

  // Add header - Right aligned date
  const today = new Date().toLocaleDateString('tr-TR');
  const dateWidth = doc.getStringUnitWidth(today) * doc.internal.getFontSize() / doc.internal.scaleFactor;
  doc.text(today, pageWidth - margin - dateWidth, margin);

  // Add court information - Centered
  const courtTitle = 'SAYIN İSTANBUL AİLE MAHKEMESİ HAKİMLİĞİNE';
  const courtTitleWidth = doc.getStringUnitWidth(courtTitle) * doc.internal.getFontSize() / doc.internal.scaleFactor;
  doc.text(courtTitle, (pageWidth - courtTitleWidth) / 2, margin + 20);

  // Add petitioner information
  let yPosition = margin + 40;
  
  // Davacı (Petitioner) section
  doc.setFont('helvetica', 'bold');
  doc.text('Davacı:', margin, yPosition);
  doc.setFont('helvetica', 'normal');
  yPosition += 7;
  doc.text(`Ad Soyad: ${formData.ad} ${formData.soyad}`, margin + 10, yPosition);
  yPosition += 7;
  doc.text(`T.C. Kimlik No: `, margin + 10, yPosition);
  yPosition += 7;
  doc.text(`Adres: `, margin + 10, yPosition);
  yPosition += 14;

  // Davalı (Respondent) section
  doc.setFont('helvetica', 'bold');
  doc.text('Davalı:', margin, yPosition);
  doc.setFont('helvetica', 'normal');
  yPosition += 7;
  doc.text('Ad Soyad: ', margin + 10, yPosition);
  yPosition += 7;
  doc.text('T.C. Kimlik No: ', margin + 10, yPosition);
  yPosition += 7;
  doc.text('Adres: ', margin + 10, yPosition);
  yPosition += 14;

  // Konu (Subject) section
  doc.setFont('helvetica', 'bold');
  doc.text('Konu:', margin, yPosition);
  yPosition += 10;

  // Main content
  doc.setFont('helvetica', 'normal');
  const lines = doc.splitTextToSize(content, maxWidth);
  lines.forEach((line: string) => {
    doc.text(line, margin, yPosition);
    yPosition += 7;
  });

  // Add footer
  const footerY = doc.internal.pageSize.height - 50;
  
  // Date
  doc.text('Tarih:', margin, footerY);
  doc.text(today, margin + 30, footerY);

  // Signature
  doc.text('İmza:', margin, footerY + 10);
  doc.text(`${formData.ad} ${formData.soyad}`, margin + 30, footerY + 10);

  // Contact information
  doc.setFontSize(10);
  doc.text(`İletişim Bilgileri:`, margin, footerY + 20);
  doc.text(`Tel: ${formData.telefon}`, margin + 10, footerY + 27);
  doc.text(`E-posta: ${formData.email}`, margin + 10, footerY + 34);

  // Generate PDF as base64
  return doc.output('datauristring');
};