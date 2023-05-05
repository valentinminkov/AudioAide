import React, { useEffect, useState, useRef } from "react";
import styles from "./StickyContainer.module.scss";

interface Props {
  children: React.ReactNode;
}

const StickyContainer = ({ children }: Props) => {
  const [isSticky, setIsSticky] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const paginationContainer = containerRef.current;
      if (!paginationContainer) return;

      const isTop = paginationContainer.getBoundingClientRect().top === 0;
      setIsSticky(isTop);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`${styles.container}${isSticky ? ` ${styles.isSticky}` : ""}`}
      ref={containerRef}
    >
      {children}
    </div>
  );
};

export default StickyContainer;
