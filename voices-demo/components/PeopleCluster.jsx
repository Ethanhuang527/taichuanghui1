import Avatar from "./Avatar";

// 人物群像（圓形頭像拼貼，之後可換成真實照片）。t/l 為圓心位置(%)，s 為直徑(px)。
const BUBBLES = [
  { t: 6,  l: 36, s: 84 },
  { t: 10, l: 63, s: 104, teal: true },
  { t: 26, l: 15, s: 70 },
  { t: 30, l: 82, s: 92 },
  { t: 40, l: 46, s: 138, teal: true },
  { t: 58, l: 20, s: 78 },
  { t: 62, l: 66, s: 74 },
  { t: 80, l: 44, s: 100 },
  { t: 72, l: 84, s: 62 },
  { t: 84, l: 16, s: 64 },
];

export default function PeopleCluster() {
  return (
    <div className="cluster">
      {BUBBLES.map((b, i) => (
        <div
          key={i}
          className={`bubble${b.teal ? " teal" : ""}`}
          style={{
            top: `${b.t}%`, left: `${b.l}%`,
            width: b.s, height: b.s,
            marginLeft: -b.s / 2, marginTop: -b.s / 2,
          }}
        >
          <Avatar size={b.s} />
        </div>
      ))}
    </div>
  );
}
