import { Button, Heading, Stack, useToast } from "@chakra-ui/react"
import * as Yup from "yup"
import {
  Center,
  Avatar,
  Box,
  chakra,
  Container,
  Flex,
  Icon,
  SimpleGrid,
  Text,
  useColorModeValue,
} from "@chakra-ui/react"
import { SelectControl } from "formik-chakra-ui"

import { collection, doc, query, serverTimestamp, updateDoc } from "firebase/firestore"
import type { DocumentData } from "firebase/firestore"
import { useFirestoreCollectionData, useFirestore } from "reactfire"
import React from "react"
import Loading from "../../sharedComponents/Loading"
import useCoaches from "../../hooks/useCoaches"
import { Formik, useFormikContext } from "formik"
import { debounce, isEqual } from "lodash"
interface SingleProps {
  tmpl: DocumentData
}

const SingleRoadmap = ({ tmpl }: SingleProps) => {
  const firestore = useFirestore()
  const roadmap = collection(firestore, "roadmapTemplates", tmpl.id, "roadmap")
  const roadmapQuery = query(roadmap)
  const { status, data } = useFirestoreCollectionData(roadmapQuery, {
    idField: "id",
  })
  return status === "loading" ? null : (
    <>
      <Heading color={"blue.400"} fontSize={"2xl"} fontFamily={"body"}>
        {tmpl.title}
      </Heading>
      <Stack spacing={8}>
        {data.map((d) => (
          <Box
            key={d.id}
            p={5}
            shadow="sm"
            borderWidth="1px"
            style={{ marginTop: "8px" }}
          >
            <Heading fontSize="xl">{d.title}</Heading>
            <Text mt={4}>
              Description of the milestone goes here. Lorem ipsum lorem ipsum
              dolor sit amet.
            </Text>
          </Box>
        ))}
      </Stack>
    </>
  )
}

const backgrounds = [
  `url("data:image/svg+xml, %3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'560\' height=\'185\' viewBox=\'0 0 560 185\' fill=\'none\'%3E%3Cellipse cx=\'102.633\' cy=\'61.0737\' rx=\'102.633\' ry=\'61.0737\' fill=\'%23ED64A6\' /%3E%3Cellipse cx=\'399.573\' cy=\'123.926\' rx=\'102.633\' ry=\'61.0737\' fill=\'%23F56565\' /%3E%3Cellipse cx=\'366.192\' cy=\'73.2292\' rx=\'193.808\' ry=\'73.2292\' fill=\'%2338B2AC\' /%3E%3Cellipse cx=\'222.705\' cy=\'110.585\' rx=\'193.808\' ry=\'73.2292\' fill=\'%23ED8936\' /%3E%3C/svg%3E")`,
  `url("data:image/svg+xml, %3Csvg xmlns='http://www.w3.org/2000/svg' width='560' height='185' viewBox='0 0 560 185' fill='none'%3E%3Cellipse cx='457.367' cy='123.926' rx='102.633' ry='61.0737' transform='rotate(-180 457.367 123.926)' fill='%23ED8936'/%3E%3Cellipse cx='160.427' cy='61.0737' rx='102.633' ry='61.0737' transform='rotate(-180 160.427 61.0737)' fill='%2348BB78'/%3E%3Cellipse cx='193.808' cy='111.771' rx='193.808' ry='73.2292' transform='rotate(-180 193.808 111.771)' fill='%230BC5EA'/%3E%3Cellipse cx='337.295' cy='74.415' rx='193.808' ry='73.2292' transform='rotate(-180 337.295 74.415)' fill='%23ED64A6'/%3E%3C/svg%3E")`,
  `url("data:image/svg+xml, %3Csvg xmlns='http://www.w3.org/2000/svg' width='560' height='185' viewBox='0 0 560 185' fill='none'%3E%3Cellipse cx='102.633' cy='61.0737' rx='102.633' ry='61.0737' fill='%23ED8936'/%3E%3Cellipse cx='399.573' cy='123.926' rx='102.633' ry='61.0737' fill='%2348BB78'/%3E%3Cellipse cx='366.192' cy='73.2292' rx='193.808' ry='73.2292' fill='%230BC5EA'/%3E%3Cellipse cx='222.705' cy='110.585' rx='193.808' ry='73.2292' fill='%23ED64A6'/%3E%3C/svg%3E")`,
  `url("data:image/svg+xml, %3Csvg xmlns='http://www.w3.org/2000/svg' width='560' height='185' viewBox='0 0 560 185' fill='none'%3E%3Cellipse cx='457.367' cy='123.926' rx='102.633' ry='61.0737' transform='rotate(-180 457.367 123.926)' fill='%23ECC94B'/%3E%3Cellipse cx='160.427' cy='61.0737' rx='102.633' ry='61.0737' transform='rotate(-180 160.427 61.0737)' fill='%239F7AEA'/%3E%3Cellipse cx='193.808' cy='111.771' rx='193.808' ry='73.2292' transform='rotate(-180 193.808 111.771)' fill='%234299E1'/%3E%3Cellipse cx='337.295' cy='74.415' rx='193.808' ry='73.2292' transform='rotate(-180 337.295 74.415)' fill='%2348BB78'/%3E%3C/svg%3E")`,
]

