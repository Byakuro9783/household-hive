import Card from "../components/common/Card";
import {
  monthlyEquivalent
} from "../utils/recurring";

export default function HouseholdScreen({
  data,
  setData,
  theme
}) {

  const updateHouseholdName = (
    value
  ) => {
    setData({
      ...data,
      household: {
        ...data.household,
        name: value
      }
    });
  };

  const updateMember = (
    memberId,
    field,
    value
  ) => {

    setData({
      ...data,

      members: data.members.map(
        (member) =>
          member.id === memberId
            ? {
                ...member,
                [field]: value
              }
            : member
      )
    });
  };

  const updateContributor = (
    contributorId,
    field,
    value
  ) => {

    setData({
      ...data,

      contributors:
        data.contributors.map(
          (contributor) => {

            if (
              contributor.id !==
              contributorId
            ) {
              return contributor;
            }

            return {
              ...contributor,

              [field]:
                field.includes(
                  "Frequency"
                )
                  ? value
                  : Number(value)
            };
          }
        )
    });
  };

  const addContributor = () => {

    const id = Date.now();

    setData({
      ...data,

      members: [
        ...data.members,
        {
          id,
          name: "New Adult",
          role: "Adult",
          contributor: true
        }
      ],

      contributors: [
        ...data.contributors,
        {
          id,

          income: 0,
          incomeFrequency:
            "monthly",

          personalExpenses: 0,
          personalExpenseFrequency:
            "monthly"
        }
      ]
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
          name:
            "New Family Member",
          role: "Child",
          contributor: false
        }
      ]
    });
  };

  const deleteContributor = (
    id
  ) => {

    if (
      data.contributors.length ===
      1
    ) {
      alert(
        "At least one contributor is required."
      );
      return;
    }

    setData({
      ...data,

      contributors:
        data.contributors.filter(
          (c) => c.id !== id
        ),

      members:
        data.members.filter(
          (m) => m.id !== id
        )
    });
  };

  const deleteMember = (
    id
  ) => {

    setData({
      ...data,

      members:
        data.members.filter(
          (m) => m.id !== id
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
          mb-3
          ${theme.text}
          `}
        >
          Household Name
        </h2>

        <input
          className="
          w-full
          p-3
          border
          rounded-xl
          "
          value={
            data.household.name
          }
          onChange={(e) =>
            updateHouseholdName(
              e.target.value
            )
          }
        />

      </Card>

      <button
        onClick={addContributor}
        className={`
        w-full
        p-3
        rounded-xl
        text-white
        ${theme.button}
        `}
      >
        Add Contributor
      </button>

      <button
        onClick={addMember}
        className={`
        w-full
        p-3
        rounded-xl
        text-white
        ${theme.button}
        `}
      >
        Add Family Member
      </button>

      {data.members.map(
        (member) => {

          const contributor =
            data.contributors.find(
              (c) =>
                c.id === member.id
            );

          return (

            <Card
              key={member.id}
              theme={theme}
            >

              <div className="space-y-3">

                <input
                  className="
                  w-full
                  p-3
                  border
                  rounded-xl
                  "
                  value={
                    member.name
                  }
                  onChange={(e) =>
                    updateMember(
                      member.id,
                      "name",
                      e.target.value
                    )
                  }
                />

                <input
                  className="
                  w-full
                  p-3
                  border
                  rounded-xl
                  "
                  value={
                    member.role
                  }
                  onChange={(e) =>
                    updateMember(
                      member.id,
                      "role",
                      e.target.value
                    )
                  }
                />

                {member.contributor &&
                  contributor && (
                    <>

                      <input
                        type="number"
                        className="
                        w-full
                        p-3
                        border
                        rounded-xl
                        "
                        value={
                          contributor.income
                        }
                        onChange={(e) =>
                          updateContributor(
                            contributor.id,
                            "income",
                            e.target.value
                          )
                        }
                        placeholder="Income"
                      />

                      <select
                        className="
                        w-full
                        p-3
                        border
                        rounded-xl
                        "
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

                      <div
                        className="
                        bg-slate-100
                        rounded-xl
                        p-3
                        "
                      >
                        Monthly Income Equivalent

                        <div
                          className="
                          font-bold
                          mt-1
                          "
                        >
                          $
                          {monthlyEquivalent(
                            contributor.income,
                            contributor.incomeFrequency
                          ).toFixed(
                            0
                          )}
                        </div>
                      </div>

                      <input
                        type="number"
                        className="
                        w-full
                        p-3
                        border
                        rounded-xl
                        "
                        value={
                          contributor.personalExpenses
                        }
                        onChange={(e) =>
                          updateContributor(
                            contributor.id,
                            "personalExpenses",
                            e.target.value
                          )
                        }
                        placeholder="Personal Spending"
                      />

                      <select
                        className="
                        w-full
                        p-3
                        border
                        rounded-xl
                        "
                        value={
                          contributor.personalExpenseFrequency
                        }
                        onChange={(e) =>
                          updateContributor(
                            contributor.id,
                            "personalExpenseFrequency",
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

                      <div
                        className="
                        bg-slate-100
                        rounded-xl
                        p-3
                        "
                      >
                        Monthly Personal Spending

                        <div
                          className="
                          font-1
                          "
                        >
                          $
                          {monthlyEquivalent(
                            contributor.personalExpenses,
                            contributor.personalExpenseFrequency
                          ).toFixed(
                            0
                          )}
                        </div>
                      </div>

                      <button
                        className="
                        w-full
                        p-3
                        rounded-xl
                        bg-red-500
                        text-white
                        "
                        onClick={() =>
                          deleteContributor(
                            contributor.id
                          )
                        }
                      >
                        Delete Contributor
                      </button>

                    </>
                  )}

                {!member.contributor && (
                  <button
                    className="
                    w-full
                    p-3
                    rounded-xl
                    bg-red-500
                    text-white
                    "
                    onClick={() =>
                      deleteMember(
                        member.id
                      )
                    }
                  >
                    Delete Member
                  </button>
                )}

              </div>

            </Card>
          );
        }
      )}

    </div>
  );
}