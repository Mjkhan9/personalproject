import { Header } from './Header';
import { Footer } from './Footer';

export function MainLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-neutral-dark">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}
