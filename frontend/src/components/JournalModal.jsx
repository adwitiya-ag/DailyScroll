import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { MOODS } from '../config/constants';

const JournalModal = ({ isOpen, onClose, onSave, initialData }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [mood, setMood] = useState('neutral');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || '');
      setContent(initialData.content || '');
      setMood(initialData.mood || 'neutral');
    } else {
      setTitle('');
      setContent('');
      setMood('neutral');
    }
    setError('');
  }, [initialData, isOpen]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Please provide a title for your entry.');
      return;
    }
    if (!content.trim()) {
      setError('Please write some thoughts in the content field.');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      await onSave({
        title: title.trim(),
        content: content.trim(),
        mood,
      });
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to save journal entry.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="modal-content">
        <div className="modal-header">
          <h2 id="modal-title">{initialData ? 'Edit Entry' : 'New Journal Entry'}</h2>
          <button className="close-btn" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          {error && <div className="auth-error-alert">{error}</div>}

          <div className="form-group">
            <label htmlFor="entry-title">Title</label>
            <input
              id="entry-title"
              type="text"
              className="form-input"
              style={{ paddingLeft: '0.875rem' }}
              placeholder="Give your entry a title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>How are you feeling?</label>
            <div className="mood-selector" role="radiogroup" aria-label="Select your mood">
              {MOODS.map((m) => (
                <button
                  type="button"
                  key={m.id}
                  className={`mood-option-btn ${mood === m.id ? 'selected' : ''}`}
                  onClick={() => setMood(m.id)}
                  role="radio"
                  aria-checked={mood === m.id}
                >
                  <span>{m.emoji}</span>
                  <span>{m.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="entry-content">Content</label>
            <textarea
              id="entry-content"
              className="modal-textarea"
              placeholder="Write down your thoughts, highlights, reflections..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>

          <div className="modal-footer" style={{ margin: '0 -1.5rem -1.5rem', borderRadius: '0 0 var(--radius-lg) var(--radius-lg)' }}>
            <button type="button" className="btn btn-secondary" onClick={onClose} disabled={submitting}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={submitting}>
              {submitting ? 'Saving...' : initialData ? 'Save Changes' : 'Create Entry'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JournalModal;
