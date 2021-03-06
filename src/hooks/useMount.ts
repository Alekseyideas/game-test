import React from 'react';

export const useMount = (callFn: () => void) => {
  const [loaded, setLoaded] = React.useState(false);
  React.useEffect(() => {
    if (!loaded) {
      setLoaded(true);
      callFn();
    }
  }, [loaded, callFn]);
  return true;
};
