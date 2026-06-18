import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { auth, db, googleProvider } from '../firebase';
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  where,
  orderBy,
  onSnapshot,
  updateDoc,
  doc,
} from 'firebase/firestore';

const ADMIN_EMAIL = import.meta.env.VITE_FIREBASE_ADMIN_EMAIL || 'admin@example.com';

const starText = (rating) => '⭐'.repeat(rating) || '⭐';

const Testimonials = () => {
  const [user, setUser] = useState(null);
  const [pending, setPending] = useState([]);
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [message, setMessage] = useState('');
  const [rating, setRating] = useState(5);
  const [statusMessage, setStatusMessage] = useState('');
  const [statusType, setStatusType] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!user || user.email !== ADMIN_EMAIL) {
      setPending([]);
      return undefined;
    }

    const pendingQuery = query(
      collection(db, 'testimonials'),
      where('approved', '==', false),
      orderBy('createdAt', 'desc'),
    );

    return onSnapshot(pendingQuery, (snapshot) => {
      setPending(snapshot.docs.map((docSnap) => {
        return {
          id: docSnap.id,
          ...docSnap.data(),
        };
      }));
    });
  }, [user]);

  const handleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      setStatusMessage('Signed in successfully.');
      setStatusType('success');
    } catch (error) {
      setStatusMessage('Google sign-in failed. Please try again.');
      setStatusType('error');
    }
  };

  const handleSignOut = async () => {
    await signOut(auth);
    setStatusMessage('Signed out successfully.');
    setStatusType('success');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!user) {
      setStatusMessage('Please sign in with Google before submitting your testimonial.');
      setStatusType('error');
      return;
    }

    if (!message.trim() || !company.trim()) {
      setStatusMessage('Please provide your company and a short testimonial.');
      setStatusType('error');
      return;
    }

    setSubmitting(true);
    setStatusMessage('Submitting your testimonial...');
    setStatusType('');

    try {
      await addDoc(collection(db, 'testimonials'), {
        name: name || user.displayName || 'Anonymous',
        company: company.trim(),
        message: message.trim(),
        rating,
        approved: false,
        photoURL: user.photoURL || '',
        email: user.email,
        createdAt: serverTimestamp(),
      });

      setMessage('');
      setCompany('');
      setRating(5);
      setStatusMessage('Thanks! Your testimonial is submitted for review.');
      setStatusType('success');
    } catch (error) {
      setStatusMessage('Unable to submit testimonial. Please try again later.');
      setStatusType('error');
    } finally {
      setSubmitting(false);
    }
  };

  const approveTestimonial = async (id) => {
    try {
      await updateDoc(doc(db, 'testimonials', id), { approved: true });
    } catch (error) {
      console.error('Approve failed', error);
    }
  };

  return (
    <section className={`section ${styles.testimonialSection}`}>
      <div className="container">
        <div className={styles.heroBlock}>
          <div>
            <h2>Submit your testimonial</h2>
            <p>
              Clients sign in with Google and submit their testimonial here. This page is only for posting, not viewing reviews.
            </p>
          </div>
          <div className={styles.ctaRow}>
            {user ? (
              <button className="btn btn-secondary" type="button" onClick={handleSignOut}>
                Sign out
              </button>
            ) : (
              <button className="btn btn-primary" type="button" onClick={handleSignIn}>
                Sign in with Google
              </button>
            )}
            {user && <span className={styles.signedIn}>Signed in as {user.displayName || user.email}</span>}
          </div>
          {statusMessage && (
            <p className={statusType === 'error' ? styles.errorMessage : styles.successMessage}>
              {statusMessage}
            </p>
          )}
        </div>

        <div className={styles.gridLayout}>
          <div className={styles.formCard}>
            <h3>Submit a Testimonial</h3>
            <p className={styles.formHint}>
              Members must sign in with Google. Submissions are held for your review before they appear publicly.
            </p>
            <form onSubmit={handleSubmit}>
              <label>
                Name
                <input
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Your name"
                />
              </label>

              <label>
                Company / Role
                <input
                  type="text"
                  value={company}
                  onChange={(event) => setCompany(event.target.value)}
                  placeholder="XYZ Technologies"
                />
              </label>

              <label>
                Testimonial
                <textarea
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  placeholder="Share your experience in 1-2 sentences"
                />
              </label>

              <div className={styles.starRating}>
                <span>Rating</span>
                <div className={styles.ratingOptions}>
                  {[5, 4, 3].map((value) => (
                    <button
                      key={value}
                      type="button"
                      className={`${styles.ratingButton} ${value === rating ? styles.active : ''}`}
                      onClick={() => setRating(value)}
                    >
                      {starText(value)}
                    </button>
                  ))}
                </div>
              </div>

              <button type="submit" className="btn btn-primary" disabled={submitting}>
                {submitting ? 'Submitting...' : 'Send Testimonial'}
              </button>
            </form>
          </div>

          <div className={styles.previewCard}>
            <h3>Example Display</h3>
            <div className={styles.testimonialCard}>
              <div className={styles.testimonialStars}>{starText(5)}</div>
              <p className={styles.quoteText}>
                "Adithyan delivered our company website ahead of schedule. Communication was excellent and the final product exceeded expectations."
              </p>
              <div className={styles.clientMeta}>
                <div className={styles.clientAvatar}>
                  <img
                    src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&s=80"
                    alt="Google avatar placeholder"
                  />
                </div>
                <div className={styles.clientDetails}>
                  <span className={styles.clientName}>John Mathew</span>
                  <span className={styles.clientCompany}>XYZ Technologies</span>
                </div>
              </div>
            </div>
            <p className={styles.formHint}>
              Approved testimonials will automatically show on this page once you review them.
            </p>
          </div>
        </div>

        {user?.email === ADMIN_EMAIL && (
          <div className={styles.adminPanel}>
            <h3>Admin Review Queue</h3>
            {pending.length === 0 ? (
              <p className={styles.formHint}>No testimonials waiting for approval.</p>
            ) : (
              pending.map((item) => (
                <div key={item.id} className={styles.adminCard}>
                  <div className={styles.adminMeta}>
                    <div>
                      <p className={styles.clientName}>{item.name}</p>
                      <p className={styles.clientCompany}>{item.company}</p>
                    </div>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => approveTestimonial(item.id)}
                    >
                      Approve
                    </button>
                  </div>
                  <p className={styles.quoteText}>&quot;{item.message}&quot;</p>
                  <p className={styles.formHint}>Rating: {starText(item.rating || 5)}</p>
                </div>
              ))
            )}
            <p className={styles.formHint}>
              Use the admin account to approve testimonials directly in the browser.
            </p>
          </div>
        )}

        <div style={{ marginTop: '3rem', color: 'var(--text-secondary)' }}>
          Need help? <Link to="/contact">Contact me</Link> for integration support.
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
