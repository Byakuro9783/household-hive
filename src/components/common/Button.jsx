export default function Button({
  children,
  theme,
  onClick
}) {
  return (
    <button
      onClick={onClick}
      className={`
      ${theme.button}
      ${theme.buttonText}
      rounded-2xl
      py-3
      px-4
      w-full
      font-medium
      `}
    >
      {children}
    </button>
  );
}