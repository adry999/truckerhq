export default function SampleDataNotice({ children }: { children: React.ReactNode }) {
  return (
    <div
      role="note"
      className="rounded-lg border border-[#F2A900] bg-[#FFF7E0] px-4 py-3 text-sm text-[#4B5058]"
    >
      {children}
    </div>
  );
}
