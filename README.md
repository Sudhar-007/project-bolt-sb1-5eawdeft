TaskQuest - Productivity & Task Management App

TaskQuest is a simple task-tracking web app built with **React + TypeScript**, using **Supabase** as the backend for authentication and database storage.
The app lets users create, manage, and complete tasks while keeping track of their daily progress through an XP and leveling system.


Features

User Authentication
  Powered by Supabase Auth (email/password login & logout).

Task Management
  Add, edit, and delete tasks from a clean dashboard.

XP System
  Completing tasks gives XP, helping you track progress over time.

Level System
  XP contributes to user levels, giving a sense of progression.

Responsive UI
  Built using React components and styled for a smooth user experience.

Dark Mode
  Toggle between light and dark themes.

Supabase Database Integration
  All tasks and user data are stored securely in Supabase tables.



Tech Stack

Frontend:React, TypeScript, CSS
Backend: Supabase (database + API + auth)
Hosting: GitHub Pages


How It Works

React handles the UI and client-side logic.
The app connects to Supabase using the Supabase JS client.
Task data is stored in a `tasks` table and retrieved through Supabase queries.
User XP and level are calculated on the client side based on stored task data.



Future Improvements


Daily streak tracking
reminders/notifications
Better task categorization
Polished animations and UI



