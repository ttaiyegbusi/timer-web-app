const PALETTE = [
  "#3B5CF6",
  "#2DA676",
  "#F47621",
  "#7C5CFC",
  "#E11D48",
  "#0EA5E9",
  "#172762",
];

function colorFor(seed) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  return PALETTE[h % PALETTE.length];
}

function initials(name) {
  return name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function Avatar({ name = "U", size = 38 }) {
  return (
    <span
      className="grid shrink-0 place-items-center rounded-full font-medium text-white"
      style={{
        width: size,
        height: size,
        background: colorFor(name),
        fontSize: size * 0.36,
      }}
    >
      {initials(name)}
    </span>
  );
}

export function AvatarStack({ count = 7, extra = 4, size = 32 }) {
  const shown = Math.min(count, 3);
  const seeds = ["Ava Reed", "Liam Cole", "Noah Vale"];
  return (
    <div className="flex items-center">
      {Array.from({ length: shown }).map((_, i) => (
        <span
          key={i}
          className="rounded-full ring-2 ring-white"
          style={{ marginLeft: i === 0 ? 0 : -10 }}
        >
          <Avatar name={seeds[i]} size={size} />
        </span>
      ))}
      <span
        className="grid place-items-center rounded-full bg-subtle text-[12px] font-medium text-text-secondary ring-2 ring-white"
        style={{ width: size, height: size, marginLeft: -10 }}
      >
        +{extra}
      </span>
    </div>
  );
}
