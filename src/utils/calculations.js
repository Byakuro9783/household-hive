import { monthlyValue } from "./recurring";

export function calculateTotals(
  data
) {

  const income =
    data.contributors.reduce(
      (sum, c) =>
        sum + Number(c.income),
      0
    );

  const expenses =
    data.expenses.reduce(
      (sum, expense) => {
        return (
          sum +
          monthlyValue(
            expense.amount,
            expense.frequency
          )
        );
      },
      0
    );

  return {
    income,
    expenses,
    available:
      income - expenses
  };
}