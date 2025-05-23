import { render } from "hono/jsx/dom";

const providers = [
  {
    name: "GitHub",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path fill="#333" d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.53-1.34-1.3-1.7-1.3-1.7-1.06-.72.08-.71.08-.71 1.17.08 1.79 1.2 1.79 1.2 1.04 1.78 2.73 1.27 3.4.97.11-.75.41-1.27.74-1.56-2.56-.29-5.26-1.28-5.26-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .98-.31 3.2 1.18a11.1 11.1 0 0 1 2.92-.39c.99 0 1.99.13 2.92.39 2.22-1.49 3.2-1.18 3.2-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.43-2.7 5.41-5.27 5.7.42.36.79 1.09.79 2.2 0 1.59-.01 2.87-.01 3.26 0 .31.21.68.8.56C20.71 21.39 24 17.08 24 12c0-6.27-5.23-11.5-12-11.5z"/>
      </svg>
    ),
    color: "#333",
    text:'Вхід через GitHub'
  },
  {
    name: "Google",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24">
        <g>
          <path fill="#EA4335" d="M21.6 12.227c0-.638-.057-1.252-.163-1.84H12v3.481h5.43a4.637 4.637 0 0 1-2.01 3.045v2.522h3.24c1.897-1.75 2.98-4.33 2.98-7.208z"/>
          <path fill="#34A853" d="M12 22c2.7 0 4.97-.89 6.63-2.41l-3.24-2.522c-.9.6-2.05.96-3.39.96-2.61 0-4.82-1.76-5.61-4.13H3.01v2.594A9.997 9.997 0 0 0 12 22z"/>
          <path fill="#4A90E2" d="M6.39 13.897A5.997 5.997 0 0 1 6 12c0-.66.11-1.3.31-1.897V7.509H3.01A9.997 9.997 0 0 0 2 12c0 1.57.37 3.06 1.01 4.491l3.38-2.594z"/>
          <path fill="#FBBC05" d="M12 6.58c1.47 0 2.78.51 3.82 1.51l2.86-2.86C16.97 3.89 14.7 3 12 3A9.997 9.997 0 0 0 3.01 7.509l3.38 2.594C7.18 8.34 9.39 6.58 12 6.58z"/>
        </g>
      </svg>
    ),
    color: "#fff",
    text: 'Вхід через Google'
  },
  {
    name: "Facebook",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24">
        <path fill="#1877F3" d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.92.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0"/>
      </svg>
    ),
    color: "#fff",
    text: 'Вхід через Facebook'
  },
  {
    name: "Twitter",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24">
        <path fill="#1DA1F2" d="M24 4.557a9.83 9.83 0 0 1-2.828.775 4.932 4.932 0 0 0 2.165-2.724c-.951.564-2.005.974-3.127 1.195A4.916 4.916 0 0 0 16.616 3c-2.72 0-4.924 2.206-4.924 4.924 0 .386.044.763.127 1.124C7.728 8.807 4.1 6.884 1.671 3.965c-.423.724-.666 1.562-.666 2.475 0 1.708.87 3.216 2.188 4.099a4.904 4.904 0 0 1-2.229-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.936 4.936 0 0 1-2.224.084c.627 1.956 2.444 3.377 4.6 3.417A9.867 9.867 0 0 1 0 21.543a13.94 13.94 0 0 0 7.548 2.212c9.057 0 14.009-7.513 14.009-14.009 0-.213-.005-.425-.014-.636A10.012 10.012 0 0 0 24 4.557z"/>
      </svg>
    ),
    color: "#fff",
    text: 'Вхід через Twitter'
  },
  {
    name: "LinkedIn",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24">
        <path fill="#0077B5" d="M22.23 0H1.77C.792 0 0 .771 0 1.723v20.554C0 23.229.792 24 1.77 24h20.46C23.208 24 24 23.229 24 22.277V1.723C24 .771 23.208 0 22.23 0zM7.12 20.452H3.56V9h3.56v11.452zM5.34 7.633a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zm15.112 12.819h-3.56v-5.605c0-1.336-.025-3.057-1.865-3.057-1.868 0-2.154 1.46-2.154 2.968v5.694h-3.56V9h3.418v1.561h.049c.477-.902 1.637-1.85 3.37-1.85 3.604 0 4.27 2.37 4.27 5.455v6.286z"/>
      </svg>
    ),
    color: "#fff",
    text: 'Вхід через LinkedIn'
  },
];

const handleSignIn = (provider: string) => {
  console.log(`Sign in with ${provider}`);
  window.location.href = "/cabinet";
  // Здесь можно реализовать реальную авторизацию
};

export default function Login() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "#fff", // Белый фон на всю страницу
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <div style={{
        background: "#fff",
        borderRadius: 12,
        boxShadow: "0 2px 8px rgba(0,0,0,0.10)", // Короткая тень
        padding: "2.5rem 2rem",
        width: 350,
        maxWidth: "90vw",
        textAlign: "center"
      }}>
        <h2 style={{marginBottom: 8}}>Вхід</h2>
        <div style={{color: "#555", marginBottom: 24, fontSize: 16}}>
          Вітаемо, будь ласка, увійдіть у свій акаунт для продовження
        </div>
        {providers.map((p) => (
          <button
            key={p.name}
            onClick={() => handleSignIn(p.name)}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "10px 0",
              marginBottom: 14,
              border: "1px solid #ddd",
              borderRadius: 6,
              background: "#fff",
              fontSize: 16,
              fontWeight: 500,
              color: "#111", // Цвет текста кнопки черный
              cursor: "pointer",
              transition: "background 0.2s",
              boxShadow: "0 1px 2px rgba(0,0,0,0.03)"
            }}
          >
            <span style={{marginLeft: 18}}>{p.icon}</span>
            <span style={{flex: 1, textAlign: "left"}}>
              Вхід за допомогою {p.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

const root = document.getElementById("root")!;
render(<Login />, root);