import { useState, useEffect } from "react";

export const useContainerSize = (ref) => {
  const [containerSize, setContainerSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set container width/height to state
      setContainerSize({
        width: ref.current.offsetWidth,
        height: ref.current.offsetHeight,
      });
    }

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Call handler right away so state gets updated with initial container size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, [ref]);

  return containerSize;
};
