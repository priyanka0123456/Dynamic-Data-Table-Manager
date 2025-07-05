#  Dynamic Data Table Manager

A powerful, responsive, and customizable data table manager built with **Next.js 14**, **Material UI**, **Redux Toolkit**, **TypeScript**, and **Redux Persist**.

This application allows users to dynamically import/export data, edit rows inline, reorder columns via drag-and-drop, toggle dark mode 🌙, and manage visible columns with persistence.

---

##  Features

###  Core
- Paginated data table (client-side)
- Global search
- Column visibility toggle (Manage Columns)
- Column reordering via drag-and-drop
- Inline editing with Save/Cancel
- Row delete with confirmation

###  CSV Support
- Import CSV using **PapaParse**
- Export current table view to CSV using **FileSaver.js**

###  UI/UX
- Dark mode toggle (🌙/☀️)
- Beautiful MUI theming with rounded corners
- Responsive layout

---

## 📦 Tech Stack

- **Next.js 14** (App Router)
- **Material UI (MUI v5)**
- **Redux Toolkit** + **Redux Persist**
- **TypeScript**
- **PapaParse** – CSV parser
- **FileSaver.js** – CSV download
- **@hello-pangea/dnd** – Column drag-and-drop

---




## Setup Instructions

1. **Clone this repo**
```bash
git clone https://github.com/your-username/dynamic-data-table-manager.git
cd dynamic-data-table-manager
```

2. **Install dependencies**
```bash
npm install
```

3. **Run locally**
```bash
npm run dev
```

4. **Build for production**
```bash
npm run build && npm run dev
```

---

## Sample CSV to Test

Save the following as `sample-data.csv` and use the Import CSV button:

```csv
id,name,email,age,role,department,location
1,Priyanka kumari,priyankarar4595@gmail.com,22,Developer,Engineering,Jaipur
2,Priya,priya@gmail.com,25,Designer,UI/UX,Hyderabad
3,Manisha,manisha@gmail.com,30,Manager,Operations,Lucknow
...
```

Or use another like `sample-team.csv` with different mock team data.

---
## 🙌 Credits

Built with ❤ by Priyanka😒👌
