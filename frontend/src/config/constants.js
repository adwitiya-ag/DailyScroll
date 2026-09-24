export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

export const MOODS = [
  {
    id: 'happy',
    label: 'Happy',
    emoji: '😊',
    bgColor: '#dcfce7',
    textColor: '#15803d',
    borderColor: '#86efac'
  },
  {
    id: 'excited',
    label: 'Excited',
    emoji: '✨',
    bgColor: '#fef3c7',
    textColor: '#b45309',
    borderColor: '#fde68a'
  },
  {
    id: 'neutral',
    label: 'Neutral',
    emoji: '😐',
    bgColor: '#f1f5f9',
    textColor: '#475569',
    borderColor: '#cbd5e1'
  },
  {
    id: 'sad',
    label: 'Sad',
    emoji: '🌧️',
    bgColor: '#e0e7ff',
    textColor: '#4338ca',
    borderColor: '#a5b4fc'
  },
  {
    id: 'angry',
    label: 'Angry',
    emoji: '🔥',
    bgColor: '#fee2e2',
    textColor: '#b91c1c',
    borderColor: '#fca5a5'
  }
];

export const getMoodConfig = (moodId) => {
  return MOODS.find((m) => m.id === moodId) || MOODS.find((m) => m.id === 'neutral');
};
