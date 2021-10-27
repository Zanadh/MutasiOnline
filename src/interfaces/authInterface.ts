export interface RefreshTokenDecodeInterface {
  sub: number;
  iat: number;
  exp: number;
}

export interface AccessTokenDecodeInterface
  extends RefreshTokenDecodeInterface {
  user: {
    id: number;
    firstName: string;
    lastName: string;
    nik: string;
  };
}
