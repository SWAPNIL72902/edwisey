import './globals.css'

export const metadata = {
  title: 'SyllaFlow — Smart Topic Segregation',
  description: 'Transform raw syllabi into structured topic hierarchies using AI.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
