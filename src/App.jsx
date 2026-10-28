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

  const totals = useMemo(() => {
    return calculateTotals(data);
  }, [data]);

  const cycleTheme = () => {
    const themesList = [
      "sage",
      "coastal",
      "lavender",
      "peach",
    ];

    const currentIndex =
      themesList.indexOf(
        data.settings.theme
      );

    const nextTheme =
      themesList[
        (currentIndex + 1) %
          themesList.length
      ];

    setData({
      ...data,
      settings: {
        ...data.settings,
        theme: nextTheme,
      },
    });
  };

  const toggleDarkMode = () => {
    setData({
      ...data,
      settings: {
        ...data.settings,
        darkMode:
          !data.settings.darkMode,
      },
    });
  };

  const renderScreen = () => {
    switch (activeTab) {
      case "home":
        return (
          <HomeScreen
            totals={totals}
            theme={theme}
          />
        );

      case "budget":
        return (
          <BudgetScreen
            data={data}
            setData={setData}
            theme={theme}
          />
        );

      case "household":
  return (
    <HouseholdScreen
      data={data}
      setData={setData}
      theme={theme}
    />
  );

      case "goals":
        return (
          <div
            className={`
              p-4
              rounded-xl
              ${theme.card}
              ${theme.text}
            `}
          >
            Goals Screen Coming Soon
          </div>
        );

      case "settings":
        return (
          <div className="space-y-3">
            <button
              onClick={cycleTheme}
              className={`
                w-full
                p-3
                rounded-xl
                ${theme.button}
                ${theme.buttonText}
              `}
            >
              Change Theme
            </button>

            <button
              onClick={toggleDarkMode}
              className={`
                w-full
                p-3
                rounded-xl
                ${theme.button}
                ${theme.buttonText}
              `}
            >
              Toggle Dark Mode
            </button>

            <div
              className={`
                p-4
                rounded-xl
                ${theme.card}
                ${theme.text}
              `}
            >
              Current Theme:
              {" "}
              {data.settings.theme}
            </div>
          </div>
        );

      default:
        return (
          <HomeScreen
            totals={totals}
            theme={theme}
          />
        );
    }
  };

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

        {renderScreen()}

      </div>

      <BottomNav
        active={activeTab}
        setActive={setActiveTab}
      />
    </div>
  );
}