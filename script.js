// ============================================================
// SpendWise - JavaScript Foundation (Week 6)
// Collects budget data with prompts, calculates the remaining
// balance, and prints labeled results to the browser console.
// ============================================================

// ---------- 1. Application data (variables) ----------

// Constants: values that never change while the app runs
const APP_NAME = "SpendWise";
const CURRENCY = "KES";

// Variables: values that are filled in from user input.
// They start empty and are assigned when the user answers the prompts.
let userName = "";          // string
let monthlyBudget = 0;      // number
let rentExpense = 0;        // number
let foodExpense = 0;        // number
let transportExpense = 0;   // number
let otherExpense = 0;       // number
let isOverBudget = false;   // boolean


// ---------- 2. Input functions ----------

/**
 * Asks the user for a number using prompt() and keeps asking
 * until the answer is valid.
 * @param {string} message - The question shown in the prompt box.
 * @param {boolean} allowZero - true if 0 is an acceptable answer.
 * @returns {number|null} The number entered, or null if the user cancelled.
 */
function getNumberInput(message, allowZero) {
  while (true) {
    const answer = prompt(message);

    // prompt() returns null when the user presses Cancel
    if (answer === null) {
      return null;
    }

    const cleaned = answer.trim();
    const value = Number(cleaned);
    const isTooSmall = allowZero ? value < 0 : value <= 0;

    if (cleaned === "" || !Number.isFinite(value) || isTooSmall) {
      alert(
        allowZero
          ? "Please enter a number that is 0 or more (digits only)."
          : "Please enter a number greater than 0 (digits only)."
      );
      continue; // ask again
    }

    return value;
  }
}

/**
 * Asks for the user's name. Falls back to "Guest" if left blank.
 * @returns {string|null} The name, or null if the user cancelled.
 */
function getNameInput() {
  const answer = prompt("Welcome to " + APP_NAME + "! What is your name?");

  if (answer === null) {
    return null;
  }

  const cleaned = answer.trim();
  return cleaned === "" ? "Guest" : cleaned;
}

/**
 * Runs every prompt in order and stores the answers in the
 * variables declared above.
 * @returns {boolean} true if all answers were collected, false if the user cancelled.
 */
function collectUserInput() {
  const name = getNameInput();
  if (name === null) return false;

  const budget = getNumberInput("Enter your monthly budget (" + CURRENCY + "):", false);
  if (budget === null) return false;

  const rent = getNumberInput("Enter your rent expense (" + CURRENCY + "):", true);
  if (rent === null) return false;

  const food = getNumberInput("Enter your food expense (" + CURRENCY + "):", true);
  if (food === null) return false;

  const transport = getNumberInput("Enter your transport expense (" + CURRENCY + "):", true);
  if (transport === null) return false;

  const other = getNumberInput("Enter any other expenses (" + CURRENCY + "):", true);
  if (other === null) return false;

  // Only store the answers once we know the user finished every prompt
  userName = name;
  monthlyBudget = budget;
  rentExpense = rent;
  foodExpense = food;
  transportExpense = transport;
  otherExpense = other;

  return true;
}


// ---------- 3. Calculation functions ----------

/**
 * Adds up all expense amounts.
 * @returns {number} The total spent.
 */
function calculateTotalExpenses(rent, food, transport, other) {
  return rent + food + transport + other;
}

/**
 * Works out how much of the budget is left.
 * A negative result means the user has overspent.
 * @returns {number} budget minus expenses.
 */
function calculateBalance(budget, expenses) {
  return budget - expenses;
}

/**
 * Works out what percentage of the budget has been spent.
 * @returns {number} Percentage spent (e.g. 30 for 30%).
 */
function calculatePercentageSpent(budget, expenses) {
  return (expenses / budget) * 100;
}

/**
 * Turns the balance into a short, friendly message.
 * @returns {string} A status message.
 */
function getBudgetStatus(balance) {
  if (balance < 0) {
    return "Warning: you have overspent your budget.";
  } else if (balance === 0) {
    return "You have used your entire budget.";
  } else {
    return "You are within budget.";
  }
}


// ---------- 4. Display functions ----------

/**
 * Formats a number as money, e.g. 12000 -> "KES 12,000".
 * @returns {string} The formatted amount.
 */
function formatMoney(amount) {
  return CURRENCY + " " + amount.toLocaleString("en-KE");
}

/**
 * Prints a clearly labeled budget summary to the console.
 */
function displayResults(totalExpenses, balance, percentageSpent, status) {
  console.log("========== " + APP_NAME + " Budget Summary ==========");
  console.log("Name: " + userName);
  console.log("Monthly budget: " + formatMoney(monthlyBudget));
  console.log("");
  console.log("Expenses");
  console.log("  Rent: " + formatMoney(rentExpense));
  console.log("  Food: " + formatMoney(foodExpense));
  console.log("  Transport: " + formatMoney(transportExpense));
  console.log("  Other: " + formatMoney(otherExpense));
  console.log("");
  console.log("Total expenses: " + formatMoney(totalExpenses));
  console.log("Spent so far: " + percentageSpent.toFixed(1) + "% of budget");
  console.log("Remaining balance: " + formatMoney(balance));

  // Use a warning style in the console when the user is over budget
  if (isOverBudget) {
    console.warn("Status: " + status);
  } else {
    console.log("Status: " + status);
  }

  console.log("==============================================");
}


// ---------- 5. Main program ----------

/**
 * Runs the whole SpendWise flow: collect input, calculate, display.
 */
function runSpendWise() {
  console.log(APP_NAME + " started. Answer the prompts to continue.");

  const finished = collectUserInput();

  if (!finished) {
    console.log(APP_NAME + " cancelled. Select 'Start budget check' to try again.");
    return;
  }

  const totalExpenses = calculateTotalExpenses(
    rentExpense,
    foodExpense,
    transportExpense,
    otherExpense
  );
  const balance = calculateBalance(monthlyBudget, totalExpenses);
  const percentageSpent = calculatePercentageSpent(monthlyBudget, totalExpenses);

  isOverBudget = balance < 0;
  const status = getBudgetStatus(balance);

  displayResults(totalExpenses, balance, percentageSpent, status);
}


// ---------- 6. Connect the page to the script ----------

// This message confirms in the console that script.js loaded successfully
console.log(APP_NAME + " script loaded. Select 'Start budget check' on the page to begin.");

const startButton = document.getElementById("start-btn");
startButton.addEventListener("click", runSpendWise);
