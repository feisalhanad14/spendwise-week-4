# SpendWise

SpendWise is a budgeting tool that helps you see how much of your monthly budget is left. This version adds the **JavaScript foundation**: the app now collects your budget and expenses, does the maths, and reports the results.

## What SpendWise does

1. You open `index.html` and select **Start budget check**.
2. SpendWise asks for your name, monthly budget, and four expenses (rent, food, transport, other) using JavaScript prompts.
3. It adds up your expenses, works out your remaining balance and the percentage of your budget you have spent.
4. It prints a clearly labeled summary in the browser console, including a warning if you have overspent.

**Example console output**

```
========== SpendWise Budget Summary ==========
Name: Amina
Monthly budget: KES 40,000

Expenses
  Rent: KES 6,000
  Food: KES 3,500
  Transport: KES 1,500
  Other: KES 1,000

Total expenses: KES 12,000
Spent so far: 30.0% of budget
Remaining balance: KES 28,000
Status: You are within budget.
==============================================
```

## How to run it

1. Download or clone this repository.
2. Open `index.html` in a browser (Chrome, Edge, Firefox, or Safari).
3. Open the developer console: press `F12` and choose the **Console** tab.
4. Select **Start budget check** and answer the prompts.

## Project files

| File | Purpose |
| --- | --- |
| `index.html` | Page structure, the start button, and the link to `script.js` |
| `style.css` | Page styling |
| `script.js` | All the JavaScript logic |
| `README.md` | Project documentation |

## JavaScript concepts implemented

- Linking a JavaScript file to an HTML page
- Variables (`const` and `let`)
- Data types (string, number, boolean)
- User input with `prompt()` and `alert()`
- Input validation with `while` loops and `if` statements
- Arithmetic calculations
- Functions with parameters and return values
- Conditional logic (`if / else if / else`)
- Output with `console.log()` and `console.warn()`
- A basic event listener (`click`) to start the program

## How variables are used

Variables store the data SpendWise works with.

- **Constants (`const`)** hold values that never change: `APP_NAME` (`"SpendWise"`) and `CURRENCY` (`"KES"`).
- **Changeable variables (`let`)** hold values that come from the user:
  - `userName` is a **string**.
  - `monthlyBudget`, `rentExpense`, `foodExpense`, `transportExpense`, and `otherExpense` are **numbers**.
  - `isOverBudget` is a **boolean** that becomes `true` when the balance is below zero.

Using clear names such as `monthlyBudget` makes the code readable and avoids repeating raw values.

## How user input is collected

Input is collected with the browser's `prompt()` function.

- `getNameInput()` asks for the user's name and uses `"Guest"` if the answer is blank.
- `getNumberInput()` asks for an amount, converts the text answer to a number with `Number()`, and checks it. If the answer is empty, not a number, negative, or (for the budget) zero, it shows an `alert()` and asks again.
- If the user presses **Cancel**, `prompt()` returns `null`. The program detects this, stops safely, and tells the user in the console.
- `collectUserInput()` runs all the prompts in order and only saves the answers to the variables once every prompt has been completed.

## How calculations are performed

All calculations use standard JavaScript arithmetic operators inside small functions:

- **Total expenses:** `rent + food + transport + other`
- **Remaining balance:** `budget - expenses` (a negative result means overspending)
- **Percentage spent:** `(expenses / budget) * 100`, shown to one decimal place with `toFixed(1)`

The remaining balance for the example above is `40000 - 12000 = 28000`.

## How functions help organize the code

Each function does one job, so the code is easier to read, test, and reuse.

| Function | Job |
| --- | --- |
| `getNameInput()` | Ask for the user's name |
| `getNumberInput(message, allowZero)` | Ask for a valid number and re-ask if invalid |
| `collectUserInput()` | Run all prompts and store the answers |
| `calculateTotalExpenses(rent, food, transport, other)` | Add up all expenses |
| `calculateBalance(budget, expenses)` | Work out the remaining balance |
| `calculatePercentageSpent(budget, expenses)` | Work out the percentage of budget spent |
| `getBudgetStatus(balance)` | Return a status message for the balance |
| `formatMoney(amount)` | Format numbers as money, e.g. `KES 12,000` |
| `displayResults(...)` | Print the labeled summary to the console |
| `runSpendWise()` | Run the whole program in order |

Because `getNumberInput()` is reused for five different prompts, the validation code is written once instead of five times. `runSpendWise()` reads like a short story: collect input, calculate, display.

## Testing

I tested these cases:

- Normal input (budget 40,000 and expenses totalling 12,000 gives a balance of 28,000)
- Invalid input (letters, blank answers, negative numbers, and a budget of 0 are rejected and re-asked)
- Overspending (a negative balance shows a warning)
- Pressing **Cancel** partway through (the program stops without errors)

## Future improvements

- Show results on the page as well as in the console
- Add more expense categories and store them in arrays and objects
- Save budgets between visits
