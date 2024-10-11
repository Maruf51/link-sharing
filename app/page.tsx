import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"

export default async function Home() {
  const session: any = await getServerSession()

  if (session?.status === 'authenticated') {
    redirect('/home')
  } else {
    redirect('/signin')
  }
}
