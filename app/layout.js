import './globals.css';
import { GameProvider } from '../lib/game-context';

export const metadata = {
  title: 'Mexican Train Scorekeeper',
  description: 'A scorekeeper for the Mexican Train domino game.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <GameProvider>
          <body className="bg-background text-foreground min-h-screen p-4">
            {children}
          </body>
        </GameProvider>
      </body>
    </html>
  );
}
