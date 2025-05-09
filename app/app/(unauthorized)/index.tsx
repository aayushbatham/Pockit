import { Redirect } from 'expo-router';

export default function Index() {
  return <Redirect href="/(unauthorized)/get-started" />;
} 