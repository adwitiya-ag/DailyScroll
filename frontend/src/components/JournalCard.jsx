import React from 'react';
import { Pencil, Trash2, Calendar } from 'lucide-react';
import { getMoodConfig } from '../config/constants';

const JournalCard = ({ journal, onEdit, onDelete }) => {
  const mood = getMoodConfig(journal.mood);

  const formattedDate = new Date(journal.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <article className="journal-card">
      <div>
        <div className="journal-card-top">
          <span
            className="mood-badge"
            style={{
              backgroundColor: mood.bgColor,
              color: mood.textColor,
              border: `1px solid ${mood.borderColor}`,
            }}
          >
            <span>{mood.emoji}</span>
            <span>{mood.label}</span>
          </span>

          <time className="journal-date" dateTime={journal.createdAt}>
            {formattedDate}
          </time>
        </div>

        <h3 className="journal-title">{journal.title}</h3>
        <p className="journal-snippet">{journal.content}</p>
      </div>

      <div className="journal-actions">
        <button
          className="card-action-btn"
          onClick={() => onEdit(journal)}
          title="Edit Entry"
          aria-label={`Edit ${journal.title}`}
        >
          <Pencil size={15} />
        </button>

        <button
          className="card-action-btn delete"
          onClick={() => onDelete(journal._id)}
          title="Delete Entry"
          aria-label={`Delete ${journal.title}`}
        >
          <Trash2 size={15} />
        </button>
      </div>
    </article>
  );
};

export default JournalCard;
