import User from "@/Models/User";
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "@/utils/dbConnect";
import { compare } from 'bcryptjs';

export const authOptions = {

    providers: [
        CredentialsProvider({
            id: 'credential',
            name: 'Credential',
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },


            async authorize(credentials){
                await dbConnect();

                try {
                    const user = await User.findOne({email: credentials.email});
                    if(!user) throw new Error('هذا الايميل غير موجود في سجلاتنا')

                      const isValid = await compare(credentials.password, user.password);

                      if (!isValid) {
                        throw new Error('هناك معلومات خاطئة في البريد الإلكتروني أو كلمة المرور');
                      }

                    
                        return user
                } catch (error) {
                    throw new Error(error)
                }
            }
        })
    ],
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
              token.id = user._id;
              token.email = user.email;
              token.role = user.role;
              token.username = user.username;
              token.phoneNumber = user.phoneNumber;
              token.dateOfBirth = user.dateOfBirth;
              token.gender = user.gender;
              token.permissions = user.permissions;
            }
            return token;
          },
          async session({ session, token }) {
            if (token) {
              session.user = {
                id: token.id,
                email: token.email,
                role: token.role,
                username: token.username,
                phoneNumber: token.phoneNumber,
                dateOfBirth: token.dateOfBirth,
                gender: token.gender,
                permissions: token.permissions
              };
            }
            return session;
          },
    },
    pages: {
        signIn: '/sign',
        signOut: '/'
    },
    jwt: {
        secret: process.env.NEXTAUTH_SECRET,
    },
    secret: process.env.NEXTAUTH_SECRET,

}


export default NextAuth(authOptions);