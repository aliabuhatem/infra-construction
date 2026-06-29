import ContentText from "../components/admin-panel/ContentText";
import MediaImage from "../components/admin-panel/MediaImage";

export default function HomePageExample() {
  return (
    <main>
      <section>
        <h1><ContentText section="hero" name="title" fallback="Building Tomorrow's Infrastructure" /></h1>
        <p><ContentText section="hero" name="subtitle" fallback="Premium construction services." /></p>
        <button><ContentText section="hero" name="ctaText" fallback="Contact US" /></button>
        <MediaImage category="hero" fallbackSrc="/your-existing-hero-image.jpg" alt="Construction project" />
      </section>
    </main>
  );
}
