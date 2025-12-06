# Valorant Utility Hub

A comprehensive full-stack web application for Valorant players to create, browse, and manage ability lineups and crosshair configurations with user authentication and privacy controls.

## Author
**Vidheya Bole**  
Email: bole.v@northeastern.edu  
CS5610 Web Development 
Northeastern University

## Project Links
- **Live Demo**: [Your Render URL - Add after deployment]
- **GitHub Repository**: [Your GitHub URL - Add after pushing]
- **Demo Video**: https://www.youtube.com/watch?v=6tP94d5odiU

## Project Objective

Valorant Utility Hub solves the critical problem of scattered utility information across multiple platforms (YouTube, TikTok, Google Docs) by providing a centralized, community-driven platform where players can:

- **Create and share** detailed ability lineups with up to 5 images per lineup showing position, crosshair placement, and results
- **Browse professional** crosshair configurations from top players with visual previews
- **Manage privacy** - keep strategies private or share them publicly with the community
- **Track contributions** through personalized user profiles with statistics
- **Search and filter** through content using real-time search and smart filtering
- **Authenticate securely** with bcrypt password hashing
- **Access everything** on mobile or desktop with responsive design

This tool serves competitive players, content creators, and casual players who need quick, reliable access to accurate game utilities.

## Screenshots

### Home Page
![Home Page](screenshots/home page.png)
*Landing page with interactive statistics and maps modal*

### Interactive Maps Modal
![Maps Modal](screenshots/maps-modal.png)
*Click on any map to view filtered lineups*

### Lineups Library with Image Carousel
![Lineups](screenshots/lineups.png)
*Browse community lineups with multiple images and carousel navigation*

### Lineup Image Carousel
![Lineup Carousel](screenshots/lineups-carousel.png)
*Multiple images showing position, crosshair placement, and result*

### Add Lineup with Multiple Images
![Add Lineup](screenshots/add-lineup.png)
*Upload up to 5 images per lineup with preview*

### Crosshair Gallery
![Crosshairs](screenshots/crosshairs.png)
*Professional crosshair configurations with visual previews*

### User Profile with Agent Icon & Rank Badge
![Profile](screenshots/profile.png)
*Personalized profiles with agent icons, rank badges, and statistics*

### Search & Filter Functionality
![Search & Filter](screenshots/search-filter.png)
*Real-time search with smart filtering options*

### Privacy Controls
![Private Content](screenshots/private-badge.png)
*Keep lineups and crosshairs private with visibility badges*

## Features

### User Authentication System
- **Secure Registration**: Create accounts with username, email, and bcrypt-hashed passwords
- **Login/Logout**: Persistent sessions using localStorage
- **Password Security**: Minimum 6 characters, bcrypt hashing with salt rounds
- **User Profiles**: Customizable profiles with bio, rank, and favorite agent
- **Profile Pictures**: Choose from 28 Valorant agent icons or upload custom images
- **Auto Rank Badges**: Select rank from dropdown, badge image automatically assigns
- **User Statistics**: Track personal contributions (lineups and crosshairs created)

### Lineup Library
- **Full CRUD Operations**: Create, read, update, and delete ability lineups
- **Multiple Image Upload**: Upload up to 5 images per lineup showing position, crosshair placement, and result
- **Image Carousel**: Interactive carousel with navigation arrows and dots to browse through images
- **Image Compression**: Automatic compression to 800x800px @ 70% quality for optimal performance
- **Privacy Controls**: Mark lineups as public (visible to all) or private (only you can see)
- **Ownership Verification**: Only edit/delete your own lineups
- **Advanced Search**: Real-time keyword search across all fields (map, agent, ability, description, landmark)
- **Smart Filtering**: Filter by map, agent, and ability type with instant results
- **Detailed Information**: Site, position, throw type, landmark, optional video links
- **12 Maps Supported**: Abyss, Ascent, Bind, Breeze, Corrode, Fracture, Haven, Icebox, Lotus, Pearl, Split, Sunset

### Crosshair Gallery
- **Visual Previews**: CSS/HTML-rendered crosshair previews showing exact appearance
- **One-Click Copy**: Instantly copy crosshair codes to clipboard
- **Image Upload**: Upload crosshair screenshots with automatic compression
- **Privacy Controls**: Keep crosshairs private or share with community
- **Category System**: Filter by Pro Player, Minimal, Dot Only, Classic, and Fun/Meme
- **Color Options**: 8 color choices (White, Green, Yellow, Cyan, Red, Pink, Purple, Blue)
- **Customization**: Adjust thickness, length, center dot, and outlines
- **Professional Crosshairs**: Includes accurate codes from TenZ, Shroud, ScreaM

