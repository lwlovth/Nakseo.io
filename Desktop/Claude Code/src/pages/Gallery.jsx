export default function Gallery() {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🖼️ 갤러리</h1>
      <p style={styles.subtitle}>곧 구현 예정입니다!</p>
    </div>
  )
}

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#f8f9fa',
  },
  title: { fontSize: '32px', marginBottom: '12px' },
  subtitle: { fontSize: '16px', color: '#666' },
}
