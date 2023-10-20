import { useEffect, useState } from "react";

const useHydration = () => {
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    setHasHydrated(true);
  }, []);

  return { hasHydrated };
};

export default useHydration;
