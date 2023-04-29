export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: 'Gutter',
  description:
    'Beautifully designed components built with Radix UI and Tailwind CSS.',
  mainNav: [
    {
      title: 'Sign In',
      href: '/login',
    },
    {
      title: 'Sign Up',
      href: '/register',
    },
  ],
  links: {
    twitter: 'https://twitter.com/shadcn',
    github: 'https://github.com/shadcn/ui',
    docs: 'https://ui.shadcn.com',
  },
  limit: 10,
  pages: 20,
}
