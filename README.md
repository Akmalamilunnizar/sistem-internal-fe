# Lilly ISP - Admin Dashboard

A comprehensive admin dashboard for Internet Service Provider management built with Nuxt.js 3, Vue.js 3, and Tailwind CSS.

## 🚀 Features

### 📊 Dashboard
- **Financial Overview**: Total income, expenses, net worth, and sales statistics
- **Real-time Data**: Live updates from backend APIs
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile

### 👥 Customer Management
- **Customer List**: View all customers with pagination and search
- **Customer Details**: Individual customer pages with GPS location and trouble ticket history
- **CRUD Operations**: Create, read, update, and delete customer records
- **GPS Integration**: Store and display customer locations

### 📈 Reports & Analytics
- **Trouble Ticket Analysis**: Comprehensive reporting on all tickets
- **Type Distribution**: Pie charts showing trouble type percentages
- **Geographic Heatmap**: Visual representation of trouble hotspots
- **Summary Statistics**: Key metrics and insights

### 👨‍💼 User Management (Owner Only)
- **Staff Management**: Add, edit, and delete staff members
- **Role Assignment**: Assign roles (Owner, Customer Service, Technician)
- **Access Control**: Role-based menu filtering
- **User Status**: Active/inactive status management

### 🔐 Authentication & Authorization
- **JWT Authentication**: Secure token-based authentication
- **Role-Based Access**: Different menus and permissions per role
- **Protected Routes**: Automatic redirection for unauthorized access

## 🛠️ Tech Stack

- **Frontend**: Nuxt.js 3, Vue.js 3, TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Heroicons
- **HTTP Client**: Ofetch
- **State Management**: Vue 3 Composition API
- **Routing**: Nuxt.js file-based routing

## 📁 Project Structure

```
frontend/
├── api/admin/           # API endpoints
│   ├── customer.ts      # Customer management
│   ├── dashboard.ts     # Dashboard statistics
│   ├── invoice.ts       # Invoice management
│   ├── reports.ts       # Reports and analytics
│   ├── transaction.ts   # Transaction management
│   └── users.ts         # User management
├── assets/              # Static assets
│   └── css/
│       └── main.css     # Global styles
├── composables/         # Reusable composables
│   ├── useAuthStore.ts  # Authentication store
│   └── useLoading.ts    # Loading state management
├── helper/              # Utility functions
│   ├── currency.ts      # Currency formatting
│   └── date.ts          # Date formatting
├── layouts/             # Layout components
│   └── navbar.vue       # Navigation layout
├── pages/               # Page components
│   └── dashboard/       # Dashboard pages
│       ├── index.vue    # Main dashboard
│       ├── customer/    # Customer pages
│       │   ├── index.vue
│       │   └── [id].vue
│       ├── report/      # Reports page
│       │   └── index.vue
│       └── user-management/ # User management
│           └── index.vue
└── nuxt.config.ts       # Nuxt configuration
```

## 🚀 Getting Started

### Prerequisites

- Node.js 16+ 
- npm or yarn
- Backend API running on `http://localhost:8080`

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   NUXT_PUBLIC_API_BASE_URL=http://localhost:8080/api
   ```

4. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## 🔧 Configuration

### Nuxt Configuration
The project uses Nuxt.js 3 with the following key configurations:

- **Tailwind CSS**: Utility-first CSS framework
- **SSR Disabled**: Client-side rendering for better performance
- **Static Preset**: Optimized for static deployment

### API Configuration
All API calls are configured to use the base URL from environment variables and include JWT authentication headers.

## 📱 Responsive Design

The dashboard is fully responsive and includes:

- **Mobile Menu**: Collapsible sidebar for mobile devices
- **Desktop Sidebar**: Expandable navigation sidebar
- **Touch-Friendly**: Optimized for touch interactions
- **Breakpoint Support**: Tailored layouts for different screen sizes

## 🔐 Authentication Flow

1. **Login**: Users authenticate via the login page
2. **Token Storage**: JWT tokens are stored in localStorage
3. **Route Protection**: Automatic redirection for unauthenticated users
4. **Role-Based Access**: Menu items filtered based on user role

## 🎨 UI Components

### Design System
- **Color Palette**: Consistent color scheme throughout
- **Typography**: Clear hierarchy with proper font weights
- **Spacing**: Consistent spacing using Tailwind's spacing scale
- **Shadows**: Subtle shadows for depth and elevation

### Interactive Elements
- **Buttons**: Primary, secondary, and danger variants
- **Forms**: Consistent form styling with validation
- **Tables**: Sortable tables with pagination
- **Modals**: Overlay modals for forms and confirmations

## 📊 Data Management

### State Management
- **Reactive Data**: Vue 3 Composition API for reactive state
- **API Integration**: Centralized API calls with error handling
- **Loading States**: Loading indicators for better UX
- **Error Handling**: Graceful error handling with user feedback

### Data Flow
1. **API Calls**: Centralized API functions in `/api/admin/`
2. **State Updates**: Reactive state updates using `ref()` and `computed()`
3. **UI Updates**: Automatic UI updates when data changes
4. **Error Handling**: Try-catch blocks with user-friendly error messages

## 🚀 Deployment

### Build for Production
```bash
npm run build
# or
yarn build
```

### Static Deployment
The project is configured for static deployment and can be deployed to:
- Vercel
- Netlify
- GitHub Pages
- Any static hosting service

## 🔧 Development

### Code Style
- **TypeScript**: Strict type checking enabled
- **ESLint**: Code linting for consistency
- **Prettier**: Code formatting
- **Vue 3**: Composition API preferred

### File Naming
- **Pages**: kebab-case for file names
- **Components**: PascalCase for component names
- **Composables**: camelCase with `use` prefix
- **API**: camelCase for function names

## 📝 API Endpoints

### Customer Management
- `GET /api/customers` - List customers with pagination
- `GET /api/customers/:id` - Get customer details
- `POST /api/customers` - Create new customer
- `PUT /api/customers/:id` - Update customer
- `DELETE /api/customers/:id` - Delete customer
- `GET /api/customers/:id/tickets` - Get customer tickets

### Reports
- `GET /api/tickets` - List all trouble tickets
- `GET /api/reports/trouble-types` - Get trouble type statistics
- `GET /api/reports/geographic` - Get geographic trouble data
- `GET /api/reports/summary` - Get trouble summary

### User Management
- `GET /api/staff` - List staff members
- `GET /api/staff/:id` - Get staff details
- `POST /api/staff` - Create new staff member
- `PUT /api/staff/:id` - Update staff member
- `DELETE /api/staff/:id` - Delete staff member
- `GET /api/roles` - Get available roles

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

## 🔄 Version History

- **v1.0.0**: Initial release with core features
- Dashboard with financial overview
- Customer management system
- Reports and analytics
- User management (Owner only)
- Role-based access control
