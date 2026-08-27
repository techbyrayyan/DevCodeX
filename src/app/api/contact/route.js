import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongoose';
import Contact from '@/models/Contact';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, company, service, message } = body;

    // Server-side Validation
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

    // MongoDB mein save karo
    await connectToDatabase();

    const contactEntry = await Contact.create({
      name:    name.trim(),
      email:   email.trim().toLowerCase(),
      company: company ? company.trim() : '',
      service: service || 'General Consultation',
      message: message.trim(),
      whatsappSent: true,
      status: 'New',
    });

    console.log('Contact saved to MongoDB:', contactEntry._id.toString());

    // WhatsApp URL banao
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

    return NextResponse.json(
      {
        success: true,
        whatsappUrl,
        message: 'Your inquiry has been saved and forwarded to WhatsApp. We will respond within 4 hours.',
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Contact Form Submission Error:', error);
    return NextResponse.json(
      { error: 'Internal server error. Please try again or email devcodex.agency@gmail.com directly.' },
      { status: 500 }
    );
  }
}