import { DocumentData } from "@firebase/firestore"

declare global {
  type ID = string

  interface Team {
    id: ID
    members: ID[]
    name: string
    coachId: string
  }

  interface Milestone {
    id: ID
    title: string
    intro: string
    learn: string
    learnMoreAaltoCourses: string
    learnMoreOther: string
    task: string
    done: boolean
  }

  interface Stage {
    id: ID
    name: string
    milestones: Milestone[]
  }

  interface WeeklyUpdate {
    biggestImprovement: string
    biggestObstacle: string
    learned: string
    morale: number
  }
}

export {}
