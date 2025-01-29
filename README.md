# JUMI Website

Official website for JUMI (Jovens Unidos por Manique do Intendente), built with Nuxt 3 and Supabase.

## Features

- 📱 Responsive design
- 🔐 Authentication system
- 📝 Blog/News management
- 🖼️ Image upload capability
- 👩‍💼 Admin dashboard
- 📄 Static pages
- 📝 Rich text editor

## Tech Stack

- **Frontend:** Nuxt 3 (Vue 3)
- **Styling:** Tailwind CSS
- **Backend:** Supabase
- **Content:** TipTap Editor
- **Authentication:** Supabase Auth

## Prerequisites

Make sure you have installed:
- Node.js (v16 or higher)
- npm or yarn
- Git

## Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/jumi-website.git
cd jumi-website
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_anon_key
```

4. Start the development server:
```bash
npm run dev
```

## Supabase Setup

1. Create a new Supabase project
2. Set up the posts table:
```sql
create table posts (
  id uuid default uuid_generate_v4() primary key,
  title varchar(255) not null,
  slug varchar(255) not null unique,
  content text,
  image_url text,
  published boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()),
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

create index posts_slug_idx on posts(slug);
```

3. Create a storage bucket named "images" and add the following policies:

```sql
-- Allow authenticated uploads
CREATE POLICY "Allow authenticated uploads"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'images');

-- Allow public viewing
CREATE POLICY "Allow public viewing"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'images');

-- Allow authenticated updates
CREATE POLICY "Allow authenticated updates"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'images');

-- Allow authenticated deletes
CREATE POLICY "Allow authenticated deletes"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'images');
```

## Project Structure

```
jumi-website/
├── app.vue                 # App entry
├── components/            # Vue components
├── layouts/              # Page layouts
├── pages/                # Application pages
├── composables/          # Composable functions
├── stores/              # Pinia stores
└── nuxt.config.ts       # Nuxt configuration
```

## Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Features TODO

- [ ] Media library management
- [ ] Categories/tags for posts
- [ ] Search functionality
- [ ] Events calendar
- [ ] Newsletter subscription
- [ ] Contact form functionality
- [ ] User management
- [ ] Role-based permissions

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

- [Nuxt.js](https://nuxt.com/)
- [Supabase](https://supabase.com/)
- [TailwindCSS](https://tailwindcss.com/)
- [TipTap](https://tiptap.dev/)
