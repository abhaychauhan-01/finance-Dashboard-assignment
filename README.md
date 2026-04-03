# Finance Dashboard - Frontend Assignment

Hey! I'm Abhay, a 3rd-year Computer Science student (6th sem) at ABES Engineering College. 

This repository contains my submission for the Frontend Engineering Internship assignment. I built a fully functional Finance Dashboard from scratch to track expenses and income. I tried to focus on making the UI clean and ensuring the data actually persists without a real backend.

## What I Used (Tech Stack)
* **React + Vite:** Chose Vite because it's way faster than CRA.
* **Tailwind CSS (v3):** For styling. I actually ran into a version conflict with the new Tailwind v4 while setting up Dark Mode, so I specifically configured v3 + PostCSS to make everything work smoothly!
* **Context API:** Used this for state management instead of Redux (Redux felt like an overkill for an app of this size).
* **Recharts:** For the pie charts and bar graphs.
* **Framer Motion & React Hot Toast:** Just to add some smooth entry animations and popup notifications.

## Features I Implemented
* **CRUD Operations:** You can Add, Edit, and Delete transactions.
* **Local Storage Sync:** If you refresh the page, your data doesn't disappear. I tied `localStorage` directly into my Context API so the state is always saved.
* **Dark Mode:** Fully working light/dark theme toggle that also changes the chart colors. 
* **Role-Based Views:** A simple dropdown to switch between 'Viewer' and 'Admin'. Only Admins get to see the 'Edit/Delete' buttons and the 'Add Transaction' form.
* **Advanced Filters:** You can search by text or filter by an exact date.

##  My Thought Process & Trade-offs
Since I'm still a student learning the best practices of React, here is why I made certain choices:
1. **Why Context over Redux?** I know Redux/Zustand is the industry standard for big apps, but for a single dashboard, Context API got the job done perfectly without writing a ton of boilerplate code.
2. **The Recharts Challenge:** Making SVG charts change colors when switching to Dark Mode was tricky because Tailwind classes (`dark:bg-gray`) don't work directly on SVGs. I solved this by passing the `theme` state directly into the chart components to conditionally render the hex codes. 
3. **Future Improvements:** If I had a backend, I would move the filtering and sorting logic to the server. Right now, it's doing array `.filter()` on the frontend, which is fine for mock data but might slow down if there were 10,000+ transactions.

##  How to run this locally
1. Clone the repo: `git clone https://github.com/abhaychauhan-01/finance-Dashboard-assignment.git`
2. Install the packages: `npm install`
3. Start the Vite server: `npm run dev`

---
*Thanks for reviewing my assignment! Always open to feedback on how I can improve my code.*