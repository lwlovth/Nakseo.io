## 1. Tech Stack
* **Frontend:** React, Tailwind CSS
* **Backend/Auth:** Supabase
* **Storage:** Cloudinary
* **AI Engine:** Claude API
* **Icons:** Material Symbols Outlined

## 2. Folder Structure
* **`/src/components`**
    * `common/`: Reusable UI elements (Buttons, Inputs, Badges)
    * `layout/`: Navigation, Sidebar, BottomBar
    * `canvas/`: Canvas API drawing engine & toolkit
* **`/src/hooks`**
    * `useDrawing.js`: Canvas drawing logic & image extraction
    * `useAuction.js`: Real-time bidding & token transaction logic
* **`/src/pages`**
    * `Studio.jsx`: Doodle creation & AI analysis requests
    * `Market.jsx`: Auction listings & bidding interface
    * `Community.jsx`: Token-based post promotion & social feed
    * `Shop.jsx`: Item purchase & real-time preview
* **`/src/lib`**: `supabase.js`, `cloudinary.js`

## 3. Core Rules
* **State Management:** Global state for VIBE token balance & Auth status.
* **AI Integration:** Claude API calls post-upload for JSON metadata (Score, Comment, Tags).
* **Token Logic:** Server-side validation (Supabase RPC) for promotions & auction bids.
* **Responsive:** Conditional rendering for PC Sidebar vs. Mobile BottomBar at `md` breakpoint.
* **Data Optimization:** Upload canvas data as Blobs/Files to Cloudinary (Avoid Base64 in DB).