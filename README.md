# 🏡 Vridhi Real Estate - Next.js Website with Admin Panel

A modern, full-featured real estate website built with Next.js 14, featuring a complete admin panel for content management powered by Firebase.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Firebase Setup](#firebase-setup)
- [Admin Panel](#admin-panel)
- [Project Structure](#project-structure)
- [Usage Guide](#usage-guide)
- [Security](#security)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)

---

## 🌟 Overview

Vridhi Real Estate is a complete real estate website solution with:
- Public-facing website for property listings, agent profiles, and testimonials
- Secure admin panel for managing all content
- Real-time updates using Firebase
- Image upload and management
- Responsive design for all devices

## ✨ Features

### Public Website
- 🏠 **Home Page**: Hero section, featured properties, popular localities, services, and testimonials
- 📋 **Listings Page**: Browse all available properties with filtering options
- 👥 **Agents Page**: Meet the team with detailed agent profiles
- 📞 **Contact Page**: Get in touch with the agency
- 📖 **Buyer's & Seller's Guide**: Helpful resources for clients
- 📱 **Fully Responsive**: Works seamlessly on desktop, tablet, and mobile

### Admin Panel
- 🔐 **Secure Authentication**: Email/password login with Firebase Auth
- 📊 **Dashboard**: Real-time statistics for properties, agents, and testimonials
- 🏢 **Properties Management**:
  - Add, edit, and delete properties
  - Upload property images to Cloudinary
  - Mark properties as featured or sold
  - Full property details (title, address, price, bedrooms, bathrooms, area)
- 👤 **Agents Management**:
  - Add, edit, and delete agent profiles
  - Upload agent photos to Cloudinary
  - Manage contact information and bios
- 💬 **Testimonials Management**:
  - Add, edit, and delete client testimonials
  - Display social proof on home page
- 🔄 **Real-Time Updates**: All changes reflect instantly on the website
- 🎨 **Modern UI**: Clean interface with Tailwind CSS and Lucide icons

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **UI Library**: React 18
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Components**: Custom UI components + Radix UI primitives

### Backend & Services
- **Database**: Firebase Firestore (NoSQL)
- **Authentication**: Firebase Authentication
- **Image Storage**: Cloudinary (for property and agent images)
- **Hosting**: Vercel (recommended)

### Development Tools
- **Package Manager**: npm
- **Linting**: ESLint
- **Font Optimization**: next/font (Geist font family)

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm installed
- Firebase account ([console.firebase.google.com](https://console.firebase.google.com))
- Cloudinary account ([cloudinary.com](https://cloudinary.com)) - Free tier available
- Git installed

### Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd vridhi-real-estate
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up Firebase** (see [Firebase Setup](#firebase-setup) section)

4. **Set up Cloudinary** (see [Cloudinary Setup](#cloudinary-setup) section)

4. **Run the development server**
```bash
npm run dev
```

5. **Open in browser**
```
http://localhost:3000
```

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Run production build
npm run lint     # Run ESLint
```

---

## 🔥 Firebase Setup

### Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add Project" or select existing project
3. Project name: `vridhi-real-estate` (or your choice)
4. Enable Google Analytics (optional)
5. Click "Create Project"

### Step 2: Configure Firebase Credentials

1. In Firebase Console, click the **gear icon** ⚙️ → **Project Settings**
2. Scroll to **Your apps** → Click **Web icon** (`</>`)
3. Register app name: `vridhi-real-estate-web`
4. Copy the Firebase config object
5. Update `src/lib/firebase.js` with your credentials:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

### Step 3: Enable Firebase Services

#### Enable Authentication
1. Go to **Authentication** → **Get Started**
2. Click **Sign-in method** tab
3. Enable **Email/Password** provider
4. Click **Save**

#### Create Admin User
1. Go to **Authentication** → **Users** tab
2. Click **Add User**
3. Email: `admin@vridhirealestate.com`
4. Password: `12345678` (change this in production!)
5. Click **Add User**

#### Enable Firestore Database
1. Go to **Firestore Database** → **Create Database**
2. Choose **Start in test mode** (for development)
3. Select a Cloud Firestore location
4. Click **Enable**

---

## ☁️ Cloudinary Setup

Cloudinary is used for storing and managing property and agent images.

### Step 1: Create Cloudinary Account

1. Go to [cloudinary.com](https://cloudinary.com)
2. Sign up for a free account
3. Verify your email

### Step 2: Get Your Credentials

1. After login, go to your **Dashboard**
2. Note down these values:
   - **Cloud Name**: `dquflnv4j` (already configured)
   - **Upload Preset**: You'll create this in the next step

### Step 3: Create Upload Preset

1. Go to **Settings** → **Upload** tab
2. Scroll down to **Upload presets**
3. Click **Add upload preset**
4. Configure the preset:
   - **Preset name**: `vridhi`
   - **Signing Mode**: Select **Unsigned** (for browser uploads)
   - **Folder**: `vridhi-real-estate` (optional, for organization)
5. Click **Save**

### Step 4: Environment Variables (Optional)

The Cloudinary credentials are already configured in the code:
```javascript
Cloud Name: dquflnv4j
Upload Preset: vridhi
```

If you want to use environment variables instead, create a `.env.local` file:
```env
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=dquflnv4j
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=vridhi
```

### Step 5: Enable Auto-Delete (Optional)

To automatically clean up deleted images:
1. Go to **Settings** → **Upload** tab
2. Find your `vridhi` preset
3. Enable **Auto-delete** or set up lifecycle rules
4. Save changes

**Note**: With unsigned uploads, manual deletion via API is not supported. Images will be logged for deletion, but you'll need to either:
- Enable auto-delete in Cloudinary settings
- Manually clean up unused images from the Cloudinary dashboard
- Upgrade to signed uploads with API key/secret for programmatic deletion

---

### Step 4: Configure Firestore Security Rules (Recommended)

#### Firestore Security Rules
Go to **Firestore Database** → **Rules** and update:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read access to all users
    match /{collection}/{document} {
      allow read: if collection in ['properties', 'agents', 'testimonials'];
      allow write: if request.auth != null; // Only authenticated users
    }
  }
}
```

---

---

## 🔐 Admin Panel

### Accessing the Admin Panel

1. **Login URL**: `http://localhost:3000/admin`
2. **Credentials**:
   - Email: `admin@vridhirealestate.com`
   - Password: `12345678`
3. After login, you'll be redirected to the dashboard

### Admin Panel Structure

```
/admin                    → Login page
/admin/dashboard          → Main dashboard with statistics
/admin/properties         → Manage properties (CRUD)
/admin/agents            → Manage agents (CRUD)
/admin/testimonials      → Manage testimonials (CRUD)
```

### Features Overview

#### Dashboard (`/admin/dashboard`)
- Real-time statistics display
- Total properties, agents, and testimonials count
- Quick navigation to all management sections
- "View Site" button to preview public website
- Logout functionality

#### Properties Management (`/admin/properties`)
**Fields:**
- Title (required)
- Address (required)
- Price in ₹ (required)
- Bedrooms (required)
- Bathrooms (required)
- Area in Sq. Yards (required)
- Image (upload file or paste URL)
- Featured checkbox (display on home page)
- Sold checkbox (mark as sold)

**Actions:**
- ✅ Add new property
- ✏️ Edit existing property
- 🗑️ Delete property (with confirmation)
- 📸 Upload images to Cloudinary
- 🗑️ Auto-delete images from Cloudinary when property is deleted

#### Agents Management (`/admin/agents`)
**Fields:**
- Name (required)
- Job Title (required)
- Bio/Description (required)
- Email (required)
- Phone (required)
- Photo (upload file or paste URL)

**Actions:**
- ✅ Add new agent
- ✏️ Edit agent profile
- 🗑️ Delete agent (with confirmation)
- 📸 Upload photos to Cloudinary
- 🗑️ Auto-delete photos from Cloudinary when agent is deleted

#### Testimonials Management (`/admin/testimonials`)
**Fields:**
- Client Name (required)
- Location/Title (required)
- Testimonial Text (required)

**Actions:**
- ✅ Add new testimonial
- ✏️ Edit testimonial
- 🗑️ Delete testimonial (with confirmation)

### Data Flow

```
Admin Panel → Firebase Firestore + Cloudinary → Website Pages
     ↓              ↓           ↓                    ↓
  Add/Edit/Delete  Database   Images            Real-time Updates
```

1. Admin adds/edits data → Saved to Firebase Firestore
2. Images uploaded → Stored in Cloudinary with unique identifiers
3. Website pages → Fetch real-time data from Firestore on page load
4. Instant updates → No need to rebuild or redeploy!

---

## 📂 Project Structure

```
vridhi-real-estate/
├── public/                      # Static assets
├── src/
│   ├── app/                     # Next.js App Router pages
│   │   ├── layout.js           # Root layout (fonts, global styles)
│   │   ├── page.js             # Home page
│   │   ├── globals.css         # Global styles
│   │   ├── about/              # About page
│   │   ├── agents/             # Agents listing page (fetch from Firebase)
│   │   ├── buyers-guide/       # Buyer's guide page
│   │   ├── contact/            # Contact page
│   │   ├── listings/           # Property listings page (fetch from Firebase)
│   │   ├── sellers-guide/      # Seller's guide page
│   │   └── admin/              # Admin panel routes
│   │       ├── page.jsx        # Admin login
│   │       ├── dashboard/      # Admin dashboard
│   │       ├── properties/     # Properties management
│   │       ├── agents/         # Agents management
│   │       └── testimonials/   # Testimonials management
│   ├── components/
│   │   ├── AboutSection.jsx
│   │   ├── AgentCard.jsx
│   │   ├── FeaturedProperties.jsx  # (fetch from Firebase)
│   │   ├── FeaturedProjects.jsx
│   │   ├── Footer.jsx
│   │   ├── Header.jsx
│   │   ├── Hero.jsx
│   │   ├── PopularLocalities.jsx
│   │   ├── PropertyCard.jsx
│   │   ├── ServicesSection.jsx
│   │   ├── TestimonialsSection.jsx  # (fetch from Firebase)
│   │   ├── ProtectedRoute.jsx      # Auth wrapper for admin routes
│   │   ├── AdminSidebar.jsx        # Admin navigation sidebar
│   │   └── ui/                     # Reusable UI primitives
│   │       ├── button.jsx
│   │       ├── card.jsx
│   │       ├── input.jsx
│   │       ├── sheet.jsx           # Mobile menu
│   │       ├── navigation-menu.jsx
│   │       └── ... (other UI components)
│   └── lib/
│       ├── firebase.js             # Firebase config & initialization
│       ├── utils.js                # cn() utility for Tailwind
│       └── constants.js            # Site-wide constants
├── .github/
│   └── copilot-instructions.md     # AI assistant guidelines
├── components.json                 # shadcn/ui config
├── eslint.config.mjs              # ESLint configuration
├── jsconfig.json                  # Path aliases (@/*)
├── next.config.mjs                # Next.js config (remote images)
├── package.json                   # Dependencies & scripts
├── postcss.config.mjs             # PostCSS config
├── tailwind.config.js             # Tailwind CSS config
└── README.md                      # This file
```

### Key Files Explained

- **`src/lib/firebase.js`**: Firebase SDK initialization; exports `auth`, `db`, `storage`
- **`src/components/ProtectedRoute.jsx`**: HOC that protects admin routes (redirects to login if not authenticated)
- **`src/components/AdminSidebar.jsx`**: Persistent left sidebar for admin panel navigation
- **`src/app/layout.js`**: Conditionally hides header/footer on admin routes using `usePathname`
- **`src/app/admin/dashboard/page.jsx`**: Fetches real-time counts from Firestore collections
- **Import alias**: `@/*` maps to `src/*` (configured in `jsconfig.json`)

---

## 📖 Usage Guide

### Adding Your First Property

1. Log in to admin panel at `/admin`
2. Click **"Manage Properties"** from dashboard
3. Click **"Add Property"** button
4. Fill in all required fields:
   - Title (e.g., "Luxury 3BHK Villa")
   - Address (e.g., "123 Park Street, Mumbai")
   - Price (e.g., 15000000 for ₹1.5 Crore)
   - Bedrooms, Bathrooms, Area
5. Upload an image:
   - Click "Choose File" to upload from computer, OR
   - Paste an image URL
6. Check **"Featured"** to display on home page
7. Check **"Sold"** if property is already sold
8. Click **"Add Property"**
9. ✅ Property appears instantly on home page and listings page!

### Adding Your First Agent

1. From dashboard, click **"Manage Agents"**
2. Click **"Add Agent"** button
3. Fill in agent details:
   - Name (e.g., "John Doe")
   - Job Title (e.g., "Senior Real Estate Consultant")
   - Bio (brief description)
   - Email & Phone
4. Upload agent photo
5. Click **"Add Agent"**
6. ✅ Agent appears instantly on agents page!

### Adding Your First Testimonial

1. From dashboard, click **"Manage Testimonials"**
2. Click **"Add Testimonial"** button
3. Enter:
   - Client Name (e.g., "Sarah Johnson")
   - Location (e.g., "Mumbai" or "Property Buyer")
   - Testimonial text (client's feedback)
4. Click **"Add Testimonial"**
5. ✅ Testimonial appears instantly on home page!

### Editing Content

1. Navigate to the management page (Properties/Agents/Testimonials)
2. Find the item in the list
3. Click **"Edit"** button
4. Update fields in the modal
5. Click **"Update"** to save changes

### Deleting Content

1. Navigate to the management page
2. Find the item in the list
3. Click **"Delete"** button
4. Confirm deletion in the alert
5. ✅ Item removed instantly from website

---

## 🔒 Security

### Authentication
- ✅ Firebase Authentication with email/password
- ✅ Protected admin routes (login required)
- ✅ Session management (auto-logout on session expire)
- ✅ `ProtectedRoute` component wraps all admin pages

### Firestore Security
- ✅ Read access: Public for properties, agents, testimonials
- ✅ Write access: Authenticated users only
- ✅ Security rules configured in Firebase Console

### Cloudinary Security
- ✅ Unsigned uploads enabled via upload preset
- ✅ Images stored in `vridhi-real-estate` folder for organization
- ✅ Public read access for displaying images on website
- ✅ Browser-based uploads (no API keys exposed)
- ✅ Deletion logging for cleanup (enable auto-delete in Cloudinary settings)

### Best Practices
- 🔐 Change default admin password before production
- 🔐 Use environment variables for Firebase and Cloudinary config in production
- 🔐 Enable Firebase App Check for additional security
- 🔐 Set up proper authentication roles if multiple admins
- 🔐 Enable auto-delete in Cloudinary settings to clean up unused images
- 🔐 Configure CORS and domain restrictions in Firebase Console

---

## 🚢 Deployment

### Deploy on Vercel (Recommended)

1. **Push to GitHub/GitLab/Bitbucket**

2. **Import to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Select your repository
   - Vercel auto-detects Next.js

3. **Configure Environment Variables** (if needed):
   - Add Firebase config as environment variables
   - Update `src/lib/firebase.js` to use `process.env`

4. **Deploy**:
   - Click "Deploy"
   - Your site will be live at `https://your-project.vercel.app`

### Firebase Configuration for Production

1. **Update Security Rules** to production mode:
   ```javascript
   // Firestore: Remove test mode expiration
   // Storage: Add file size limits
   ```

2. **Configure Authorized Domains**:
   - Go to Firebase Console → Authentication → Settings → Authorized Domains
   - Add your Vercel domain

3. **Set up Billing** (if needed):
   - Firebase has a generous free tier
   - Monitor usage in Firebase Console

### Pre-Deployment Checklist

- [ ] Change admin email and password
- [ ] Update Firebase security rules to production mode
- [ ] Add environment variables in Vercel
- [ ] Test all CRUD operations on production
- [ ] Configure custom domain (optional)
- [ ] Set up analytics (optional)
- [ ] Add SEO metadata to pages
- [ ] Optimize images (consider Next.js Image component)

---

## 🛠️ Troubleshooting

### Can't log in to admin panel?
- ✅ Verify admin user exists in Firebase Authentication
- ✅ Check email and password are correct (`admin@vridhirealestate.com` / `12345678`)
- ✅ Confirm Firebase config in `src/lib/firebase.js` is correct
- ✅ Check browser console for errors

### Images not uploading?
- ✅ Verify Cloudinary upload preset 'vridhi' is created and set to 'Unsigned'
- ✅ Check Cloud Name is correct: `dquflnv4j`
- ✅ Ensure file size is under Cloudinary's limits (10MB for free tier)
- ✅ Check browser console for upload errors
- ✅ Verify network connection and Cloudinary service status

### Data not showing on website?
- ✅ Open browser console and check for errors
- ✅ Verify Firestore has data in collections: `properties`, `agents`, `testimonials`
- ✅ Check Firestore security rules allow public reads
- ✅ Clear browser cache and hard reload (`Cmd+Shift+R` / `Ctrl+Shift+R`)
- ✅ Ensure `useEffect` is fetching data correctly in components

### Firebase errors in console?
- ✅ Check Firebase config credentials
- ✅ Verify all Firebase services are enabled (Auth, Firestore)
- ✅ Check network tab for 403/401 errors (security rules issue)
- ✅ Ensure Firebase project is active (not deleted/suspended)

### Build/deployment issues?
- ✅ Run `npm run build` locally to check for errors
- ✅ Ensure all dependencies are installed
- ✅ Check for TypeScript/ESLint errors
- ✅ Verify environment variables are set in Vercel

### Featured properties not showing?
- ✅ Ensure at least one property has `featured: true` in Firestore
- ✅ Check `FeaturedProperties.jsx` is fetching and filtering correctly
- ✅ Verify client-side filtering logic: `properties.filter(p => p.featured)`

---

## 📊 Firestore Collections Structure

### Properties Collection
```javascript
{
  id: string (auto-generated),
  title: string,
  address: string,
  price: number,
  bedrooms: number,
  bathrooms: number,
  area: number,
  imageUrl: string,
  featured: boolean,
  sold: boolean,
  createdAt: timestamp,
  updatedAt: timestamp
}
```

### Agents Collection
```javascript
{
  id: string (auto-generated),
  name: string,
  title: string,
  bio: string,
  email: string,
  phone: string,
  imageUrl: string,
  createdAt: timestamp,
  updatedAt: timestamp
}
```

### Testimonials Collection
```javascript
{
  id: string (auto-generated),
  name: string,
  location: string,
  quote: string,
  createdAt: timestamp,
  updatedAt: timestamp
}
```

---

## 💡 Tips for Success

1. **Image Quality**: Upload high-resolution images for properties and agents (recommended: 1200x800px)
2. **SEO**: Add descriptive titles and addresses for better search visibility
3. **Testimonials**: Collect genuine client feedback to build trust
4. **Regular Updates**: Keep property status current (mark as sold when appropriate)
5. **Featured Properties**: Highlight your best listings by marking them featured
6. **Agent Profiles**: Keep contact information updated and write compelling bios
7. **Backup Data**: Regularly export Firestore data as backup
8. **Monitor Usage**: Check Firebase Console for usage stats and quotas

---

## 🤝 Contributing

This is a private project. For internal development:
1. Create a feature branch
2. Make changes
3. Test thoroughly
4. Submit pull request for review

---

## 📄 License

Private/Proprietary - All rights reserved.

---

## 📞 Support

For issues or questions:
- Check [Troubleshooting](#troubleshooting) section
- Review Firebase Console for service status
- Check browser console for error messages
- Verify all Firebase services are enabled

---

## 🎉 You're All Set!

Your Vridhi Real Estate website with admin panel is ready to use!

**Quick Start:**
1. Set up Firebase (see [Firebase Setup](#firebase-setup))
2. Run `npm run dev`
3. Log in at `/admin` with default credentials
4. Start adding properties, agents, and testimonials
5. Deploy to Vercel when ready

**Happy Managing! 🏡✨**

---

Built with ❤️ using Next.js 14, Firebase, and Tailwind CSS
