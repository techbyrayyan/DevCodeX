import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Helper: load an image URL and return base64 data URL (or null on error)
async function loadImageAsBase64(src: string): Promise<string | null> {
  return new Promise(resolve => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.src = src;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext('2d');
      // Fill white background first so signature transparent areas look clean
      if (ctx) {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
      }
      resolve(canvas.toDataURL('image/png'));
    };
    img.onerror = () => resolve(null);
  });
}

export const downloadInvoicePDF = async (invoice: any) => {
  const jsPDF = (await import('jspdf')).default;
  const autoTable = (await import('jspdf-autotable')).default;

  const doc = new jsPDF();

  // ── 1. Logo top-right ────────────────────────────────────────────
  const logoData = await loadImageAsBase64('/logo1.png');
  if (logoData) {
    // Place logo top-right corner, width 35mm height 14mm
    doc.addImage(logoData, 'PNG', 162, 8, 35, 14, undefined, 'FAST');
  }

  // ── 2. INVOICE heading top-left ──────────────────────────────────
  doc.setFontSize(22);
  doc.setFont('helvetica', 'bold');
  doc.text('INVOICE', 14, 22);

  // ── 3. Invoice meta ──────────────────────────────────────────────
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.text(`Invoice Number: ${invoice.invoiceNumber || invoice.id}`, 14, 35);
  doc.text(`Issue Date: ${invoice.issueDate || 'N/A'}`, 14, 42);
  doc.text(`Due Date: ${invoice.dueDate || 'N/A'}`, 14, 49);

  // Billed to (right side)
  doc.setFont('helvetica', 'bold');
  doc.text('Billed To:', 140, 35);
  doc.setFont('helvetica', 'normal');
  doc.text(`${invoice.clientName || 'N/A'}`, 140, 42);

  // ── 4. Items table ───────────────────────────────────────────────
  const rows = (invoice.items || []).map((item: any) => [
    item.description || item.name || '',
    item.qty?.toString() || '1',
    `$${(item.price || 0).toFixed(2)}`,
    `$${((item.qty || 0) * (item.price || 0)).toFixed(2)}`
  ]);

  autoTable(doc, {
    head: [['Item Description', 'Qty', 'Price', 'Total']],
    body: rows,
    startY: 58,
    headStyles: { fillColor: [79, 70, 229], fontSize: 10, fontStyle: 'bold' },
    bodyStyles: { fontSize: 9 },
    alternateRowStyles: { fillColor: [248, 248, 255] },
  });

  const finalY = (doc as any).lastAutoTable.finalY + 12;

  // ── 5. Totals ────────────────────────────────────────────────────
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  if (invoice.status) {
    doc.text(`Status: ${invoice.status.toUpperCase()}`, 14, finalY);
  }

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text(`Total Amount: $${(invoice.total || 0).toFixed(2)}`, 140, finalY);

  // ── 6. CEO Signature (handwritten) bottom-right ──────────────────
  const signatureData = await loadImageAsBase64('/image.png');
  if (signatureData) {
    const sigY = finalY + 15;
    // Draw a light separator line above signature
    doc.setDrawColor(200, 200, 200);
    doc.line(130, sigY - 2, 197, sigY - 2);
    // Place signature image — wide & tall enough to read the script clearly
    doc.addImage(signatureData, 'PNG', 135, sigY, 55, 28, undefined, 'FAST');
    // Label below
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 100, 100);
    doc.text('Authorised Signatory — CEO, DevCodeX', 135, sigY + 32);
    doc.setTextColor(0, 0, 0);
  }

  doc.save(`Invoice_${invoice.invoiceNumber || invoice.id}.pdf`);
};

