'use client';
import type { theme } from '@/types/theme';
import { useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';

type returnType = {
	theme: theme;
	isLight: boolean;
	handleTheme: (theme: theme) => void;
};

export const useTheme = (): returnType => {
	const [theme, setTheme] = useLocalStorage<theme>('theme', 'light');
	let html: HTMLElement | null = null;

	useEffect(() => {
		if (!html) {
			html = document.querySelector('html');
		}
		if (html) {
			if (theme == 'light') {
				html.classList.add('dark');
			} else {
				html.classList.remove('dark');
			}
		}
	}, [theme]);

	const handleTheme = (themeValue: theme) => {
		setTheme(themeValue);
	};

	return {
		theme,
		handleTheme,
		isLight: theme == 'light',
	};
};
