import { useState } from "react";
import Card from "../components/common/Card";
import { getContributorPosition } from "../utils/calculations";

export default function HouseholdScreen({
  data,
  setData,
  theme,
}) {
  const [warning, setWarning] =
    useState("");

  const updateMember = (
    id,
    field,
    value
  ) => {
    setData({
      ...data,

      members: data.members.map(
        (member) =>
          member.id === id
            ? {
                ...member,
                [field]: value,
              }
            : member
      ),
    });
  };

  const updateContributor = (
    id,
    field,
    value
  ) => {
    setData({
      ...data,

      contributors:
        data.contributors.map(
          (contributor) =>
            contributor.id === id
              ? {
                  ...contributor,
                  [field]: value,
                }
              : contributor
        ),
    });
  };

  const addMember = () => {
    const id = Date.now();

    setData({
      ...data,

      members: [
        ...data.members,
        {
          id,
          name: "New Member",
          role: "Other",
          contributor: false,

          memberExpense: 0,
          memberExpenseFrequency:
            "monthly",
        },
      ],
    });
  };

  const toggleContributor = (
    member
  ) => {
    if (!member.contributor) {
      updateMember(
        member.id,
        "contributor",
        true
      );

      setData({
        ...data,

        members:
          data.members.map((m) =>
            m.id === member.id
              ? {
                  ...m,
                  contributor: true,
                }
              : m
          ),

        contributors: [
          ...data.contributors,
          {
            id: member.id,

            income: 0,
            incomeFrequency:
              "monthly",

            personalExpenses: 0,
            personalExpenseFrequency:
              "monthly",
          },
        ],
      });

      return;
    }

    if (
      data.contributors.length <= 1
    ) {
      setWarning(
        "At least one contributor must remain."
      );

      return;
    }

    setWarning("");

    setData({
      ...data,

      members:
        data.members.map((m) =>
          m.id === member.id
            ? {
                ...m,
                contributor: false,
              }
            : m
        ),

      contributors:
        data.contributors.filter(
          (c) => c.id !== member.id
        ),
    });
  };

  const removeMember = (id) => {
  const member =
    data.members.find(
      (m) => m.id === id
    );

  const confirmed =
    window.confirm(
      `Remove ${member.name} from the household?`
    );

  if (!confirmed) {
    return;
  }

  if (
    member?.contributor &&
    data.contributors.length <= 1
  ) {
    setWarning(
      "At least one contributor must remain."
    );

    return;
  }

  setWarning("");

  setData({
    ...data,

    members: data.members.filter(
      (m) => m.id !== id
    ),

    contributors:
      data.contributors.filter(
        (c) => c.id !== id
      ),
  });
};

  return (
    <div className="space-y-6">

      {warning && (
        <div className="bg-red-100 text-red-700 p-3 rounded-xl">
          {warning}
        </div>
      )}

      <Card theme={theme}>
        <h2
          className={`font-bold mb-4 ${theme.text}`}
        >
          Household Summary
        </h2>

        <div className={theme.text}>
          Members:
          {" "}
          {data.members.length}
        </div>

        <div className={theme.text}>
          Contributors:
          {" "}
          {data.contributors.length}
        </div>
      </Card>

      <Card theme={theme}>
        <div className="flex justify-between mb-4">

          <h2
            className={`font-bold ${theme.text}`}
          >
            Household Members
          </h2>

          <button
            onClick={addMember}
            className={`
              px-3 py-2 rounded-xl
              ${theme.button}
              ${theme.buttonText}
            `}
          >
            + Add Member
          </button>

        </div>

        <div className="space-y-4">

          {data.members.map((member) => {
  const contributor =
    data.contributors.find(
      (c) => c.id === member.id
    );

  const position =
    contributor
      ? getContributorPosition(
          contributor,
          data
        )
      : null;

  return (
    <div
      key={member.id}
      className="border rounded-xl p-4 space-y-3"
    >
      <input
        className="w-full border rounded p-2"
        value={member.name}
        onChange={(e) =>
          updateMember(
            member.id,
            "name",
            e.target.value
          )
        }
      />

      <select
        className="w-full border rounded p-2"
        value={member.role}
        onChange={(e) =>
          updateMember(
            member.id,
            "role",
            e.target.value
          )
        }
      >
        <option>Parent</option>
        <option>Partner</option>
        <option>Child</option>
        <option>Teenager</option>
        <option>Grandparent</option>
        <option>Other</option>
      </select>

      <div>
        <label>
          Personal Spending Allowance (Optional)
        </label>

        <p
          className={`text-sm mb-2 ${theme.muted}`}
        >
          Examples: lunch money, pocket
          money, coffee, hobbies or
          entertainment.
        </p>

        <input
          type="number"
          className="w-full border rounded p-2"
          value={
            member.memberExpense || 0
          }
          onChange={(e) =>
            updateMember(
              member.id,
              "memberExpense",
              Number(e.target.value)
            )
          }
        />
      </div>

      <select
        className="w-full border rounded p-2"
        value={
          member.memberExpenseFrequency ||
          "monthly"
        }
        onChange={(e) =>
          updateMember(
            member.id,
            "memberExpenseFrequency",
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

        <option value="yearly">
          Yearly
        </option>
      </select>

      <label className="flex gap-2 items-center">
        <input
          type="checkbox"
          checked={member.contributor}
          onChange={() =>
            toggleContributor(member)
          }
        />

        Financial Contributor
      </label>

      {member.contributor &&
        contributor && (
          <div className="border-t pt-4 mt-4 space-y-3">

            <h4
              className={`font-semibold ${theme.text}`}
            >
              Financial Profile
            </h4>

            <div>
              <label>
                Income Amount
              </label>

              <input
                type="number"
                className="w-full border rounded p-2"
                value={
                  contributor.income
                }
                onChange={(e) =>
                  updateContributor(
                    contributor.id,
                    "income",
                    Number(
                      e.target.value
                    )
                  )
                }
              />
            </div>

            <div>
              <label>
                Income Frequency
              </label>

              <select
                className="w-full border rounded p-2"
                value={
                  contributor.incomeFrequency
                }
                onChange={(e) =>
                  updateContributor(
                    contributor.id,
                    "incomeFrequency",
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

                <option value="yearly">
                  Yearly
                </option>
              </select>
            </div>

            <div
              className={theme.text}
            >
              Monthly Income: $
              {Math.round(
                position.income
              ).toLocaleString()}
            </div>

            <div
              className={theme.text}
            >
              Household Contributions: $
              {Math.round(
                position.householdCosts
              ).toLocaleString()}
            </div>

            <div
              className={`font-bold ${theme.text}`}
            >
              Available Funds: $
              {Math.round(
                position.available
              ).toLocaleString()}
            </div>

          </div>
        )}

      <button
        onClick={() =>
          removeMember(member.id)
        }
        className="text-red-600"
      >
        Remove Member
      </button>
    </div>
  );
})}
        </div>
      </Card>
    </div>
  );
}