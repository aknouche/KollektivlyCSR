// Custom 404 Page for App Router
export const dynamic = 'force-dynamic';

export default function NotFound() {
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
      <h1 style={{ fontSize: '4rem', margin: '0' }}>404</h1>
      <h2 style={{ fontSize: '1.5rem', margin: '20px 0' }}>Sidan kunde inte hittas</h2>
      <p style={{ color: '#666', marginBottom: '30px' }}>
        Sidan du letar efter finns inte eller har flyttats.
      </p>
      <a
        href="/"
        style={{
          padding: '12px 24px',
          background: '#3b82f6',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '6px',
          fontSize: '1rem'
        }}
      >
        Tillbaka till startsidan
      </a>
    </div>
  );
}
