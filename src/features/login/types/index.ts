export interface OTPResponse {
  success: boolean;
  message?: string;
  token?: string;
  user?: {
    wp_data: {
      ID: number;
      username: string;
      email: string;
      display_name: string;
      first_name: string;
      last_name: string;
      roles: string[];
    };
  };
}
