// src/utils/storage.js  ← THIS IS THE BULLETPROOF VERSION
const KEY = 'eha_capstone_2025_programs';

export const getPrograms = () => {
  try {
    const data = localStorage.getItem(KEY);
    if (!data) return [];
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.error('Failed to load programs:', err);
    return [];
  }
};

export const savePrograms = (programs) => {
  try {
    localStorage.setItem(KEY, JSON.stringify(programs));
    console.log('Programs saved successfully:', programs.length, 'items');
  } catch (err) {
    console.error('Failed to save programs:', err);
    alert('Your browser is blocking storage. Try using Chrome in personal mode.');
  }
};