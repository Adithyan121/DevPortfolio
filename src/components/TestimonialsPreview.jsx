import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import {
  collection,
  query,
  orderBy,
  limit,
  onSnapshot,
} from 'firebase/firestore';
import styles from './TestimonialsPreview.module.css';

const starText = (rating) => '⭐'.repeat(rating || 5);

const TestimonialsPreview = () => {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    const testimonialsQuery = query(
      collection(db, 'testimonials'),
      orderBy('createdAt', 'desc'),
      limit(3),
    );

    return onSnapshot(testimonialsQuery, (snapshot) => {
      setTestimonials(snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...docSnap.data(),
      })));
    });
  }, []);

  useEffect(() => {
    const animatedElements = document.querySelectorAll(`.${styles.animate}`);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -80px 0px' },
    );

    animatedElements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [testimonials]);

  return (
    <section id="testimonials" className={`${styles.testimonialsSection} section`}>
      <div className="container">
        <div className={`${styles.heading} ${styles.animate}`}>
          <h2>What clients say</h2>
          <p>Trusted reviews from companies who chose fast, polished websites.</p>
        </div>

        <div className={styles.grid}>
          {testimonials.length === 0 ? (
            <div className={`${styles.empty} ${styles.animate}`}>
              <p>No testimonials are available yet.</p>
            </div>
          ) : (
            testimonials.map((item) => (
              <article key={item.id} className={`${styles.card} ${styles.animate}`}>
                <div className={styles.rating}>{starText(item.rating)}</div>
                <p className={styles.quote}>&ldquo;{item.message}&rdquo;</p>
                <div className={styles.meta}>
                  <div className={styles.avatar}>
                    {item.photoURL ? <img src={item.photoURL} alt={item.name} /> : null}
                  </div>
                  <div>
                    <p className={styles.name}>{item.name}</p>
                    <p className={styles.company}>{item.company}</p>
                  </div>
                </div>
              </article>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsPreview;
