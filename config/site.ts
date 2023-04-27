export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: 'Gutter',
  description:
    'Beautifully designed components built with Radix UI and Tailwind CSS.',
  mainNav: [
    {
      title: 'Sign In',
      href: '/',
    },
    {
      title: 'Sign Up',
      href: '/',
    },
  ],
  links: {
    twitter: 'https://twitter.com/shadcn',
    github: 'https://github.com/shadcn/ui',
    docs: 'https://ui.shadcn.com',
  },
}
