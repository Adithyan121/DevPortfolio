import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { auth, db, googleProvider } from '../firebase';
import styles from './Testimonials.module.css';

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

const ADMIN_EMAIL =
  import.meta.env.VITE_FIREBASE_ADMIN_EMAIL || 'admin@example.com';

const starText = (rating) => '⭐'.repeat(rating || 5);

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

  // Auth State Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      if (currentUser?.displayName) {
        setName(currentUser.displayName);
      }
    });

    return () => unsubscribe();
  }, []);

  // Admin Pending Testimonials Listener
  useEffect(() => {
    if (!user || user.email !== ADMIN_EMAIL) {
      setPending([]);
      return;
    }

    const pendingQuery = query(
      collection(db, 'testimonials'),
      where('approved', '==', false),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(
      pendingQuery,
      (snapshot) => {
        const data = snapshot.docs.map((docSnap) => ({
          id: docSnap.id,
          ...docSnap.data(),
        }));

        setPending(data);
      },
      (error) => {
        console.error('Pending testimonials error:', error);
      }
    );

    return () => unsubscribe();
  }, [user]);

  const handleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);

      setStatusMessage('Signed in successfully.');
      setStatusType('success');
    } catch (error) {
      console.error('Google Sign In Error:', error);

      setStatusMessage(error.message);
      setStatusType('error');
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);

      setStatusMessage('Signed out successfully.');
      setStatusType('success');
    } catch (error) {
      console.error(error);

      setStatusMessage('Failed to sign out.');
      setStatusType('error');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!user) {
      setStatusMessage(
        'Please sign in with Google before submitting your testimonial.'
      );
      setStatusType('error');
      return;
    }

    if (!company.trim() || !message.trim()) {
      setStatusMessage(
        'Please provide both company and testimonial.'
      );
      setStatusType('error');
      return;
    }

    try {
      setSubmitting(true);

      await addDoc(collection(db, 'testimonials'), {
        name:
          name.trim() ||
          user.displayName ||
          'Anonymous',

        company: company.trim(),
        message: message.trim(),
        rating,

        approved: false,

        email: user.email,
        photoURL: user.photoURL || '',

        createdAt: serverTimestamp(),
      });

      setCompany('');
      setMessage('');
      setRating(5);

      setStatusMessage(
        'Thanks! Your testimonial has been submitted for approval.'
      );
      setStatusType('success');
    } catch (error) {
      console.error('Submit Error:', error);

      setStatusMessage(error.message);
      setStatusType('error');
    } finally {
      setSubmitting(false);
    }
  };

  const approveTestimonial = async (id) => {
    try {
      await updateDoc(
        doc(db, 'testimonials', id),
        {
          approved: true,
        }
      );

      setStatusMessage('Testimonial approved.');
      setStatusType('success');
    } catch (error) {
      console.error(error);

      setStatusMessage('Approval failed.');
      setStatusType('error');
    }
  };

  return (
    <section className={`section ${styles.testimonialSection}`}>
      <div className="container">
        <div className={styles.heroBlock}>
          <div>
            <h2>Submit Your Testimonial</h2>

            <p>
              Sign in with Google and share your
              experience. Testimonials are reviewed
              before being published.
            </p>
          </div>

          <div className={styles.ctaRow}>
            {user ? (
              <>
                <button
                  className="btn btn-secondary"
                  onClick={handleSignOut}
                >
                  Sign Out
                </button>

                <span className={styles.signedIn}>
                  Signed in as{' '}
                  {user.displayName || user.email}
                </span>
              </>
            ) : (
              <button
                className="btn btn-primary"
                onClick={handleSignIn}
              >
                Sign In With Google
              </button>
            )}
          </div>

          {statusMessage && (
            <p
              className={
                statusType === 'error'
                  ? styles.errorMessage
                  : styles.successMessage
              }
            >
              {statusMessage}
            </p>
          )}
        </div>

        <div className={styles.gridLayout}>
          <div className={styles.formCard}>
            <h3>Submit a Testimonial</h3>

            <form onSubmit={handleSubmit}>
              <label>
                Name
                <input
                  type="text"
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                  placeholder="Your Name"
                />
              </label>

              <label>
                Company / Role
                <input
                  type="text"
                  value={company}
                  onChange={(e) =>
                    setCompany(e.target.value)
                  }
                  placeholder="ABC Technologies"
                />
              </label>

              <label>
                Testimonial
                <textarea
                  value={message}
                  onChange={(e) =>
                    setMessage(e.target.value)
                  }
                  placeholder="Share your experience..."
                />
              </label>

              <div className={styles.starRating}>
                <span>Rating</span>

                <div className={styles.ratingOptions}>
                  {[5, 4, 3, 2, 1].map((value) => (
                    <button
                      key={value}
                      type="button"
                      className={`${styles.ratingButton} ${
                        rating === value
                          ? styles.active
                          : ''
                      }`}
                      onClick={() =>
                        setRating(value)
                      }
                    >
                      {starText(value)}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                disabled={submitting}
              >
                {submitting
                  ? 'Submitting...'
                  : 'Send Testimonial'}
              </button>
            </form>
          </div>

          <div className={styles.previewCard}>
            <h3>Example Testimonial</h3>

            <div className={styles.testimonialCard}>
              <div className={styles.testimonialStars}>
                ⭐⭐⭐⭐⭐
              </div>

              <p className={styles.quoteText}>
                "Adithyan delivered our website ahead
                of schedule. Excellent communication
                and professional work."
              </p>

              <div className={styles.clientMeta}>
                <div className={styles.clientAvatar}>
                  <img
                    src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&s=80"
                    alt="Client"
                  />
                </div>

                <div className={styles.clientDetails}>
                  <span className={styles.clientName}>
                    John Mathew
                  </span>

                  <span
                    className={
                      styles.clientCompany
                    }
                  >
                    XYZ Technologies
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {user?.email === ADMIN_EMAIL && (
          <div className={styles.adminPanel}>
            <h3>Admin Review Queue</h3>

            {pending.length === 0 ? (
              <p>No testimonials waiting.</p>
            ) : (
              pending.map((item) => (
                <div
                  key={item.id}
                  className={styles.adminCard}
                >
                  <div className={styles.adminMeta}>
                    <div>
                      <p className={styles.clientName}>
                        {item.name}
                      </p>

                      <p
                        className={
                          styles.clientCompany
                        }
                      >
                        {item.company}
                      </p>
                    </div>

                    <button
                      className="btn btn-primary"
                      onClick={() =>
                        approveTestimonial(item.id)
                      }
                    >
                      Approve
                    </button>
                  </div>

                  <p className={styles.quoteText}>
                    "{item.message}"
                  </p>

                  <p>
                    Rating:{' '}
                    {starText(item.rating)}
                  </p>
                </div>
              ))
            )}
          </div>
        )}

        <div
          style={{
            marginTop: '3rem',
            color: 'var(--text-secondary)',
          }}
        >
          Need help?{' '}
          <Link to="/contact">
            Contact me
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;