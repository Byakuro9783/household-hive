import Card from "../components/common/Card";

export default function HomeScreen({
  totals,
  data,
  theme
}) {
  return (
    <div className="space-y-4">

      <Card theme={theme}>
        <h2
          className={`
          text-xl font-bold
          ${theme.text}
          `}
        >
          Monthly Snapshot
        </h2>

        <div
          className={`mt-3 ${theme.text}`}
        >
          Income:
          {" "}
          $
          {totals.income.toLocaleString()}
        </div>

        <div
          className={`mt-2 ${theme.text}`}
        >
          Expenses:
          {" "}
          $
          {totals.expenses.toFixed(
            0
          )}
        </div>

        <div
          className={`mt-2 ${theme.text}`}
        >
          Available:
          {" "}
          $
          {totals.available.toFixed(
            0
          )}
        </div>

      </Card>

      <Card theme={theme}>
        <h3
          className={theme.text}
        >
          Household
        </h3>

        <div
          className={theme.text}
        >
          Members:
          {" "}
          {data.members.length}
        </div>

        <div
          className={theme.text}
        >
          Contributors:
          {" "}
          {
            data.contributors
              .length
          }
        </div>
      </Card>

    </div>
  );
}