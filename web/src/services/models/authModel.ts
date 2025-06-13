export interface LoginRequest {
    Email: string;
    Password: string;
}

export interface RegisterRequest {
    NameSurname: string;
    Email: string;
    Password: string;
    RolID: number;
}

export interface ConfirmEmailRequest {
    MailConfirmCode: string;
    Email: string;
}

export interface ConfirmEmailResponse {
    message: string;
    success: boolean;
}

export interface AuthResponse {
    accessToken: string;
    refreshToken: string;
    user: {
        UserID: number;
        NameSurname: string;
        Email: string;
        RolID: number;
    };
}