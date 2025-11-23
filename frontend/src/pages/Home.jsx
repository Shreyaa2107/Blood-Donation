import "../styles/theme.css";
import "../styles/layout.css";
import "../styles/component.css";
import SectionCard from "../components/SectionCard";

export default function Home() {
  return (
    <div className="container">

      <header className="hero">
        <h1>Give Blood. Save Lives.</h1>
        <p>Join thousands of donors helping hospitals with life-saving blood donations.</p>
      </header>

      <div className="section-grid">
        <SectionCard 
          title="Donate Blood" 
          desc="Register yourself as a blood donor and help someone in need." 
          link="/donate"
        />

        <SectionCard 
          title="Search Donors" 
          desc="Find available donors by blood group & location." 
          link="/search"
        />

        <SectionCard 
          title="Request Blood" 
          desc="Submit an emergency blood requirement request." 
          link="/request"
        />
      </div>

    </div>
  );
}
