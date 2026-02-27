import type { JSX } from "react"
import { useAppSelector } from "@/shared/lib/store"



function AuthGuard({ children }: { children: JSX.Element }) {

  const { user } = useAppSelector(state => state.auth)

  if (!user) {
    return <div>Cannot access!</div>
  }
  return <>{children} </>
}

export default AuthGuard