import { normaliseAmount } from "./recurring";

export function getIncomeAllocations(
  expense,
  contributors
) {
  const totalIncome =
    contributors.reduce(
      (sum, contributor) =>
        sum +
        normaliseAmount(
          contributor.income || 0,
          contributor.incomeFrequency
        ),
      0
    );

  return contributors.map(
    (contributor) => {
      const income =
        normaliseAmount(
          contributor.income || 0,
          contributor.incomeFrequency
        );

      const percentage =
        totalIncome > 0
          ? (income / totalIncome) * 100
          : 0;

      return {
        contributorId:
          contributor.id,

        percentage,

        share:
          (expense.amount *
            percentage) /
          100,
      };
    }
  );
}

export function getEqualAllocations(
  expense,
  contributors
) {
  const percentage =
    contributors.length > 0
      ? 100 /
        contributors.length
      : 0;

  return contributors.map(
    (contributor) => ({
      contributorId:
        contributor.id,

      percentage,

      share:
        (expense.amount *
          percentage) /
        100,
    })
  );
}

export function getManualAllocations(
  expense
) {
  return (
    expense.assignments || []
  ).map((assignment) => ({
    contributorId:
      assignment.contributorId,

    percentage:
      assignment.percentage || 0,

    share:
      (expense.amount *
        (assignment.percentage || 0)) /
      100,
  }));
}
