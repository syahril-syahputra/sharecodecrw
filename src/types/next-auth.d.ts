import 'next-auth';
import type { User } from 'next-auth';

declare module 'next-auth' {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        user: User;
        access_token?: string;
    }

    interface User {
        // id: number;
        name: string;
        email: string;
        company_name: string;
        ulid: string;
        first_name: string;
        last_name: string;
        email_verified_at: string;
    }
}

declare module 'next-auth/jwt' {
    /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
    interface JWT extends User {
        access_token: string;
        access_token_expires: number;
    }
}
