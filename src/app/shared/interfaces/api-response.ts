interface Error {
    code: string;
    message: string;
}

export interface ApiResponse<T = any> {
    success: boolean;
    message: string;
    statusCode: number;
    data?: T | T[];
    errors?: Error[];
    timestamp: string;
}