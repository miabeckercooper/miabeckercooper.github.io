import { identity, kpis } from "../content/cv";
import { Kpis } from "../ui/Kpis";
import { Photo } from "../ui/Photo";

export function Hero() {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="wrap">
        <div>
          <p className="hero-name">{identity.name} <span className="avail">{identity.eyebrow}</span></p>
          <h1 id="hero-title" className="display">
            {identity.headline.map((w) => <span key={w}>{w}</span>)}
          </h1>
          <p className="lede">{identity.lede}</p>
          <p className="proc" aria-label={`Process: ${identity.process.join(", ")}`}>
            {identity.process.map((p, i) => <span key={p}>{i > 0 && <i aria-hidden="true">→ </i>}<b>{p.toUpperCase()}</b></span>)}
          </p>
          <Kpis items={kpis} />
          <div className="btns">
            <a className="btn solid" href="#timeline">See my timeline</a>
            <a className="btn" href="#models">Play with my models</a>
          </div>
        </div>
        <div className="portrait">
          <div className="arch">
            <Photo name={identity.photo.name} alt={identity.photo.alt} sizes="(max-width: 860px) 78vw, 460px" eager width={1170} height={2072} />
          </div>
          <p className="tag"><b>{identity.photoTag.value}</b> {identity.photoTag.label}</p>
        </div>
      </div>
    </section>
  );
}
