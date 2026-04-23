# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

Start 
npm create vite@latest my-car-app -- --template react

cd my-car-app
npm install
npm install @reduxjs/toolkit react-redux


🏎️ Redux Car Inventory Manager
A modern React application built with Vite, Redux Toolkit (RTK), and Custom Hooks. This app demonstrates state management, asynchronous thunks for simulated API calls, and cross-slice communication for activity logging.

📂 Project Structure & File Roles


🧠 src/slices/ (Logic & State)

rtkCarSlice.js:

Purpose: Manages the core car data (Name, Quantity).

Restock Feature: Contains a reducer that resets all car quantities to their original values.

Async Logic: Uses createAsyncThunk to handle the sellCarAsync action, simulating a 1-second network delay with a loading spinner.

activitySlice.js:

Purpose: Manages the "Recent Activity" log.
Logs Feature: It uses extraReducers to "listen" for successful car sales from the Car Slice. When a sale happens, it automatically generates a timestamped log entry.



🏦 src/store/ (The Database)

rtkStore.js:
Purpose: The central "Control Center."
Function: Combines the car and history slices into one global state. It automatically configures the Thunk middleware and Redux DevTools.

store.js: (Legacy) A standard Redux setup file kept for comparison between old and new Redux patterns.


🪝 src/hooks/ (Connectors)

useMySelector.jsx:
Purpose: A custom-built version of Redux's useSelector.
Mechanism: Uses store.subscribe() to listen for changes in the store. When the car inventory or logs change, it triggers a re-render in the UI.
useMyDispatch.jsx:
Purpose: Provides an easy way for components to send actions (like Sell or Restock) to the store.


🖥️ src/components/ (UI)
CarApp.jsx:
Purpose: The main visual interface.
Features:
Displays car cards with names and live quantities.
Restock Button: Triggers the global reset.
Sell Button: Triggers the async sale with a "Selling..." loading state.
Activity Feed: Displays the real-time log of all transactions.


🚀 How to Run
Initialize Project:
bash
npm create vite@latest my-car-app -- --template react
cd my-car-app
Use code with caution.
Install Dependencies:
bash
npm install
npm install @reduxjs/toolkit react-redux
Use code with caution.
Start Development:
bash
npm run dev

Use code with caution.

🛠️ Key Features Summary

Feature	File responsible	Description
Inventory State	rtkCarSlice.js	Holds name/quantity for Tesla, Porsche, and Ford.
Async Selling	sellCarAsync (Thunk)	Adds a 1-second "Processing" delay before reducing stock.
Restock	restock (Reducer)	Instantly resets all car quantities and clears loading states.
Activity Logging	activitySlice.js	Automatically records a history entry every time a sale succeeds.
Custom Hooks	useMySelector.jsx	Manually manages store subscriptions for React reactivity.


