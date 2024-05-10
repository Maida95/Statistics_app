import { Outlet, NavLink } from "react-router-dom";

export default function RootLayout() {
  return (
    <div className="root-layout">
      <header>
        <nav>
          <h1>MOJA TV Statistika</h1>
          <NavLink to="/">Statistics</NavLink>
          <NavLink to="management">Management</NavLink>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  )
}