export default function Card({
  children,
  theme
}) {
  return (
    <div
      className={`
        ${theme.card}
        rounded-3xl
        p-4
        shadow-sm
      `}
    >
      {children}
    </div>
  );
}