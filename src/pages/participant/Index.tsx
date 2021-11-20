import { Button, ButtonGroup } from "@chakra-ui/button"
import { Box, Center, Heading, HStack, StackDivider, VStack } from "@chakra-ui/layout"
import useAuthenticatedUser from "../../hooks/useAuthenticatedUser"
import Loading from "../../sharedComponents/Loading"
import Home from './Home'
import { Formik } from "formik"
import * as Yup from "yup"
import { useToast } from "@chakra-ui/toast"
import { InputControl, ResetButton, SubmitButton, TextareaControl } from "formik-chakra-ui"
import {updateDoc, doc, addDoc, collection, getDoc} from 'firebase/firestore'
import {useFirestore} from 'reactfire'

interface JoinForm {
    teamCode: string
}

interface CreateForm {
    name: string
}
const CreateTeamForm: React.FC<{user: any}> = ({user}) => {
    const firestore = useFirestore()
    const createInitialValues = {
        name: '',
    }
    const onCreateSubmit = async(values: CreateForm) => {
        const teamDoc = await addDoc(collection(firestore, 'teams'),{
            members: [user.id],
            name: values.name,
            projectDescriptionMax50chars: '',
            projectDescriptionLong: ''
        })
        await updateDoc(doc(firestore, 'users', user.id), {
            teamId: teamDoc.id
        })
    }

    const validationSchema = Yup.object({
        name: Yup.string().required(),
    })

    return  <Box width={200}>
        <VStack>
            <Heading as='h4' size='md'>Create a Team</Heading>
              <Formik validationSchema={validationSchema} onSubmit={onCreateSubmit} initialValues={createInitialValues}>
                  {({ handleSubmit, isSubmitting}) => (
                      <Box as='form' onSubmit={handleSubmit as any}>
                          <InputControl
                              name="name"
                              label="Enter your team name"
                          />
                          <ButtonGroup style={{ marginTop: "8px" }}>
                              <SubmitButton>Submit</SubmitButton>
                              <ResetButton>Reset</ResetButton>
                          </ButtonGroup>
                      </Box>
                  )}
              </Formik>
         </VStack>
    </Box>
}

const JoinTeamForm: React.FC<{user: any}> = ({user}) => {
    const firestore = useFirestore()
    const joinInitialValues = {
        teamCode: "",
    }
       
    const validationSchema = Yup.object({
        teamCode: Yup.string().required(),
    })
    const onSubmit = async (values: JoinForm) => {
        const teamDoc = await getDoc(doc(firestore, 'teams', values.teamCode))
        if (teamDoc.exists()){
            await updateDoc(doc(firestore, 'teams', teamDoc.id), {
                members: teamDoc.data().members.concat(user.id)
            })
        }
    }
    return  <VStack>
                <Center>
                    <VStack>
                    <Heading as='h4' size='md'>Join a Team!</Heading>
                    <Formik validationSchema={validationSchema} onSubmit={onSubmit} initialValues={joinInitialValues}>
                        {({ handleSubmit, isSubmitting}) => (
                            <Box as='form' onSubmit={handleSubmit as any}>
                                <InputControl
                                    name="teamCode"
                                    label="Enter your team code here"
                                />
                                <ButtonGroup style={{ marginTop: "8px" }}>
                                    <SubmitButton isLoading={isSubmitting}>Submit</SubmitButton>
                                    <ResetButton>Reset</ResetButton>
                                </ButtonGroup>
                            </Box>
                        )}
                    </Formik>
                    </VStack>
                </Center> 
            </VStack>
}

export default () => {
    const toast = useToast()
    const { status, data } = useAuthenticatedUser() as any
    
    
    if (status === "loading") return <Loading />
    if (data.teamId) {
        return <Home user={data} />
    }
    return  <Center>
        <Box
            borderWidth="1px"
            rounded="lg"
            shadow="1px 1px 3px rgba(0,0,0,0.3)"
            maxWidth={800}
            p={6}
            m="10px auto"
        >
      <HStack align='stretch' spacing={30} divider={<StackDivider borderBlock="gray.200" />}>
         <CreateTeamForm user={data} />
         <JoinTeamForm user={data} />
      </HStack>
  </Box>
    </Center>
}