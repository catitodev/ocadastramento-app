export function Footer() {
  return (
    <footer className="w-full py-6 px-4 bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-md mx-auto text-center">
        {/* Logo CalangoFlux */}
        <div className="mb-4">
          <img
            src="/calangoicone.png"
            alt="CalangoFlux Logo"
            className="h-12 w-auto mx-auto"
            style={{ maxHeight: "60px" }}
          />
        </div>

        {/* Licenciamento */}
        <div className="text-xs text-gray-600">
          <a
            href="https://creativecommons.org/licenses/by/4.0/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 flex-wrap hover:text-gray-800 transition-colors"
          >
            <img src="https://licensebuttons.net/l/by/4.0/88x31.png" alt="CC BY 4.0" className="h-4" />
            <span className="text-center">
              OCAdastramento © 2025 — Desenvolvido por <strong className="text-green-700">CalangoFlux</strong> sob
              licença <strong>CC BY 4.0</strong>.
            </span>
          </a>
        </div>
      </div>
    </footer>
  )
}
