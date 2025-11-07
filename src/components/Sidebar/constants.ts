export interface ISidebarNavigationItem {
  path: string;
  title: string;
  icon: string;
  activeIcon: string;
}

export const SidebarNavigation: ISidebarNavigationItem[] = [
  {
    path: '/',
    title: 'Home',
    icon: '/icons/home.svg',
    activeIcon: '/icons/home_active.svg',
  },
  {
    path: '/trends',
    title: 'Trends',
    icon: '/icons/trends.svg',
    activeIcon: '/icons/trends_active.svg',
  },
  {
    path: '/favorites',
    title: 'Favorites',
    icon: '/icons/favorites.svg',
    activeIcon: '/icons/favorites_active.svg',
  },
  {
    path: '/settings',
    title: 'Settings',
    icon: '/icons/settings.svg',
    activeIcon: '/icons/settings_active.svg',
  },
];
