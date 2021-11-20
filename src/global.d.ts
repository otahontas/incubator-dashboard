import { DocumentData } from "@firebase/firestore"

declare global {
  type ID = string

  interface Team {
    id: ID
    members: ID[]
    name: string
    coachId: string
  }

  interface Coach {
    id: ID
    role: string
  }

  interface TaskCheckpoint {
    id: ID
    name: string
    done: boolean
  }
  interface Task {
    description: string
    taskCheckpoints: TaskCheckpoint[]
  }
  interface Checkpoint {
    id: ID
    title: string
    intro: string
    learn: string
    learnMoreAaltoCourses: string
    learnMoreOther: string
    task: Task
  }

  interface WeeklyUpdate {
    biggestImprovement: string
    biggestObstacle: string
    learned: string
    morale: number
  }
}

export {}
