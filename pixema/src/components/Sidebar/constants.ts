interface ISidebarNavigationItem {
  path: string;
  title: string;
  icon: string;
}

export const SidebarNavigation: ISidebarNavigationItem[] = [
  {
    path: '/',
    title: 'Home',
    icon: '/icons/home.svg',
  },
  { path: '/trends', title: 'Trends', icon: '/icons/trends.svg' },
  { path: '/favorites', title: 'Favorites', icon: '/icons/favorites.svg' },
  { path: '', title: 'Settings', icon: '/icons/settings.svg' },

  //Auth
  { path: '/auth/sign-in', title: 'Sign In', icon: '/icons/settings.svg' },
  { path: '/auth/sign-up', title: 'Sign Up', icon: '/icons/settings.svg' },
  {
    path: '/auth/activation/',
    title: 'Auth',
    icon: '/icons/settings.svg',
  },
];

//FIXME: icon and path
