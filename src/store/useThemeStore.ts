import type { theme } from '@/types/theme';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ThemeStore {
	theme: theme;
	isLight: boolean;
	toggleTheme: () => void;
	setTheme: (theme: theme) => void;
}

export const useThemeStore = create<ThemeStore>()(
	persist(
		(set) => ({
			theme: 'light',
			isLight: true,
			toggleTheme: () =>
				set((state) => {
					document
						.querySelector('html')
						?.classList.remove(state.theme);
					document
						.querySelector('html')
						?.classList.add(
							state.theme != 'dark' ? 'dark' : 'light'
						);
					return {
						theme: state.theme == 'dark' ? 'light' : 'dark',
						isLight: state.theme == 'dark' ? false : true,
					};
				}),
			setTheme: (theme: theme) =>
				set((state) => {
					document
						.querySelector('html')
						?.classList.remove(state.theme);
					document.querySelector('html')?.classList.add(theme);

					return {
						theme: theme,
						isLight: theme == 'dark' ? false : true,
					};
				}),
		}),
		{
			name: 'theme-store',
		}
	)
);
