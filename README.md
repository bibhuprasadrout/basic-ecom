<!-- Readme.md is still a work in progress -->

Folder structure
src/
│
├── app/
│ ├── App.jsx
│ ├── main.jsx
│ ├── AppRouter.jsx
│ └── providers/
│ ├── AuthProvider.jsx
│ └── CartProvider.jsx
│
├── pages/
│ ├── Home/
│ │ ├── HomePage.jsx
│ │ └── components/ -
│ ├── Category/
│ │ ├── CategoryPage.jsx
│ │ └── components/
│ ├── PLP/
│ │ ├── ProductListingPage.jsx
│ │ └── components/
│ ├── PDP/
│ │ ├── ProductDetailPage.jsx
│ │ └── components/
│ ├── Cart/CartPage.jsx
│ ├── Checkout/CheckoutPage.jsx
│ ├── Search/SearchPage.jsx
│ ├── Account/
│ │ ├── ProfilePage.jsx
│ │ ├── OrdersPage.jsx
│ │ ├── OrderDetailsPage.jsx
│ │ ├── AddressesPage.jsx
│ │ └── WishlistPage.jsx
│ └── Admin/
│ ├── DashboardPage.jsx
│ ├── ProductsPage.jsx
│ ├── CategoriesPage.jsx
│ ├── OrdersPage.jsx
│ └── CouponsPage.jsx
│
├── components/
│ ├── ui/ (buttons, cards, modals, inputs)
│ ├── common/ (Navbar, Footer, Breadcrumbs)
│ ├── product/ (ProductCard, RatingStars, PriceTag)
│ ├── layout/ (Container, PageSection)
│ └── feedback/ (Loader, ErrorState, EmptyState)
│
├── hooks/
│ ├── useAuth.jsx
│ ├── useCart.jsx
│ ├── useDebounce.jsx
│ └── useWishlist.jsx
│
├── context/
│ ├── AuthContext.jsx
│ ├── CartContext.jsx
│ ├── WishlistContext.jsx
│ └── UIContext.jsx
│
├── services/
│ ├── api/
│ │ ├── axiosClient.jsx
│ │ ├── productApi.jsx
│ │ ├── categoryApi.jsx
│ │ ├── cartApi.jsx
│ │ ├── orderApi.jsx
│ │ ├── userApi.jsx
│ │ └── couponApi.jsx
│ ├── storage/
│ │ ├── local.jsx
│ │ └── session.jsx
│ └── utils/
│ ├── formatPrice.jsx
│ ├── handleError.jsx
│ └── validators.jsx
│
├── assets/
│ ├── images/
│ ├── icons/
│ └── fonts/
│
├── styles/
│ ├── globals.css
│ └── tailwind.css
│
├── types/
│ ├── product.jsx
│ ├── cart.jsx
│ ├── user.jsx
│ ├── order.jsx
│ └── category.jsx
│
└── config/
├── env.jsx
└── Constants.jsx

# UI Structure

    ## App
        ### Auth
            #### sign in
            #### sign up
    ## Home
        ### Hero
        ### Best discount producst carousel
        ### best discount categories grid

    ## Cart

    ## Products

    ## Product

    ## User profile

    ## Wishlist

    ## Legal and company information

        ### Anout us

        ### Contact us

        ### Copyright notice

        ### Privacy policy

        ### Refund policy

        ### Team

        ### Terms of service
