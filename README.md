# E-Commerce Project Documentation
_A full featured E-commerce website built with Next.js, TypeScript, PostgreSQL and Prisma._

## Overview
This project is a more modern and scalable evolution of my earlier MERN-based e‑commerce project (**proshop-demo**). Unlike the MERN version—which relies on a traditional separation of backend (Express) and frontend (React)—this implementation takes full advantage of **Next.js**, offering:

- **Server-side rendering (SSR) and static generation**, resulting in faster loading and better SEO.
- **Built‑in API routes**, removing the need for a separate Express server.
- **Improved performance** through React Server Components and the App Router.
- **Cleaner architecture**, with unified routing, layouts, and component organization.
- **Simpler deployment**, since frontend and backend live in the same Next.js codebase.

This creates a faster, more maintainable, and more production‑ready foundation compared to the older MERN version.
- **Database improvements**, including the use of Prisma with PostgreSQL, offering a more structured ORM and easier, safer queries compared to the previous MERN stack.

### Implemented Improvements (confirmed)
- Removed manual generate button; slug names are generated automatically.
- Admin now can delete uploaded pictures before submitting if a wrong file was chosen.
- Admin search input now uses client-side handling with `preventDefault()` to avoid hard reloads, combined with a debounce mechanism to optimize search performance as the admin types.

### How This Project Improves Over My Earlier Projects

This project is not a simple copy — it is a **significant evolution** of the original tutorial version.  
Below are the key improvements made:

#### **Stronger Admin Controls**
- Admin can delete uploaded pictures before saving.
- Slug generation is automated (no manual slug input).
- Added protection to prevent deletion of the **last remaining admin**, improving system safety.

**Why:**  
Prevents data corruption, accidental lock-out, and improves overall UX for store managers.



#### **Improved Image and File Handling**
- File management redesigned with safer, more intuitive workflows.
- Wrong file selections can be removed before submitting.

**Why:**  
Reduces user mistakes and provides a smoother product‑creation experience.

#### **Database and Backend Stability Upgrades**
- PostgreSQL + Prisma ORM used with a cleaner schema structure.
- Validation and safety logic added to sensitive operations (admin deletions, actions).

**Why:**  
Ensures data reliability, reduces bugs, and produces cleaner database queries.

#### **General Code Quality Improvements**
- Rewritten many parts of the tutorial logic to be more modern, efficient, and reusable.
- Eliminated edge-case bugs found in the original implementation.

**Why:**  
Because the goal is not to copy the tutorial, but to **build a polished, professional version** of it.

---

## Screenshots
- ![Home Page](screenshots/home-page.png)
- ![Product Page](screenshots/product-page.png)
- ![Cart / Checkout](screenshots/cart-checkout.png)
- ![Admin Page](screenshots/admin-page.png)
- ![Admin Page2](screenshots/admin-page2.png)

## Key Features

### **1. Next.js App Router Architecture**
- Uses the new **App Router**.
- Clear separation between server and client components.
- Built-in routing, layouts, and API routes.

### **2. Modern UI/UX**
- Styled with **Tailwind CSS**.
- Fully responsive design.
- Reusable components such as Navbar, Product Cards, and Layout wrappers.
- Supports dark, light, and system theme modes, automatically adapting to the user's system preference and allowing manual toggle between dark and light themes.

### **3. Product Management**
- Dynamic product pages.
- Optimized image handling.
- Expandable structure for future admin CRUD.

### **4. Shopping Cart System**
- Add/remove products.
- Update quantities.
- Persistent cart state.

### **5. User Authentication**
- Secure login and registration (NextAuth).
- Protected routes.

### **6. Payments**
- Integrated **PayPal & Stripe** for online payments.
- Complete checkout flow implemented.

### **7. Admin Dashboard**
- Admin page for managing users and products.
- Product management.
- Orders overview.
- Admin area with stats & chart using Recharts

---

## Technologies Used
- **Next.js 14+** (App Router)
- **React**
- **Tailwind CSS**
- **Prisma / PostgreSQL**
- **NextAuth**

---

## Roadmap
- [ ] Checkout + Stripe
- [ ] Admin dashboard
- [ ] Product categories & filters
- [ ] Reviews system
- [ ] Animations & transitions
- [ ] Performance & caching improvements

---

## Credits
This project includes specific improvements over the previous version, such as:
- Improved image and file handling for admins.
- Automated slug generation for products.
- Enhanced database and backend stability using PostgreSQL + Prisma.
- General code quality improvements for modern, reusable, and maintainable code.
- Minor accessibility improvements in drawer components (added `<DrawerDescription>` for screen readers).

---

## Repository
GitHub: `karmartir/e-commerce-website-next.js`
