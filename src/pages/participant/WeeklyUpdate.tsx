import { Formik } from "formik"
import {
  Box,
  ButtonGroup,
  Heading,
  Flex,
  Text,
  VStack,
  Radio,
  useToast,
} from "@chakra-ui/react"
import * as Yup from "yup"
import {
  TextareaControl,
  SubmitButton,
  ResetButton,
  RadioGroupControl,
} from "formik-chakra-ui"
import { updateDoc, doc, serverTimestamp, addDoc, collection } from "firebase/firestore"
import { useFirestore } from "reactfire"
import useAuthenticatedUser from "../../hooks/useAuthenticatedUser"

interface WeeklyUpdateForm {
  biggestImprovement: string
  biggestObstacle: string
  learned: string
  morale: number | null
}

interface FormProps {
  onSubmit: (values: WeeklyUpdateForm) => Promise<void>
}

const WeeklyUpdateForm = ({ onSubmit }: FormProps) => {
  const initialValues = {
    biggestImprovement: "",
    biggestObstacle: "",
    learned: "",
    morale: null,
  }

  const validationSchema = Yup.object({
    biggestImprovement: Yup.string().required(),
    biggestObstacle: Yup.string().required(),
    learned: Yup.string().required(),
    morale: Yup.number().required(),
  })

  return (
    <Formik
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      initialValues={initialValues}
    >
      {({ handleSubmit, isSubmitting }) => (
        <Box
          borderWidth="1px"
          rounded="lg"
          shadow="1px 1px 3px rgba(0,0,0,0.3)"
          maxWidth={800}
          p={6}
          m="10px auto"
          as="form"
          onSubmit={handleSubmit as any}
        >
          <TextareaControl
            name="biggestImprovement"
            label="What is the biggest improvement you have done this week?"
          />
          <TextareaControl
            name="biggestObstacle"
            label="What is the biggest obstacle you faced this week?"
          />
          <TextareaControl
            name="learned"
            label="What have you learned this week?"
          />
          <RadioGroupControl
            name="morale"
            label="How is your morale? How excited are you to keep going?"
          >
            <VStack w="100%">
              <Flex w="70%" justify="space-between">
                <Text>I want to stop</Text>
                <Text>Life is good</Text>
              </Flex>
              <Flex w="70%" justify="space-between">
                <Radio value="1">1</Radio>
                <Radio value="2">2</Radio>
                <Radio value="3">3</Radio>
                <Radio value="4">4</Radio>
                <Radio value="5">5</Radio>
              </Flex>
            </VStack>
          </RadioGroupControl>
          <ButtonGroup style={{ marginTop: "8px" }}>
            <SubmitButton isLoading={isSubmitting}>Submit</SubmitButton>
            <ResetButton>Reset</ResetButton>
          </ButtonGroup>
        </Box>
      )}
    </Formik>
  )
}

export const WeeklyUpdateView = () => {
  const toast = useToast()
  const firestore = useFirestore()
  const { status, data } = useAuthenticatedUser() as any
  const onSubmit = async (values: WeeklyUpdateForm) => {
    await addDoc(collection(firestore, "users", data.id, "weeklyUpdates"), {
      ...values,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    })
    toast({
      title: "Weekly update successfully submitted!",
      status: "success",
      isClosable: true,
      duration: 5000,
    })
  }
  return (
    <>
      <Heading>Send weekly feedback</Heading>
      <WeeklyUpdateForm onSubmit={onSubmit} />
    </>
  )
}
