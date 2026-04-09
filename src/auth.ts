import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [GitHub],
  callbacks: {
    async signIn({ profile }) {
      // Only the admin GitHub user can sign in
      return profile?.login === process.env.ADMIN_GITHUB_USERNAME
    },
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const isAdminRoute = nextUrl.pathname.startsWith("/admin")
      if (isAdminRoute) return isLoggedIn
      return true
    },
  },
})
