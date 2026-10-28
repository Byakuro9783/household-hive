import { useState } from "react";
import Card from "../components/common/Card";
import { monthlyEquivalent } from "../utils/recurring";

export default function GoalsScreen({
  data,
  setData,
  theme
}) {
  const [name, setName] =
    useState("");

  const [target, setTarget] =
    useState("");

  const addGoal = () => {
    if (!name || !target) return;

    const newGoal = {
      id: Date.now(),
      name,
      target: Number(target),
      saved: 0,
      contribution: 0,
      contributionFrequency:
        "monthly"
    };

    setData({
      ...data,
      goals: [
        ...data.goals,
        newGoal
      ]
    });

    setName("");
    setTarget("");
  };

  const updateGoal = (
    goalId,
    field,
    value
  ) => {

    setData({
      ...data,

      goals: data.goals.map(
        (goal) =>
          goal.id === goalId
            ? {
                ...goal,

                [field]:
                  field === "name" ||
                  field ===
                    "contributionFrequency"
                    ? value
                    : Number(value)
              }
            : goal
      )
    });
  };

  const deleteGoal = (
    goalId
  ) => {

    setData({
      ...data,

      goals: data.goals.filter(
        (goal) =>
          goal.id !== goalId
      )
    });
  };

  return (
    <div className="space-y-4">

      <Card theme={theme}>

        <h2
          className={`
          text-lg font-bold mb-4
          ${theme.text}
          `}
        >
          Add Goal
        </h2>

        <div className="space-y-3">

          <input
            className="
            w-full
            p-3
            border
            rounded-xl
            "
            placeholder="Goal Name"
            value={name}
            onChange={(e) =>
              setName(
                e.target.value
              )
            }
          />

          <input
            type="number"
            className="
            w-full
            p-3
            border
            rounded-xl
            "
            placeholder="Target Amount"
            value={target}
            onChange={(e) =>
              setTarget(
                e.target.value
              )
            }
          />

          <button
            onClick={addGoal}
            className={`
            w-full
            p-3
            rounded-xl
            text-white
            ${theme.button}
            `}
          >
            Add Goal
          </button>

        </div>

      </Card>

      {data.goals.map(
        (goal) => {

          const progress =
            Math.min(
              (goal.saved /
                goal.target) *
                100,
              100
            );

          return (
            <Card
              key={goal.id}
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
                  value={goal.name}
                  onChange={(e) =>
                    updateGoal(
                      goal.id,
                      "name",
                      e.target.value
                    )
                  }
                />

                <input
                  type="number"
                  className="
                  w-full
                  p-3
                  border
                  rounded-xl
                  "
                  value={goal.target}
                  onChange={(e) =>
                    updateGoal(
                      goal.id,
                      "target",
                      e.target.value
                    )
                  }
                />

                <input
                  type="number"
                  className="
                  w-full
                  p-3
                  border
                  rounded-xl
                  "
                  value={goal.saved}
                  onChange={(e) =>
                    updateGoal(
                      goal.id,
                      "saved",
                      e.target.value
                    )
                  }
                />

                <input
                  type="number"
                  className="
                  w-full
                  p-3
                  border
                  rounded-xl
                  "
                  value={
                    goal.contribution
                  }
                  onChange={(e) =>
                    updateGoal(
                      goal.id,
                      "contribution",
                      e.target.value
                    )
                  }
                />

                <select
                  className="
                  w-full
                  p-3
                  border
                  rounded-xl
                  "
                  value={
                    goal.contributionFrequency
                  }
                  onChange={(e) =>
                    updateGoal(
                      goal.id,
                      "contributionFrequency",
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

                <div className="space-y-2">

                  <div
                    className="
                    w-full
                    bg-slate-200
                    h-3
                    rounded-full
                    overflow-hidden
                    "
                  >
                    <div
                      className={theme.button}
                      style={{
                        width:
                          `${progress}%`
                      }}
                    />
                  </div>

                  <div
                    className={theme.text}
                  >
                    {progress.toFixed(0)}
                    % Complete
                  </div>

                  <div
                    className={theme.text}
                  >
                    $
                    {goal.saved} of $
                    {goal.target}
                  </div>

                  <div
                    className={
                      theme.muted
                    }
                  >
                    Monthly Contribution

                    {" "}
                    $
                    {monthlyEquivalent(
                      goal.contribution,
                      goal.contributionFrequency
                    ).toFixed(0)}
                  </div>

                </div>

                <button
                  onClick={() =>
                    deleteGoal(
                      goal.id
                    )
                  }
                  className="
                  w-full
                  bg-red-500
                  text-white
                  rounded-xl
                  p-3
                  "
                >
                  Delete Goal
                </button>

              </div>

            </Card>
          );
        }
      )}

    </div>
  );
}