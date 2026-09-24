import React from 'react';
import { BookOpen, LogOut, Plus, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = ({ onNewEntry }) => {
  const { user, logout } = useAuth();

  const displayName = user?.fullName || user?.username || 'Writer';
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <header className="navbar">
      <div className="navbar-container">
        <a href="/" className="navbar-brand">
          <div className="navbar-brand-icon">
            <BookOpen size={20} />
          </div>
          <span>Digital Journal</span>
        </a>

        <div className="navbar-actions">
          <button className="btn btn-primary" onClick={onNewEntry}>
            <Plus size={18} />
            <span>New Entry</span>
          </button>

          <div className="user-badge" title={user?.email || displayName}>
            <div className="user-avatar">{initial}</div>
            <span>{displayName}</span>
          </div>

          <button
            className="btn btn-secondary"
            onClick={logout}
            title="Log out"
            style={{ padding: '0.5rem 0.75rem' }}
          >
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
