import { useEffect, useState } from 'react';

export function ScrollIndicator() {
  const [isFooterVisible, setIsFooterVisible] = useState(false);

  useEffect(() => {
    const footer = document.querySelector('footer');
    if (!footer) return;

    const observer = new IntersectionObserver(([entry]) => setIsFooterVisible(entry.isIntersecting));
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`fixed bottom-8 left-1/2 -translate-x-1/2 animate-bounce ${isFooterVisible ? 'invisible' : ''}`}
      aria-hidden="true"
    >
      <span className="material-symbols-outlined text-3xl text-primary/60">
        expand_more
      </span>
    </div>
  );
}
