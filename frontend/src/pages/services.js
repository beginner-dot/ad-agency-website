

import styles from "../styles/Services.module.css";

export default function Services() {
  return (
    <section className={styles.services}>
      <h2>Our Services</h2>
      <ul>
        <li>Brand Strategy</li>
        <li>Social Media Marketing</li>
        <li>Web Development</li>
        <li>SEO Optimization</li>
      </ul>
    </section>
  );
}