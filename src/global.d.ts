import { DocumentData } from "@firebase/firestore"

declare global {
  type ID = string

  interface Team {
    // It's actually the id field
    NO_ID_FIELD: ID
    members: ID[]
    name: string
    projectDescriptionMax50chars: string
    projectDescriptionLong: string
  }

  interface Coach {
    uid: ID
    role: string
  }

  interface Milestone {
    uid: ID
    title: string
  }
}

export {}
