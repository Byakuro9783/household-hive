export const starterData = {
  settings: {
    theme: "sage",
    darkMode: false,
  },

  household: {
    name: "Household Hive",
  },

  members: [
    {
      id: 1,
      name: "Sharni",
      role: "Parent",

      contributor: true,

      memberExpense: 0,
      memberExpenseFrequency: "monthly",
    },

    {
      id: 2,
      name: "Partner",
      role: "Parent",

      contributor: true,

      memberExpense: 0,
      memberExpenseFrequency: "monthly",
    },

    {
      id: 3,
      name: "Leo",
      role: "Child",

      contributor: false,

      memberExpense: 80,
      memberExpenseFrequency: "weekly",
    },
  ],

  contributors: [
    {
      id: 1,

      income: 2250,
      incomeFrequency: "fortnightly",

      personalExpenses: 300,
      personalExpenseFrequency: "monthly",
    },

    {
      id: 2,

      income: 4000,
      incomeFrequency: "monthly",

      personalExpenses: 150,
      personalExpenseFrequency: "monthly",
    },
  ],

  expenses: [
    {
      id: 1,

      name: "Mortgage",

      amount: 2500,
      frequency: "monthly",

      assignments: [
        {
          contributorId: 1,
          value: 40,
        },
        {
          contributorId: 2,
          value: 60,
        },
      ],
    },

    {
      id: 2,

      name: "Groceries",

      amount: 1000,
      frequency: "monthly",

      assignments: [
        {
          contributorId: 1,
          value: 50,
        },
        {
          contributorId: 2,
          value: 50,
        },
      ],
    },

    {
      id: 3,

      name: "Internet",

      amount: 99,
      frequency: "monthly",

      assignments: [
        {
          contributorId: 1,
          value: 50,
        },
        {
          contributorId: 2,
          value: 50,
        },
      ],
    },
  ],

  goals: [],

  scenarios: [],
};