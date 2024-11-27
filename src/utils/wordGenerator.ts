import { Document, Paragraph, TextRun, AlignmentType, Packer } from 'docx';
import { saveAs } from 'file-saver';

interface PetitionerData {
  ad: string;
  soyad: string;
  adres: string;
  telefon: string;
  kurum: string;
}

const STYLES = {
  font: 'Times New Roman',
  size: 24, // 12pt
  titleSize: 28, // 14pt
  headerSize: 32, // 16pt
  lineSpacing: 276, // 1.15
  paragraphSpacing: 276, // 1.15
} as const;

function createTextRun(text: string, options: Partial<TextRun> = {}): TextRun {
  return new TextRun({
    text,
    font: STYLES.font,
    size: STYLES.size,
    ...options,
  });
}

function formatDate(date: Date): string {
  return date.toLocaleDateString('tr-TR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export async function generateAndDownloadWord(
  content: string,
  formData: PetitionerData
): Promise<void> {
  try {
    // Split content into paragraphs and clean up
    const paragraphs = content
      .split('\n')
      .map(p => p.trim())
      .filter(p => p.length > 0);

    const doc = new Document({
      sections: [{
        properties: {},
        children: [
          // Date
          new Paragraph({
            alignment: AlignmentType.RIGHT,
            spacing: { after: STYLES.paragraphSpacing },
            children: [
              createTextRun(formatDate(new Date()))
            ]
          }),

          // Institution Header
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: STYLES.paragraphSpacing, after: STYLES.paragraphSpacing },
            children: [
              createTextRun(formData.kurum.toUpperCase(), {
                bold: true,
                size: STYLES.headerSize
              })
            ]
          }),

          // Petitioner Information
          new Paragraph({
            spacing: { before: STYLES.paragraphSpacing, after: STYLES.paragraphSpacing },
            children: [
              createTextRun('Dilekçe Sahibi:', { bold: true }),
              createTextRun('\n'),
              createTextRun(`Ad Soyad: ${formData.ad} ${formData.soyad}\n`),
              createTextRun(`Adres: ${formData.adres}\n`),
              createTextRun(`Telefon: ${formData.telefon}`)
            ]
          }),

          // Subject
          new Paragraph({
            spacing: { before: STYLES.paragraphSpacing, after: STYLES.paragraphSpacing },
            children: [
              createTextRun('KONU: ', { bold: true }),
              createTextRun('Dilekçe Talebi Hk.')
            ]
          }),

          // Content
          ...paragraphs.map(text => 
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              spacing: { before: STYLES.lineSpacing, after: STYLES.lineSpacing },
              children: [createTextRun(text)]
            })
          ),

          // Signature
          new Paragraph({
            alignment: AlignmentType.RIGHT,
            spacing: { before: STYLES.paragraphSpacing * 2 },
            children: [
              createTextRun('İmza\n'),
              createTextRun(`${formData.ad} ${formData.soyad}`)
            ]
          })
        ]
      }]
    });

    const blob = await Packer.toBlob(doc);
    const fileName = `dilekce_${formData.ad.toLowerCase()}_${formData.soyad.toLowerCase()}_${Date.now()}.docx`;
    saveAs(blob, fileName);
  } catch (error) {
    console.error('Word belgesi oluşturma hatası:', error);
    throw new Error('Dilekçe belgesi oluşturulurken bir hata oluştu. Lütfen tekrar deneyiniz.');
  }
}