### Interactive Home Page
- **Clickable Statistics**: Click "Total Lineups" or "Total Crosshairs" to navigate directly
- **Maps Modal**: Click "12 Maps Covered" to open interactive map browser
- **Map Filtering**: Click any map to view lineups filtered by that map
- **Real-time Stats**: Statistics update automatically as content is added

### Technical Features
- **Client-Side Rendering**: Pure vanilla JavaScript with no frameworks
- **ES6 Modules**: Modern JavaScript with import/export throughout
- **RESTful API**: Clean Express.js backend with proper HTTP methods (GET, POST, PUT, DELETE)
- **MongoDB Integration**: Native NodeJS driver (no Mongoose)
- **3 Collections**: Users, lineups, and crosshairs with relationships via userId
- **Image Optimization**: Automatic Base64 image compression before storage
- **Modular Architecture**: Organized code structure with separation of concerns
- **Responsive Design**: Mobile-friendly interface with CSS Grid and Flexbox
- **Real-time Updates**: Dynamic content loading without page refreshes
- **Session Management**: localStorage-based authentication state
- **Error Handling**: Comprehensive error handling with user-friendly messages

## Technologies Used

### Backend
- **Node.js (v16+)**: JavaScript runtime environment
- **Express.js**: Web application framework
- **MongoDB**: NoSQL database for flexible document storage
- **MongoDB NodeJS Driver**: Native database driver (no Mongoose)
- **bcrypt (v5.1.1)**: Password hashing and salting for security
- **dotenv**: Environment variable management
- **CORS**: Cross-origin resource sharing

### Frontend
- **HTML5**: Semantic markup with proper structure
- **CSS3**: Modern styling with CSS Grid, Flexbox, and CSS Variables
- **Vanilla JavaScript (ES6+)**: Client-side logic with modules, async/await, Fetch API
- **Canvas API**: Image compression and manipulation
- **LocalStorage API**: Session persistence
- **Fetch API**: HTTP requests to backend

### Development Tools
- **ESLint**: Code linting and quality checks
- **Prettier**: Consistent code formatting
- **Nodemon**: Automatic server restart during development
- **Git**: Version control

## Installation & Setup

### Prerequisites
- Node.js v16 or higher
- MongoDB Atlas account (free tier)
- Git
- Modern web browser (Chrome, Firefox, Edge)

### Step 1: Clone the Repository
```bash
git clone [your-repo-url]
cd valorant-utility-hub
```

### Step 2: Install Dependencies
```bash
npm install
```

This installs:
- express, mongodb, dotenv, cors, bcrypt (dependencies)
- eslint, prettier, nodemon (dev dependencies)

### Step 3: Configure Environment Variables

Create a `.env` file in the root directory:
```
MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/valorant_hub?retryWrites=true&w=majority
PORT=3000
```

**To get your MongoDB URI:**
1. Create a free cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a database user with password
3. Whitelist your IP address (0.0.0.0/0 for development)
4. Click "Connect" → "Connect your application"
5. Copy the connection string and replace `<password>` with your actual password
6. Add `/valorant_hub` after `.mongodb.net/` and before `?`

### Step 4: Seed the Database (Optional)
```bash
npm run seed
```

This populates the database with 10 sample records (5 lineups + 5 crosshairs).

**Or skip seeding and add your own content through the UI.**

### Step 5: Start the Development Server
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Step 6: Create an Account
1. Go to `http://localhost:3000`
2. Click "Register"
3. Create your account
4. Login and start adding content!

