type LogoProps = {
  theme?: "dark";
  size?: number;
};

/** Wordmark for dark backgrounds (header and footer). */
export default function Logo({ size = 32 }: LogoProps) {
  const outerFs = Math.round(size * 0.78);

  return (
    <div
      className="inline-flex items-stretch gap-[.12em] font-logo uppercase"
      style={{ fontSize: outerFs }}
    >
      <div
        className="inline-flex rounded-[.16em] p-[.07em]"
        style={{ background: "#0E5C3A", boxShadow: "0 0 0 1px rgba(247,247,245,.35)" }}
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
    </div>
  );
}
