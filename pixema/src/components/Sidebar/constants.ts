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
  { path: '', title: 'Favorites', icon: '/icons/favorites.svg' },
  { path: '', title: 'Settings', icon: '/icons/settings.svg' },
];

//FIXME: icon and path
