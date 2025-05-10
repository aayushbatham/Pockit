import { Redirect } from 'expo-router';
import { isAuthenticated } from '@/utils/storage';

export default function Index() {
  if (isAuthenticated()) {
    return <Redirect href="/(home)" />;
  }
  
  return <Redirect href="/(unauthorized)/get-started" />;
}