# CHESS AI PROJECT

---

## ✅ PROJECT PLAN (Step-by-Step Checklist)

## PROJECT STRUCTURE

```text
/chess-ai
├── public/
│   └── assets/          ← All chess piece images
├── src/
│   ├── components/
│   │   ├── Board.jsx     ← Chessboard grid
│   │   ├── Tile.jsx      ← Each square (with piece if any)
│   ├── ai/
│   │   └── aiEngine.js   ← AI logic (minimax or simpler)
│   ├── utils/
│   │   └── helpers.js    ← Utility functions (e.g., FEN parser)
│   ├── App.jsx           ← Main container
│   ├── main.jsx
│   └── index.css         ← Tailwind + custom styles
├── package.json
└── vite.config.js
---

### 📁 **PHASE 1: Setup & Board Rendering**

* [ ] 1\. **Install Dependencies** (`chess.js`, `classnames`)
* [ ] 2\. **Create `Board.jsx`** (renders 8x8 grid from game state)
* [ ] 3\. **Create `Tile.jsx`** (individual square with image if any)
* [ ] 4\. **Display pieces from `chess.js` game state**
* [ ] 5\. **Add basic click-to-move logic**

---

### 🧠 **PHASE 2: Chess Logic & AI**

* [ ] 6\. **Add move validation using `chess.js`**
* [ ] 7\. **Add AI: random legal move**
* [ ] 8\. **Switch turns (player vs AI)**

---

### 🎨 **PHASE 3: UX & Styling**

* [ ] 9\. **Style board with Tailwind CSS**
* [ ] 10\. **Highlight selected piece & legal moves**
* [ ] 11\. **Show game status: turn, check, checkmate**

---

### 🎁 **PHASE 4: Extras (Optional)**

* [ ] 12\. **Add undo button**
* [ ] 13\. **Add move history**
* [ ] 14\. **Add sound effects or animations**

---

## 🧱STEP 1 — Install Dependencies

```bash
npm install chess.js classnames
```

> `chess.js` – handles game rules
> `classnames` – for conditional Tailwind classes

Once that’s done, reply **"done"**, and we’ll move on to **STEP 2: `Board.jsx`**.
