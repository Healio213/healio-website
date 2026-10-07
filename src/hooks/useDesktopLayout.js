import { useSyncExternalStore } from 'react';

const query = '(min-width: 1024px)';
const subscribe = (notify) => {
  const media = window.matchMedia(query);
  media.addEventListener('change', notify);
  return () => media.removeEventListener('change', notify);
};
const getSnapshot = () => window.matchMedia(query).matches;
const getServerSnapshot = () => false;

export default function useDesktopLayout() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
