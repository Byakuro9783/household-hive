export const starterData = {
  settings: {
    theme: "sage",
    darkMode: false
  },

household: {
  name: "My Household"
},

members: [
  {
    id: 1,
    name: "Adult 1",
    role: "Parent",
    contributor: true
  },
  {
    id: 2,
    name: "Adult 2",
    role: "Parent",
    contributor: true
  },
  {
    id: 3,
    name: "Child 1",
    role: "Child",
    contributor: false
  }
],

contributors: [
  {
    id: 1,
    income: 1050,
    incomeFrequency: "weekly",

    personalExpenses: 300,
    personalExpenseFrequency: "monthly"
  },
  {
    id: 2,
    income: 4000,
    incomeFrequency: "monthly",

    personalExpenses: 150,
    personalExpenseFrequency: "monthly"
  }
],


  expenses: [],

  goals: [],

  scenarios: []
};