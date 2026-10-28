const tabs = [
  "home",
  "budget",
  "household",
  "goals",
  "settings"
];

export default function BottomNav({
  active,
  setActive
}) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t">
      <div className="flex justify-around p-3">

        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() =>
              setActive(tab)
            }
            className={
              active === tab
                ? "font-bold"
                : ""
            }
          >
            {tab}
          </button>
        ))}

      </div>
    </div>
  );
}