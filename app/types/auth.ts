// app/types/auth.ts
export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: "buyer" | "admin";
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  logout: () => Promise<void>;
}