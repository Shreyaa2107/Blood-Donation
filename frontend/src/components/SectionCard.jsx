import { Link } from "react-router-dom";
import "../styles/component.css";

export default function SectionCard({ title, link, desc }) {
  return (
    <div className="section-card">
      <h3>{title}</h3>
      <p>{desc}</p>
      <Link to={link} className="btn">Explore</Link>
    </div>
  );
}
