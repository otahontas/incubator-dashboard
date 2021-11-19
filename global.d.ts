import { User } from "firebase/auth"

declare global {
  interface Participant extends User {
    role: string
  }

  interface Coach {
    id: string
    role: string
  }

  interface Milestone {
    id: string
    title: string
  }
}

export {}
