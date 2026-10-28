import { useState } from "react";
import Card from "../components/common/Card";
import {
  getIncomeAllocations,
  getEqualAllocations,
  getManualAllocations,
} from "../utils/allocations";

export default function BudgetScreen({
  data,
  theme,
  setData,
}) {
  const [
    expandedExpense,
    setExpandedExpense,
  ] = useState(null);

  const addExpense = () => {
    const newExpense = {
      id: Date.now(),
      name: "New Expense",
      amount: 0,
      frequency: "monthly",
      allocationMethod: "income",
      assignments: [],
    };

    setData({
      ...data,
      expenses: [
        ...data.expenses,
        newExpense,
      ],
    });
  };

  const updateExpense = (
    id,
    field,
    value
  ) => {
    setData({
      ...data,

      expenses: data.expenses.map(
        (expense) =>
          expense.id === id
            ? {
                ...expense,
                [field]: value,
              }
            : expense
      ),
    });
  };

  const updateAllocationMethod = (
    expense,
    method
  ) => {
    let assignments = [];

    if (
      method === "manual" &&
      expense.assignments.length === 0
    ) {
      const currentAllocations =
        expense.allocationMethod ===
        "equal"
          ? getEqualAllocations(
              expense,
              data.contributors
            )
          : getIncomeAllocations(
              expense,
              data.contributors
            );

      assignments =
        currentAllocations.map(
          (allocation) => ({
            contributorId:
              allocation.contributorId,
            percentage:
              Number(
                allocation.percentage.toFixed(
                  1
                )
              ),
          })
        );
    } else {
      assignments =
        expense.assignments || [];
    }

    setData({
      ...data,

      expenses: data.expenses.map(
        (e) =>
          e.id === expense.id
            ? {
                ...e,
                allocationMethod:
                  method,
                assignments,
              }
            : e
      ),
    });
  };

  const updateAssignment = (
    expenseId,
    contributorId,
    percentage
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

          const assignments =
            expense.assignments || [];

          const exists =
            assignments.find(
              (a) =>
                a.contributorId ===
                contributorId
            );

          if (exists) {
            return {
              ...expense,

              assignments:
                assignments.map(
                  (assignment) =>
                    assignment.contributorId ===
                    contributorId
                      ? {
                          ...assignment,
                          percentage,
                        }
                      : assignment
                ),
            };
          }

          return {
            ...expense,

            assignments: [
              ...assignments,
              {
                contributorId,
                percentage,
              },
            ],
          };
        }
      ),
    });
  };

  const deleteExpense = (id) => {
    const expense =
      data.expenses.find(
        (e) => e.id === id
      );

    const confirmed =
      window.confirm(
        `Delete ${expense.name}?`
      );

    if (!confirmed) {
      return;
    }

    setData({
      ...data,

      expenses: data.expenses.filter(
        (expense) =>
          expense.id !== id
      ),
    });
  };

  const getAllocations = (
    expense
  ) => {
    switch (
      expense.allocationMethod
    ) {
      case "equal":
        return getEqualAllocations(
          expense,
          data.contributors
        );

      case "manual":
        return getManualAllocations(
          expense
        );

      default:
        return getIncomeAllocations(
          expense,
          data.contributors
        );
    }
  };

  return (
    <div className="space-y-4">

      <button
        onClick={addExpense}
        className={`
          w-full
          p-3
          rounded-xl
          ${theme.button}
          ${theme.buttonText}
        `}
      >
        + Add Expense
      </button>

      {data.expenses.map(
        (expense) => {
          const allocations =
            getAllocations(
              expense
            );

          const totalAllocation =
            allocations.reduce(
              (
                sum,
                allocation
              ) =>
                sum +
                allocation.percentage,
              0
            );

          return (
            <Card
              key={expense.id}
              theme={theme}
            >
              <div className="space-y-3">

                <input
                  className="w-full border p-2 rounded"
                  value={
                    expense.name
                  }
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
                  className="w-full border p-2 rounded"
                  value={
                    expense.amount
                  }
                  onChange={(e) =>
                    updateExpense(
                      expense.id,
                      "amount",
                      Number(
                        e.target.value
                      )
                    )
                  }
                />

                <select
                  className="w-full border p-2 rounded"
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

                <select
                  className="w-full border p-2 rounded"
                  value={
                    expense.allocationMethod
                  }
                  onChange={(e) =>
                    updateAllocationMethod(
                      expense,
                      e.target.value
                    )
                  }
                >
                  <option value="income">
                    Income Based
                  </option>

                  <option value="equal">
                    Equal Split
                  </option>

                  <option value="manual">
                    Manual Override
                  </option>
                </select>

                {expense.allocationMethod ===
                  "manual" && (
                  <div>
                    {Math.round(
                      totalAllocation
                    ) === 100 ? (
                      <div className="text-green-600 text-sm">
                        ✓ Allocation
                        Balanced
                      </div>
                    ) : (
                      <div className="text-red-600 text-sm">
                        ⚠ Allocation
                        Total:
                        {" "}
                        {totalAllocation.toFixed(
                          1
                        )}
                        %
                      </div>
                    )}
                  </div>
                )}

                <div className="flex justify-between items-center">

                  <button
                    onClick={() =>
                      setExpandedExpense(
                        expandedExpense ===
                          expense.id
                          ? null
                          : expense.id
                      )
                    }
                    className={`
                      text-sm
                      underline
                      ${theme.text}
                    `}
                  >
                    {expandedExpense ===
                    expense.id
                      ? "Hide Allocation Details"
                      : "Show Allocation Details"}
                  </button>

                  <button
                    onClick={() =>
                      deleteExpense(
                        expense.id
                      )
                    }
                    className="text-red-600 text-sm"
                  >
                    Delete
                  </button>

                </div>

                {expandedExpense ===
                  expense.id && (
                  <div className="border-t pt-3 space-y-2">

                    <div
                      className={
                        theme.text
                      }
                    >
                      Current
                      Allocation
                    </div>

                    {allocations.map(
                      (
                        allocation
                      ) => {
                        const member =
                          data.members.find(
                            (
                              m
                            ) =>
                              m.id ===
                              allocation.contributorId
                          );

                        return (
                          <div
                            key={
                              allocation.contributorId
                            }
                            className="flex justify-between items-center"
                          >
                            <span>
                              {
                                member?.name
                              }
                            </span>

                            {expense.allocationMethod ===
                            "manual" ? (
                              <div className="flex items-center gap-2">

                                <input
                                  type="number"
                                  className="w-20 border rounded p-1"
                                  value={
                                    allocation.percentage
                                  }
                                  onChange={(
                                    e
                                  ) =>
                                    updateAssignment(
                                      expense.id,
                                      allocation.contributorId,
                                      Number(
                                        e.target.value
                                      )
                                    )
                                  }
                                />

                                %

                                <span>
                                  ($
                                  {allocation.share.toFixed(
                                    2
                                  )}
                                  )
                                </span>

                              </div>
                            ) : (
                              <span>
                                {allocation.percentage.toFixed(
                                  1
                                )}
                                %
                                {" "}
                                ($
                                {allocation.share.toFixed(
                                  2
                                )}
                                )
                              </span>
                            )}
                          </div>
                        );
                      }
                    )}

                  </div>
                )}

              </div>
            </Card>
          );
        }
      )}

    </div>
  );
}