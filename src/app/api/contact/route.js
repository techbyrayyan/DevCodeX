import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, company, service, budget, message } = body;

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

    // Process inquiry logging or external email forwarding safely
    console.log('Received DevCodeX Project Inquiry:', {
      name,
      email,
      company: company || 'Not specified',
      service: service || 'General Consultation',
      budget: budget || 'Undisclosed',
      message,
      timestamp: new Date().toISOString()
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Thank you! Your project inquiry has been successfully received by DevCodeX. Our senior engineering team will respond within 24 hours.'
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact Form Submission Error:', error);
    return NextResponse.json(
      { error: 'Internal server error while submitting message. Please try again or email contact@devcodex.com directly.' },
      { status: 500 }
    );
  }
}
