import './globals.css';

export const metadata = {
  title: 'Mexican Train Scorekeeper',
  description: 'A scorekeeper for the Mexican Train domino game.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-br from-purple-500 to-indigo-600 text-white min-h-screen p-4">
        {children}
      </body>
    </html>
  );
}
