# Interactive Wall Calendar

## Folder Structure

wall-calendar/
├── src/
│   ├── app/
│   │   ├── layout.jsx                   
│   │   └── page.jsx                     
│   │
│   └── components/
│       └── WallCalendar/
│           ├── WallCalendar.jsx          
│           ├── HeroPanel.jsx             
│           ├── CalendarGrid.jsx          
│           ├── NotesPanel.jsx            
│           ├── MonthArt.jsx              
│           ├── useCalendarState.js       
│           └── constants.js             
│
├── package.json
├── next.config.js
├── jsconfig.json
└── .gitignore


---

## Steps to Run Locally

### 1. Create the project folder

```bash
mkdir wall-calendar && cd wall-calendar
```

### 2. Create the folder structure

```bash
mkdir -p src/app
mkdir -p src/components/WallCalendar
```

### 3. Place the files

Root level → package.json, next.config.js, jsconfig.json, .gitignore
src/app/ → layout.jsx, page.jsx
src/components/WallCalendar/ → all 7 component files

### 4. Install and run

```bash
npm install
npm run dev
```

Open http://localhost:3000

