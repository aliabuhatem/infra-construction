"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import styles from "./AdminPanel.module.css";

/* ─────────────────────────────────────────────
   HELPERS
───────────────────────────────────────────── */
const blankStore = { content: {}, media: [] };

const isImagePath = (v) =>
  typeof v === "string" &&
  /^\/?(?:media|admin-uploads)\//.test(v.trim()) &&
  /\.(jpe?g|png|webp|gif|avif|svg|bmp|tiff)$/i.test(v.trim());

const isLikelyImageField = (key, value) =>
  /image|photo|logo|icon|background|favicon|cover|thumb/i.test(key) || isImagePath(value);

const sectionTitle = (name) =>
  name
    .replace(/([A-Z])/g, " $1")
    .replace(/[_-]+/g, " ")
    .replace(/\\s+/g, " ")
    .trim()
    .replace(/\\b\\w/g, (c) => c.toUpperCase());

const fieldLabel = (name) =>
  name
    .replace(/([A-Z])/g, " $1")
    .replace(/[_-]+/g, " ")
    .replace(/\\s+/g, " ")
    .trim()
    .replace(/\\b\\w/g, (c) => c.toUpperCase());

// Map section prefix → display group name with order priority
const GROUP_ORDER = [
  "Home Page",
  "About Page",
  "Sectors Page",
  "Sector Pages",
  "Projects Page",
  "News Page",
  "Careers Page",
  "Contact Page",
  "Global · Navigation",
  "Global · Footer",
  "Global · Branding",
];

const sectionGroup = (name) => {
  const lower = name.toLowerCase();
  if (lower.startsWith("home_") || lower === "home") return "Home Page";
  if (lower.startsWith("about_") || lower === "about") return "About Page";
  if (lower.startsWith("sectors_") && !lower.startsWith("sector_")) return "Sectors Page";
  if (lower.startsWith("sector_")) return "Sector Pages";
  if (lower.startsWith("projects_") || lower.startsWith("project_")) return "Projects Page";
  if (lower.startsWith("news_") || lower.startsWith("news-")) return "News Page";
  if (lower.startsWith("careers_") || lower.startsWith("career_")) return "Careers Page";
  if (lower.startsWith("contact_")) return "Contact Page";
  if (lower.startsWith("navbar_") || lower.startsWith("nav_")) return "Global · Navigation";
  if (lower.startsWith("footer_")) return "Global · Footer";
  if (lower.startsWith("branding_")) return "Global · Branding";
  return sectionTitle(name.split("_")[0]);
};

const sortedGroups = (groups) => {
  const ordered = [];
  for (const g of GROUP_ORDER) {
    if (groups[g]) ordered.push([g, groups[g]]);
  }
  for (const [g, v] of Object.entries(groups)) {
    if (!GROUP_ORDER.includes(g)) ordered.push([g, v]);
  }
  return ordered;
};

/* ─────────────────────────────────────────────
   INLINE RENAME INPUT (replaces prompt())
───────────────────────────────────────────── */
function InlineRename({ initial, onSave, onCancel }) {
  const [val, setVal] = useState(initial);
  const ref = useRef(null);
  useEffect(() => { ref.current?.select(); }, []);
  return (
    <span className={styles.inlineRename}>
      <input
        ref={ref}
        value={val}
        onChange={(e) => setVal(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") onSave(val.trim());
          if (e.key === "Escape") onCancel();
        }}
        className={styles.renameInput}
      />
      <button type="button" onClick={() => onSave(val.trim())} className={styles.renameSave}>✓</button>
      <button type="button" onClick={onCancel} className={styles.renameCancel}>✕</button>
    </span>
  );
}

