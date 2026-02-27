import type { JSX } from "react"
import { useAppSelector } from "@/shared/lib/store"



function AdminGuard({ children }: { children: JSX.Element }) {

  const { user } = useAppSelector(state => state.auth)

  if (user?.role !== "admin") {
    return <div>Cannot access! Only admin!</div>
  }
  return <>{children} </>
}

export default AdminGuard