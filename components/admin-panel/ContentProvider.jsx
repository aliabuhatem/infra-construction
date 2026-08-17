"use client";

import { createContext, useContext, useEffect, useState } from "react";

const ContentContext = createContext({ store: null, loading: true });

/**
 * Supplies the content store to ContentText / MediaImage.
 *
 * `initialStore` is the store the server already read while rendering the page
 * (see app/layout.tsx). Seeding with it is what stops the flash of stale copy:
 * without it the provider starts empty, every ContentText paints its hardcoded
 * `fallback` prop, and the real text only appears once the fetch below lands a
 * few hundred milliseconds later. Seeded, the very first paint — server HTML
 * and client hydration alike — is the real content.
 *
 * The fetch still runs. A statically prerendered page carries the store as of
 * its last build or revalidation, so this is the safety net that corrects a
 * page whose revalidation was missed. It no longer causes a visible change in
 * the normal case, because it returns what is already on screen.
 *
 * @param {{
 *   children: React.ReactNode,
 *   initialStore?: import("../../lib/getContent").ContentStore | null,
 * }} props
 */
export function ContentProvider({ children, initialStore = null }) {
  const [store, setStore] = useState(initialStore);
  // Only "loading" when nothing was seeded — otherwise consumers would fall
  // back for one render even though real content is in hand.
  const [loading, setLoading] = useState(initialStore === null);

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
        // Keep whatever was seeded. Clearing it here would throw away good
        // server-rendered content and flash the page *back* to its fallbacks
        // because a background refresh failed.
        if (isMounted) setLoading(false);
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