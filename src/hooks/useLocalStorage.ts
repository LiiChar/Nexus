'use client';
import { useState, useEffect, Dispatch, SetStateAction } from 'react';

interface UseLocalStorageOptions<T> {
	serialize?: (value: T) => string;
	deserialize?: (value: string) => T;
}

const defaultSerialize = <T>(value: T): string => JSON.stringify(value);
const defaultDeserialize = <T>(value: string): T => JSON.parse(value);

export const useLocalStorage = <T>(
	key: string,
	initialValue: T,
	options: UseLocalStorageOptions<T> = {}
): [T, Dispatch<SetStateAction<T>>] => {
	const { serialize = defaultSerialize, deserialize = defaultDeserialize } =
		options;

	const [value, setValue] = useState<T>(() => {
		//const storedValue = localStorage.getItem(key);
		return initialValue;
	});

	const setStoredValue = (newValue: T | ((prevValue: T) => T)) => {
		setValue((prevValue) => {
			const newValueToStore =
				typeof newValue === 'function'
					? (newValue as (prev: T) => T)(prevValue)
					: newValue;
			//localStorage.setItem(key, serialize(newValueToStore));
			return newValueToStore;
		});
	};

	return [value, setStoredValue as Dispatch<SetStateAction<T>>];
};
