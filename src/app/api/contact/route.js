import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, company, service, message } = body;

    // Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields (Name, Email, and Message are mandatory).' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address format.' },
        { status: 400 }
      );
    }

    // WhatsApp URL pehle banao — ye hamesha fast hai
    const whatsappNumber = process.env.WHATSAPP_NUMBER || '923239724377';
    const companyText = company ? company : 'Not Specified';
    const serviceText = service ? service : 'General Consultation';

    const waText = [
      '*New Project Inquiry - DevCodeX*',
      '',
      '*Client Name:* ' + name,
      '*Email Address:* ' + email,
      '*Company:* ' + companyText,
      '*Service Required:* ' + serviceText,
      '',
      '*Project Scope & Requirements:*',
      message,
    ].join('\n');

    const whatsappUrl = 'https://wa.me/' + whatsappNumber + '?text=' + encodeURIComponent(waText);

    // MongoDB save — 3 second timeout ke sath, background mein
    const dbTimeout = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('DB timeout')), 3000)
    );

    const dbSave = (async () => {
      const connectToDatabase = (await import('@/lib/mongoose')).default;
      const Contact = (await import('@/models/Contact')).default;
      await connectToDatabase();
      await Contact.create({
        name:    name.trim(),
        email:   email.trim().toLowerCase(),
        company: company ? company.trim() : '',
        service: service || 'General Consultation',
        message: message.trim(),
        whatsappSent: true,
        status: 'New',
      });
    })();

    Promise.race([dbSave, dbTimeout])
      .then(() => console.log('Contact saved to MongoDB'))
      .catch((err) => console.warn('MongoDB skipped:', err.message));

    // Seedha response do — MongoDB ka wait mat karo
    return NextResponse.json(
      {
        success: true,
        whatsappUrl,
        message: 'Inquiry received! Redirecting to WhatsApp...',
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Contact Form Error:', error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}