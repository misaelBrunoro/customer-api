export class AuthResponseDto {
  readonly access_token: string

  readonly expires_in: string

  readonly refresh_expires_in: number

  readonly token_type: string

  readonly 'not-before-policy': string

  readonly scope: string

  readonly id_token: string
}
