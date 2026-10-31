interface LinkButtonProps {
  href: string;
  children: React.ReactNode;
}

export function LinkButton({ href, children }: LinkButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="block border border-vinho/35 px-3 py-[17px] text-[0.72rem] font-normal uppercase tracking-[0.32em] text-vinho transition-colors duration-200 hover:border-vinho hover:bg-vinho hover:text-white focus-visible:border-vinho focus-visible:bg-vinho focus-visible:text-white focus-visible:outline-hidden"
    >
      {children}
    </a>
  );
}
