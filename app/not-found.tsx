import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function NotFound() {
    const session = await getServerSession()

    if (session?.user?.name) {
        redirect('/home');
    } else {
        redirect('/signin');
    }
}