import { deleteSession } from "@/utils/session"
export async function POST () {
    deleteSession()
    return new Response('Logged out successfully', { status: 200 })
}