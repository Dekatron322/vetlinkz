import "styles/tailwind.css"
import ThemeProviders from "components/ProvidersComponents/ThemeProviders"

export default function ServiceLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeProviders>{children}</ThemeProviders>
      </body>
    </html>
  )
}
