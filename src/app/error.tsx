'use client';

// Custom Error Page for App Router
// Must be a Client Component
export const dynamic = 'force-dynamic';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '50vh',
      padding: '20px',
      textAlign: 'center'
    }}>
      <h1 style={{ fontSize: '4rem', margin: '0' }}>500</h1>
      <h2 style={{ fontSize: '1.5rem', margin: '20px 0' }}>Något gick fel</h2>
      <p style={{ color: '#666', marginBottom: '30px' }}>
        Ett oväntat fel uppstod. Försök igen eller kontakta support om problemet kvarstår.
      </p>
      <div style={{ display: 'flex', gap: '15px' }}>
        <button
          onClick={() => reset()}
          style={{
            padding: '12px 24px',
            background: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontSize: '1rem',
            cursor: 'pointer'
          }}
        >
          Försök igen
        </button>
        <a
          href="/"
          style={{
            padding: '12px 24px',
            background: '#6b7280',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '6px',
            fontSize: '1rem'
          }}
        >
          Tillbaka till startsidan
        </a>
      </div>
    </div>
  );
}
