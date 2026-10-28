export function monthlyValue(
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