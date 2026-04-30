import Setting from '../model/setting.model.js';
import { AppError } from '../../../utils/AppError.js';

export async function getSettingByKey(key) {
  const setting = await Setting.findOne({ key });
  return setting ? setting.value : null;
}

export async function updateSetting(key, value, description = '') {
  let setting = await Setting.findOne({ key });

  if (setting) {
    setting.value = value;
    if (description) setting.description = description;
    await setting.save();
  } else {
    setting = await Setting.create({ key, value, description });
  }

  return setting;
}

export async function getAllSettings() {
  const settings = await Setting.find({});
  // Convert array to a single object for easier frontend use
  const config = {};
  settings.forEach(s => {
    config[s.key] = s.value;
  });
  return config;
}
