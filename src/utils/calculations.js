import { monthlyEquivalent } from "./recurring";

export function calculateTotals(data) {

  const income =
    data.contributors.reduce(
      (sum, contributor) =>
        sum +
        monthlyEquivalent(
          contributor.income || 0,
          contributor.incomeFrequency ||
            "monthly"
        ),
      0
    );

  const expenses =
    data.expenses.reduce(
      (sum, expense) =>
        sum +
        monthlyEquivalent(
          expense.amount || 0,
          expense.frequency ||
            "monthly"
        ),
      0
    );

  return {
    income,
    expenses,
    available:
      income - expenses
  };
}

export function calculateContributorPosition(
  contributor,
  expenses = []
) {

  const monthlyIncome =
    monthlyEquivalent(
      contributor.income || 0,
      contributor.incomeFrequency ||
        "monthly"
    );

  const monthlyPersonalExpenses =
    monthlyEquivalent(
      contributor.personalExpenses || 0,
      contributor.personalExpenseFrequency ||
        "monthly"
    );

  const assignedExpenses = 0;

  const remaining =
    monthlyIncome -
    monthlyPersonalExpenses -
    assignedExpenses;

  return {

    monthlyIncome,

    monthlyPersonalExpenses,

    assignedExpenses,

    remaining
  };
}

export function calculateHouseholdStats(
  data
) {

  const totals =
    calculateTotals(data);

  return {

    householdName:
      data.household.name,

    members:
      data.members.length,

    contributors:
      data.contributors.length,

    monthlyIncome:
      totals.income,

    monthlyExpenses:
      totals.expenses,

    monthlyAvailable:
      totals.available
  };
}