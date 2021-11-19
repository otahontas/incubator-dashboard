import { Formik } from "formik"
import { Box, ButtonGroup, Heading, useToast } from "@chakra-ui/react"
import * as Yup from "yup"
import { TextareaControl, SubmitButton, ResetButton } from "formik-chakra-ui"
import { addDoc, collection, serverTimestamp } from "firebase/firestore"
import { useFirestore } from "reactfire"

interface Form {
  biggestObstacle: string
  howDidThisWeekGo: string
}

interface FormProps {
  onSubmit: (values: Form) => Promise<void>
}

const FeedbackForm = ({ onSubmit }: FormProps) => {
  const initialValues = {
    biggestObstacle: "",
    howDidThisWeekGo: "",
  }

  const validationSchema = Yup.object({
    biggestObstacle: Yup.string().required(),
    howDidThisWeekGo: Yup.string().required(),
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
          <TextareaControl name="biggestObstacle" label="Biggest obstacles?" />
          <TextareaControl
            name="howDidThisWeekGo"
            label="How did this week go overall?"
          />
          <ButtonGroup style={{ marginTop: "8px" }}>
            <SubmitButton isLoading={isSubmitting}>Submit</SubmitButton>
            <ResetButton>Reset</ResetButton>
          </ButtonGroup>
        </Box>
      )}
    </Formik>
  )
}

export const FeedbackView = () => {
  const toast = useToast()
  const firestore = useFirestore()
  const onSubmit = async (values: Form) => {
    const teamId = "0ptnrAiWyTyv5eV24a1e"
    await addDoc(collection(firestore, "teams", teamId, "feedbacks"), {
      ...values,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    })
    toast({
      title: "Feedback successfully submitted!",
      status: "success",
      isClosable: true,
      duration: 5000
    })
  }
  return (
    <>
        <Heading>Send weekly feedback</Heading>
        <FeedbackForm onSubmit={onSubmit} />
    </>
  )
}
