import { useMemo, useState } from "react";

import useLocalStorage from "./hooks/useLocalStorage";

import { starterData } from "./data/starterData";
import { themes } from "./data/themes";

import HomeScreen from "./screens/HomeScreen";
import BudgetScreen from "./screens/BudgetScreen";
import HouseholdScreen from "./screens/HouseholdScreen";

import BottomNav from "./components/layout/BottomNav";

import { calculateTotals } from "./utils/calculations";

export default function App() {
  const [data, setData] = useLocalStorage(
    "household-hive",
    starterData
  );

  const [activeTab, setActiveTab] =
    useState("home");

  const theme =
    themes[data.settings.theme][
      data.settings.darkMode
        ? "dark"
        : "light"
    ];

  const totals = useMemo(
    () => calculateTotals(data),
    [data]
  );

  const cycleTheme = () => {
    const options = [
      "sage",
      "coastal",
      "lavender",
      "peach"
    ];

    const currentIndex =
      options.indexOf(
        data.settings.theme
      );

    const nextTheme =
      options[
        (currentIndex + 1) %
          options.length
      ];

    setData({
      ...data,
      settings: {
        ...data.settings,
        theme: nextTheme
      }
    });
  };

  const toggleDarkMode = () => {
    setData({
      ...data,
      settings: {
        ...data.settings,
        darkMode:
          !data.settings.darkMode
      }
    });
  };

  let screen;

  switch (activeTab) {
    case "budget":
      screen = (
        <BudgetScreen
          data={data}
          setData={setData}
          theme={theme}
        />
      );
      break;

    case "household":
      screen = (
        <HouseholdScreen
          data={data}
          setData={setData}
          theme={theme}
        />
      );
      break;

    case "goals":
      screen = (
        <div
          className={`
          ${theme.card}
          p-6
          rounded-3xl
          shadow-sm
          `}
        >
          <h2
            className={theme.text}
          >
            Goals
          </h2>

          <p
            className={
              theme.muted
            }
          >
            Coming in Part 3
          </p>
        </div>
      );
      break;

    case "settings":
      screen = (
        <div className="space-y-4">

          <div
            className={`
            ${theme.card}
            rounded-3xl
            p-4
            shadow-sm
            `}
          >
            <h2
              className={`
              text-xl
              font-bold
              mb-4
              ${theme.text}
              `}
            >
              Settings
            </h2>

            <button
              onClick={cycleTheme}
              className={`
              ${theme.button}
              text-white
              w-full
              p-3
              rounded-xl
              mb-3
              `}
            >
              Change Theme
            </button>

            <button
              onClick={
                toggleDarkMode
              }
              className={`
              ${theme.button}
              text-white
              w-full
              p-3
              rounded-xl
              `}
            >
              Toggle Dark Mode
            </button>
          </div>

        </div>
      );
      break;

    default:
      screen = (
        <HomeScreen
          totals={totals}
          data={data}
          theme={theme}
        />
      );
  }

  return (
    <div
      className={`
      min-h-screen
      ${theme.bg}
      transition-all
      `}
    >
      <div className="max-w-md mx-auto p-4 pb-24">

        <h1
          className={`
          text-3xl
          font-bold
          mb-6
          ${theme.text}
          `}
        >
          Household Hive
        </h1>

        {screen}

      </div>

      <BottomNav
        active={activeTab}
        setActive={setActiveTab}
      />
    </div>
  );
}