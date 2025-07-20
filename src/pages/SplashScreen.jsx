import React, { useState, useEffect } from 'react';

function SplashScreen() {
  const [showLoader, setShowLoader] = useState(true);
  const [showWords, setShowWords] = useState(false);
  const [hideWords, setHideWords] = useState(false);
  const [showLine, setShowLine] = useState(false);
  const [leftSlideUp, setLeftSlideUp] = useState(false);
  const [rightSlideUp, setRightSlideUp] = useState(false);

  useEffect(() => {
    const hideLoaderTimer = setTimeout(() => setShowLoader(false), 1200);
    const showWordsTimer = setTimeout(() => setShowWords(true), 1200);
    const showLineTimer = setTimeout(() => setShowLine(true), 3200);
    const hideWordsTimer = setTimeout(() => setHideWords(true), 3800);
    const leftSlideTimer = setTimeout(() => setLeftSlideUp(true), 4500);
    const rightSlideTimer = setTimeout(() => setRightSlideUp(true), 4700);

    return () => {
      clearTimeout(hideLoaderTimer);
      clearTimeout(showWordsTimer);
      clearTimeout(hideWordsTimer);
      clearTimeout(showLineTimer);
      clearTimeout(leftSlideTimer);
      clearTimeout(rightSlideTimer);
    };
  }, []);


  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        overflow: 'hidden',
        backgroundColor: 'transparent',
      }}
    >
      {/* Loader*/}
      <img
        src="src/assets/loader4.gif"
        alt="Loading"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          opacity: showLoader ? 1 : 0,
          pointerEvents: 'none',
          transition: 'opacity 0.5s ease-in-out',
          zIndex: 10000,
        }}
      />


    {/* Thin white line separating the two halves */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          width: '2px', // Thin white line
          height: showLine ? '100%' : '0%', // ← grow vertically
          backgroundColor: '#4e342e',
          transform: leftSlideUp ? 'translateY(-100%)' : 'translateY(0)', // ← disappear with animation
          transition: 'height 0.5s ease-in-out, transform 0.8s ease-in-out',
          zIndex: 1000, // Ensure it's above the background and before animations
        }}
      ></div>
      
      {/* Left half */}
      <div
        style={{
          width: '50vw',
          height: '100vh',
          backgroundColor: '#fff3cd',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden',
          transform: leftSlideUp ? 'translateY(-100%)' : 'translateY(0)',
          transition: 'transform 0.8s ease-in-out',
        }}
      >
        <div className='m-auto overflow-hidden'>
        {/* Cozy word */}
        <div
          style={{
            color: '#4e342e',
            fontSize: '4rem',
            fontWeight: 'bold',
            userSelect: 'none',
            pointerEvents: 'none',
            transform: showWords
              ? hideWords
                ? 'translate(0, -150%)' // slide back up offscreen
                : 'translate(0, 0)'  // center visible
              : 'translate(0, 250%)',   // start offscreen top
            transition: 'transform 1.5s ease-in-out',
          }}
        >
          Cozy
        </div>
        </div>
      </div>


      {/* Right half */}
      <div
        style={{
          width: '50vw',
          height: '100vh',
          backgroundColor: '#fff3cd',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden',
          transform: rightSlideUp ? 'translateY(-100%)' : 'translateY(0)',
          transition: 'transform 0.8s ease-in-out',
        }}
      >
      <div className='m-auto overflow-hidden'>

        {/* Kidz word */}
        <div
          className='text-center'
          style={{
            color: '#4e342e',
            fontSize: '4rem',
            fontWeight: 'bold',
            userSelect: 'none',
            pointerEvents: 'none',
            transform: showWords
              ? hideWords
                ? 'translate(0, 150%)' // slide back down offscreen
                : 'translate(0, 0)'  // center visible
              : 'translate(0, -250%)',   // start offscreen bottom
            transition: 'transform 1.5s ease-in-out',
          }}
        >
          Kidz
        </div>
      </div>
      </div>
    </div>
  );
}

export default SplashScreen;
