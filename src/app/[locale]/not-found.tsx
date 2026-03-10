import Link from 'next/link';

export default function NotFound() {
  return (
    <section
      className="section"
      style={{
        minHeight: '60vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
      }}
    >
      <div className="section-inner">
        <span className="eyebrow">404</span>
        <h2
          className="section-h"
          style={{ marginBottom: '24px' }}
        >
          Sehife <em>tapilmadi</em>
        </h2>
        <p
          className="section-p"
          style={{ margin: '0 auto 40px' }}
        >
          Axtardiginiz sehife movcud deyil ve ya kocurulub. Ana sehifeye qayidaraq davam edin.
        </p>
        <Link href="/" className="btn-primary">
          Ana Sehife
        </Link>
      </div>
    </section>
  );
}
