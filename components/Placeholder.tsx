/** Inline marker for a business fact that has not been confirmed yet. */
export default function Placeholder({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded border border-dashed border-current px-1.5 py-0.5 text-sm opacity-80">
      [{children}]
    </span>
  );
}
