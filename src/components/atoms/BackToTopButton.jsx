import { useState, useEffect } from 'react';

const BackToTopButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div>
      {visible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-4 right-4 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition duration-300"
        >
          ↑ Top
        </button>
      )}
    </div>
  );
};

export default BackToTopButton;