interface LabelHeadingProps {
  text: string
}

interface CoachSelectorProps {
  team: Team
  coaches: any
}

interface Values {
  coach: string
}
export const SubmitListener: React.FC = () => {
  const formik = useFormikContext<Values>()
  const [lastValues, updateState] = React.useState(formik.values)

  const submitForm = React.useCallback(
    debounce(
      (): void => {
        formik.submitForm()
      },
      500,
      { maxWait: 1500 }
    ),
    []
  )

  React.useEffect(() => {
    const valuesEqualLastValues = isEqual(lastValues, formik.values)
    const valuesEqualInitialValues = isEqual(formik.values, formik.initialValues)

    if (!valuesEqualLastValues) {
      updateState(formik.values)
    }

    if (!valuesEqualLastValues && !valuesEqualInitialValues && formik.isValid) {
      submitForm()
    }
  }, [formik.values, formik.isValid])

  return null
}

const CoachSelector = ({ team, coaches }: CoachSelectorProps) => {
  const firestore = useFirestore()
  const toast = useToast()
  const validationSchema = Yup.object({
    coach: Yup.string().required(),
  })
  const initialValues: Values = {
    coach: "",
  }
  const onSubmit = async (values: Values) => {
    await updateDoc(doc(firestore, "teams", team.id), {
      coachId: values.coach,
      updatedAt: serverTimestamp(),
    })

    const currentTeams = coaches.find(c => c.id === values.coach).teams
    await updateDoc(doc(firestore, "users", values.coach), {
      coachId: values.coach,
      teams: currentTeams ? [...currentTeams, team.id] : [team.id],
      updatedAt: serverTimestamp(),
    })
    toast({
      title: "Succesfully added coach to team!",
      status: "success",
      isClosable: true,
      duration: 5000,
    })
  }
  return (
    <Flex direction="row" alignItems="center" style={{gap: '8px'}}>
      <Text>{team.name}</Text>
      <Formik
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      initialValues={initialValues}
      >
      {() => (
        <SelectControl
          name="coach"
            selectProps={{ placeholder: team.coachId ? coaches.find(c => c.id === team.coachId)?.name : "Select coach" }}
        >
        <SubmitListener />
            {coaches.map(coach => <option key={coach.id} value={coach.id}>{coach.name}</option>)}
        </SelectControl>
        
        )}
      </Formik>
    </Flex>
  )
}

const LabelHeading = ({ text }: LabelHeadingProps) => (
  <Text
    textTransform={"uppercase"}
    color={"blue.400"}
    fontWeight={600}
    fontSize={"sm"}
    bg={useColorModeValue("blue.50", "blue.900")}
    p={2}
    alignSelf={"flex-start"}
    rounded={"md"}
  >
    {text}
  </Text>
)

export default () => {
  const firestore = useFirestore()
  const { status: coachStatus, data: coaches}= useCoaches()
  const { status, data } = useFirestoreCollectionData(
    query(collection(firestore, "teams")),
    { idField: "id" }
  )
  if (status === "loading" || coachStatus === "loading") return <Loading />
  const teams: Team[] = data as Team[]
  const teamsWithCoach = teams.filter((t) => t.coachId && t.coachId !== "")
  const teamsWithoutCoach = teams.filter((t) => !t.coachId || t.coachId === "")

  return (
    <>
      {teamsWithoutCoach.length > 0 && (
        <LabelHeading text={"Teams without coach"} />
      )}
      {teamsWithoutCoach.map((t) => (
        <CoachSelector key={t.id} team={t} coaches={coaches} />
      ))}
      {teamsWithCoach.length > 0 && <LabelHeading text={"Teams with coach"} />}
      {teamsWithCoach.map((t) => (
        <CoachSelector key={t.id} team={t} coaches={coaches} />
      ))}
    </>
  )
}
