export function Honeypot() {
  return (
    <input
      type="text"
      name="website"
      tabIndex={-1}
      autoComplete="off"
      aria-hidden="true"
      className="hidden"
    />
  );
}

// Always rendered: screen readers only announce changes inside a live region that already exists.
export function FormError({ message }: { message: string | null }) {
  return (
    <p role="alert" aria-live="assertive" className="text-[13px] font-semibold text-red">
      {message}
    </p>
  );
}
