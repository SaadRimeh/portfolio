type IconName =
  | 'arrow'
  | 'external'
  | 'github'
  | 'mail'
  | 'search'
  | 'close'
  | 'copy'
  | 'check'
  | 'code'
  | 'mobile'
  | 'globe'
  | 'layers'
  | 'sun'

const paths: Record<IconName, string> = {
  arrow: 'M4 12h16m-6-6 6 6-6 6',
  external: 'M7 17 17 7M7 7h10v10',
  github:
    'M9 19c-4.3 1.3-4.3-2.2-6-2.7m12 5v-3.4a3 3 0 0 0-.8-2.3c2.7-.3 5.6-1.3 5.6-6A4.7 4.7 0 0 0 18.5 6a4.3 4.3 0 0 0-.1-3.5S17.4 2.2 15 3.8a12 12 0 0 0-6 0C6.6 2.2 5.6 2.5 5.6 2.5A4.3 4.3 0 0 0 5.5 6a4.7 4.7 0 0 0-1.3 3.6c0 4.7 2.9 5.7 5.6 6a3 3 0 0 0-.8 2.3v3.4',
  mail: 'M3 5h18v14H3zM3 6l9 7 9-7',
  search: 'M21 21l-5.5-5.5M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0',
  close: 'm6 6 12 12M6 18 18 6',
  copy: 'M9 9h12v12H9zM15 9V3H3v12h6',
  check: 'm5 12 4 4L19 6',
  code: 'm8 6-6 6 6 6m8-12 6 6-6 6m-3-16-2 20',
  mobile:
    'M7 2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2m2 0v3h6V2m-4 17h2',
  globe:
    'M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0M2 12h20M12 2a19 19 0 0 1 0 20 19 19 0 0 1 0-20',
  layers: 'm12 3 10 5-10 5L2 8l10-5M2 12l10 5 10-5M2 16l10 5 10-5',
  sun: 'M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0',
}

export default function Icon({
  name,
  className = '',
}: {
  name: IconName
  className?: string
}) {
  return (
    <svg
      className={`icon ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={paths[name]} />
    </svg>
  )
}
