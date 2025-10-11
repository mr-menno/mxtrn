# Mexican Train Scorekeeper App Requirements

This document outlines the functional and technical requirements for the Mexican Train Scorekeeper application.

## 1. Application Type
- Next.js application.

## 2. Core Functionality
### 2.1 Score Keeping
- **Double Domino Tracking:** The application must allow users to record which double dominoes have been used to start a round.
- **Round Winner Identification:** The application must identify and record the winner of each round (the player with the least or 0 points).
- **Player Scores:** The application must allow recording of points for all players in each round.

### 2.2 Data Persistence
- **Local Storage:** All game data (double dominoes used, round winners, player scores, leaderboard) must be persisted using browser local storage.
- ability to clear local storage, and all previous logins.

### 2.3 Leaderboard
- **Display:** The application must display a leaderboard showing overall player performance.
- **Updates:** The leaderboard should update automatically as new rounds are completed and scores are entered.

## 3. Technical Requirements
- **Framework:** Next.js (React).
- **Deployment:** The application should be deployable on Vercel.
- **State Management:** (To be determined, consider React Context or a lightweight state management library if needed).
- **Styling:** (To be determined, consider CSS Modules, Tailwind CSS, or a UI library).

## 4. User Interface (UI) / User Experience (UX)
- Intuitive and easy-to-use interface for entering scores.
- Clear display of current round information and the leaderboard.
- Responsive design for various screen sizes.
- **Dominoes**: create a custom svg component, a dominos button component  
- **Starting Dominoe**: starting domino for the round shoudl be selected as a botton, and only for the remaining options

## 5. Future Considerations (Out of Scope for initial version)
- Multi-game tracking.
- Player management (adding/removing players).
- Custom game rules.
