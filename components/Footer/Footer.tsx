import * as React from "react";
import Image from 'next/image'
import Link from 'next/link';
import styles from '../Footer/Footer.module.scss';

type FooterProps = {
  //
};

const Footer: React.FC<any> = () => {
  return (
    <Link 
    href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
    target="_blank"
    rel="noopener noreferrer"
    >
    <a>
      Powered by{' '}
      <span className={styles.logo}>
        <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
      </span>
    </a>
    </Link>
  )
};

export default Footer;
