import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import NextAuth from "next-auth/next";
// import Credentials from "next-auth/providers/credentials";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",

            credentials: {
                email: {},
                password: {},
            },
            async authorize(credentials: any, req) {
                try {
                    const { email, password } = credentials
                    await connectMongoDB()
                    const response = await User.findOne({ email })
                    if (response) {
                        if (password === response.password) {
                            return {
                                id: response.uid,
                                name: response.firstname + ' ' + response.lastname,
                                email: response.email
                            }
                        } else {
                            throw new Error('Provided password is wrong')
                        }
                    } else {
                        throw new Error('There is no account with this email')
                    }
                } catch (error: any) {
                    return Promise.reject(new Error(error.message)); return null;
                }
            }
        })
    ]
})

export { handler as GET, handler as POST }