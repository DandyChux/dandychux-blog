import * as React from "react";
import Link from 'next/link';

type HeaderProps = {
  //
};

const Header: React.FC<any> = () => {
  return (
    // header value
    <header className="">
      <Link href="/">
        <a className="">My First Blog App</a>
      </Link>
    </header>
  )
};

export default Header;
