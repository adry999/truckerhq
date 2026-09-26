type LogoProps = {
  theme?: "light" | "dark";
  size?: number;
  sub?: string;
  mark?: boolean;
  className?: string;
};

export default function Logo({
  theme = "light",
  size = 32,
  sub,
  mark = false,
  className,
}: LogoProps) {
  const edge = theme === "dark" ? "0 0 0 1px rgba(247,247,245,.35)" : "none";

  if (mark) {
    return (
      <svg
        viewBox="0 0 100 108"
        style={{ width: size, height: (size * 108) / 100 }}
        className={className}
      >
        <defs>
          <clipPath id="thq-shield">
            <path d="M8 6 C30 14 70 14 92 6 C100 40 96 78 50 104 C4 78 0 40 8 6 Z" />
          </clipPath>
        </defs>
        <path
          d="M8 6 C30 14 70 14 92 6 C100 40 96 78 50 104 C4 78 0 40 8 6 Z"
          fill="#0E5C3A"
        />
        <rect
          x="0"
          y="0"
          width="100"
          height="32"
          fill="#F2A900"
          clipPath="url(#thq-shield)"
        />
        <path
          d="M8 6 C30 14 70 14 92 6 C100 40 96 78 50 104 C4 78 0 40 8 6 Z"
          fill="none"
          stroke="#F7F7F5"
          strokeWidth="5"
        />
        <text
          x="50"
          y="72"
          textAnchor="middle"
          fontFamily="var(--font-logo)"
          fontWeight="900"
          fontSize="34"
          fill="#F7F7F5"
        >
          HQ
        </text>
      </svg>
    );
  }

  const outerFs = Math.round(size * 0.78);

  return (
    <div
      className={`inline-flex items-stretch gap-[.12em] font-logo uppercase ${className ?? ""}`}
      style={{ fontSize: outerFs }}
    >
      <div
        className="inline-flex rounded-[.16em] p-[.07em]"
        style={{ background: "#0E5C3A", boxShadow: edge }}
      >
        <div className="relative flex items-stretch rounded-[.11em] border-[.045em] border-[#F7F7F5]">
          <span className="absolute left-[.12em] top-[.12em] h-[.07em] w-[.07em] rounded-full bg-[rgba(247,247,245,.55)]" />
          <span className="absolute left-[.12em] bottom-[.12em] h-[.07em] w-[.07em] rounded-full bg-[rgba(247,247,245,.55)]" />
          <span className="absolute right-[.12em] top-[.12em] h-[.07em] w-[.07em] rounded-full bg-[rgba(247,247,245,.55)]" />
          <span className="absolute right-[.12em] bottom-[.12em] h-[.07em] w-[.07em] rounded-full bg-[rgba(247,247,245,.55)]" />
          <span className="py-[.2em] pl-[.44em] pr-[.3em] font-extrabold text-[#F7F7F5]">
            Trucker
          </span>
          <span className="border-l-[.045em] border-[#F7F7F5] py-[.2em] pl-[.3em] pr-[.44em] font-black text-[#F2A900]">
            HQ
          </span>
        </div>
      </div>
      {sub ? (
        <div
          className="flex items-center rounded-[.16em] px-[.4em] pt-[.08em] font-black tracking-[.06em]"
          style={{ background: "#F2A900", color: "#16181B", fontSize: "0.56em" }}
        >
          {sub}
        </div>
      ) : null}
    </div>
  );
}
