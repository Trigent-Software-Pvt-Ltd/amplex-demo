export function Footer() {
  return (
    <footer className="mt-auto">
      <div className="bg-[#C41230] py-2 px-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src="https://amplex.com/wp-content/uploads/2019/10/logo-wyt-300x56.png"
            alt="Amplex Corporation"
            className="h-4 w-auto opacity-90"
          />
          <span className="text-[11px] text-white/60">&copy; 2026</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[11px] text-white/60">Powered by</span>
          <img
            src="https://www.arkos.studio/TrigentArkOS-fullcolor-white.svg"
            alt="ArkOS"
            className="h-4 w-auto"
          />
        </div>
      </div>
    </footer>
  );
}
