export function monthlyEquivalent(
  amount,
  frequency
) {
  switch (frequency) {

    case "weekly":
      return (amount * 52) / 12;

    case "fortnightly":
      return (amount * 26) / 12;

    case "monthly":
      return amount;

    case "quarterly":
      return amount / 3;

    case "yearly":
      return amount / 12;

    default:
      return amount;
  }
}

export function frequencyLabel(
  frequency
) {
  switch (frequency) {

    case "weekly":
      return "Weekly";

    case "fortnightly":
      return "Fortnightly";

    case "monthly":
      return "Monthly";

    case "quarterly":
      return "Quarterly";

    case "yearly":
      return "Yearly";

    default:
      return "Monthly";
  }
}