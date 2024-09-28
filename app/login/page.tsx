import LoginPage from './login';

export const metadata = {
  title: 'Login | SolarKoko - Your Solar Marketplace',
  description: 'Login to SolarKoko to access your account, manage orders, and explore solar products.',
  keywords: 'Solar, SolarKoko, solar marketplace, login, renewable energy, solar products, Nigeria',
  openGraph: {
    title: 'Login | SolarKoko - Your Solar Marketplace',
    description: 'Login to your SolarKoko account and explore solar energy products, manage your purchases, or become a vendor.',
    url: 'https://solarkoko.com/login',
    type: 'website',
    siteName: 'SolarKoko',
    images: [
      {
        url: 'https://solarkoko.com/images/solarkoko-login-og.png',
        width: 800,
        height: 600,
        alt: 'SolarKoko login page',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Login | SolarKoko - Your Solar Marketplace',
    description: 'Login to SolarKoko and explore solar products, manage orders, or become a vendor.',
    images: ['https://solarkoko.com/images/solarkoko-login-og.png'],
    site: '@SolarKoko',
  },
  robots: 'index, follow',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function Login() {
  return <LoginPage />;
}
