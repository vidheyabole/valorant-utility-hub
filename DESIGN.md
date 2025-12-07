# Valorant Utility Hub - Design Document

**Project:** Valorant Utility Hub  
**Author:** Vidheya Bole  
**Course:** CS5610 Web Development - Fall 2024  
**Institution:** Northeastern University  
**Date:** December 2024

---

## Table of Contents
1. [Project Description](#project-description)
2. [User Personas](#user-personas)
3. [User Stories](#user-stories)
4. [Design Mockups](#design-mockups)
5. [Technical Architecture](#technical-architecture)
6. [User Flow Diagrams](#user-flow-diagrams)

---

## Project Description

### Overview
Valorant Utility Hub is a full-stack web application designed to centralize and streamline access to Valorant game utilities, specifically ability lineups and crosshair configurations. The platform addresses the current fragmentation of utility information across multiple sources (YouTube, TikTok, Reddit, Google Docs) by providing a single, searchable, community-driven database.

### Problem Statement
Valorant players face significant challenges in accessing and managing utility information:

**Current Pain Points:**
- **Scattered Information**: Lineups are spread across YouTube videos, TikTok clips, and text documents
- **Inconsistent Quality**: No verification of accuracy or usefulness
- **Difficult Discovery**: Hard to find specific lineups for particular maps/agents
- **No Organization**: Players can't save and organize their favorite utilities
- **Privacy Concerns**: Competitive players want to keep strategies private
- **Mobile Inaccessibility**: Most resources aren't mobile-friendly

### Solution
Valorant Utility Hub provides:
- **Centralized Database**: Single platform for all utility information
- **User Authentication**: Personal accounts for managing content
- **Privacy Controls**: Public sharing or private storage
- **Multi-Image Support**: Up to 5 images per lineup showing position, crosshair placement, and results
- **Visual Crosshair Previews**: See crosshairs before using them
- **Smart Search & Filtering**: Find exactly what you need in seconds
- **Mobile-Responsive**: Access on any device
- **Community-Driven**: Users contribute and benefit from shared knowledge

### Target Audience
- **Competitive Players** (Immortal/Radiant ranks)
- **Ranked Players** (Gold-Diamond)
- **New Players** (Learning the game)
- **Content Creators** (Sharing strategies)
- **Casual Players** (Improving gameplay)

### Core Features
1. **User Authentication** - Secure registration, login, profiles
2. **Lineup Management** - Create, browse, edit, delete with multiple images
3. **Crosshair Management** - Configure, preview, copy, share
4. **Privacy System** - Public and private content
5. **Search & Filter** - Real-time search, multi-criteria filtering
6. **Image Handling** - Upload, compression, carousel viewing
7. **User Profiles** - Agent icons, rank badges, statistics

### Technology Stack
- **Backend**: Node.js + Express + MongoDB (Native Driver)
- **Frontend**: HTML5 + CSS3 + Vanilla JavaScript (ES6 Modules)
- **Security**: bcrypt password hashing
- **Storage**: MongoDB Atlas (Cloud Database)
- **Deployment**: Render.com

---

## User Personas

### Persona 1: Arjun - The Competitive Duelist

**Demographics:**
- Age: 22
- Rank: Immortal 2
- Role: Duelist Main (Jett, Raze)
- Play Time: 4-6 hours daily
- Competitive: Team scrims 3x weekly

**Background:**
Arjun is a university student who takes Valorant seriously. He's on a semi-professional team that competes in local tournaments. His team relies on coordinated utility usage for site executes and retakes.

**Goals:**
- Access consistent, reliable lineups for every map
- Quickly reference utilities during pre-game strategy discussions
- Share team strategies privately with teammates
- Keep personal lineups organized by map and situation
- Prepare for specific opponents by reviewing map-specific utilities

**Frustrations:**
- Wastes time searching through YouTube videos during practice
- Can't find lineups for specific situations (e.g., "post-plant A-site Bind")
- Has lineups saved in random Google Docs that are hard to find
- Wants to keep some strategies private but share others publicly
- Mobile YouTube is terrible for referencing during matches

**Technical Proficiency:** High - comfortable with technology, uses Discord, streaming software

**Quote:** *"I need a quick reference tool that doesn't make me scrub through 10-minute YouTube videos during warmup."*

**How Valorant Utility Hub Helps:**
- Quick search and filtering finds exactly what he needs in seconds
- Privacy controls let him keep team strategies confidential
- Multiple images show every angle he needs
- "View My Lineups" gives organized access to his personal library
- Mobile-friendly for referencing between rounds

---

### Persona 2: Tina - The Enthusiastic Beginner

**Demographics:**
- Age: 19
- Rank: Silver 1
- Role: Learning all roles
- Play Time: 1-2 hours daily
- Casual competitive player

**Background:**
Tina recently started playing Valorant with her college friends. She enjoys the game but feels overwhelmed by the complexity of agent abilities and utility usage. She watches pro streams and wants to learn but doesn't know where to start.

**Goals:**
- Learn beginner-friendly lineups that are easy to execute
- Understand basic crosshair setups that improve aim
- Find simple, clear instructions without complicated terminology
- Build confidence with reliable utilities
- Contribute to the community as she improves

**Frustrations:**
- Pro player guides assume too much knowledge
- Can't tell which lineups are actually useful vs. flashy but impractical
- Overwhelmed by 50+ lineup compilations on YouTube
- Doesn't know which crosshair to use
- Afraid to ask "dumb questions" in community forums

**Technical Proficiency:** Medium - uses social media, watches streams, basic computer skills

**Quote:** *"I just want simple crosshair presets and lineups that actually work without needing a PhD in Valorant."*

**How Valorant Utility Hub Helps:**
- Clean, simple interface that's not overwhelming
- Search for beginner-friendly lineups by agent
- Visual crosshair previews show exactly what they look like
- Detailed descriptions explain every step clearly
- Can save favorite utilities to practice later
- Community contributions mean variety of skill levels

---

### Persona 3: Rohan - The Content Creator

**Demographics:**
- Age: 25
- Rank: Ascendant 3
- Role: Initiator Main (Sova, Fade)
- Play Time: 6-8 hours daily
- Content: YouTube (15K subs), TikTok (25K followers)

**Background:**
Rohan creates Valorant content full-time, focusing on educational guides, lineups, and tips. He's constantly researching new utilities and creating tutorial videos. His income depends on providing value to his audience.

**Goals:**
- Share his discovered lineups with his community
- Provide comprehensive guides with multiple reference images
- Get credit for his original discoveries (attribution)
- Make content easily shareable and accessible
- Build a portfolio of his utility knowledge
- Drive traffic to his YouTube channel

**Frustrations:**
- Difficult to organize and reference his own content library
- Other creators copy his lineups without credit
- Can't easily update lineups when patches change maps
- Wants a central hub for his audience to find all his utilities
- Needs better way to showcase his expertise

**Technical Proficiency:** High - video editing, streaming, graphics design, web-savvy

**Quote:** *"I want to upload my lineups with descriptions and clips so my community has easy access to everything I create."*

**How Valorant Utility Hub Helps:**
- Upload lineups with multiple images and YouTube video links
- Author attribution on every lineup
- Profile page showcases all his contributions
- Can keep experimental lineups private until ready to share
- Easy to update when game patches change utilities
- Shareable links for social media promotion
- Professional presentation of his work

---

### Persona 4: Vedant - The Daily Ranked Grinder

**Demographics:**
- Age: 28
- Rank: Platinum 2
- Role: Flex (plays what team needs)
- Play Time: 2-3 hours daily after work
- Goal: Reach Diamond by season end

**Background:**
Vedant is a software engineer who plays Valorant to unwind after work. He's competitive and improvement-focused but has limited time. He needs to maximize his practice efficiency and quickly adapt to different agents based on team composition.

**Goals:**
- Quickly find map-based lineups for whichever agent he's playing
- Switch crosshairs based on daily aim training routines
- Access utilities on mobile during queue times
- Learn one new lineup per day to expand agent pool
- Track which utilities he's saved for future reference

**Frustrations:**
- Limited time means can't watch long tutorial videos
- Plays different agents each match, needs versatile lineup knowledge
- Has screenshots saved but can't organize them
- Crosshair settings saved in notes app are a mess
- Forgets which lineups he's already learned

**Technical Proficiency:** High - works in tech, comfortable with web apps

**Quote:** *"I need to browse map-based lineups quickly and switch crosshairs depending on my warm-up routine."*

**How Valorant Utility Hub Helps:**
- Filter by map instantly to prep during agent select
- Search by agent when filling team composition
- Save favorite lineups to "My Lineups" for quick reference
- Copy crosshair codes in 1 click to test during aim training
- Track progress through profile statistics
- Mobile-friendly for referencing during queue
- No time wasted watching videos - just see the lineup

---

## User Stories

### User Story 1: User Authentication & Profile Management

**As a** competitive Valorant player,  
**I want to** create a personal account with my username, email, and password, customize my profile with my rank and favorite agent icon, and track my contributions to the platform,  
**So that** I can build and manage my own collection of lineups and crosshairs, showcase my gaming identity with rank badges and agent icons, and see statistics on how much content I've created.

**Acceptance Criteria:**
- User can register with username, email, and password (minimum 6 characters)
- Password is securely hashed using bcrypt before storage
- User can login with email and password
- Session persists across page refreshes using localStorage
- User can view their profile showing username, email, rank, bio, favorite agent, and statistics
- User can edit profile to update bio, rank, and favorite agent
- User can choose profile picture from 28 Valorant agent icons OR upload custom image
- Rank badge is automatically assigned based on selected rank (10 rank options)
- Profile shows statistics: total lineups created, total crosshairs created, total contributions
- User can logout, which clears session data
- Navigation bar shows "Profile" and "Logout" when logged in, "Login" and "Register" when logged out

**Implementation Details:**
- **Backend**: 
  - `server/db/userDb.js` - CRUD operations for users
  - `server/routes/authRoutes.js` - Authentication endpoints
  - bcrypt for password hashing (10 salt rounds)
  - MongoDB users collection
- **Frontend**:
  - `public/login.html` - Login form
  - `public/register.html` - Registration form with rank and agent selection
  - `public/profile.html` - Profile display and edit
  - `public/js/profile.js` - Profile logic with image compression
  - Agent selection grid with 28 clickable agent icons
  - Automatic rank badge image assignment from `/images/ranks/`
- **Security**:
  - Passwords never stored in plain text
  - User object stored in localStorage without password
  - Session validation on protected pages

**Use Case Scenario:**

*Arjun wants to create an account to start saving his team's lineups.*

1. **Initial State**: Arjun visits the Valorant Utility Hub for the first time. He's not logged in.

2. **Registration**: He clicks "Register" in the navigation bar. On the registration page, he fills out:
   - Username: "ArjunDuelist"
   - Email: "arjun.gaming@email.com"
   - Password: "immortal2024"
   - Confirm Password: "immortal2024"
   - Rank: "Immortal" from dropdown
   - Favorite Agent: "Jett"

3. **Account Creation**: He clicks "Create Account". The backend hashes his password with bcrypt and creates his user document in MongoDB. He's redirected to the login page with a success message.

4. **First Login**: He enters his email and password, clicks "Login". The system validates his credentials against the hashed password, returns his user object (without password), and saves it to localStorage. He's redirected to the home page.

5. **Profile Setup**: The navigation now shows "Profile (ArjunDuelist)" and "Logout". He clicks "Profile" to see his new profile page. It shows his username, email, rank "Immortal", and statistics showing "0 Lineups Created, 0 Crosshairs Created".

6. **Customization**: He clicks "Edit Profile". A modal opens with two options for profile picture. He clicks "Choose Agent Icon" and scrolls through the grid of 28 agents. He clicks on "Jett" and it highlights with a cyan border. He adds a bio: "Immortal duelist main, team captain for university esports". He notices the rank dropdown is set to "Immortal" and a helper text says "Rank badge will be automatically assigned". He clicks "Save Changes".

7. **Profile Complete**: His profile now displays the Jett agent icon as his profile picture with the Immortal rank badge overlaid in the bottom-right corner. His bio appears below. He's ready to start adding lineups.

**Outcome**: Arjun has successfully created an account, logged in, and customized his profile with his gaming identity. He can now create and manage lineups while building his contribution statistics.

---

### User Story 2: Lineup Management with Privacy & Multi-Image Support

**As a** Valorant player who wants to learn and share map-specific ability lineups,  
**I want to** create lineups with up to 5 images showing position, crosshair placement, and result, mark them as public or private, search and filter through community lineups by map/agent/ability, and edit or delete only my own lineups,  
**So that** I can comprehensively document complex lineups, learn from the community, keep competitive strategies confidential, and quickly find the exact lineup I need for any situation.

**Acceptance Criteria:**
- User must be logged in to create lineups
- User can upload 1-5 images per lineup with automatic compression
- Images display in interactive carousel with navigation arrows and dots
- User can set lineup as public (visible to all) or private (only visible to creator)
- Private lineups show "🔒 Private" badge
- Private lineups appear for logged-in owner, hidden from others
- User can search lineups using real-time keyword search
- User can filter by map (12 maps), agent (28 agents), and ability type
- Clicking map on home page modal filters lineups by that map
- Edit and delete buttons only appear on user's own lineups
- User can click "View My Lineups" to see all their lineups (public + private)
- Lineup cards show map, agent, ability, site, position, throw type, landmark, description, author, and optional video link
- Images automatically compress to 800x800px @ 70% quality

**Implementation Details:**
- **Backend**:
  - `server/db/lineupDb.js` - CRUD with privacy filtering
  - `server/routes/lineupRoutes.js` - API endpoints
  - Privacy query logic: `query.$or = [{ isPrivate: false }, { userId: requestingUserId }]`
  - Ownership verification before update/delete
- **Frontend**:
  - `public/lineups.html` - Lineup library page with search, filters, and add button
  - `public/js/lineups.js` - Client-side rendering and logic
  - Multi-image upload with FileReader and Canvas compression
  - Image carousel with state management
  - Privacy checkbox in form
  - URL parameter handling for map filtering (`?map=Ascent`)
- **Data Model**:
```javascript
  {
    map: String,
    agent: String,
    ability: String,
    site: String,
    position: String,
    throwType: String,
    landmark: String,
    description: String,
    videoUrl: String,
    author: String,
    images: [String], // Array of Base64 compressed images
    userId: ObjectId,
    isPrivate: Boolean,
    createdAt: Date
  }
```

**Use Case Scenario:**

*Rohan, a content creator, wants to upload a detailed Sova lineup for his YouTube tutorial.*

1. **Initial State**: Rohan is logged in to his account. He navigates to the Lineups page by clicking "Lineups" in the navigation.

2. **Browse Existing**: The page loads showing all public lineups from the community plus his own private lineups. He sees a search bar at the top and three filter dropdowns (Map, Agent, Ability). Currently showing 15 total lineups.

3. **Quick Search**: He types "Ascent Sova" in the search bar to see if his lineup already exists. The page instantly filters to show only Sova lineups on Ascent (3 results). None match what he wants to share.

4. **Create New**: He clicks the red "Add New Lineup" button in the top-right. A modal opens with the title "Add New Lineup".

5. **Upload Images**: In the modal, he sees "Lineup Images (up to 5 images)" with a file upload button. He clicks "Choose Files" and selects 4 screenshots from his computer:
   - Image 1: Overhead view showing position on map (B main)
   - Image 2: First-person view showing crosshair placement on box
   - Image 3: Dart trajectory in mid-air
   - Image 4: Final reveal covering entire B site
   
   Each image processes and appears as a thumbnail with numbers (1, 2, 3, 4) and a small X to remove. Total upload size is 8MB, but after compression, each becomes ~100KB.

6. **Fill Details**: He fills in the required fields:
   - Map: Selects "Ascent" from dropdown
   - Agent: Selects "Sova" from dropdown
   - Ability: Selects "Recon" from dropdown
   - Site: "B Site"
   - Position: "Attack"
   - Throw Type: "Standing Throw"
   - Landmark: "B Main entry, aim at corner of tall box"
   - Description: "B site entry recon from main. Reveals all of site, cubby, and back site. Stand at B main entrance, aim at the top corner of the tall box near site, and shoot dart. Perfect for site executes."
   - Video URL: "https://youtube.com/watch?v=example123" (his tutorial video)
   - Author: Pre-filled with "RohanValorant" (his username)

7. **Privacy Decision**: He sees a checkbox that says "🔒 Make this lineup private (only you can see it)". Since this is for his YouTube audience, he leaves it UNCHECKED to make it public.

8. **Save**: He clicks the red "Save Lineup" button. The modal closes and the lineups page refreshes.

9. **Lineup Appears**: His new lineup appears at the top of the grid (most recent). The card shows:
   - An image carousel with 4 images (showing image 1 by default)
   - Navigation arrows (‹ ›) and 4 dots at the bottom
   - Map name "ASCENT" in large red text
   - Tags: "Sova" (cyan), "Recon" (red), "B Site" (gray), "📷 4 images"
   - His description text
   - Details section: Position: Attack, Throw Type: Standing Throw, Landmark: B Main entry...
   - Footer: "by RohanValorant" and a "Watch Video" link
   - Edit (✏️) and Delete (🗑️) icons since he owns it

10. **Test Carousel**: He clicks the right arrow to test the carousel. It smoothly transitions to image 2 (crosshair placement). He clicks through all 4 images to verify they uploaded correctly. The active dot indicator moves with each image.

11. **Share**: He copies the page URL to share on his YouTube video description, knowing his viewers can now easily reference this lineup.

12. **Later - Privacy Change**: A week later, his team is preparing for a tournament. He creates a new lineup with a secret Sova dart for retakes. This time, he CHECKS "Make this lineup private" before saving. The lineup appears only for him with a "🔒 Private" badge. His teammates can't see it, even if they visit his profile.

**Outcome**: Rohan has successfully shared a detailed, multi-image lineup with his community while keeping his tournament strategies private. The attribution links back to his YouTube, driving traffic to his channel.

---

### User Story 3: Crosshair Discovery & Management

**As a** player experimenting with different crosshairs to improve aim,  
**I want to** browse professional crosshair configurations with visual previews, upload screenshots, copy codes with one click, mark favorites as private, and create my own crosshair profiles,  
**So that** I can find and test the perfect crosshair for my playstyle, save personal configurations privately, and share helpful setups with the community.

**Acceptance Criteria:**
- User can browse all public crosshairs as guest
- Crosshairs render visually using CSS/HTML to show exact appearance
- User can search crosshairs by name, category, color, or author
- User can filter by category (Pro Player, Minimal, Dot Only, Classic, Fun/Meme) and color (8 options)
- User must be logged in to create crosshairs
- User can upload optional crosshair screenshot (compressed automatically)
- User can input crosshair code, name, category, color, thickness, length, center dot, outlines
- One-click "Copy Code" button copies to clipboard
- User can mark crosshair as public or private
- Private crosshairs show "🔒 Private" badge
- Edit/delete only on user's own crosshairs
- Clicking "View My Crosshairs" shows all personal crosshairs
- Visual preview updates based on settings (color, thickness, length, center dot)

**Implementation Details:**
- **Backend**:
  - `server/db/crosshairDb.js` - CRUD with privacy filtering
  - `server/routes/crosshairRoutes.js` - API endpoints
  - Same privacy logic as lineups
- **Frontend**:
  - `public/crosshairs.html` - Gallery page
  - `public/js/crosshairs.js` - Client-side rendering
  - CSS crosshair rendering using absolute positioning
  - Clipboard API for code copying
  - Image compression for screenshots
- **Visual Preview System**:
  - CSS Grid positioning for crosshair lines (top, bottom, left, right)
  - Dynamic styling based on color, thickness, length
  - Center dot conditionally rendered
  - Colors mapped to Valorant-accurate hex codes
- **Data Model**:
```javascript
  {
    name: String,
    code: String,
    category: String,
    color: String,
    thickness: Number,
    length: Number,
    centerDot: Boolean,
    outlines: Boolean,
    description: String,
    author: String,
    imageUrl: String, // Base64 compressed screenshot
    userId: ObjectId,
    isPrivate: Boolean,
    createdAt: Date
  }
```

**Use Case Scenario:**

*Tina, a new player, wants to find a good crosshair to improve her aim.*

1. **Discovery**: Tina visits the Valorant Utility Hub and clicks "Crosshairs" in the navigation. She's not logged in yet, so she can only view public crosshairs.

2. **Browsing**: The Crosshairs Gallery page loads showing cards with visual crosshair previews. She sees "TenZ Classic" - a cyan cross, "Shroud Dot" - a white dot, and several others. Each card shows a rendered preview of exactly what the crosshair looks like.

3. **Search**: She types "dot" in the search bar. The page instantly filters to show only crosshairs with "dot" in the name or category. "Shroud Dot" and "Minimal Dot" appear.

4. **Examine**: She clicks on the "Shroud Dot" card. She sees:
   - A visual preview showing a simple white dot
   - Category tag: "Dot Only"
   - Color tag: "White"
   - The crosshair code in a green monospace font box
   - Description: "Simple white dot - maximizes visibility and minimizes screen clutter. Great for one-taps."
   - Author: "Shroud"
   - A green "Copy Code" button

5. **Copy Code**: She clicks the "Copy Code" button. An alert appears: "Crosshair code copied to clipboard!" She opens Valorant, goes to Settings → Crosshair → Import Profile Code, and pastes. The crosshair appears in her game.

6. **Test in Game**: She plays a few deathmatches with the new crosshair. She likes it but wants to make it slightly larger.

7. **Create Account**: She goes back to the website and clicks "Register". She creates an account:
   - Username: "TinaFPS"
   - Email: "tina@email.com"
   - Password: "silver123"
   - Rank: "Silver"
   - Favorite Agent: "Sage"

8. **Login**: After registering, she logs in. The navigation now shows "Profile (TinaFPS)".

9. **Create Custom Crosshair**: She clicks "Crosshairs" then "Add New Crosshair". A modal opens. She fills in:
   - Name: "My Modified Shroud Dot"
   - Code: (She gets the modified code from Valorant settings and pastes it)
   - Category: "Dot Only"
   - Color: "White"
   - Thickness: 3
   - Length: 0
   - Center Dot: Checked ✓
   - Outlines: Checked ✓
   - Description: "Shroud's dot but slightly bigger for my monitor"
   - Author: Pre-filled "TinaFPS"
   - Uploads a screenshot of the crosshair from her game

10. **Privacy**: Since this is her personal preference, she CHECKS "🔒 Make this crosshair private" so it's just for her reference.

11. **Save**: She clicks "Save Crosshair". The modal closes and her crosshair appears in the grid with a "🔒 Private" badge and her uploaded screenshot instead of a CSS preview.

12. **Personal Library**: She clicks "Profile" → "View My Crosshairs". She sees only her private crosshair. She can easily reference it anytime without searching.

13. **Verification**: She logs out to test. When she views the Crosshairs page while logged out, her private crosshair doesn't appear - only the public ones like TenZ and Shroud. She logs back in, and her private crosshair reappears.

**Outcome**: Tina discovered a pro player's crosshair, tested it in-game, created a personalized version, and saved it privately for her own use. She can now easily copy the code whenever she reinstalls the game or plays on a different computer, without having to search through notes or screenshots.

---

## Design Mockups

### Mockup 1: Home Page - Landing View

**Description:** The home page serves as the entry point, showcasing platform statistics and providing navigation to main features.

**Key Elements:**
- Hero section with gradient title
- Two feature cards (Lineups, Crosshairs) with icons and CTA buttons
- Interactive statistics grid (4 cards: Lineups, Crosshairs, Maps, Agents)
- Features section explaining benefits
- Navigation bar with auth status
- Footer with attribution

**Visual Design:**
- **Color Scheme**: Dark mode (Valorant theme)
  - Background: #0f1923 (dark blue-gray)
  - Cards: #1a2634 (lighter blue-gray)
  - Primary: #ff4655 (Valorant red)
  - Accent: #00d1ff (Valorant cyan)
- **Typography**: Segoe UI (clean, modern)
- **Layout**: CSS Grid for responsive cards

**Interactions:**
- Hover on stat cards → lifts up, glows
- Click "Total Lineups" → navigates to `/lineups.html`
- Click "Total Crosshairs" → navigates to `/crosshairs.html`
- Click "12 Maps Covered" → opens maps modal

**Screenshot Reference:**
```
See: screenshots/home.png
```

---

### Mockup 2: Maps Modal - Interactive Map Browser

**Description:** Modal overlay displaying all 12 Valorant maps with minimap images. Clicking a map filters lineups by that map.

**Key Elements:**
- Modal overlay with dark background (70% opacity)
- Modal content card with close button (X)
- Title: "Browse Maps"
- Subtitle: "Click on any map to view its lineups"
- 12 map cards in grid layout (3-4 columns)
- Each card shows map minimap image and name

**Visual Design:**
- **Grid**: 4 columns on desktop, 2 on tablet, 1 on mobile
- **Map Cards**: 
  - 300x200px image area
  - Map name below in bold
  - Border highlight on hover
- **Hover Effect**: Card lifts, border glows red

**Interactions:**
- Click anywhere outside modal → closes
- Click X button → closes
- Click any map card → redirects to `/lineups.html?map=[MapName]`
- Map cards animate on hover (lift + glow)

**Screenshot Reference:**
```
See: screenshots/maps-modal.png (if available)
```

---

### Mockup 3: Lineups Library Page

**Description:** Main lineup browsing interface with search, filters, and card grid displaying all available lineups.

**Key Elements:**
- Page header with title and "Add New Lineup" button
- Search bar (full width, prominent)
- Filter row (3 dropdowns: Map, Agent, Ability + Reset button)
- Result count ("Showing X lineups")
- Lineup cards grid (responsive, 3-4 columns)

**Lineup Card Design:**
- **Top**: Image carousel (if images exist) with navigation
- **Header**: Map name (large, red) + edit/delete icons (if owner)
- **Tags**: Agent (cyan), Ability (red), Site (gray), Image count, Private badge
- **Body**: Description text
- **Details**: Position, Throw Type, Landmark (if exists)
- **Footer**: Author name + Video link (if exists)

**Visual Design:**
- **Card Hover**: Lifts up, glows red
- **Carousel**: 
  - Auto-height based on image
  - Navigation arrows (left/right)
  - Dot indicators at bottom
  - Smooth fade transition between images
- **Tags**: Rounded pills with category-specific colors

**Interactions:**
- Type in search → instant filtering (no submit needed)
- Change dropdown → instant filtering
- Click "Reset Filters" → clears all filters
- Click lineup card → nothing (cards are for viewing)
- Click edit icon → opens modal with existing data
- Click delete icon → confirmation dialog → deletes
- Click carousel arrows → navigates images
- Click carousel dots → jumps to specific image
- Click "Add New Lineup" → opens modal (if logged in, else redirect to login)

**Screenshot Reference:**
```
See: screenshots/lineups.png
```

---

### Mockup 4: Lineup Image Carousel

**Description:** Interactive carousel for browsing multiple lineup images within a card.

**Key Elements:**
- Image container (250px height)
- Multiple images stacked (only one visible at a time)
- Previous button (left, ‹)
- Next button (right, ›)
- Dot indicators (bottom center)
- Image counter badge (optional)

**Visual Design:**
- **Images**: Fade transition (0.5s) between views
- **Arrows**: Circular buttons, 40px, semi-transparent black background
- **Dots**: 10px circles, white at 50% opacity, active = red at 100%
- **Hover**: Arrows darken

**Interactions:**
- Click left arrow → previous image (wraps to last)
- Click right arrow → next image (wraps to first)
- Click dot → jump to that image
- Auto-updates active dot indicator

**Screenshot Reference:**
```
See: screenshots/lineups-carousel.png (if available)
```

---

### Mockup 5: Add/Edit Lineup Modal

**Description:** Form modal for creating or editing lineups with multiple image upload support.

**Key Elements:**
- Modal overlay (full screen, dark)
- Modal content card (600px max width, scrollable)
- Close button (X, top-right)
- Form title ("Add New Lineup" or "Edit Lineup")
- Multi-image upload field with preview grid
- Required fields: Map, Agent, Ability, Site, Position, Description
- Optional fields: Throw Type, Landmark, Video URL, Author
- Privacy checkbox
- Action buttons: Cancel, Save

**Multi-Image Upload Design:**
- **File Input**: "Choose Files" button, accepts multiple
- **Preview Grid**: 2-3 columns showing thumbnails
- **Each Preview**: 
  - 150x150px thumbnail
  - Image number badge (1, 2, 3...)
  - Remove button (X, top-right corner)
- **Remove All Button**: Below grid

**Visual Design:**
- **Form Fields**: Dark background, light border, focus = red border
- **Dropdowns**: Styled to match theme
- **Checkbox**: Custom styling with lock icon
- **Preview Thumbnails**: Bordered, numbered, removable

**Interactions:**
- Select multiple files → all process simultaneously
- Each image compresses before preview
- Click X on thumbnail → removes that image
- Click "Remove All Images" → clears all previews
- Fill form → real-time validation
- Click Cancel → closes modal, clears form
- Click Save → creates/updates lineup, closes modal, refreshes grid

**Screenshot Reference:**
```
See: screenshots/add-lineup.png (if available)
```

---

### Mockup 6: Crosshairs Gallery Page

**Description:** Gallery view of crosshair profiles with visual previews and filtering options.

**Key Elements:**
- Page header with title and "Add New Crosshair" button
- Search bar
- Filter row (2 dropdowns: Category, Color + Reset button)
- Result count
- Crosshair cards grid (4 columns)

**Crosshair Card Design:**
- **Header**: Name (cyan, bold) + edit/delete icons (if owner)
- **Preview Area**: 
  - Screenshot (if uploaded), OR
  - CSS-rendered crosshair preview (150px square)
- **Tags**: Category (cyan), Color (red), Private badge (if private)
- **Code Block**: Monospace font, green text, clickable, shows full code
- **Description**: Gray text, italic (if exists)
- **Footer**: Author name + "Copy Code" button (green)

**Visual Crosshair Rendering:**
- **Implementation**: Absolute positioned divs forming cross shape
- **Elements**: 4 lines (top, bottom, left, right) + optional center dot
- **Dynamic Styling**: Color, thickness, length from database
- **Background**: Radial gradient with crosshair pattern overlay

**Interactions:**
- Search → instant filtering
- Filter dropdowns → instant filtering
- Click crosshair code → copies to clipboard
- Click "Copy Code" button → copies to clipboard
- Click edit → opens modal with existing data
- Click delete → confirmation → deletes
- Hover on card → lifts, glows cyan

**Screenshot Reference:**
```
See: screenshots/crosshairs.png
```

---

### Mockup 7: User Profile Page

**Description:** Personal profile displaying user information, agent icon, rank badge, and contribution statistics.

**Key Elements:**
- Profile header with page title
- Two-column layout:
  - **Left Column**: Profile card with avatar, rank, bio
  - **Right Column**: Statistics and action buttons

**Profile Card (Left):**
- Profile avatar (150px circle)
  - Agent icon OR custom image
  - Rank badge overlay (bottom-right corner, 60px)
- Username (large, bold)
- Email (gray, smaller)
- Rank badge pill (gradient background)
- Favorite agent ("Main: Jett")
- Bio text (italic, gray)

**Statistics Card (Right):**
- Title: "Your Statistics"
- 3 stat boxes in grid:
  - Lineups Created (large number, cyan)
  - Crosshairs Created (large number, cyan)
  - Total Contributions (large number, cyan)
- Action buttons (full width):
  - "Edit Profile" (red, primary)
  - "View My Lineups" (gray, secondary)
  - "View My Crosshairs" (gray, secondary)

**Visual Design:**
- **Avatar Border**: 4px red border
- **Rank Badge**: Circular image with 3px border, overlays avatar
- **Rank Pill**: Gradient red-to-cyan background
- **Stat Boxes**: Dark background, bordered, centered text
- **Numbers**: 2.5rem font, bold, cyan

**Interactions:**
- Click "Edit Profile" → opens modal
- Click "View My Lineups" → navigates to `/lineups.html?user=[userId]`
- Click "View My Crosshairs" → navigates to `/crosshairs.html?user=[userId]`
- Click "Logout" in nav → confirmation → clears session → redirects home

**Screenshot Reference:**
```
See: screenshots/profile.png (if available)
```

---

### Mockup 8: Edit Profile Modal with Agent Selection

**Description:** Modal form for customizing user profile with agent selection grid and rank options.

**Key Elements:**
- Modal title: "Edit Profile"
- Username field (text input)
- Profile picture section with TWO options:
  - **Option 1**: "Choose Agent Icon" button (active by default)
  - **Option 2**: "Upload Custom Image" button
- Agent selection grid (visible when Option 1 active):
  - 28 agent icons in scrollable grid
  - 6-8 columns, 80x80px each
  - Click to select, highlights with cyan border
- Custom upload section (visible when Option 2 active):
  - File input
  - Image preview (circular, 200px)
- Bio textarea
- Rank dropdown (10 options)
- Helper text: "Rank badge will be automatically assigned"
- Favorite agent dropdown (28 agents)
- Action buttons: Cancel, Save Changes

**Agent Selection Grid:**
- **Layout**: 6 columns on desktop, auto-fit
- **Each Agent**: 
  - Circular image (60px)
  - Agent name below
  - Border on hover (red)
  - Selected = cyan border + glow
- **Scrollable**: Max height 400px with scroll

**Visual Design:**
- **Option Buttons**: 
  - Default: Gray background
  - Active: Red background, white text
- **Agent Grid**: Dark background, bordered container
- **Selected Agent**: Cyan border, cyan name, glow effect
- **Preview**: Circular with red border

**Interactions:**
- Click "Choose Agent Icon" → shows agent grid, hides upload
- Click "Upload Custom Image" → shows upload, hides agent grid
- Click agent in grid → selects it, highlights, deselects others
- Upload custom → shows preview
- Change rank dropdown → auto-assigns rank badge (user doesn't see this)
- Click Save → compresses images, sends to backend, updates profile
- Click Cancel → closes modal, resets form

---

### Mockup 9: Search & Filter in Action

**Description:** Demonstrating the real-time search and filtering system.

**Visual Flow:**
1. **Initial State**: Shows all public lineups (15 lineups)
2. **Search Active**: User types "sova" → filters to Sova lineups (8 lineups)
3. **Filter Active**: User selects "Ascent" from map dropdown → filters to Ascent lineups (5 lineups)
4. **Combined**: Search "sova" + Filter "Ascent" → shows Sova lineups on Ascent only (3 lineups)
5. **Reset**: User clicks "Reset Filters" → shows all 15 lineups again

**Technical Implementation:**
- Client-side filtering (no server round-trip)
- Filters apply in sequence: database filters → client filters → search
- Result count updates with each filter change: "Showing 3 lineups"
- No page reload required
- Instant feedback (<100ms)

**Screenshot Reference:**
```
See: screenshots/search-filter.png (if available)
```

---

### Mockup 10: Privacy Badge System

**Description:** Visual indicators for private content showing how privacy works across different user states.

**Key Elements:**
- **Private Badge**: 🔒 icon + "Private" text
- **Styling**: Yellow/gold background, warning color
- **Placement**: In tags row with agent/ability tags

**Behavior:**
- **When Logged In (Owner)**: Badge shows on your private items
- **When Logged In (Other)**: Other users' private items don't appear at all
- **When Logged Out**: No private items visible

**Visual Design:**
- Background: rgba(255, 215, 0, 0.1)
- Border: Warning color (#ffd966)
- Text: Warning color
- Icon: Lock emoji

**Privacy States:**

**Scenario A - Owner Viewing:**
```
User: ProPlayer123 (Logged In)
Viewing: Lineups Page

Lineups Visible:
✅ Public lineup by Admin (no edit buttons)
✅ Public lineup by OtherUser (no edit buttons)
✅ Public lineup by ProPlayer123 (HAS edit buttons)
✅ Private lineup by ProPlayer123 🔒 (HAS edit buttons)
❌ Private lineup by OtherUser (HIDDEN - doesn't appear)
```

**Scenario B - Other User Viewing:**
```
User: OtherUser (Logged In)
Viewing: Lineups Page

Lineups Visible:
✅ Public lineup by Admin
✅ Public lineup by ProPlayer123
✅ Public lineup by OtherUser (HAS edit buttons)
✅ Private lineup by OtherUser 🔒 (HAS edit buttons)
❌ Private lineup by ProPlayer123 (HIDDEN)
```

**Scenario C - Guest Viewing:**
```
User: Not Logged In
Viewing: Lineups Page

Lineups Visible:
✅ Public lineup by Admin
✅ Public lineup by ProPlayer123
✅ Public lineup by OtherUser
❌ Private lineup by ProPlayer123 (HIDDEN)
❌ Private lineup by OtherUser (HIDDEN)
```

---

## Technical Architecture

### System Architecture Diagram
```
┌─────────────────────────────────────────────────────────┐
│                      CLIENT (Browser)                    │
│                                                          │
│  ┌────────────┬────────────┬────────────┬────────────┐ │
│  │   Home     │  Lineups   │ Crosshairs │  Profile   │ │
│  │  (index)   │  (library) │  (gallery) │  (user)    │ │
│  └──────┬─────┴──────┬─────┴──────┬─────┴──────┬─────┘ │
│         │            │            │            │        │
│  ┌──────▼────────────▼────────────▼────────────▼─────┐ │
│  │        Vanilla JavaScript (ES6 Modules)           │ │
│  │    lineups.js | crosshairs.js | profile.js        │ │
│  │         (Client-side rendering & logic)            │ │
│  └──────┬─────────────────────────────────────────────┘ │
│         │ Fetch API (JSON)                              │
└─────────┼───────────────────────────────────────────────┘
          │
          │ HTTP/HTTPS
          │
┌─────────▼───────────────────────────────────────────────┐
│                   EXPRESS SERVER                         │
│                   (server/server.js)                     │
│                                                          │
│  ┌──────────────────────────────────────────────────┐  │
│  │              API Routes                           │  │
│  │  /api/auth/*  /api/lineups/*  /api/crosshairs/*  │  │
│  │  (authRoutes, lineupRoutes, crosshairRoutes)     │  │
│  └──────────────┬───────────────────────────────────┘  │
│                 │                                        │
│  ┌──────────────▼───────────────────────────────────┐  │
│  │           Database Layer                          │  │
│  │  userDb.js | lineupDb.js | crosshairDb.js        │  │
│  │         (CRUD operations + bcrypt)                │  │
│  └──────────────┬───────────────────────────────────┘  │
└─────────────────┼────────────────────────────────────────┘
                  │
                  │ MongoDB Driver
                  │
┌─────────────────▼────────────────────────────────────────┐
│              MONGODB ATLAS (Cloud)                        │
│                                                           │
│  ┌──────────────┬──────────────┬──────────────┐         │
│  │    users     │   lineups    │  crosshairs  │         │
│  │  (accounts)  │  (utilities) │   (configs)  │         │
│  │              │              │              │         │
│  │ - username   │ - map        │ - name       │         │
│  │ - email      │ - agent      │ - code       │         │
│  │ - password   │ - images[]   │ - category   │         │
│  │ - rank       │ - isPrivate  │ - isPrivate  │         │
│  │ - avatar     │ - userId     │ - userId     │         │
│  └──────────────┴──────────────┴──────────────┘         │
└───────────────────────────────────────────────────────────┘
```

---

### Data Flow Diagrams

#### 1. User Registration Flow
```
User (Browser)
    │
    ├─► Fills registration form
    │   (username, email, password, rank, agent)
    │
    ├─► Clicks "Create Account"
    │
    ▼
Frontend (register.html)
    │
    ├─► Validates password match
    ├─► Validates password length (≥6)
    │
    ├─► POST /api/auth/register
    │   Body: { username, email, password, rank, favoriteAgent }
    │
    ▼
Backend (authRoutes.js)
    │
    ├─► Validates required fields
    ├─► Checks email doesn't exist
    │
    ▼
Database Layer (userDb.js)
    │
    ├─► Hashes password with bcrypt (10 rounds)
    ├─► Creates user document
    ├─► Inserts into MongoDB users collection
    │
    ├─► Returns user (without password)
    │
    ▼
Response to Frontend
    │
    ├─► Success → Redirect to /login.html
    ├─► Error → Show alert with specific error
    │
    ▼
User sees login page
```

#### 2. Creating a Lineup with Images
```
Logged-In User
    │
    ├─► Clicks "Add New Lineup"
    │
    ▼
Frontend Modal Opens
    │
    ├─► User uploads 3 images
    │   │
    │   ├─► FileReader reads as Base64
    │   ├─► Canvas API compresses each to 800x800 @ 70%
    │   ├─► Stores in selectedImages array
    │   └─► Displays previews with numbers
    │
    ├─► User fills form fields
    ├─► User checks "Make this lineup private"
    ├─► Clicks "Save Lineup"
    │
    ▼
Frontend (lineups.js)
    │
    ├─► Constructs lineupData object
    │   { map, agent, ability, images: [base64, base64, base64],
    │     userId: currentUser._id, isPrivate: true }
    │
    ├─► POST /api/lineups
    │   Headers: { 'Content-Type': 'application/json',
    │              'x-user-id': currentUser._id }
    │   Body: lineupData
    │
    ▼
Backend (lineupRoutes.js)
    │
    ├─► Validates required fields (map, agent, ability)
    │
    ▼
Database Layer (lineupDb.js)
    │
    ├─► Converts userId string to ObjectId
    ├─► Adds createdAt, updatedAt timestamps
    ├─► Inserts lineup into MongoDB lineups collection
    │
    ├─► Returns created lineup with _id
    │
    ▼
Response to Frontend
    │
    ├─► Success → Re-fetches lineups with filters
    ├─► Lineup appears in grid with "🔒 Private" badge
    ├─► Carousel shows all 3 images
    ├─► Modal closes, form resets
    │
    ▼
User sees new lineup with images
```

#### 3. Privacy Filtering Logic
```
User Requests Lineups
    │
    ├─► GET /api/lineups
    │   Headers: { 'x-user-id': currentUser._id } (if logged in)
    │
    ▼
Backend (lineupRoutes.js)
    │
    ├─► Extracts requestingUserId from headers
    │
    ▼
Database Layer (lineupDb.js)
    │
    ├─► Builds query based on privacy:
    │
    ├─► IF requestingUserId exists:
    │   │
    │   └─► query.$or = [
    │         { isPrivate: { $ne: true } },        // All public
    │         { userId: requestingUserId }         // User's private
    │       ]
    │
    ├─► ELSE (not logged in):
    │   │
    │   └─► query.$or = [
    │         { isPrivate: { $ne: true } },        // Only public
    │         { isPrivate: { $exists: false } }
    │       ]
    │
    ├─► Executes MongoDB find(query)
    │
    ▼
Response to Frontend
    │
    ├─► Returns filtered lineups
    │
    ├─► Logged-in user sees:
    │   - All public lineups (from everyone)
    │   - Their own private lineups
    │
    ├─► Logged-out user sees:
    │   - Only public lineups
    │
    ▼
Frontend renders appropriate lineups
```

---

## User Flow Diagrams

### Complete User Journey: From Registration to Creating Private Lineup

**Scenario:** Arjun creates an account and adds his first private lineup for tournament preparation.
```
START: Arjun visits homepage for the first time
  │
  ├─► Homepage loads (not logged in)
  │   - Nav shows: "Login | Register"
  │   - Clicks "Register"
  │
  ▼
Registration Page
  │
  ├─► Fills registration form:
  │   - Username: "ArjunDuelist"
  │   - Email: "arjun.gaming@email.com"
  │   - Password: "immortal2024"
  │   - Confirm Password: "immortal2024"
  │   - Rank: "Immortal"
  │   - Favorite Agent: "Jett"
  │
  ├─► Clicks "Create Account"
  │   │
  │   ├─► Frontend validates passwords match ✓
  │   ├─► Sends POST to /api/auth/register
  │   ├─► Backend hashes password with bcrypt
  │   ├─► Creates user document in MongoDB
  │   └─► Success → Redirects to /login.html
  │
  ▼
Login Page
  │
  ├─► Enters credentials:
  │   - Email: "arjun.gaming@email.com"
  │   - Password: "immortal2024"
  │
  ├─► Clicks "Login"
  │   │
  │   ├─► Backend validates password hash ✓
  │   ├─► Returns user object (no password)
  │   ├─► Frontend saves to localStorage
  │   └─► Success → Redirects to /
  │
  ▼
Homepage (Now Logged In)
  │
  ├─► Nav shows: "Profile (ArjunDuelist) | Logout"
  ├─► Clicks "Profile" to check it out
  │
  ▼
Profile Page
  │
  ├─► Sees default profile:
  │   - Username: ArjunDuelist
  │   - Email: arjun.gaming@email.com
  │   - Rank: Immortal (with badge)
  │   - Stats: 0 Lineups, 0 Crosshairs
  │
  ├─► Clicks "Edit Profile"
  │
  ▼
Edit Profile Modal
  │
  ├─► Clicks "Choose Agent Icon" (default active)
  ├─► Scrolls through agent grid
  ├─► Clicks on "Jett" → highlights with cyan glow
  ├─► Adds bio: "Immortal duelist main, team captain"
  ├─► Rank already "Immortal" → Immortal badge auto-assigned
  ├─► Clicks "Save Changes"
  │   │
  │   └─► Profile updates with Jett icon + Immortal badge
  │
  ├─► Clicks "Lineups" in nav
  │
  ▼
Lineups Page
  │
  ├─► Sees 5 public lineups from other users
  ├─► Needs to add tournament strategy lineup
  ├─► Clicks "Add New Lineup"
  │
  ▼
Add Lineup Modal
  │
  ├─► Uploads 3 images from his screenshot folder:
  │   1. Position_Bind_Hookah.png (2.1 MB)
  │   2. Crosshair_Placement.png (1.8 MB)
  │   3. Viper_Wall_Result.png (2.3 MB)
  │   │
  │   ├─► Each image processes through Canvas API
  │   ├─► Compressed to 800x800 @ 70% quality
  │   ├─► Reduced to ~100KB each
  │   └─► Previews show with numbers 1, 2, 3
  │
  ├─► Fills lineup details:
  │   - Map: "Bind"
  │   - Agent: "Viper"
  │   - Ability: "Smoke"
  │   - Site: "A Site"
  │   - Position: "Execute"
  │   - Throw Type: "Standing Throw"
  │   - Landmark: "Hookah window"
  │   - Description: "Tournament A-execute smoke. Blocks hookah and short simultaneously. Coordinate with wall for full site control."
  │   - Video URL: (leaves empty)
  │   - Author: "ArjunDuelist" (pre-filled)
  │
  ├─► CHECKS "🔒 Make this lineup private"
  │   (Reason: Tournament strategy, don't want opponents to see)
  │
  ├─► Clicks "Save Lineup"
  │   │
  │   ├─► Frontend sends POST /api/lineups
  │   ├─► Backend creates lineup with userId + isPrivate: true
  │   ├─► Inserts into MongoDB lineups collection
  │   └─► Returns success
  │
  ▼
Lineups Page Refreshes
  │
  ├─► New lineup appears at top with:
  │   - Image carousel showing image 1/3
  │   - Navigation: ‹ ••• › (dots and arrows)
  │   - BIND header in red
  │   - Tags: Viper, Smoke, A Site, 📷 3 images, 🔒 Private
  │   - Edit ✏️ and Delete 🗑️ icons visible
  │   - Description text
  │   - "by ArjunDuelist"
  │
  ├─► Clicks through carousel arrows → sees all 3 images
  ├─► Result count: "Showing 6 lineups" (5 public + 1 his private)
  │
  ├─► Tests privacy: Clicks "Logout"
  │
  ▼
Logged Out - Lineups Page
  │
  ├─► Private lineup DISAPPEARS ✓
  ├─► Only 5 public lineups visible
  ├─► Result count: "Showing 5 lineups"
  │
  ├─► Logs back in
  │
  ▼
Logged In - Lineups Page
  │
  ├─► Private lineup REAPPEARS ✓
  ├─► Shows 6 lineups again
  ├─► Can edit or delete his private lineup
  ├─► Can toggle it to public later if tournament ends
  │
END: Lineup successfully saved with privacy protection
```

---

### "View My Content" User Flow

**Scenario:** Vedant wants to review all his personal lineups before a ranked session.
```
START: Vedant is logged in and on homepage
  │
  ├─► Clicks "Profile (VedantGamer)"
  │
  ▼
Profile Page
  │
  ├─► Sees his statistics:
  │   - 8 Lineups Created
  │   - 3 Crosshairs Created
  │   - 11 Total Contributions
  │
  ├─► Clicks "View My Lineups" button
  │
  ▼
Lineups Page with User Filter
  │
  ├─► URL: /lineups.html?user=VEDANT_USER_ID
  ├─► Page header: "Lineup Library"
  ├─► Result count: "Showing 8 of your lineups"
  │
  ├─► Displays ALL his lineups:
  │   ✅ 5 public lineups (community can see these)
  │   ✅ 3 private lineups (only he can see) 🔒
  │
  ├─► Each card shows edit/delete buttons
  ├─► No other users' lineups appear
  │
  ├─► He can still use search and filters:
  │   - Searches "Sova" → shows his Sova lineups only
  │   - Filters Map: "Ascent" → shows his Ascent lineups only
  │
  ├─► Clicks "Reset Filters"
  │   - URL changes to: /lineups.html (removes ?user= param)
  │   - Now shows ALL public lineups from everyone
  │   - Plus his 3 private lineups
  │   - Result count: "Showing 23 lineups"
  │
END: Vedant reviewed his personal collection, then browsed community content
```

---

## Design Principles

### 1. Simplicity First
- Clean, uncluttered interface
- One primary action per page
- Clear hierarchy (headers, subheaders, body text)
- Minimal color palette (dark + red + cyan)

### 2. Valorant Authenticity
- Colors match Valorant branding (red #ff4655, cyan #00d1ff)
- Dark mode matches in-game aesthetic
- Agent and rank imagery from actual game
- Terminology matches game language

### 3. Mobile-First Responsive
- All layouts use CSS Grid/Flexbox for responsiveness
- Touch-friendly button sizes (min 44x44px)
- Readable font sizes on mobile (min 16px for inputs)
- Collapsible navigation on mobile

### 4. Performance Optimization
- Image compression (80-90% size reduction)
- Client-side filtering (reduces server load)
- Lazy loading for images
- Minimal HTTP requests

### 5. Security by Design
- Passwords hashed, never transmitted or stored plain
- Privacy controls at database level
- Ownership verification before mutations
- Input validation on client and server

### 6. Accessibility Considerations
- Semantic HTML5 tags
- Alt text on images
- ARIA labels on interactive elements
- Keyboard navigation support
- Sufficient color contrast (WCAG AA)

---

## Color Palette

### Primary Colors
- **Primary Red**: `#ff4655` - CTA buttons, titles, highlights
- **Accent Cyan**: `#00d1ff` - Links, agent tags, secondary highlights
- **Success Green**: `#00ff88` - Success messages, copy code button
- **Warning Yellow**: `#ffd966` - Private badges, warnings

### Background Colors
- **Dark Background**: `#0f1923` - Page background
- **Light Background**: `#1a2634` - Cards, modals, inputs
- **Border**: `#2c3e50` - Borders and dividers

### Text Colors
- **Primary Text**: `#ffffff` - Headers, labels, important text
- **Secondary Text**: `#b4bdc8` - Body text, descriptions, metadata

---

## Typography

- **Font Family**: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif
- **Headers**: 
  - H1: 3rem (48px), bold
  - H2: 2rem (32px), bold
  - H3: 1.5rem (24px), bold
- **Body**: 1rem (16px), regular
- **Small Text**: 0.875rem (14px)
- **Code**: 'Courier New', monospace

---

## Responsive Breakpoints
```css
/* Mobile First Approach */

/* Small devices (phones, less than 768px) */
@media (max-width: 768px) {
  - Single column layouts
  - Stacked navigation
  - Full-width buttons
  - Smaller font sizes
}

/* Medium devices (tablets, 768px and up) */
@media (min-width: 768px) {
  - 2 column grids
  - Horizontal navigation
}

/* Large devices (desktops, 1024px and up) */
@media (min-width: 1024px) {
  - 3-4 column grids
  - Maximum container width: 1200px
}
```

---

## Interactive Elements

### Buttons
- **Primary**: Red background, white text, hover lifts + darkens
- **Secondary**: Gray background, white text, hover darkens
- **Icon Buttons**: Transparent, colored on hover
- **Disabled**: 50% opacity, not-allowed cursor

### Forms
- **Inputs**: Dark background, light border, red border on focus
- **Validation**: Browser default + custom alerts
- **File Upload**: Custom styled, shows previews
- **Checkboxes**: Custom styling with theme colors

### Cards
- **Default**: Light background, bordered
- **Hover**: Lifts (-5px), glows with colored shadow
- **Active**: Border color changes to accent

### Modals
- **Overlay**: 70% black background
- **Content**: Centered, max 600-750px width
- **Close**: X button, click outside, or Cancel button
- **Animation**: Fade in (0.3s)

---

## Image Assets Requirements

### Agent Icons (28 files)
- **Location**: `public/images/agents/`
- **Format**: PNG with transparency
- **Size**: 512x512px (will display at various sizes)
- **Naming**: Lowercase, no spaces (e.g., `jett.png`, `kayo.png`)
- **Style**: Official Valorant agent portraits
- **Fallback**: Colored placeholders with agent names if missing

### Rank Badges (10 files)
- **Location**: `public/images/ranks/`
- **Format**: PNG with transparency
- **Size**: 256x256px
- **Naming**: Lowercase (e.g., `gold.png`, `radiant.png`)
- **Style**: Official Valorant rank badges
- **Fallback**: Hidden if image missing

### Map Images (12 files)
- **Location**: `public/images/maps/`
- **Format**: PNG or JPG
- **Size**: 600x400px (landscape)
- **Naming**: Lowercase (e.g., `ascent.png`, `abyss.png`)
- **Style**: Minimaps or overview shots
- **Fallback**: Colored placeholders with map names if missing

### User-Uploaded Images
- **Lineups**: Up to 5 per lineup
- **Crosshairs**: 1 per crosshair
- **Profile Pictures**: 1 per user (or agent icon)
- **Processing**: Auto-compressed to max 800x800px @ 70% quality
- **Storage**: Base64 in MongoDB

---

## Wireframes

### Desktop Layout (1920x1080)