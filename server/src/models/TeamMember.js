import mongoose from 'mongoose';

const teamMemberSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
    },
    role: {
      type: String,
      required: [true, 'Please add a role/designation'],
    },
    experience: {
      type: String,
    },
    imageUrl: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    displayOrder: {
      type: Number,
      default: 0,
    }
  },
  {
    timestamps: true,
  }
);

const TeamMember = mongoose.model('TeamMember', teamMemberSchema);
export default TeamMember;
