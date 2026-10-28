import Card from "../components/common/Card";

export default function HomeScreen({
  totals,
  theme,
}) {
  return (
    <div className="space-y-4">

      <Card theme={theme}>
        <h2
          className={`text-xl font-bold mb-4 ${theme.text}`}
        >
          Monthly Snapshot
        </h2>

        <div className={theme.text}>
          Household Income:
          {" "}
          $
          {totals.income.toLocaleString()}
        </div>

        <div className={theme.text}>
          Household Expenses:
          {" "}
          $
          {totals.expenses.toLocaleString()}
        </div>

        <div
          className={`font-bold mt-2 ${theme.text}`}
        >
          Available:
          {" "}
          $
          {totals.available.toLocaleString()}
        </div>
      </Card>

    </div>
  );
}