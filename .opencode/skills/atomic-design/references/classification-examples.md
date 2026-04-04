# Classification Examples — Extended Reference

Comprehensive catalog of component classifications across domains and UI natures. Use this when unsure where a component belongs.

---

## Table of Contents

1. [Design Tokens & Primitives](#1-design-tokens--primitives)
2. [Forms & Inputs](#2-forms--inputs)
3. [Navigation](#3-navigation)
4. [Data Display](#4-data-display)
5. [Feedback & Status](#5-feedback--status)
6. [Overlays & Dialogs](#6-overlays--dialogs)
7. [Media & Content](#7-media--content)
8. [E-commerce](#8-e-commerce)
9. [Social / Feed-based apps](#9-social--feed-based-apps)
10. [Dashboard / SaaS / Admin](#10-dashboard--saas--admin)
11. [Blog / Editorial / CMS](#11-blog--editorial--cms)
12. [Authentication & Onboarding](#12-authentication--onboarding)
13. [Real-time & Chat](#13-real-time--chat)
14. [Maps & Location](#14-maps--location)
15. [Tricky / Ambiguous Cases](#15-tricky--ambiguous-cases)

---

## 1. Design Tokens & Primitives

These are the most fundamental atoms — they define the design language itself.

| Component           | Level | Why                                                      |
| ------------------- | ----- | -------------------------------------------------------- |
| `ColorSwatch`       | Atom  | Renders a single color block                             |
| `Typography / Text` | Atom  | Renders a single styled text node                        |
| `Heading` (H1–H6)   | Atom  | Semantic heading with size variant                       |
| `Icon`              | Atom  | SVG icon, no behavior of its own                         |
| `Spacer`            | Atom  | Empty element that creates layout spacing                |
| `Divider`           | Atom  | Horizontal or vertical visual separator                  |
| `VisuallyHidden`    | Atom  | Accessibility-only wrapper — no visible output           |
| `FocusTrap`         | Atom  | Behavior-only utility — manages focus within a container |
| `SrOnly`            | Atom  | Screen-reader-only text                                  |

---

## 2. Forms & Inputs

### Atoms

| Component         | Why                                          |
| ----------------- | -------------------------------------------- |
| `Input`           | Native text input, fully controlled by props |
| `Textarea`        | Multi-line input, same rules as Input        |
| `Checkbox`        | Single checkbox element                      |
| `Radio`           | Single radio option                          |
| `Select` (native) | Native `<select>` element                    |
| `Toggle / Switch` | Binary on/off control — one element          |
| `Slider`          | Range input control                          |
| `FileInput`       | File upload trigger                          |
| `Label`           | Form label element                           |
| `ErrorMessage`    | Inline validation error text                 |
| `HelperText`      | Subtle hint below an input                   |
| `CharacterCount`  | Displays remaining characters                |

### Molecules

| Component                  | Why                                                   |
| -------------------------- | ----------------------------------------------------- |
| `FormField`                | Label + Input + ErrorMessage + HelperText             |
| `PasswordInput`            | Input + show/hide toggle icon                         |
| `SearchInput`              | Input + clear button + optional search icon           |
| `PhoneInput`               | Country code selector + number input                  |
| `CurrencyInput`            | Currency symbol atom + numeric input                  |
| `DatePicker`               | Input + calendar icon + date constraint logic         |
| `TimePicker`               | Hour + minute selectors + AM/PM toggle                |
| `ColorPicker`              | Swatch grid + hex input                               |
| `RadioGroup`               | Group of Radio atoms with shared name                 |
| `CheckboxGroup`            | Group of Checkbox atoms with select-all option        |
| `TagInput`                 | Input + token list for multi-value entries            |
| `OTPInput`                 | Row of single-character inputs for verification codes |
| `RangeSlider`              | Two Slider handles for min/max selection              |
| `Combobox`                 | Input + Dropdown with filterable options              |
| `StarRating` (interactive) | 5 interactive star atoms with hover state             |
| `MarkdownEditor`           | Textarea + toolbar + preview toggle                   |

### Organisms

| Component         | Why                                                   |
| ----------------- | ----------------------------------------------------- |
| `LoginForm`       | Email FormField + Password FormField + Submit + links |
| `RegisterForm`    | Multiple FormFields + Terms checkbox + Submit         |
| `AddressForm`     | Street + City + State + ZIP + Country fields          |
| `PaymentForm`     | Card number + expiry + CVV + billing address          |
| `ContactForm`     | Name + Email + Subject + Message + Submit             |
| `SearchForm`      | SearchInput + filters + submit — product-specific     |
| `ProfileEditForm` | Avatar upload + multiple FormFields + Save            |
| `FilterForm`      | Multiple CheckboxGroups + RangeSlider + Apply         |
| `MultiStepForm`   | Wizard with step navigation + multiple form sections  |
| `SettingsForm`    | Grouped settings fields + save/discard                |

---

## 3. Navigation

### Atoms

| Component        | Why                             |
| ---------------- | ------------------------------- |
| `NavLink`        | Single anchor with active state |
| `BreadcrumbItem` | One step in a breadcrumb trail  |
| `TabItem`        | Single tab in a tab bar         |
| `StepItem`       | One step in a stepper indicator |

### Molecules

| Component        | Why                                       |
| ---------------- | ----------------------------------------- |
| `Breadcrumb`     | Series of BreadcrumbItems with separators |
| `Tabs`           | Row of TabItems + active indicator        |
| `Stepper`        | Series of StepItems showing progress      |
| `Pagination`     | Prev/Next buttons + page number atoms     |
| `DropdownMenu`   | Trigger button + positioned menu list     |
| `ContextMenu`    | Right-click triggered menu with items     |
| `NavigationMenu` | Group of NavLinks with optional icons     |
| `SkipToContent`  | Accessibility link to skip navigation     |
| `BackButton`     | Icon + label + history navigation         |

### Organisms

| Component         | Why                                                           |
| ----------------- | ------------------------------------------------------------- |
| `Header / Topbar` | Logo + NavigationMenu + CTA + UserMenu                        |
| `Sidebar`         | NavigationMenu + user section + collapse toggle               |
| `Footer`          | Multiple link columns + legal text + logo                     |
| `MobileNav`       | Hamburger trigger + full-screen overlay menu                  |
| `CommandPalette`  | SearchInput + grouped navigation results + keyboard shortcuts |
| `BottomTabBar`    | Mobile bottom nav with 4–5 TabItems + active indicators       |
| `MegaMenu`        | Multi-column dropdown with feature links + promo areas        |

---

## 4. Data Display

### Atoms

| Component      | Why                                      |
| -------------- | ---------------------------------------- |
| `Badge`        | Small count or status label              |
| `Tag / Chip`   | Removable or readonly label              |
| `Tooltip`      | Hover-triggered text bubble              |
| `Avatar`       | User image or initials in a circle       |
| `Skeleton`     | Loading placeholder for a single element |
| `ProgressBar`  | Linear progress indicator                |
| `ProgressRing` | Circular progress indicator              |
| `Spinner`      | Animated loading indicator               |
| `KBD`          | Keyboard shortcut display (`⌘K`)         |
| `Code`         | Inline code snippet                      |
| `Timestamp`    | Formatted date/time display              |
| `Currency`     | Formatted monetary value                 |
| `Percentage`   | Formatted percentage value               |
| `TrendArrow`   | Up/down arrow with semantic color        |

### Molecules

| Component           | Why                                                       |
| ------------------- | --------------------------------------------------------- |
| `StatCard`          | Metric value + label + optional trend indicator           |
| `UserChip`          | Avatar + name + optional badge                            |
| `FilePreview`       | File icon + filename + size + remove button               |
| `ImageWithCaption`  | Image atom + Caption text                                 |
| `KeyValue`          | Label + Value pair                                        |
| `ProgressWithLabel` | ProgressBar + percentage label                            |
| `AvatarGroup`       | Stacked Avatars with overflow count                       |
| `CodeBlock`         | Code atom + copy button + language label                  |
| `EmptyState`        | Illustration + heading + description                      |
| `LoadingSkeleton`   | Multiple Skeleton atoms arranged as a content placeholder |
| `MiniChart`         | Sparkline + value — summary at a glance                   |
| `AccordionItem`     | Trigger + collapsible content panel                       |
| `Accordion`         | Multiple AccordionItems with open/close coordination      |

### Organisms

| Component      | Why                                                |
| -------------- | -------------------------------------------------- |
| `DataTable`    | Table with sort, filter, pagination, row selection |
| `VirtualList`  | Windowed list for large datasets                   |
| `KanbanBoard`  | Multiple columns of draggable cards                |
| `Timeline`     | Chronological list of events with connectors       |
| `ActivityFeed` | Stream of user actions with timestamps             |
| `StatsPanel`   | Multiple StatCards in a meaningful grouping        |
| `CalendarView` | Monthly/weekly calendar grid with event rendering  |
| `AuditLog`     | Timeline of system events with filtering           |
| `FAQSection`   | Accordion + title + intro text + domain content    |

---

## 5. Feedback & Status

### Atoms

| Component   | Why                                                     |
| ----------- | ------------------------------------------------------- |
| `StatusDot` | Small colored dot indicating state (online, busy, etc.) |
| `AlertIcon` | Icon with semantic color for warning/error/success      |

### Molecules

| Component           | Why                                                       |
| ------------------- | --------------------------------------------------------- |
| `Toast`             | Icon + message + optional dismiss — one notification unit |
| `Alert`             | Icon + title + description + optional action              |
| `InlineError`       | Icon + short error text                                   |
| `Banner`            | Full-width message with optional CTA and dismiss          |
| `StatusBadge`       | StatusDot + label text                                    |
| `ValidationSummary` | List of multiple errors from a form submission            |

### Organisms

| Component            | Why                                                  |
| -------------------- | ---------------------------------------------------- |
| `ToastContainer`     | Manages stack of multiple Toasts, positioning, queue |
| `NotificationCenter` | List of Toasts/Alerts with read/unread state         |

---

## 6. Overlays & Dialogs

### Molecules

| Component        | Why                                                        |
| ---------------- | ---------------------------------------------------------- |
| `Modal` (shell)  | Overlay + container + close button — no content of its own |
| `Drawer` (shell) | Side-panel shell — positioning only                        |
| `Popover`        | Anchor-relative floating container                         |
| `ConfirmDialog`  | Modal shell + title + description + two action buttons     |
| `Lightbox`       | Fullscreen image overlay with prev/next controls           |

### Organisms

| Component            | Why                                                              |
| -------------------- | ---------------------------------------------------------------- |
| `ProductQuickView`   | Modal shell filled with product data, image gallery, add-to-cart |
| `ImageUploadDialog`  | Modal with file drop zone + preview + crop + submit              |
| `ShareDialog`        | Modal with URL copy + social links + permission controls         |
| `FilterDrawer`       | Drawer shell filled with FilterForm organism                     |
| `CreateProjectModal` | Modal with full multi-field form inside                          |

**Rule for Modals:** The shell (`Modal`, `Drawer`) is a Molecule. What you put _inside_ determines whether the composed result is a Molecule or Organism.

---

## 7. Media & Content

### Atoms

| Component     | Why                                           |
| ------------- | --------------------------------------------- |
| `Image`       | Lazy-loaded img with aspect ratio enforcement |
| `Video`       | `<video>` element with basic controls         |
| `Audio`       | `<audio>` player element                      |
| `Lottie`      | Animated JSON asset renderer                  |
| `Iframe`      | Isolated embedded content                     |
| `Map` (embed) | Static map embed — no interactivity           |

### Molecules

| Component       | Why                                            |
| --------------- | ---------------------------------------------- |
| `MediaCard`     | Thumbnail + title + metadata                   |
| `VideoPlayer`   | Video atom + custom play/pause/volume controls |
| `AudioPlayer`   | Audio atom + waveform + progress + controls    |
| `ImageCarousel` | Multiple images + prev/next + dots indicator   |
| `GalleryGrid`   | Grid of Image atoms with lightbox trigger      |
| `EmbedCard`     | Iframe + title + domain attribution            |

### Organisms

| Component       | Why                                               |
| --------------- | ------------------------------------------------- |
| `HeroSection`   | Full-width image/video + headline + CTA           |
| `MediaGallery`  | Full gallery with filtering, lightbox, pagination |
| `VideoFeed`     | List of VideoPlayer molecules with metadata       |
| `PodcastPlayer` | Episode list + AudioPlayer + show details         |

---

## 8. E-commerce

| Component          | Level    | Why                                                |
| ------------------ | -------- | -------------------------------------------------- |
| `Price`            | Atom     | Formatted currency — single display unit           |
| `DiscountBadge`    | Atom     | "20% OFF" pill                                     |
| `StockIndicator`   | Atom     | "In Stock" / "Low Stock" status text               |
| `QuantitySelector` | Molecule | Decrement + count + increment                      |
| `ProductBadge`     | Molecule | Icon + label for "New", "Sale", "Featured"         |
| `AddToCartButton`  | Molecule | Button + loading state + success feedback          |
| `WishlistButton`   | Molecule | Toggle button with heart icon + count              |
| `ProductRating`    | Molecule | StarRating + review count link                     |
| `PriceRange`       | Molecule | Min price + separator + max price                  |
| `SwatchSelector`   | Molecule | Color/size option atoms with selected state        |
| `ShippingEstimate` | Molecule | Icon + delivery date text                          |
| `ProductCard`      | Organism | Image + title + Price + Rating + AddToCart         |
| `ProductGrid`      | Organism | Multiple ProductCards + sort/filter controls       |
| `CartItem`         | Organism | ProductImage + details + QuantitySelector + remove |
| `CartDrawer`       | Organism | List of CartItems + subtotal + checkout CTA        |
| `CheckoutSummary`  | Organism | Order items + costs breakdown + promo code field   |
| `ProductGallery`   | Organism | Main image + thumbnail strip + zoom                |
| `RelatedProducts`  | Organism | Heading + horizontal scroll of ProductCards        |
| `ReviewList`       | Organism | List of user reviews with rating breakdown         |
| `ProductFilters`   | Organism | CheckboxGroups + PriceRange + SwatchSelector       |

---

## 9. Social / Feed-based apps

| Component           | Level    | Why                                                   |
| ------------------- | -------- | ----------------------------------------------------- |
| `LikeButton`        | Atom     | Toggle button with heart icon                         |
| `CommentCount`      | Atom     | Icon + number                                         |
| `ShareButton`       | Atom     | Single action button                                  |
| `HashtagLink`       | Atom     | Styled anchor for hashtag                             |
| `ReactionPicker`    | Molecule | Emoji reactions row triggered on hover                |
| `PostActions`       | Molecule | LikeButton + CommentCount + ShareButton grouped       |
| `UserMention`       | Molecule | Avatar + @username inline                             |
| `StoryRing`         | Molecule | Avatar with gradient border + seen state              |
| `NotificationItem`  | Molecule | Avatar + action description + timestamp               |
| `PostCard`          | Organism | UserInfo + timestamp + content + media + PostActions  |
| `StoriesBar`        | Organism | Scrollable row of StoryRing molecules                 |
| `CommentItem`       | Molecule | Avatar + username + text + timestamp + reply          |
| `CommentThread`     | Organism | List of CommentItems + reply input + load more        |
| `NotificationFeed`  | Organism | List of NotificationItems + mark-all-read             |
| `ProfileHeader`     | Organism | CoverImage + Avatar + name + bio + follow CTA + stats |
| `FollowSuggestions` | Organism | Horizontal scroll of UserChip + follow buttons        |
| `TrendingTopics`    | Organism | List of HashtagLinks + counts + category              |

---

## 10. Dashboard / SaaS / Admin

| Component             | Level    | Why                                                    |
| --------------------- | -------- | ------------------------------------------------------ |
| `Metric`              | Atom     | Number + unit — single display value                   |
| `MetricCard`          | Molecule | Metric + label + TrendArrow + period                   |
| `UserRow`             | Molecule | Avatar + name + role + status — one table row          |
| `ActionMenu`          | Molecule | `⋮` trigger + Dropdown with item actions               |
| `FilterChip`          | Molecule | Active filter label + remove button                    |
| `PlanBadge`           | Molecule | Plan name + icon + upgrade link                        |
| `UsageMeter`          | Molecule | ProgressBar + used/total label                         |
| `FilterBar`           | Organism | Multiple FilterChips + clear-all + add-filter          |
| `StatsRow`            | Organism | Row of MetricCards representing KPIs                   |
| `DataTable`           | Organism | Sortable columns + pagination + row selection + export |
| `UserManagementPanel` | Organism | DataTable of users + invite + role management          |
| `ChartPanel`          | Organism | Chart + legend + date range selector + export          |
| `BillingSection`      | Organism | Plan details + UsageMeters + upgrade CTA               |
| `PermissionsMatrix`   | Organism | Role/feature grid with toggle cells                    |
| `IntegrationCard`     | Organism | Logo + name + description + connect/disconnect CTA     |
| `OnboardingChecklist` | Organism | List of steps with progress + completion reward        |

---

## 11. Blog / Editorial / CMS

| Component            | Level    | Why                                                   |
| -------------------- | -------- | ----------------------------------------------------- |
| `ReadingTime`        | Atom     | "5 min read" — single display unit                    |
| `PublishDate`        | Atom     | Formatted date atom                                   |
| `CategoryTag`        | Atom     | Styled tag linking to category                        |
| `AuthorAvatar`       | Atom     | Avatar variant for author display                     |
| `ArticleMeta`        | Molecule | AuthorAvatar + name + PublishDate + ReadingTime       |
| `TagList`            | Molecule | Row of CategoryTag atoms                              |
| `TableOfContents`    | Molecule | List of anchor links auto-generated from headings     |
| `ShareBar`           | Molecule | Row of social share buttons                           |
| `RelatedArticleCard` | Molecule | Thumbnail + title + date — compact card               |
| `Callout`            | Molecule | Icon + colored box + text — editorial emphasis block  |
| `PullQuote`          | Molecule | Quote text + attribution + decorative mark            |
| `ArticleCard`        | Organism | Image + title + excerpt + ArticleMeta + TagList       |
| `ArticleHeader`      | Organism | Hero image + title + subtitle + ArticleMeta + TagList |
| `ArticleBody`        | Organism | Rich text + inline media + callout blocks             |
| `ArticleFooter`      | Organism | Author bio + ShareBar + Tags + Related articles       |
| `FeaturedArticle`    | Organism | Large hero card for the main editorial pick           |
| `ArticleFeed`        | Organism | List/grid of ArticleCards with pagination             |
| `NewsletterSignup`   | Organism | Headline + description + email input + CTA            |

---

## 12. Authentication & Onboarding

| Component               | Level    | Why                                              |
| ----------------------- | -------- | ------------------------------------------------ |
| `SocialLoginButton`     | Atom     | Single OAuth provider button (Google, GitHub)    |
| `PasswordStrengthMeter` | Molecule | Visual bar + label for password strength         |
| `SocialLoginGroup`      | Molecule | Row of SocialLoginButton atoms                   |
| `DividerWithText`       | Molecule | Divider atom + centered "or" text                |
| `LoginForm`             | Organism | Email + password + Submit + social options       |
| `RegisterForm`          | Organism | Multi-field form + terms + submit                |
| `ForgotPasswordForm`    | Organism | Email field + submit + back to login link        |
| `TwoFactorForm`         | Organism | OTPInput + resend link + verify button           |
| `OnboardingStep`        | Organism | Step content + progress indicator + next/back    |
| `WelcomeScreen`         | Organism | Illustration + headline + description + CTA      |
| `RoleSelector`          | Organism | Visual cards for selecting a user role at signup |

---

## 13. Real-time & Chat

| Component           | Level    | Why                                                   |
| ------------------- | -------- | ----------------------------------------------------- |
| `MessageBubble`     | Atom     | Text in a rounded container with tail                 |
| `TypingIndicator`   | Atom     | Animated dots — "someone is typing"                   |
| `OnlineStatus`      | Atom     | StatusDot + optional label                            |
| `MessageTimestamp`  | Atom     | Small timestamp below a message                       |
| `MessageAttachment` | Molecule | FilePreview + download button                         |
| `MessageReactions`  | Molecule | Row of emoji + count atoms                            |
| `ChatMessage`       | Molecule | Avatar + name + MessageBubble + timestamp + reactions |
| `MessageInput`      | Molecule | Textarea + emoji picker + send button + attachment    |
| `ConversationItem`  | Molecule | Avatar + name + last message preview + unread badge   |
| `ConversationList`  | Organism | List of ConversationItems + search input              |
| `ChatWindow`        | Organism | Message history + MessageInput + header               |
| `ChannelSidebar`    | Organism | Channel list + DM list + user presence                |
| `ThreadPanel`       | Organism | Parent message + reply chain + reply input            |
| `VideoCallBar`      | Organism | Participant tiles + mute/camera/end controls          |

---

## 14. Maps & Location

| Component           | Level    | Why                                                 |
| ------------------- | -------- | --------------------------------------------------- |
| `MapPin`            | Atom     | SVG marker for a point on a map                     |
| `MapCluster`        | Molecule | Multiple MapPins grouped into a count bubble        |
| `LocationCard`      | Molecule | MapPin icon + address + distance                    |
| `PlaceAutocomplete` | Molecule | SearchInput + dropdown of location suggestions      |
| `DirectionsStep`    | Molecule | Icon + instruction text + distance                  |
| `MapView`           | Organism | Interactive map with markers, zoom, layer switching |
| `LocationPicker`    | Organism | PlaceAutocomplete + MapView + confirm CTA           |
| `DirectionsPanel`   | Organism | Origin/destination inputs + DirectionsStep list     |
| `NearbyList`        | Organism | List of LocationCards + sort by distance            |
| `StoreLocator`      | Organism | MapView + NearbyList + FilterBar                    |

---

## 15. Tricky / Ambiguous Cases

### `Select / Combobox`

| Variant                            | Level    | Why                                                      |
| ---------------------------------- | -------- | -------------------------------------------------------- |
| Native `<select>`                  | Atom     | Single HTML element                                      |
| Custom styled `Select` (no search) | Molecule | Button trigger + options list                            |
| `Combobox` (with search/filter)    | Molecule | Input + filtered dropdown list                           |
| `AsyncSelect` (fetches from API)   | ⚠️ Split | Keep Combobox as Molecule; wrap in Organism that fetches |

### `Card`

| Variant             | Level    | Why                                       |
| ------------------- | -------- | ----------------------------------------- |
| `Card` (shell only) | Molecule | Container + padding + shadow — no content |
| `StatCard`          | Molecule | Metric + label + trend — simple, focused  |
| `ArticleCard`       | Organism | Image + author + title + tags + full meta |
| `ProductCard`       | Organism | Image + price + rating + action button    |
| `ProfileCard`       | Organism | Avatar + bio + stats + follow CTA         |

**Rule:** Shell cards or cards with 1–2 atoms = Molecule. Cards with 3+ distinct feature areas = Organism.

### `Modal` with content

| Variant                                            | Level    |
| -------------------------------------------------- | -------- |
| `Modal` (empty shell)                              | Molecule |
| `ConfirmModal` (title + message + 2 buttons)       | Molecule |
| `CreateProjectModal` (full form inside)            | Organism |
| `ProductQuickViewModal` (gallery + details + cart) | Organism |

### `Table` vs `DataTable`

| Variant                    | Level    | Why                                         |
| -------------------------- | -------- | ------------------------------------------- |
| `Table`, `Tr`, `Td`, `Th`  | Atoms    | HTML primitives                             |
| `TableRow` with data slots | Molecule | Composes cells into one meaningful row      |
| `DataTable`                | Organism | Sort, filter, pagination, selection, export |

### `Accordion`

| Variant                      | Level    | Why                                        |
| ---------------------------- | -------- | ------------------------------------------ |
| `AccordionItem`              | Molecule | Trigger + content panel — one unit         |
| `Accordion` (multiple items) | Molecule | Manages open/close state across items      |
| `FAQSection`                 | Organism | Accordion + title + intro + domain content |

### Navigation at different scales

| Variant    | Level    | Why                                              |
| ---------- | -------- | ------------------------------------------------ |
| `NavLink`  | Atom     | Single link                                      |
| `NavGroup` | Molecule | Label + list of NavLinks                         |
| `Sidebar`  | Organism | NavGroups + user section + branding + collapse   |
| `MegaMenu` | Organism | Multi-column dropdown with feature links + promo |

---

## Quick Reference: Anti-patterns

| You see this                                                         | It probably means                                     |
| -------------------------------------------------------------------- | ----------------------------------------------------- |
| An Atom with `useQuery` / `fetch`                                    | Move data fetching to parent Organism or Page         |
| A Molecule that imports from a store                                 | Strip store access; pass as props instead             |
| An Organism deeply tied to one screen                                | Still an Organism — they can be page-specific         |
| A component named `XxxContainer`                                     | Check if it's a Molecule shell or a Template          |
| A "Card" that does everything                                        | Split into shell Molecule + content-specific Organism |
| Props drilling 4 levels down                                         | Lift state to Organism; consider context              |
| A molecule that renders completely differently based on domain flags | Two components, not one                               |
