import { DocumentData } from "@firebase/firestore"

declare global {
  interface Team {
    uid: string
    name: string
    projectDescriptionMax50chars: string
    projectDescriptionLong: string
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
