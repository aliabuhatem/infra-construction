"use client";

import { createContext, useContext, useEffect, useState } from "react";

const ContentContext = createContext({ store: null, loading: true });

export function ContentProvider({ children }) {
  const [store, setStore] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    fetch("/api/content", { cache: "no-store" })
      .then((response) => {
        if (!response.ok) throw new Error("Failed to load content");
        return response.json();
      })
      .then((data) => {
        if (isMounted) {
          setStore(data);
          setLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) {
          setStore(null);
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <ContentContext.Provider value={{ store, loading }}>
      {children}
    </ContentContext.Provider>
  );
}

export function useContentStore() {
  return useContext(ContentContext);
}