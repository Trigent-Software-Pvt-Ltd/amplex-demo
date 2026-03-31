interface ISeriesTagProps {
  table: string;
}

export function ISeriesTag({ table }: ISeriesTagProps) {
  return (
    <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold bg-teal-50 text-teal-700 border border-teal-200 rounded px-2 py-0.5">
      <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
      {table}
    </span>
  );
}