## Project Structure
```
valorant-utility-hub/
├── server/
│   ├── db/
│   │   ├── connection.js       # MongoDB connection setup
│   │   ├── userDb.js          # User authentication operations
│   │   ├── lineupDb.js        # Lineup CRUD operations
│   │   ├── crosshairDb.js     # Crosshair CRUD operations
│   │   ├── seed.js            # Database seeding script
│   │   └── clear.js           # Database clearing script (optional)
│   ├── routes/
│   │   ├── authRoutes.js      # Authentication endpoints
│   │   ├── lineupRoutes.js    # Lineup API endpoints
│   │   └── crosshairRoutes.js # Crosshair API endpoints
│   └── server.js              # Express server entry point
├── public/
│   ├── index.html             # Home page with stats and maps modal
│   ├── login.html             # User login page
│   ├── register.html          # User registration page
│   ├── profile.html           # User profile page
│   ├── lineups.html           # Lineups library page
│   ├── crosshairs.html        # Crosshairs gallery page
│   ├── css/
│   │   ├── main.css           # Global styles and variables
│   │   ├── home.css           # Home page specific styles
│   │   ├── auth.css           # Authentication pages styles
│   │   ├── profile.css        # Profile page styles
│   │   ├── lineups.css        # Lineups page styles
│   │   └── crosshairs.css     # Crosshairs page styles
│   ├── js/
│   │   ├── lineups.js         # Lineup page client logic
│   │   ├── crosshairs.js      # Crosshair page client logic
│   │   └── profile.js         # Profile page client logic
│   └── images/
│       ├── agents/            # 28 Valorant agent icons
│       ├── ranks/             # 10 rank badge images
│       └── maps/              # 12 map minimap images
├── screenshots/               # Project screenshots for README
├── .env                       # Environment variables (create this, not in git)
├── .gitignore                 # Git ignore rules
├── .eslintrc.json            # ESLint configuration
├── .prettierrc               # Prettier configuration
├── package.json              # Project dependencies and scripts
├── README.md                 # This file
└── LICENSE                   # MIT License
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile/:userId` - Get user profile and stats
- `PUT /api/auth/profile/:userId` - Update user profile
- `POST /api/auth/change-password` - Change user password
- `POST /api/auth/logout` - Logout user

### Lineups
- `GET /api/lineups` - Get all lineups (with optional filters and privacy filtering)
  - Query params: `?map=Ascent&agent=Sova&ability=Recon&userId=xxx`
  - Headers: `x-user-id` for privacy filtering
- `GET /api/lineups/:id` - Get a specific lineup
- `POST /api/lineups` - Create a new lineup (requires authentication)
- `PUT /api/lineups/:id` - Update a lineup (owner only)
- `DELETE /api/lineups/:id` - Delete a lineup (owner only)
- `GET /api/lineups/stats` - Get public lineup statistics

### Crosshairs
- `GET /api/crosshairs` - Get all crosshairs (with optional filters and privacy filtering)
  - Query params: `?category=Pro Player&color=Cyan&userId=xxx`
  - Headers: `x-user-id` for privacy filtering
- `GET /api/crosshairs/:id` - Get a specific crosshair
- `POST /api/crosshairs` - Create a new crosshair (requires authentication)
- `PUT /api/crosshairs/:id` - Update a crosshair (owner only)
- `DELETE /api/crosshairs/:id` - Delete a crosshair (owner only)
- `GET /api/crosshairs/stats` - Get public crosshair statistics

## User Stories

### User Story 1: User Authentication & Profile Management
**As a Valorant player**, I want to create an account with my username, email, and password, customize my profile with an agent icon and rank badge, and track my contributions, **so that** I can build my personal collection of lineups and crosshairs while showcasing my gaming identity.

**Implementation:**
- User registration with email validation and password strength requirements
- Secure authentication using bcrypt password hashing (10 salt rounds)
- User profiles with customizable bio, rank, and favorite agent
- Agent icon selection from grid of 28 Valorant agents OR custom image upload
- Automatic rank badge assignment from 10 rank tiers
- Real-time statistics showing lineups created, crosshairs created, and total contributions
- Session management using localStorage
- Profile picture compression for optimal storage

### User Story 2: Lineup Management with Privacy Controls
**As a competitive Valorant player**, I want to create lineups with multiple reference images, mark them as public or private, search and filter through community lineups, and manage only my own content, **so that** I can learn from the community while keeping my personal strategies confidential.

**Implementation:**
- Full CRUD operations on lineups collection with ownership verification
- Upload up to 5 images per lineup (position, crosshair placement, result, additional angles)
- Interactive image carousel with navigation arrows and indicator dots
- Privacy controls: public (visible to all) or private (only visible to creator)
- Advanced filtering by map (12 maps), agent (28 agents), and ability type
- Real-time keyword search across all fields
- Edit/delete buttons only appear on user's own lineups
- "View My Lineups" functionality to see all personal lineups (public + private)
- Automatic image compression (800x800px @ 70% quality)
- Video URL support for YouTube clips

### User Story 3: Crosshair Management with Visual Previews
**As a player experimenting with crosshairs**, I want to browse crosshair profiles with visual previews, upload screenshots, copy codes instantly, control privacy, and save my own configurations, **so that** I can find and test the perfect crosshair for my playstyle while keeping personal presets private.

