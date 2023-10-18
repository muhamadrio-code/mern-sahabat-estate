import { Outlet } from "react-router-dom"
import { NavBar } from "."
function Root() {
  return (
    <>
      <NavBar />
      <main>
        <Outlet />
      </main>
    </>
  )
}

export default Root