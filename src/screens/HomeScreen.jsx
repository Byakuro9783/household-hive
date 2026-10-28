import Card from "../components/common/Card";

export default function HomeScreen({
  totals,
  data,
  theme
}) {
  const getGreeting = () => {
    const hour = new Date().getHours();

    if (hour < 12) return "Good Morning ☀️";
    if (hour < 17) return "Good Afternoon 🌤️";
    return "Good Evening 🌙";
  };

  return (
    <div className="space-y-4">

      <Card theme={theme}>
        <div
          className={`text-sm ${theme.muted}`}
        >
          {getGreeting()}
        </div>

        <h2
          className={`
          text-2xl
          font-bold
          mt-1
          ${theme.text}
          `}
        >
          {data.household.name}
        </h2>

        <div
          className={`
          mt-2
          ${theme.muted}
          `}
        >
          {data.members.length} members •{" "}
          {data.contributors.length} contributors
        </div>
      </Card>

      <Card theme={theme}>
        <h3
          className={`
          text-lg
          font-semibold
          mb-4
          ${theme.text}
          `}
        >
          Monthly Household Position
        </h3>

        <div
          className={`
          flex justify-between py-2
          ${theme.text}
          `}
        >
          <span>Monthly Income</span>

          <strong>
            $
            {totals.income.toFixed(0)}
          </strong>
        </div>

        <div
          className={`
          flex justify-between py-2
          ${theme.text}
          `}
        >
          <span>Monthly Expenses</span>

          <strong>
            $
            {totals.expenses.toFixed(0)}
          </strong>
        </div>

        <div
          className={`
          flex justify-between py-2
          text-lg font-bold
          ${theme.text}
          `}
        >
          <span>Monthly Available</span>

          <span>
            $
            {totals.available.toFixed(0)}
          </span>
        </div>
      </Card>

      <Card theme={theme}>
        <h3
          className={`
          text-lg
          font-semibold
          mb-4
          ${theme.text}
          `}
        >
          Contributors
        </h3>

        {data.members
          .filter(
            (member) =>
              member.contributor
          )
          .map((member) => {
            const contributor =
              data.contributors.find(
                (c) =>
                  c.id === member.id
              );

            if (!contributor)
              return null;

            return (
              <div
                key={member.id}
                className="
                border-b
                last:border-b-0
                pb-3
                mb-3
                "
              >
                <div
                  className={`
                  font-medium
                  ${theme.text}
                  `}
                >
                  {member.name}
                </div>

                <div
                  className={
                    theme.muted
                  }
                >
                  $
                  {contributor.income}
                  {" "}
                  {contributor.incomeFrequency ||
                    "monthly"}
                </div>
              </div>
            );
          })}
      </Card>

      {data.expenses.length === 0 && (
        <Card theme={theme}>
          <div
            className={`
            text-center
            ${theme.text}
            `}
          >
            <div className="text-4xl">
              💡
            </div>

            <p className="mt-3">
              Start by adding your
              first expense in the
              Budget tab.
            </p>
          </div>
        </Card>
      )}

    </div>
  );
}