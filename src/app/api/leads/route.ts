import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongoose';
import Lead from '@/models/Lead';

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    
    // Sort by leadScore descending and get newest first
    const leads = await Lead.find().sort({ leadScore: -1, createdAt: -1 });
    
    return NextResponse.json({ success: true, leads });
  } catch (error: any) {
    console.error('Error fetching leads:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    const data = await request.json();
    
    const newLead = await Lead.create(data);
    
    return NextResponse.json({ success: true, lead: newLead });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
