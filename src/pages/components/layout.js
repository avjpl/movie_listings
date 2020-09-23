import Link from 'next/link';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

import styles from './layout.module.css';

const Layout = ({ children }) => {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>
          <li>
            <Link href="/gallery">
              <a>Gallery</a>
            </Link>
          </li>
        </ul>
      </nav>

      <motion.div exit={{ opacity: 0 }}>
        <div className={styles.layout}>
          {children}
        </div>
      </motion.div>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Layout;