/* ─────────────────────────────────────────────
   CONFIRM DIALOG (replaces window.confirm)
───────────────────────────────────────────── */
function ConfirmDialog({ message, onConfirm, onCancel }) {
  return (
    <div className={styles.confirmOverlay}>
      <div className={styles.confirmBox}>
        <p>{message}</p>
        <div className={styles.confirmActions}>
          <button type="button" className={styles.secondaryButton} onClick={onCancel}>Cancel</button>
          <button type="button" className={styles.dangerButton} onClick={onConfirm}>Delete</button>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   ADD FIELD / SECTION INLINE FORMS
───────────────────────────────────────────── */
function AddFieldInline({ onAdd, onCancel }) {
  const [name, setName] = useState("");
  const ref = useRef(null);
  useEffect(() => { ref.current?.focus(); }, []);
  return (
    <div className={styles.addFieldRow}>
      <input
        ref={ref}
        placeholder="Field name (e.g. title, subtitle, image)"
        value={name}
        onChange={(e) => setName(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && name.trim()) onAdd(name.trim());
          if (e.key === "Escape") onCancel();
        }}
        className={styles.addFieldInput}
      />
      <button
        type="button"
        className={styles.primaryButton}
        onClick={() => name.trim() && onAdd(name.trim())}
        disabled={!name.trim()}
      >Add</button>
      <button type="button" className={styles.ghostButton} onClick={onCancel}>Cancel</button>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN ADMIN PANEL
───────────────────────────────────────────── */
export default function AdminPanel() {
  const [checking, setChecking] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("");
  const [store, setStore] = useState(blankStore);
  const [activeTab, setActiveTab] = useState("content");
  const [activeGroup, setActiveGroup] = useState(null);
  const [toast, setToast] = useState(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [search, setSearch] = useState("");
  const [mediaFilter, setMediaFilter] = useState("all");
  const [collapsed, setCollapsed] = useState({});
  const [pickerFor, setPickerFor] = useState(null);
  const [uploadForm, setUploadForm] = useState({ title: "", alt: "", category: "gallery", file: null });
  const [loginError, setLoginError] = useState("");
  const [renamingField, setRenamingField] = useState(null); // {section, key}
  const [addingFieldTo, setAddingFieldTo] = useState(null); // section id
  const [addingSection, setAddingSection] = useState(false);
  const [newSectionId, setNewSectionId] = useState("");
  const [confirmDialog, setConfirmDialog] = useState(null); // {message, onConfirm}
  const [hasUnsaved, setHasUnsaved] = useState(false);
  const toastTimer = useRef(null);
  const fileInputRef = useRef(null);

  function showToast(type, text) {
    setToast({ type, text });
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 3500);
  }

  function askConfirm(message, onConfirm) {
    setConfirmDialog({ message, onConfirm });
  }

  useEffect(() => {
    fetch("/api/admin/auth")
      .then((r) => r.json())
      .then((data) => {
        setLoggedIn(Boolean(data.loggedIn));
        if (data.loggedIn) loadContent();
      })
      .finally(() => setChecking(false));
  }, []);

  async function loadContent() {
    try {
      const response = await fetch("/api/admin/content");
      if (response.ok) {
        const data = await response.json();
        setStore(data);
        setHasUnsaved(false);
      }
    } catch {
      showToast("error", "Could not load content");
    }
  }

  async function handleLogin(event) {
    event.preventDefault();
    setLoginError("");
    try {
      const response = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (!response.ok) { setLoginError(data.error || "Login failed"); return; }
      setLoggedIn(true);
      setPassword("");
      await loadContent();
      showToast("success", "Welcome back!");
    } catch {
      setLoginError("Could not reach the server");
    }
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    setLoggedIn(false);
    setStore(blankStore);
    setHasUnsaved(false);
  }

  function updateField(section, key, value) {
    setStore((cur) => ({
      ...cur,
      content: {
        ...cur.content,
        [section]: { ...(cur.content?.[section] || {}), [key]: value },
      },
    }));
    setHasUnsaved(true);
  }

  function renameField(section, oldKey, newKey) {
    if (!newKey || newKey === oldKey) { setRenamingField(null); return; }
    setStore((cur) => {
      const fields = { ...(cur.content[section] || {}) };
      const value = fields[oldKey];
      // Preserve field order by rebuilding object
      const rebuilt = {};
      for (const [k, v] of Object.entries(fields)) {
        rebuilt[k === oldKey ? newKey : k] = v;
      }
      return { ...cur, content: { ...cur.content, [section]: rebuilt } };
    });
    setRenamingField(null);
    setHasUnsaved(true);
  }

  function deleteField(section, key) {
    askConfirm(`Delete field "${fieldLabel(key)}" from section "${sectionTitle(section)}"?`, () => {
      setStore((cur) => {
        const fields = { ...(cur.content[section] || {}) };
        delete fields[key];
        return { ...cur, content: { ...cur.content, [section]: fields } };
      });
      setHasUnsaved(true);
      setConfirmDialog(null);
    });
  }

  function addField(section, fieldName) {
    updateField(section, fieldName, "");
    setAddingFieldTo(null);
  }

  function addSection(sectionId, firstFieldName) {
    if (!sectionId) return;
    updateField(sectionId.trim(), firstFieldName || "title", "");
    setAddingSection(false);
    setNewSectionId("");
    // Auto-expand the new section
    setCollapsed((c) => ({ ...c, [sectionId]: false }));
    showToast("success", `Section "${sectionId}" added`);
  }

  function deleteSection(section) {
    askConfirm(`Delete entire section "${sectionTitle(section)}"? This cannot be undone.`, () => {
      setStore((cur) => {
        const content = { ...cur.content };
        delete content[section];
        return { ...cur, content };
      });
      setHasUnsaved(true);
      setConfirmDialog(null);
      showToast("success", "Section deleted");
    });
  }

  async function saveContent() {
    setSaving(true);
    try {
      const response = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(store),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Save failed");
      // Server returns the confirmed-saved store directly — use it
      if (data.store) {
        setStore(data.store);
      } else {
        await loadContent(); // fallback
      }
      setHasUnsaved(false);
      showToast("success", "✓ All changes saved successfully!");
    } catch (error) {
      showToast("error", error.message);
    } finally {
      setSaving(false);
    }
  }

  async function uploadMedia(event) {
    event.preventDefault();
    if (!uploadForm.file) { showToast("error", "Please select an image first"); return; }
    setUploading(true);
    try {
      const form = new FormData();
      form.append("file", uploadForm.file);
      form.append("title", uploadForm.title || uploadForm.file.name);
      form.append("alt", uploadForm.alt || uploadForm.title || uploadForm.file.name);
      form.append("category", uploadForm.category || "gallery");
      const response = await fetch("/api/admin/media", { method: "POST", body: form });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Upload failed");
      setStore((cur) => ({ ...cur, media: [data.item, ...(cur.media || [])] }));
      setUploadForm({ title: "", alt: "", category: "gallery", file: null });
      if (fileInputRef.current) fileInputRef.current.value = "";
      showToast("success", "Image uploaded successfully!");
    } catch (error) {
      showToast("error", error.message);
    } finally {
      setUploading(false);
    }
  }

  async function deleteMedia(item) {
    if (item.source === "site") {
      showToast("error", "Built-in site images cannot be deleted from admin");
      return;
    }
    askConfirm(`Delete image "${item.title}"? This cannot be undone.`, async () => {
      setConfirmDialog(null);
      try {
        const response = await fetch("/api/admin/media", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url: item.url }),
        });
        if (!response.ok) {
          const data = await response.json().catch(() => ({}));
          throw new Error(data.error || "Delete failed");
        }
        setStore((cur) => ({ ...cur, media: (cur.media || []).filter((m) => m.url !== item.url) }));
        showToast("success", "Image deleted");
      } catch (error) {
        showToast("error", error.message);
      }
    });
  }

  function copyUrl(url) {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(url);
      showToast("success", "URL copied to clipboard");
    }
  }

  const stats = useMemo(() => {
    const sections = Object.keys(store.content || {}).length;
    const fields = Object.values(store.content || {}).reduce((s, f) => s + Object.keys(f || {}).length, 0);
    const media = (store.media || []).length;
    return { sections, fields, media };
  }, [store]);

  const groupedSections = useMemo(() => {
    const groups = {};
    const q = search.trim().toLowerCase();
    for (const [section, fields] of Object.entries(store.content || {})) {
      let matched = fields;
      if (q) {
        matched = Object.fromEntries(
          Object.entries(fields || {}).filter(
            ([k, v]) =>
              section.toLowerCase().includes(q) ||
              k.toLowerCase().includes(q) ||
              String(v || "").toLowerCase().includes(q),
          ),
        );
        if (Object.keys(matched).length === 0 && !section.toLowerCase().includes(q)) continue;
      }
      const group = sectionGroup(section);
      (groups[group] ||= []).push([section, matched]);
    }
    return groups;
  }, [store, search]);

  const sortedGroupEntries = useMemo(() => sortedGroups(groupedSections), [groupedSections]);

  const mediaCategories = useMemo(() => {
    const set = new Set();
    (store.media || []).forEach((m) => set.add(m.category || "gallery"));
    return ["all", ...Array.from(set).sort()];
  }, [store.media]);

  const filteredMedia = useMemo(() => {
    const q = search.trim().toLowerCase();
    return (store.media || []).filter((m) => {
      if (mediaFilter !== "all" && (m.category || "gallery") !== mediaFilter) return false;
      if (!q) return true;
      return (
        (m.title || "").toLowerCase().includes(q) ||
        (m.url || "").toLowerCase().includes(q) ||
        (m.category || "").toLowerCase().includes(q)
      );
    });
  }, [store.media, mediaFilter, search]);

  // Active group navigation
  const allGroupNames = useMemo(() => sortedGroupEntries.map(([g]) => g), [sortedGroupEntries]);
  const currentGroupSections = useMemo(() => {
    if (!activeGroup) return sortedGroupEntries;
    return sortedGroupEntries.filter(([g]) => g === activeGroup);
  }, [activeGroup, sortedGroupEntries]);

  /* ── Loading ── */
  if (checking) {
    return (
      <main className={styles.screen}>
        <div className={styles.loader}>
          <div className={styles.spinner} />
          <span>Loading admin panel…</span>
        </div>
      </main>
    );
  }

  /* ── Login ── */
  if (!loggedIn) {
    return (
      <main className={styles.screen}>
        <section className={styles.loginCard}>
          <div className={styles.loginLogo}>
            <span>IC</span>
          </div>
          <p className={styles.eyebrow}>Infra Construction</p>
          <h1 className={styles.loginTitle}>Admin Panel</h1>
          <p className={styles.loginHint}>Sign in to manage your website content and media.</p>
          <form onSubmit={handleLogin} className={styles.loginForm}>
            <div className={styles.formGroup}>
              <label htmlFor="admin-username">Username</label>
              <input
                id="admin-username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
                required
                placeholder="admin"
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="admin-password">Password</label>
              <input
                id="admin-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                autoComplete="current-password"
                required
                placeholder="••••••••"
              />
            </div>
            {loginError && <div className={styles.loginError}>{loginError}</div>}
            <button type="submit" className={styles.loginButton}>Sign In →</button>
          </form>
        </section>
        {toast && <div className={`${styles.toast} ${styles[`toast_${toast.type}`]}`}>{toast.text}</div>}
      </main>
    );
  }

  /* ── Dashboard ── */
  return (
    <div className={styles.dashboard}>
      {/* ── SIDEBAR ── */}
      <aside className={styles.sidebar}>
        {/* Brand */}
        <div className={styles.sidebarBrand}>
          <div className={styles.sidebarLogo}>IC</div>
          <div>
            <div className={styles.sidebarBrandName}>Admin Panel</div>
            <div className={styles.sidebarBrandSub}>Infra Construction</div>
          </div>
        </div>

        {/* Main Nav */}
        <nav className={styles.sidebarNav}>
          <div className={styles.navSection}>
            <div className={styles.navSectionLabel}>Management</div>
            <button
              className={activeTab === "content" ? styles.navItemActive : styles.navItem}
              onClick={() => { setActiveTab("content"); setActiveGroup(null); }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
              Content Editor
            </button>
            <button
              className={activeTab === "media" ? styles.navItemActive : styles.navItem}
              onClick={() => { setActiveTab("media"); setSearch(""); }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
              Media Library
            </button>
          </div>

          {/* Page Groups Navigation (only in content tab) */}
          {activeTab === "content" && allGroupNames.length > 0 && (
            <div className={styles.navSection}>
              <div className={styles.navSectionLabel}>Pages & Sections</div>
              <button
                className={!activeGroup ? styles.navSubItemActive : styles.navSubItem}
                onClick={() => setActiveGroup(null)}
              >
                <span className={styles.navAllDot} />
                All Sections
                <span className={styles.navBadge}>{stats.sections}</span>
              </button>
              {allGroupNames.map((g) => (
                <button
                  key={g}
                  className={activeGroup === g ? styles.navSubItemActive : styles.navSubItem}
                  onClick={() => setActiveGroup(g)}
                >
                  <span className={styles.navGroupDot} />
                  {g}
                  <span className={styles.navBadge}>
                    {(groupedSections[g] || []).length}
                  </span>
                </button>
              ))}
            </div>
          )}
        </nav>

        {/* Sidebar Footer */}
        <div className={styles.sidebarBottom}>
          {/* Stats */}
          <div className={styles.statsGrid}>
            <div className={styles.statItem}>
              <span className={styles.statValue}>{stats.sections}</span>
              <span className={styles.statLabel}>Sections</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statValue}>{stats.fields}</span>
              <span className={styles.statLabel}>Fields</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statValue}>{stats.media}</span>
              <span className={styles.statLabel}>Media</span>
            </div>
          </div>
          {/* Links */}
          <a className={styles.navItem} href="/" target="_blank" rel="noreferrer" style={{textDecoration:"none"}}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            View Website
          </a>
          <button className={styles.logoutBtn} onClick={handleLogout}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
            Logout
          </button>
        </div>
      </aside>

      {/* ── MAIN PANEL ── */}
      <main className={styles.main}>
        {/* Top Bar */}
        <div className={styles.topBar}>
          <div className={styles.topBarLeft}>
            <div className={styles.breadcrumb}>
              <span className={styles.breadcrumbRoot}>
                {activeTab === "content" ? "Content Editor" : "Media Library"}
              </span>
              {activeGroup && (
                <>
                  <span className={styles.breadcrumbSep}>/</span>
                  <span className={styles.breadcrumbActive}>{activeGroup}</span>
                </>
              )}
            </div>
            {hasUnsaved && activeTab === "content" && (
              <span className={styles.unsavedBadge}>● Unsaved changes</span>
            )}
          </div>
          <div className={styles.topBarRight}>
            <div className={styles.searchWrap}>
              <svg className={styles.searchIcon} width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <input
                type="search"
                className={styles.searchInput}
                placeholder={activeTab === "content" ? "Search sections, fields…" : "Search images…"}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              {search && <button className={styles.searchClear} onClick={() => setSearch("")}>✕</button>}
            </div>
            {activeTab === "content" && (
              <button onClick={saveContent} disabled={saving} className={styles.saveBtn}>
                {saving ? (
                  <><span className={styles.savingSpinner} /> Saving…</>
                ) : (
                  <><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg> Save Changes</>
                )}
              </button>
            )}
          </div>
        </div>

        {/* ── CONTENT TAB ── */}
        {activeTab === "content" && (
          <div className={styles.contentArea}>
            {/* Page header */}
            <div className={styles.pageHeader}>
              <div>
                <h1 className={styles.pageTitle}>
                  {activeGroup || "All Website Content"}
                </h1>
                <p className={styles.pageDesc}>
                  {activeGroup
                    ? `Edit all sections for the ${activeGroup} — changes apply site-wide when saved.`
                    : `Showing all ${stats.sections} sections across ${allGroupNames.length} page groups.`}
                </p>
              </div>
              <button
                className={styles.addSectionBtn}
                onClick={() => setAddingSection(true)}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                Add Section
              </button>
            </div>

            {/* Add Section Form */}
            {addingSection && (
              <div className={styles.addSectionPanel}>
                <h3>New Section</h3>
                <p>Section ID should be like: <code>home_promo</code>, <code>about_team</code></p>
                <div className={styles.addSectionRow}>
                  <input
                    autoFocus
                    placeholder="Section ID (e.g. home_banner)"
                    value={newSectionId}
                    onChange={(e) => setNewSectionId(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && newSectionId.trim()) addSection(newSectionId.trim());
                      if (e.key === "Escape") { setAddingSection(false); setNewSectionId(""); }
                    }}
                    className={styles.addSectionInput}
                  />
                  <button
                    type="button"
                    className={styles.primaryButton}
                    onClick={() => newSectionId.trim() && addSection(newSectionId.trim())}
                    disabled={!newSectionId.trim()}
                  >Create Section</button>
                  <button type="button" className={styles.ghostButton} onClick={() => { setAddingSection(false); setNewSectionId(""); }}>Cancel</button>
                </div>
              </div>
            )}

            {/* Groups */}
            {currentGroupSections.length === 0 ? (
              <div className={styles.emptyState}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                <p>No sections match your search.</p>
                <button className={styles.ghostButton} onClick={() => setSearch("")}>Clear search</button>
              </div>
            ) : null}

            {currentGroupSections.map(([group, sections]) => (
              <div key={group} className={styles.groupBlock}>
                {/* Group heading */}
                <div className={styles.groupHeader}>
                  <h2 className={styles.groupTitle}>{group}</h2>
                  <span className={styles.groupCount}>{sections.length} section{sections.length !== 1 ? "s" : ""}</span>
                </div>

                {/* Section cards */}
                <div className={styles.sectionList}>
                  {sections.map(([section, fields]) => {
                    const isOpen = !collapsed[section];
                    const fieldCount = Object.keys(fields || {}).length;
                    return (
                      <div key={section} className={`${styles.sectionCard} ${isOpen ? styles.sectionCardOpen : ""}`}>
                        {/* Section header */}
                        <div className={styles.sectionCardHeader}>
                          <button
                            type="button"
                            className={styles.sectionToggle}
                            onClick={() => setCollapsed((c) => ({ ...c, [section]: !c[section] }))}
                          >
                            <span className={`${styles.toggleIcon} ${isOpen ? styles.toggleOpen : ""}`}>▶</span>
                            <div className={styles.sectionMeta}>
                              <span className={styles.sectionName}>{sectionTitle(section)}</span>
                              <code className={styles.sectionCode}>{section}</code>
                            </div>
                          </button>
                          <div className={styles.sectionHeaderRight}>
                            <span className={styles.fieldCountBadge}>{fieldCount} field{fieldCount !== 1 ? "s" : ""}</span>
                            <button
                              type="button"
                              className={styles.iconBtn}
                              title="Add field"
                              onClick={() => { setAddingFieldTo(section); setCollapsed((c) => ({...c, [section]: false})); }}
                            >
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                            </button>
                            <button
                              type="button"
                              className={`${styles.iconBtn} ${styles.iconBtnDanger}`}
                              title="Delete section"
                              onClick={() => deleteSection(section)}
                            >
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/></svg>
                            </button>
                          </div>
                        </div>

                        {/* Section body */}
                        {isOpen && (
                          <div className={styles.sectionBody}>
                            {/* Add field inline form */}
                            {addingFieldTo === section && (
                              <AddFieldInline
                                onAdd={(name) => addField(section, name)}
                                onCancel={() => setAddingFieldTo(null)}
                              />
                            )}

                            {/* Fields */}
                            {Object.entries(fields || {}).map(([key, value]) => {
                              const imgField = isLikelyImageField(key, value);
                              const showPreview = imgField && isImagePath(value);
                              const longText = String(value || "").length > 100;
                              const isRenaming = renamingField?.section === section && renamingField?.key === key;

                              return (
                                <div key={key} className={styles.fieldRow}>
                                  {/* Field label row */}
                                  <div className={styles.fieldLabelRow}>
                                    {isRenaming ? (
                                      <InlineRename
                                        initial={key}
                                        onSave={(newKey) => renameField(section, key, newKey)}
                                        onCancel={() => setRenamingField(null)}
                                      />
                                    ) : (
                                      <div className={styles.fieldLabel}>
                                        <span className={styles.fieldLabelText}>{fieldLabel(key)}</span>
                                        <code className={styles.fieldKeyCode}>{key}</code>
                                        {imgField && <span className={styles.fieldTypeBadge}>image</span>}
                                      </div>
                                    )}
                                    <div className={styles.fieldActions}>
                                      <button
                                        type="button"
                                        className={styles.fieldActionBtn}
                                        title="Rename field"
                                        onClick={() => setRenamingField({ section, key })}
                                      >Rename</button>
                                      <button
                                        type="button"
                                        className={`${styles.fieldActionBtn} ${styles.fieldDeleteBtn}`}
                                        title="Delete field"
                                        onClick={() => deleteField(section, key)}
                                      >Delete</button>
                                    </div>
                                  </div>

                                  {/* Field input area */}
                                  <div className={styles.fieldInputArea}>
                                    {showPreview && (
                                      <div className={styles.imgPreview}>
                                        <img src={value} alt="" />
                                      </div>
                                    )}
                                    <div className={styles.fieldControls}>
                                      {longText ? (
                                        <textarea
                                          value={String(value || "")}
                                          onChange={(e) => updateField(section, key, e.target.value)}
                                          rows={Math.min(6, Math.max(3, Math.ceil(String(value || "").length / 80)))}
                                          className={styles.fieldTextarea}
                                        />
                                      ) : (
                                        <input
                                          value={String(value || "")}
                                          onChange={(e) => updateField(section, key, e.target.value)}
                                          placeholder={imgField ? "/media/your-image.jpg" : `Enter ${fieldLabel(key).toLowerCase()}…`}
                                          className={styles.fieldInput}
                                        />
                                      )}
                                      {imgField && (
                                        <button
                                          type="button"
                                          className={styles.pickFromLibraryBtn}
                                          onClick={() => { setActiveTab("media"); setPickerFor({ section, key }); }}
                                        >
                                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                                          Pick from Media Library
                                        </button>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              );
                            })}

                            {Object.keys(fields || {}).length === 0 && addingFieldTo !== section && (
                              <div className={styles.emptyFields}>
                                No fields yet.
                                <button
                                  type="button"
                                  className={styles.inlineAddBtn}
                                  onClick={() => setAddingFieldTo(section)}
                                >+ Add your first field</button>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── MEDIA TAB ── */}
        {activeTab === "media" && (
          <div className={styles.mediaArea}>
            {/* Page header */}
            <div className={styles.pageHeader}>
              <div>
                <h1 className={styles.pageTitle}>Media Library</h1>
                <p className={styles.pageDesc}>Upload images, browse site assets, and assign images to content fields.</p>
              </div>
              {pickerFor && (
                <div className={styles.pickerBanner}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  Picking image for <strong>{pickerFor.section} → {pickerFor.key}</strong>
                  <button onClick={() => setPickerFor(null)} className={styles.pickerCancelBtn}>Cancel</button>
                </div>
              )}
            </div>

            <div className={styles.mediaLayout}>
              {/* Upload Panel */}
              <div className={styles.mediaSidebar}>
                <div className={styles.uploadPanel}>
                  <h3 className={styles.panelTitle}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/></svg>
                    Upload New Image
                  </h3>
                  <form onSubmit={uploadMedia} className={styles.uploadForm}>
                    <div className={styles.formGroup}>
                      <label>Title</label>
                      <input
                        value={uploadForm.title}
                        onChange={(e) => setUploadForm({ ...uploadForm, title: e.target.value })}
                        placeholder="Image title"
                        className={styles.formInput}
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label>Alt Text <span className={styles.optionalTag}>for accessibility</span></label>
                      <input
                        value={uploadForm.alt}
                        onChange={(e) => setUploadForm({ ...uploadForm, alt: e.target.value })}
                        placeholder="Describe the image"
                        className={styles.formInput}
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label>Category</label>
                      <input
                        value={uploadForm.category}
                        onChange={(e) => setUploadForm({ ...uploadForm, category: e.target.value })}
                        placeholder="e.g. hero, gallery, team"
                        className={styles.formInput}
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label>Image File</label>
                      <label className={styles.fileDropZone}>
                        <input
                          ref={fileInputRef}
                          id="admin-media-file"
                          type="file"
                          accept="image/*"
                          onChange={(e) => setUploadForm({ ...uploadForm, file: e.target.files?.[0] || null })}
                          style={{ display: "none" }}
                        />
                        {uploadForm.file ? (
                          <div className={styles.fileSelected}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                            <span>{uploadForm.file.name}</span>
                            <small>{(uploadForm.file.size / 1024 / 1024).toFixed(2)} MB</small>
                          </div>
                        ) : (
                          <div className={styles.filePlaceholder}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/></svg>
                            <span>Click to choose image</span>
                            <small>JPG, PNG, WebP — up to 8 MB</small>
                          </div>
                        )}
                      </label>
                    </div>
                    <button
                      type="submit"
                      disabled={uploading || !uploadForm.file}
                      className={styles.uploadBtn}
                    >
                      {uploading ? (
                        <><span className={styles.savingSpinner} /> Uploading…</>
                      ) : (
                        <><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/></svg> Upload Image</>
                      )}
                    </button>
                  </form>
                </div>

                {/* Category Filter */}
                <div className={styles.categoryPanel}>
                  <h3 className={styles.panelTitle}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
                    Filter by Category
                  </h3>
                  <div className={styles.catList}>
                    {mediaCategories.map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        className={mediaFilter === cat ? styles.catItemActive : styles.catItem}
                        onClick={() => setMediaFilter(cat)}
                      >
                        {cat === "all" ? "All Images" : sectionTitle(cat)}
                        <span className={styles.catCount}>
                          {cat === "all"
                            ? (store.media || []).length
                            : (store.media || []).filter((m) => (m.category || "gallery") === cat).length}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Media Grid */}
              <div className={styles.mediaGridArea}>
                <div className={styles.mediaGridHeader}>
                  <span className={styles.mediaGridCount}>
                    {filteredMedia.length} image{filteredMedia.length !== 1 ? "s" : ""}
                    {mediaFilter !== "all" && ` in "${sectionTitle(mediaFilter)}"`}
                  </span>
                  {pickerFor && <span className={styles.pickerModeLabel}>Click any image to select it</span>}
                </div>

                {filteredMedia.length === 0 ? (
                  <div className={styles.emptyState}>
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                    <p>No images found.</p>
                  </div>
                ) : (
                  <div className={styles.mediaGrid}>
                    {filteredMedia.map((item) => (
                      <div
                        key={item.id}
                        className={`${styles.mediaCard} ${pickerFor ? styles.mediaCardPickable : ""}`}
                        onClick={pickerFor ? () => {
                          updateField(pickerFor.section, pickerFor.key, item.url);
                          setPickerFor(null);
                          setActiveTab("content");
                          showToast("success", "Image assigned successfully!");
                        } : undefined}
                      >
                        <div className={styles.mediaThumb}>
                          <img src={item.url} alt={item.alt || item.title} loading="lazy" />
                          {pickerFor && (
                            <div className={styles.pickOverlay}>
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                              <span>Use this image</span>
                            </div>
                          )}
                        </div>
                        <div className={styles.mediaInfo}>
                          <div className={styles.mediaTitle} title={item.title}>{item.title}</div>
                          <div className={styles.mediaCategory}>{item.category || "gallery"}</div>
                          <div className={styles.mediaUrl} title={item.url}>{item.url}</div>
                          {!pickerFor && (
                            <div className={styles.mediaActions}>
                              <button
                                type="button"
                                className={styles.mediaActionBtn}
                                onClick={() => copyUrl(item.url)}
                              >Copy URL</button>
                              {item.source === "site" ? (
                                <span className={styles.siteFileBadge}>Built-in</span>
                              ) : (
                                <button
                                  type="button"
                                  className={`${styles.mediaActionBtn} ${styles.mediaActionBtnDanger}`}
                                  onClick={() => deleteMedia(item)}
                                >Delete</button>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ── CONFIRM DIALOG ── */}
      {confirmDialog && (
        <ConfirmDialog
          message={confirmDialog.message}
          onConfirm={confirmDialog.onConfirm}
          onCancel={() => setConfirmDialog(null)}
        />
      )}

      {/* ── TOAST ── */}
      {toast && (
        <div className={`${styles.toast} ${styles[`toast_${toast.type}`]}`}>
          {toast.text}
        </div>
      )}
    </div>
  );
}