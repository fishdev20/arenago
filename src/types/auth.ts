export interface SignupRequest {
  email: string
  password: string
  displayName: string
  info: Info
}

export interface Info {
  address: string
  city: string
  state: string
  postalCode: string
  country: string
  phone: string
  bio: string
}

export interface SigninRequest {
  email: string
  password: string
}
