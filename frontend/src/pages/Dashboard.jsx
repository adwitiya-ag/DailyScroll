import React, { useState, useEffect, useMemo } from 'react';
import { Search, Plus, BookOpen, AlertCircle, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getJournals, createJournal, updateJournal, deleteJournal } from '../api/journal.api';
import Navbar from '../components/Navbar';
import JournalCard from '../components/JournalCard';
import JournalModal from '../components/JournalModal';
import { MOODS } from '../config/constants';
import '../styles/dashboard.css';
import '../styles/modal.css';

const Dashboard = () => {
  const { user } = useAuth();
  const [journals, setJournals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Filtering & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMood, setSelectedMood] = useState('all');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingJournal, setEditingJournal] = useState(null);

  const fetchJournals = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await getJournals();
      // Backend returns ApiResponse: { statusCode, data: [ ... ], message }
      setJournals(res.data || []);
    } catch (err) {
      setError(err.message || 'Failed to fetch journal entries.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJournals();
  }, []);

  const handleOpenNewEntry = () => {
    setEditingJournal(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (journal) => {
    setEditingJournal(journal);
    setIsModalOpen(true);
  };

  const handleSave = async (journalData) => {
    if (editingJournal) {
      // Update
      const res = await updateJournal(editingJournal._id, journalData);
      setJournals((prev) =>
        prev.map((j) => (j._id === editingJournal._id ? res.data : j))
      );
    } else {
      // Create
      const res = await createJournal(journalData);
      setJournals((prev) => [res.data, ...prev]);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this journal entry?');
    if (!confirmDelete) return;

    try {
      await deleteJournal(id);
      setJournals((prev) => prev.filter((j) => j._id !== id));
    } catch (err) {
      alert(err.message || 'Failed to delete journal entry.');
    }
  };

  // Filter journals based on search query and mood
  const filteredJournals = useMemo(() => {
    return journals.filter((item) => {
      const matchesSearch =
        item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.content?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesMood =
        selectedMood === 'all' || item.mood?.toLowerCase() === selectedMood.toLowerCase();

      return matchesSearch && matchesMood;
    });
  }, [journals, searchQuery, selectedMood]);

  // Compute counts for mood pills
  const moodCounts = useMemo(() => {
    const counts = { all: journals.length };
    MOODS.forEach((m) => {
      counts[m.id] = journals.filter((j) => j.mood === m.id).length;
    });
    return counts;
  }, [journals]);

  const firstName = user?.fullName ? user.fullName.split(' ')[0] : 'there';

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar onNewEntry={handleOpenNewEntry} />

      <main className="dashboard-layout">
        <header className="dashboard-header">
          <div className="dashboard-welcome">
            <h1>Hello, {firstName}! ✨</h1>
            <p>Reflect on your thoughts, track your emotions, and capture your day.</p>
          </div>
        </header>

        {error && (
          <div className="auth-error-alert" style={{ marginBottom: '1.5rem' }}>
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        {/* Search & Mood Filter Bar */}
        <section className="filter-bar" aria-label="Filters and search">
          <div className="search-box">
            <Search className="search-icon" size={18} />
            <input
              type="search"
              className="search-input"
              placeholder="Search by title or content..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search journal entries"
            />
          </div>

          <div className="mood-filters" role="group" aria-label="Filter by mood">
            <button
              className={`mood-chip ${selectedMood === 'all' ? 'active' : ''}`}
              onClick={() => setSelectedMood('all')}
            >
              <span>All</span>
              <span>({moodCounts.all || 0})</span>
            </button>

            {MOODS.map((m) => (
              <button
                key={m.id}
                className={`mood-chip ${selectedMood === m.id ? 'active' : ''}`}
                onClick={() => setSelectedMood(m.id)}
              >
                <span>{m.emoji}</span>
                <span>{m.label}</span>
                <span>({moodCounts[m.id] || 0})</span>
              </button>
            ))}
          </div>
        </section>

        {/* Content Area */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '4rem 1rem', color: 'var(--text-muted)' }}>
            <p>Loading your journal entries...</p>
          </div>
        ) : filteredJournals.length > 0 ? (
          <div className="journal-grid">
            {filteredJournals.map((journal) => (
              <JournalCard
                key={journal._id}
                journal={journal}
                onEdit={handleOpenEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-state-icon">
              <BookOpen size={30} />
            </div>
            <h3>
              {searchQuery || selectedMood !== 'all'
                ? 'No matching entries found'
                : 'No journal entries yet'}
            </h3>
            <p>
              {searchQuery || selectedMood !== 'all'
                ? 'Try resetting your search query or selecting a different mood filter.'
                : 'Your journal is a blank slate. Write down your first thought or highlight of the day!'}
            </p>
            {searchQuery || selectedMood !== 'all' ? (
              <button
                className="btn btn-secondary"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedMood('all');
                }}
              >
                Clear Filters
              </button>
            ) : (
              <button className="btn btn-primary" onClick={handleOpenNewEntry}>
                <Plus size={18} />
                <span>Write First Entry</span>
              </button>
            )}
          </div>
        )}
      </main>

      <JournalModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        initialData={editingJournal}
      />
    </div>
  );
};

export default Dashboard;
