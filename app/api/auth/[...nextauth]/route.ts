import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

// Define an interface for the credentials
interface Credentials {
    username: string;
    password: string;
}

// Define a custom error type if needed
interface CustomError extends Error {
    statusCode?: number;
}

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",

            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials: Credentials | undefined) {
                if (!credentials) {
                    throw new Error('No credentials provided');
                }

                try {
                    const { username, password } = credentials;
                    await connectMongoDB();
                    const response = await User.findOne({ username });

                    if (response) {
                        if (password === response.password) {
                            return {
                                id: response.uid,
                                name: response.username,
                                email: response.email,
                            };
                        } else {
                            throw new Error('Provided password is wrong');
                        }
                    } else {
                        throw new Error('There is no account with this username');
                    }
                } catch (error) {
                    const customError: CustomError = error as CustomError;
                    return Promise.reject(new Error(customError.message));
                }
            }
        })
    ]
});

export { handler as GET, handler as POST };
