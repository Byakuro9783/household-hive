import { useState } from "react";
import Card from "../components/common/Card";

export default function BudgetScreen({
  data,
  setData,
  theme
}) {
  const [expenseName, setExpenseName] =
    useState("");

  const [amount, setAmount] =
    useState("");

  const [frequency, setFrequency] =
    useState("monthly");

  const addExpense = () => {
    if (!expenseName || !amount) return;

    const newExpense = {
      id: Date.now(),
      name: expenseName,
      amount: Number(amount),
      frequency,
      assignments: []
    };

    setData({
      ...data,
      expenses: [
        ...data.expenses,
        newExpense
      ]
    });

    setExpenseName("");
    setAmount("");
  };

  return (
    <div className="space-y-4">

      <Card theme={theme}>
        <h2 className={theme.text}>
          Add Expense
        </h2>

        <div className="space-y-2 mt-3">

          <input
            className="
            w-full p-3 rounded-xl border
            "
            placeholder="Expense Name"
            value={expenseName}
            onChange={(e) =>
              setExpenseName(
                e.target.value
              )
            }
          />

          <input
            className="
            w-full p-3 rounded-xl border
            "
            placeholder="Amount"
            type="number"
            value={amount}
            onChange={(e) =>
              setAmount(
                e.target.value
              )
            }
          />

          <select
            className="
            w-full p-3 rounded-xl border
            "
            value={frequency}
            onChange={(e) =>
              setFrequency(
                e.target.value
              )
            }
          >
            <option value="weekly">
              Weekly
            </option>

            <option value="fortnightly">
              Fortnightly
            </option>

            <option value="monthly">
              Monthly
            </option>

            <option value="quarterly">
              Quarterly
            </option>

            <option value="yearly">
              Yearly
            </option>
          </select>

          <button
            className={`
            w-full p-3 rounded-xl
            text-white
            ${theme.button}
            `}
            onClick={addExpense}
          >
            Add Expense
          </button>

        </div>
      </Card>

      {data.expenses.map(
        (expense) => (
          <Card
            key={expense.id}
            theme={theme}
          >
            <div
              className="
              flex justify-between
              "
            >
              <div>
                <div
                  className={
                    theme.text
                  }
                >
                  {expense.name}
                </div>

                <div
                  className={
                    theme.muted
                  }
                >
                  {
                    expense.frequency
                  }
                </div>
              </div>

              <strong
                className={
                  theme.text
                }
              >
                $
                {expense.amount}
              </strong>
            </div>
          </Card>
        )
      )}

    </div>
  );
}