import { render } from "hono/jsx/dom";

const sidebarItems = [
  {
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
        <rect x="3" y="3" width="7" height="7" rx="2" fill="#555"/>
        <rect x="14" y="3" width="7" height="7" rx="2" fill="#555"/>
        <rect x="14" y="14" width="7" height="7" rx="2" fill="#555"/>
        <rect x="3" y="14" width="7" height="7" rx="2" fill="#555"/>
      </svg>
    ),
    label: "Dashboard",
    selected: false,
  },
  {
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
        <path d="M7 18c-1.1 0-2-.9-2-2V7c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2v9c0 1.1-.9 2-2 2H7zm0 2h10c2.21 0 4-1.79 4-4V7c0-2.21-1.79-4-4-4H7C4.79 3 3 4.79 3 7v9c0 2.21 1.79 4 4 4z" fill="#555"/>
        <path d="M16 11V9c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v2" stroke="#fff" strokeWidth="2"/>
      </svg>
    ),
    label: "Orders",
    selected: false,
  },
  {
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
        <path d="M4 17l6-6 5 5 5-9" stroke="#1976d2" strokeWidth="2" fill="none"/>
        <circle cx="4" cy="17" r="2" fill="#1976d2"/>
        <circle cx="10" cy="11" r="2" fill="#1976d2"/>
        <circle cx="15" cy="16" r="2" fill="#1976d2"/>
        <circle cx="20" cy="7" r="2" fill="#1976d2"/>
      </svg>
    ),
    label: "Page 2",
    selected: true,
  },
];

export default function Layout() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "#fff",
      fontFamily: "Roboto, Arial, sans-serif",
      display: "flex",
      flexDirection: "column"
    }}>
      {/* Header */}
      <div style={{
        height: 56,
        borderBottom: "1px solid #e0e0e0",
        display: "flex",
        alignItems: "center",
        padding: "0 24px",
        justifyContent: "space-between"
      }}>
        <div style={{display: "flex", alignItems: "center", gap: 12}}>
          <button style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            marginRight: 8,
            padding: 0
          }}>
            <svg width="28" height="28" fill="#1976d2" viewBox="0 0 24 24">
              <rect x="4" y="6" width="16" height="2" rx="1"/>
              <rect x="4" y="11" width="16" height="2" rx="1"/>
              <rect x="4" y="16" width="16" height="2" rx="1"/>
            </svg>
          </button>
          <svg width="32" height="32" viewBox="0 0 32 32" style={{marginRight: 8}}>
            <rect width="32" height="32" rx="6" fill="#1976d2"/>
            <rect x="7" y="7" width="8" height="8" rx="2" fill="#fff"/>
            <rect x="17" y="7" width="8" height="8" rx="2" fill="#fff"/>
            <rect x="17" y="17" width="8" height="8" rx="2" fill="#fff"/>
          </svg>
          <span style={{fontWeight: 700, fontSize: 24, color: "#1976d2"}}>Toolpad</span>
        </div>
        <button style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: 0
        }}>
          <svg width="28" height="28" fill="#1976d2" viewBox="0 0 24 24">
            <path d="M12 3a9 9 0 1 0 9 9" stroke="#1976d2" strokeWidth="2" fill="none"/>
            <path d="M12 3v6l4 2" stroke="#1976d2" strokeWidth="2" fill="none"/>
          </svg>
        </button>
      </div>
      {/* Main */}
      <div style={{display: "flex", flex: 1, minHeight: 0}}>
        {/* Sidebar */}
        <nav style={{
          width: 110,
          background: "#fff",
          borderRight: "1px solid #e0e0e0",
          paddingTop: 16,
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}>
          <div style={{
            fontWeight: 600,
            color: "#666",
            fontSize: 15,
            marginBottom: 16,
            width: "100%",
            textAlign: "center"
          }}>
            Main items
          </div>
          {sidebarItems.map(item => (
            <div
              key={item.label}
              style={{
                width: "90%",
                marginBottom: 8,
                borderRadius: 12,
                background: item.selected ? "#e3f0fc" : "none",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "8px 0",
                cursor: "pointer",
                border: item.selected ? "1.5px solid #b6d6f6" : "1.5px solid transparent",
                transition: "background 0.2s"
              }}
            >
              <div>{item.icon}</div>
              <div style={{
                fontSize: 14,
                color: item.selected ? "#1976d2" : "#222",
                marginTop: 2,
                fontWeight: item.selected ? 600 : 400
              }}>
                {item.label}
              </div>
            </div>
          ))}
        </nav>
        {/* Content */}
        <main style={{
          flex: 1,
          padding: "32px 32px",
          background: "#fff"
        }}>
          <div style={{fontSize: 16, color: "#888", marginBottom: 8}}>
            Dashboard / <span style={{color: "#555"}}>Page 2</span>
          </div>
          <div style={{fontSize: 44, fontWeight: 500, marginBottom: 16, color: "#222"}}>
            Page 2
          </div>
          <div style={{fontSize: 24, color: "#333"}}>
            This is Page 2
          </div>
        </main>
      </div>
    </div>
  );
}

const root = document.getElementById("root")!;
render(<Layout />, root);