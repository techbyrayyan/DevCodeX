import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongoose';
import Lead from '@/models/Lead';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectToDatabase();
    const lead = await Lead.findById(params.id);
    if (!lead) return NextResponse.json({ success: false, error: 'Lead not found' }, { status: 404 });
    return NextResponse.json({ success: true, lead });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectToDatabase();
    const data = await req.json();
    const lead = await Lead.findByIdAndUpdate(params.id, { $set: data }, { new: true });
    if (!lead) return NextResponse.json({ success: false, error: 'Lead not found' }, { status: 404 });
    return NextResponse.json({ success: true, lead });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectToDatabase();
    await Lead.findByIdAndDelete(params.id);
    return NextResponse.json({ success: true, message: 'Lead deleted' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
