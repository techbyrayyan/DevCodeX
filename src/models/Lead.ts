import mongoose, { Document, Model, Schema } from 'mongoose';

export interface ILead extends Document {
  name?: string;
  email?: string;
  companyName?: string;
  businessType?: string;
  projectType?: string;
  country?: string;
  targetAudience?: string;
  businessGoals?: string;
  currentWebsite?: string;
  budget?: string;
  estimatedBudget?: string;
  deadline?: string;
  timeline?: string;
  requiredDevelopers?: string;
  technologyRecommendation?: string;
  features?: string[];
  leadScore: number;
  status: 'Hot' | 'Warm' | 'Cold' | 'New' | 'Qualified' | 'Proposal Sent';
  conversations: any[];
  createdAt: Date;
  updatedAt: Date;
}

const LeadSchema = new Schema<ILead>({
  name: { type: String, default: 'Unknown Visitor' },
  email: { type: String },
  companyName: { type: String },
  businessType: { type: String },
  projectType: { type: String },
  country: { type: String },
  targetAudience: { type: String },
  businessGoals: { type: String },
  currentWebsite: { type: String },
  budget: { type: String },
  estimatedBudget: { type: String },
  deadline: { type: String },
  timeline: { type: String },
  requiredDevelopers: { type: String },
  technologyRecommendation: { type: String },
  features: [{ type: String }],
  leadScore: { type: Number, default: 0 },
  status: { type: String, enum: ['Hot', 'Warm', 'Cold', 'New', 'Qualified', 'Proposal Sent'], default: 'New' },
  conversations: [{ 
    role: { type: String }, 
    content: { type: String },
    timestamp: { type: Date, default: Date.now }
  }],
}, {
  timestamps: true
});

const Lead: Model<ILead> = mongoose.models.Lead || mongoose.model<ILead>('Lead', LeadSchema);

export default Lead;
