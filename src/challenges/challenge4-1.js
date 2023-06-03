// Create an app that updates the document title as the window is resized.
// It should say "Small" or "Medium" or "Large," depending on the size 
// of the window.
import { useState, useEffect } from "react";

export default function App() {

  function getSize() {
    return {
      width: window.innerWidth,
      height: window.innerHeight
    };
  }

  function classifySize(width) {
    if (width < 800) {
      return 'Small';
    }
    if (width < 1200) {
      return 'Medium';
    }
    return 'Large';
  }

  const [size, setSize] = useState(getSize());

  useEffect(() => {
    document.title = classifySize(size.width);
  }, [size])
  
  useEffect(() => {
    function handleResize() {
      setSize(getSize());
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, [])

  return (
    <p>Width: {size.width}, Height: {size.height}</p>
  );
}