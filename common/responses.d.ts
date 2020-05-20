export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

export interface RefreshResponse extends LoginResponse {}
