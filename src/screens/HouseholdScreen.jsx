import Card from "../components/common/Card";

export default function HouseholdScreen({
  data,
  setData,
  theme
}) {

  const addContributor = () => {

    const contributor = {
      id: Date.now(),
      income: 0,
      personalExpenses: 0
    };

    const member = {
      id: contributor.id,
      name: "New Person",
      role: "Adult",
      contributor: true
    };

    setData({
      ...data,

      contributors: [
        ...data.contributors,
        contributor
      ],

      members: [
        ...data.members,
        member
      ]
    });
  };

  return (
    <div className="space-y-4">

      <button
        onClick={addContributor}
        className={`
        w-full p-3 rounded-xl
        text-white
        ${theme.button}
        `}
      >
        Add Contributor
      </button>

      {data.members
        .filter(
          (m) => m.contributor
        )
        .map((member) => {

          const contributor =
            data.contributors.find(
              (c) =>
                c.id === member.id
            );

          const remaining =
            contributor.income -
            contributor.personalExpenses;

          return (
            <Card
              key={member.id}
              theme={theme}
            >
              <div
                className={
                  theme.text
                }
              >
                {member.name}
              </div>

              <div
                className={
                  theme.muted
                }
              >
                Income: $
                {
                  contributor.income
                }
              </div>

              <div
                className={
                  theme.muted
                }
              >
                Personal: $
                {
                  contributor.personalExpenses
                }
              </div>

              <div
                className={
                  theme.text
                }
              >
                Remaining: $
                {remaining}
              </div>
            </Card>
          );
        })}
    </div>
  );
}