**Implementation:**
- Full CRUD operations on crosshairs collection with ownership verification
- CSS/HTML-rendered visual crosshair previews
- Image upload for crosshair screenshots with compression
- One-click clipboard copy of crosshair codes
- Privacy controls (public/private)
- Category filtering (Pro Player, Minimal, Dot Only, Classic, Fun/Meme)
- Color filtering (8 color options)
- Real-time search functionality
- Edit/delete buttons only on user's own crosshairs
- "View My Crosshairs" to manage personal collection
- Professional crosshairs from TenZ, Shroud, ScreaM included

## Enhanced Features Beyond Original Proposal

### Authentication & User System
- ✅ User registration and login with bcrypt security
- ✅ User profiles with customizable avatars and rank badges
- ✅ Session management and persistence
- ✅ User statistics and contribution tracking
- ✅ Agent icon selection grid (28 agents)
- ✅ Automatic rank badge assignment (10 ranks)

### Privacy & Ownership
- ✅ Public/private toggle for all content
- ✅ Privacy badges (🔒) on private items
- ✅ Ownership-based edit/delete permissions
- ✅ "View My Content" functionality
- ✅ Database queries filter based on privacy and ownership

### Enhanced User Experience
- ✅ Multiple image upload (up to 5 per lineup)
- ✅ Interactive image carousel with navigation
- ✅ Clickable statistics on home page
- ✅ Interactive maps modal with 12 maps
- ✅ Map-based filtering from home page
- ✅ Image compression for performance
- ✅ Real-time search across all pages
- ✅ Responsive mobile-friendly design

### Image Management
- ✅ Automatic image compression (reduces size by 80-90%)
- ✅ Base64 storage in MongoDB
- ✅ Multiple image support with carousel
- ✅ Image preview before upload
- ✅ Individual image removal in multi-upload
- ✅ Fallback placeholders if images missing

## Design Decisions

### Quality Over Quantity
While the original proposal mentioned 1,000+ synthetic entries, I prioritized **quality over quantity** by initially including only 10 accurate, verified Valorant lineups and crosshairs. This makes the tool genuinely useful for players rather than filled with fake data. 

The database structure supports unlimited entries, and users can easily add authentic content through the comprehensive CRUD interface. The focus is on building a **real community tool** where every entry adds value.

### Multiple Images for Lineups
After initial implementation, I enhanced lineups to support up to 5 images per entry based on the real needs of Valorant players. Lineups require multiple reference points:
1. **Position on map** - Where to stand
2. **Crosshair placement** - Exact aim point
3. **Result/landing** - Where the utility lands
4. **Additional angles** - Alternative views or confirmations

This multi-image approach is more valuable than a single screenshot and better serves the player community.

### Privacy-First Design
The addition of privacy controls allows players to:
- Share knowledge with the community (public lineups/crosshairs)
- Keep competitive strategies confidential (private content)
- Build personal utility libraries without forced sharing
- Control their digital footprint

This respects both community collaboration and competitive privacy needs.

### Image Compression Strategy
All uploaded images are automatically compressed using HTML5 Canvas API to:
- Reduce file size by 80-90% (from MB to KB)
- Maintain visual quality at 70% JPEG compression
- Stay within MongoDB 16MB document limit
- Ensure fast loading times across all devices
- Optimize for mobile data usage

Maximum dimensions: 800x800px  
Format: JPEG  
Quality: 70%

### Agent Icons vs Custom Upload
The dual-option profile picture system serves different user preferences:
- **Agent Icons**: Quick selection from pre-loaded Valorant agents (28 options)
- **Custom Upload**: Personal photos for users who prefer custom avatars

This flexibility accommodates both casual players and personal branding preferences.

### Automatic Rank Badges
Rather than requiring manual upload, rank badges are automatically assigned when users select their rank from the dropdown. This:
- Reduces user effort
- Ensures consistency across profiles
- Prevents mismatched rank/badge combinations
- Maintains visual coherence

## Technical Implementation Details

### Authentication Flow
1. User registers with username, email, password
2. Password hashed with bcrypt (10 salt rounds)
3. User document created in MongoDB
4. Login validates credentials against hashed password
5. Successful login returns user object (without password)
6. User object stored in localStorage
7. All subsequent requests include user context
8. Logout clears localStorage

