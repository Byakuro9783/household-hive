import { useState } from "react";
import Card from "../components/common/Card";
import { monthlyEquivalent } from "../utils/recurring";

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
    if (!expenseName || !amount) {
      return;
    }

    const newExpense = {
      id: Date.now(),
      name: expenseName,
      amount: Number(amount),
      frequency
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
    setFrequency("monthly");
  };

  const updateExpense = (
    expenseId,
    field,
    value
  ) => {
    setData({
      ...data,

      expenses: data.expenses.map(
        (expense) => {
          if (
            expense.id !== expenseId
          ) {
            return expense;
          }

          return {
            ...expense,

            [field]:
              field === "name" ||
              field === "frequency"
                ? value
                : Number(value)
          };
        }
      )
    });
  };

  const deleteExpense = (
    expenseId
  ) => {
    setData({
      ...data,

      expenses:
        data.expenses.filter(
          (expense) =>
            expense.id !== expenseId
        )
    });
  };

  return (
    <div className="space-y-4">

      <Card theme={theme}>
        <h2
          className={`
            text-lg
            font-bold
            mb-4
            ${theme.text}
          `}
        >
          Add Expense
        </h2>

        <div className="space-y-3">

          <input
            className="w-full p-3 border rounded-xl"
            placeholder="Expense Name"
            value={expenseName}
            onChange={(e) =>
              setExpenseName(
                e.target.value
              )
            }
          />

          <input
            type="number"
            className="w-full p-3 border rounded-xl"
            placeholder="Amount"
            value={amount}
            onChange={(e) =>
              setAmount(
                e.target.value
              )
            }
          />

          <select
            className="w-full p-3 border rounded-xl"
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
            onClick={addExpense}
            className={`
              w-full
              p-3
              rounded-xl
              text-white
              ${theme.button}
            `}
          >
            Add Expense
          </button>

        </div>
      </Card>

      {data.expenses.length === 0 && (
        <Card theme={theme}>
          <div
            className={`
              text-center
              ${theme.text}
            `}
          >
            No expenses added yet.
          </div>
        </Card>
      )}

      {data.expenses.map(
        (expense) => {
          const monthly =
            monthlyEquivalent(
              expense.amount,
              expense.frequency
            );

          return (
            <Card
              key={expense.id}
              theme={theme}
            >
              <div className="space-y-3">

                <input
                  className="w-full p-3 border rounded-xl"
                  value={expense.name}
                  onChange={(e) =>
                    updateExpense(
                      expense.id,
                      "name",
                      e.target.value
                    )
                  }
                />

                <input
                  type="number"
                  className="w-full p-3 border rounded-xl"
                  value={expense.amount}
                  onChange={(e) =>
                    updateExpense(
                      expense.id,
                      "amount",
                      e.target.value
                    )
                  }
                />

                <select
                  className="w-full p-3 border rounded-xl"
                  value={
                    expense.frequency
                  }
                  onChange={(e) =>
                    updateExpense(
                      expense.id,
                      "frequency",
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

                <div className="bg-slate-100 rounded-xl p-3">

                  <div>
                    Entered As
                  </div>

                  <div className="font-medium">
                    $
                    {expense.amount}
                    {" "}
                    {expense.frequency}
                  </div>

                  <div className="mt-2">
                    Monthly Equivalent
                  </div>

                  <div className="font-bold">
                    $
                    {monthly.toFixed(0)}
                  </div>

                </div>

                <button
                  onClick={() =>
                    deleteExpense(
                      expense.id
                    )
                  }
                  className="
                    w-full
                    p-3
                    rounded-xl
                    bg-red-500
                    text-white
                  "
                >
                  Delete Expense
                </button>

              </div>
            </Card>
          );
        }
      )}

    </div>
  );
}