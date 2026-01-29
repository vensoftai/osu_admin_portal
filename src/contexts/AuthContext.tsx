import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authService, tokenService, type User } from '@/lib/api';
import { AxiosError } from 'axios';

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
    logout: () => void;
    changePassword: (currentPassword: string, newPassword: string, confirmPassword: string) => Promise<{ success: boolean; message: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Extract error message from API error response
 */
function getErrorMessage(error: unknown): string {
    if (error instanceof AxiosError) {
        // Handle different error response structures
        const data = error.response?.data;

        if (typeof data === 'string') return data;
        if (data?.message) return data.message;
        if (data?.detail) return data.detail;
        if (data?.error) return data.error;
        if (data?.non_field_errors) return data.non_field_errors[0];

        // Handle validation errors
        if (data?.errors && typeof data.errors === 'object') {
            const firstError = Object.values(data.errors)[0];
            if (Array.isArray(firstError)) return firstError[0] as string;
        }

        // HTTP status based messages
        switch (error.response?.status) {
            case 400:
                return 'Invalid credentials. Please check your email and password.';
            case 401:
                return 'Invalid email or password. Please try again.';
            case 403:
                return 'Access denied. You do not have permission to login.';
            case 404:
                return 'Account not found. Please check your email.';
            case 500:
                return 'Server error. Please try again later.';
            default:
                return 'An error occurred. Please try again.';
        }
    }

    if (error instanceof Error) return error.message;
    return 'An unexpected error occurred. Please try again.';
}

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check if user is already logged in
        const initializeAuth = () => {
            const storedUser = authService.getStoredUser();
            const isValid = tokenService.isAuthenticated();

            if (storedUser && isValid) {
                setUser(storedUser);
            } else {
                // Clear invalid session
                authService.logout();
            }
            setIsLoading(false);
        };

        initializeAuth();
    }, []);

    const login = async (email: string, password: string): Promise<{ success: boolean; message: string }> => {
        try {
            const { user: loggedInUser, message } = await authService.login({ email, password });
            setUser(loggedInUser);
            return { success: true, message };
        } catch (error) {
            const errorMessage = getErrorMessage(error);
            return { success: false, message: errorMessage };
        }
    };

    const logout = () => {
        authService.logout();
        setUser(null);
    };

    const changePassword = async (currentPassword: string, newPassword: string, confirmPassword: string): Promise<{ success: boolean; message: string }> => {
        try {
            const response = await authService.changePassword(currentPassword, newPassword, confirmPassword);
            return { success: true, message: response.message || 'Password changed successfully' };
        } catch (error) {
            const errorMessage = getErrorMessage(error);
            return { success: false, message: errorMessage };
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated: !!user && tokenService.isAuthenticated(),
                isLoading,
                login,
                logout,
                changePassword,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