### Privacy Implementation
```javascript
// Database query logic
if (requestingUserId) {
  // Show public content + user's own private content
  query.$or = [
    { isPrivate: { $ne: true } },        // Public items
    { userId: requestingUserId }         // User's private items
  ]
} else {
  // Not logged in - only public content
  query.isPrivate = { $ne: true }
}
```

### Image Compression Process
1. User selects image(s) from file system
2. FileReader reads as DataURL (Base64)
3. Image loaded into Canvas element
4. Canvas resizes to max 800x800 maintaining aspect ratio
5. Canvas exports as JPEG at 70% quality
6. Compressed Base64 sent to MongoDB
7. Storage typically reduced from 2-5MB to 50-200KB per image

### Ownership Verification
```javascript
// Before update/delete
const existing = await getLineupById(id);
if (existing.userId.toString() !== requestingUserId) {
  throw new Error('Not authorized');
}
```

## Database Schema

### Users Collection
```javascript
{
  _id: ObjectId,
  username: String,
  email: String (unique, lowercase),
  password: String (bcrypt hashed),
  profilePicture: String (Base64 or path),
  rankImage: String (auto-assigned path),
  bio: String,
  rank: String,
  favoriteAgent: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Lineups Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: users),
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
  images: [String] (Base64 array, max 5),
  isPrivate: Boolean,
  tags: [String],
  createdAt: Date,
  updatedAt: Date
}
```

