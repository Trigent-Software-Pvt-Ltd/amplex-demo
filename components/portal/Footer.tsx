export function Footer() {
  return (
    <footer className="border-t bg-[#0a0a0f] py-6">
      <div className="flex flex-col items-center gap-2">
        <img
          src="https://www.arkos.studio/TrigentArkOS-fullcolor-white.svg"
          alt="Trigent ArkOS"
          className="h-8 w-auto"
        />
        <p className="text-sm text-white/60">Powered by Trigent ArkOS</p>
        <p className="text-xs text-white/40">
          &copy; 2026. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
