## Calendar App

### Commands
- Start: `yarn start`
- Test: `yarn test`
- Build: `yarn test`

### How to Run
- It is required to include an environment variable `REACT_APP_OPEN_WEATHER_API_KEY` in order to fetch weather data. You may do so by adding a `.env` file on project root.

### Features
- Mobile friendly Calendar UI 
- Add new reminder - Tested
- Display Reminders on calendar
- Set and display color for reminder
- Edit reminder
- Include respective city weather for dates with at least one reminder (Reminder must be at most 5 days away from current time)
- Toggle reminder/weather view on calendar dates with reminders and weather data
- Bulk remove reminders
- Adaptive calendar cell height
- Support for all possible months
- Normalized reminder state on Redux store supports multiple views (Possibly adding a yearly/quarterly/daily display of reminders)