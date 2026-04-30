import EmailTemplate from '../model/email-template.model.js';

export async function getAllTemplates() {
  return EmailTemplate.find({}).sort({ createdAt: -1 });
}

export async function createTemplate(data) {
  return EmailTemplate.create(data);
}

export async function updateTemplate(id, data) {
  return EmailTemplate.findByIdAndUpdate(id, data, { new: true });
}

export async function deleteTemplate(id) {
  return EmailTemplate.findByIdAndDelete(id);
}
