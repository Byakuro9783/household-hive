import { normaliseAmount } from "./recurring";

/*
|--------------------------------------------------------------------------
| Household Totals
|--------------------------------------------------------------------------
*/

export function calculateTotals(data) {
  const totalIncome = data.contributors.reduce(
    (sum, contributor) =>
      sum +
      normaliseAmount(
        Number(contributor.income || 0),
        contributor.incomeFrequency || "monthly"
      ),
    0
  );

  const householdExpenses = data.expenses.reduce(
    (sum, expense) =>
      sum +
      normaliseAmount(
        Number(expense.amount || 0),
        expense.frequency || "monthly"
      ),
    0
  );

  const memberExpenses = data.members.reduce(
    (sum, member) =>
      sum +
      normaliseAmount(
        Number(member.memberExpense || 0),
        member.memberExpenseFrequency ||
          "monthly"
      ),
    0
  );

  const totalExpenses =
    householdExpenses + memberExpenses;

  const available =
    totalIncome - totalExpenses;

  return {
    income: totalIncome,

    householdExpenses,

    memberExpenses,

    expenses: totalExpenses,

    available,
  };
}

/*
|--------------------------------------------------------------------------
| Contributor Position
|--------------------------------------------------------------------------
*/

export function getContributorPosition(
  contributor,
  data
) {
  const income = normaliseAmount(
    Number(contributor.income || 0),
    contributor.incomeFrequency ||
      "monthly"
  );

  const personalExpenses =
    normaliseAmount(
      Number(
        contributor.personalExpenses || 0
      ),
      contributor.personalExpenseFrequency ||
        "monthly"
    );

  let householdCosts = 0;

  data.expenses.forEach((expense) => {
    const monthlyExpense =
      normaliseAmount(
        Number(expense.amount || 0),
        expense.frequency || "monthly"
      );

    expense.assignments?.forEach(
      (assignment) => {
        if (
          assignment.contributorId ===
          contributor.id
        ) {
          householdCosts +=
            (monthlyExpense *
              assignment.value) /
            100;
        }
      }
    );
  });

  const available =
    income -
    personalExpenses -
    householdCosts;

  return {
    income,
    personalExpenses,
    householdCosts,
    available,
  };
}

/*
|--------------------------------------------------------------------------
| Household Summary
|--------------------------------------------------------------------------
*/

export function getHouseholdStats(
  data
) {
  const totals =
    calculateTotals(data);

  const members =
    data.members?.length || 0;

  const contributors =
    data.contributors?.length || 0;

  return {
    members,

    contributors,

    income: totals.income,

    expenses: totals.expenses,

    available: totals.available,

    costPerMember:
      members > 0
        ? Math.round(
            totals.expenses / members
          )
        : 0,
  };
}

/*
|--------------------------------------------------------------------------
| Goals
|--------------------------------------------------------------------------
*/

export function calculateGoalProgress(
  goal
) {
  const target =
    Number(goal.target || 0);

  const saved =
    Number(goal.saved || 0);

  if (!target) {
    return 0;
  }

  return Math.min(
    100,
    Math.round(
      (saved / target) * 100
    )
  );
}