### Crosshairs Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: users),
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
  imageUrl: String (Base64),
  isPrivate: Boolean,
  tags: [String],
  createdAt: Date,
  updatedAt: Date
}
```

## Code Quality & Best Practices

### Code Standards
- ✅ All code formatted with Prettier (consistent style)
- ✅ ESLint configuration with zero errors
- ✅ ES6 modules throughout (no CommonJS require())
- ✅ Async/await for all asynchronous operations
- ✅ Error handling with try-catch blocks
- ✅ Modular code organization (separation of concerns)
- ✅ Descriptive variable and function names
- ✅ Comments for complex logic

### Security Practices
- ✅ Passwords hashed with bcrypt (never stored in plain text)
- ✅ MongoDB credentials in .env (not in source code)
- ✅ .env file in .gitignore (never committed to git)
- ✅ Input validation on both client and server
- ✅ Ownership verification before updates/deletes
- ✅ SQL injection prevention (MongoDB parameterized queries)

### Performance Optimizations
- ✅ Image compression (80-90% size reduction)
- ✅ Database indexing on frequently queried fields
- ✅ Client-side filtering (reduces server requests)
- ✅ Efficient MongoDB queries with projection
- ✅ CSS minification through proper organization
- ✅ Lazy loading of images

### Adherence to Assignment Requirements
This project **strictly follows** all CS5610 Project 2 requirements:
- ✅ **No React** - Pure vanilla JavaScript
- ✅ **No Mongoose** - MongoDB native driver only
- ✅ **No Server-Side Rendering** - All rendering client-side
- ✅ **No Template Engines** - No Pug, EJS, Handlebars
- ✅ **ES6 Modules** - No CommonJS (require)
- ✅ **Client-Side Rendering** - All HTML generated in browser
- ✅ **Express + Node** - Standard backend stack
- ✅ **MongoDB Collections** - 3 collections with full CRUD
- ✅ **Forms** - Multiple forms with validation
- ✅ **Modular CSS** - Separate files per feature
- ✅ **ESLint + Prettier** - Code quality tools configured

## NPM Scripts
```bash
npm start          # Start production server
npm run dev        # Start development server with nodemon
npm run seed       # Seed database with sample data
npm run clear      # Clear all lineups and crosshairs
npm run lint       # Run ESLint
npm run format     # Format code with Prettier
```

## Deployment

### Deploying to Render.com

1. **Push to GitHub:**
```bash
git init
git add .
git commit -m "Complete Valorant Utility Hub"
git branch -M main
git remote add origin https://github.com/yourusername/valorant-utility-hub.git
git push -u origin main
```

2. **Deploy on Render:**
   - Create account at [render.com](https://render.com)
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Configure:
     - **Name**: valorant-utility-hub
     - **Environment**: Node
     - **Build Command**: `npm install`
     - **Start Command**: `npm start`
   - Add environment variable:
     - **Key**: `MONGODB_URI`
     - **Value**: (your MongoDB connection string)
   - Click "Create Web Service"
   - Wait 5-10 minutes for deployment

3. **Verify Deployment:**
   - Test all features on deployed URL
   - Create account and login
   - Add lineup and crosshair
   - Test privacy controls
   - Verify image uploads work

## Testing Guide

### Manual Testing Checklist

**Authentication:**
- [ ] Register new account
- [ ] Login with credentials
- [ ] View profile
- [ ] Edit profile (change bio, rank, agent)
- [ ] Upload profile picture (agent icon)
- [ ] Upload profile picture (custom image)
- [ ] Logout and verify session cleared

**Lineups:**
- [ ] Browse public lineups
- [ ] Use search bar
- [ ] Use filters (map, agent, ability)
- [ ] Create public lineup with images
- [ ] Create private lineup
- [ ] View image carousel
- [ ] Edit own lineup
- [ ] Delete own lineup
- [ ] Verify cannot edit others' lineups
- [ ] Click "View My Lineups"
- [ ] Verify private lineup shows when logged in
- [ ] Logout and verify private lineup hidden

**Crosshairs:**
- [ ] Browse crosshairs
- [ ] Use search and filters
- [ ] Copy crosshair code
- [ ] Create public crosshair with image
- [ ] Create private crosshair
- [ ] Edit own crosshair
- [ ] Delete own crosshair
- [ ] Click "View My Crosshairs"

**Home Page:**
- [ ] Click "Total Lineups" stat → navigate to lineups
- [ ] Click "Total Crosshairs" stat → navigate to crosshairs
- [ ] Click "12 Maps Covered" → open maps modal
- [ ] Click map in modal → filter lineups by that map

## Future Enhancements

- **Social Features**: Follow users, like/upvote lineups, comment system
- **Advanced Search**: Search by multiple criteria, save search filters
- **Collections**: Create custom lineup collections for specific strategies
- **Notifications**: Alert users when followed creators post new content
- **Video Integration**: Embed YouTube videos directly in lineup cards
- **Mobile App**: Native iOS/Android application
- **Export/Import**: Export lineups as JSON, share collections
- **Achievements**: Badges for contribution milestones
- **API Keys**: Allow third-party apps to integrate
- **Analytics**: Track most popular lineups, agents, maps

## Known Limitations

- **Image Storage**: Uses Base64 in MongoDB (works well but could use cloud storage like AWS S3 for production)
- **Session Management**: Uses localStorage (would use JWT tokens + httpOnly cookies in production)
- **Search**: Client-side filtering (would use MongoDB text search for larger datasets)
- **Rate Limiting**: No rate limiting on API endpoints (would add in production)
- **Email Verification**: No email verification on registration (would add SendGrid/Mailgun in production)

## Browser Compatibility

Tested and working on:
- ✅ Google Chrome (v90+)
- ✅ Microsoft Edge (v90+)
- ✅ Firefox (v88+)
- ✅ Safari (v14+)

Requires modern browser with ES6 support, Fetch API, and Canvas API.

## Contributing

This is a student project for CS5610 and is not actively maintained. However, feel free to fork and extend for your own use!

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- **Riot Games** - Valorant is a trademark of Riot Games. This project is not affiliated with or endorsed by Riot Games.
- **CS5610 Course Staff** - For guidance and instruction throughout the semester
- **Valorant Community** - For inspiration and the real-world problem this app solves
- **Professional Players** - Crosshair configurations sourced from publicly available pro player settings

## Development Notes

### Why This Tech Stack?

**Node.js + Express**: Industry-standard backend, non-blocking I/O perfect for real-time features

**MongoDB Native Driver**: Direct control over queries, better performance than ODM abstraction, follows assignment requirements

**Vanilla JavaScript**: Demonstrates fundamental understanding of JavaScript, DOM manipulation, and async programming without framework abstractions

**bcrypt**: Industry-standard password hashing, slow by design to prevent brute-force attacks

**Base64 Image Storage**: Simplifies deployment (no file server needed), keeps everything in MongoDB, trade-off of larger documents for simpler architecture

### Learning Outcomes

Through this project, I learned:
- RESTful API design and implementation
- NoSQL database design and querying
- Secure authentication with password hashing
- Client-side state management
- Image processing and optimization
- Modular code architecture
- Git version control
- Cloud deployment (Render + MongoDB Atlas)
- Privacy and ownership models in web applications
- Real-world full-stack development workflow

## Contact

**Vidheya Bole**  
Email: bole.v@northeastern.edu  
GitHub: [Your GitHub Profile]  

For questions, feedback, or collaboration opportunities, please reach out via email.

---

**Built with ❤️ for the Valorant community**