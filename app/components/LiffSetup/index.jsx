'use client';

import { useState, useEffect } from 'react';
import styles from './LiffSetup.module.css';

export default function LiffSetup() {
  const [liffId, setLiffId] = useState('');
  const [savedLiffId, setSavedLiffId] = useState('');
  const [status, setStatus] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  // Load Liff ID from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('liff_id');
    if (stored) {
      setSavedLiffId(stored);
      setLiffId(stored);
    }
  }, []);

  const handleSave = (e) => {
    e.preventDefault();

    if (!liffId.trim()) {
      setStatus('❌ Liff ID cannot be empty');
      return;
    }

    if (!/^[a-zA-Z0-9]{16}$/.test(liffId.trim())) {
      setStatus('⚠️ Liff ID should be 16 alphanumeric characters (e.g., xxxxxxxxxxxxxx)');
      return;
    }

    localStorage.setItem('liff_id', liffId.trim());
    setSavedLiffId(liffId.trim());
    setStatus('✅ Liff ID saved successfully!');
    setIsEditing(false);

    setTimeout(() => setStatus(''), 3000);
  };

  const handleClear = () => {
    if (confirm('Are you sure you want to clear the Liff ID?')) {
      localStorage.removeItem('liff_id');
      setSavedLiffId('');
      setLiffId('');
      setStatus('❌ Liff ID cleared');
      setTimeout(() => setStatus(''), 3000);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>⚙️ LINE Mini App Setup</h2>

        {savedLiffId && !isEditing ? (
          <div className={styles.savedSection}>
            <p className={styles.label}>✅ Current Liff ID:</p>
            <div className={styles.displayBox}>
              <code>{savedLiffId}</code>
              <button
                className={`${styles.btn} ${styles.btnEdit}`}
                onClick={() => setIsEditing(true)}
              >
                ✏️ Edit
              </button>
              <button className={`${styles.btn} ${styles.btnDanger}`} onClick={handleClear}>
                🗑️ Clear
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSave} className={styles.form}>
            <label htmlFor="liffId" className={styles.label}>
              Enter your LINE Liff ID:
            </label>
            <input
              id="liffId"
              type="text"
              value={liffId}
              onChange={(e) => setLiffId(e.target.value)}
              placeholder="e.g., 1234567890abcdef"
              className={styles.input}
              maxLength="16"
            />
            <small className={styles.hint}>
              Get this from <strong>LINE Developers Console</strong> → Your Mini App → Liff tab
            </small>

            <div className={styles.buttonGroup}>
              <button type="submit" className={`${styles.btn} ${styles.btnPrimary}`}>
                💾 Save Liff ID
              </button>
              {savedLiffId && (
                <button
                  type="button"
                  className={`${styles.btn} ${styles.btnSecondary}`}
                  onClick={() => {
                    setLiffId(savedLiffId);
                    setIsEditing(false);
                  }}
                >
                  ✕ Cancel
                </button>
              )}
            </div>
          </form>
        )}

        {status && <p className={styles.status}>{status}</p>}

        <div className={styles.info}>
          <h3 className={styles.infoTitle}>📚 How to get your Liff ID?</h3>
          <ol>
            <li>Go to <a href="https://developers.line.biz/console" target="_blank" rel="noopener noreferrer">LINE Developers Console</a></li>
            <li>Create or select your Mini App</li>
            <li>Navigate to the <strong>Liff</strong> tab</li>
            <li>Copy your <strong>Liff ID</strong> (16 characters)</li>
            <li>Paste it above and click <strong>Save</strong></li>
          </ol>
        </div>
      </div>
    </div>
  );
}
