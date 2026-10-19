/** Small line icons for the hobbies. */
const PATHS: Record<string, string> = {
  book: "M4 5.5C4 4.7 4.7 4 5.5 4H11v15H5.5C4.7 19 4 18.3 4 17.5zM20 5.5c0-.8-.7-1.5-1.5-1.5H13v15h5.5c.8 0 1.5-.7 1.5-1.5z",
  chess: "M9 20h6M8 17h8l-1-4H9zM10 13l-1-5h6l-1 5M12 8V4M10 5h4",
  dance: "M13 4.5a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0zM11 8l-3 5h4l-2 7M12 13l4 3M11 8l5 2",
  heart: "M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z",
  agent: "M7 8h10a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2zM12 4v4M9.5 13h.01M14.5 13h.01",
};

export function HobbyIcon({ name }: { name: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
      <path d={PATHS[name] ?? PATHS.heart} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
