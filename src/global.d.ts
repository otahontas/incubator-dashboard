import { DocumentData } from "@firebase/firestore"

declare global {
  type ID = string

  interface Team {
    id: ID
    members: ID[]
    name: string
    projectDescriptionMax50chars: string
    projectDescriptionLong: string
    coachId: string
  }

  interface Coach {
    uid: ID
    role: string
  }

  interface Milestone {
    uid: ID
    title: string
  }

  interface WeeklyUpdate {
    biggestImprovement: string
    biggestObstacle: string
    learned: string
    morale: number
  }
}

export {}
