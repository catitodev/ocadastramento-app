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
        <div className="text-xs text-gray-600 space-y-2">
          {/* Copyright line */}
          <div className="text-center">
            <span className="font-medium">OCAdastramento © 2025</span>
          </div>

          {/* Developer line */}
          <div className="text-center">
            <span>
              Desenvolvido por <strong className="text-green-700">CalangoFlux</strong>
            </span>
          </div>

          {/* License line with icon */}
          <div className="text-center">
            <a
              href="https://creativecommons.org/licenses/by/4.0/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 hover:text-gray-800 transition-colors"
            >
              <img src="https://licensebuttons.net/l/by/4.0/88x31.png" alt="CC BY 4.0" className="h-4" />
              <span>
                sob licença <strong>CC BY 4.0</strong>
              </span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
