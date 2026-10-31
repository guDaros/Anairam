import { EMAIL, OAB_NUMBER_BA, OAB_NUMBER_PR } from '@/lib/constants';

export function LinksFooter() {
  return (
    <>
      <div className="mx-auto mb-5 mt-11 h-px w-10 bg-ouro" aria-hidden="true" />
      <footer className="text-[0.66rem] leading-[2.1] tracking-[0.22em] text-suave">
        {OAB_NUMBER_PR} &nbsp;·&nbsp; {OAB_NUMBER_BA}
        <br />
        <a href={`mailto:${EMAIL}`} className="tracking-[0.08em] hover:underline">
          {EMAIL}
        </a>
      </footer>
    </>
  );
}
