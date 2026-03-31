export function Footer() {
  return (
    <footer>
      {/* Main footer area */}
      <div className="bg-[#333333] py-8 flex flex-col items-center gap-3">
        <img
          src="https://amplex.com/wp-content/uploads/2019/10/logo-wyt-300x56.png"
          alt="Amplex Corporation"
          className="h-10 w-auto"
        />
        <p className="text-sm text-white/50">Powered by Trigent ArkOS</p>
      </div>

      {/* Bottom copyright bar */}
      <div className="bg-[#C41230] py-3 px-6 flex items-center justify-between">
        <span className="text-sm text-white font-medium">
          AMPLEX CORPORATION &copy; 2026
        </span>
        <img
          src="https://www.arkos.studio/TrigentArkOS-fullcolor-white.svg"
          alt="ArkOS"
          className="h-5 w-auto"
        />
      </div>
    </footer>
  );
}
