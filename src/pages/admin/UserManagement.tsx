import useAllUsers from "../../hooks/useAllUsers"
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

interface LabelHeadingProps {
  text: string
}


interface Values {
  role: string
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

interface RoleSelectorProps {
  user: any
}

const RoleSelector = ({ user }: RoleSelectorProps) => {
  const firestore = useFirestore()
  const toast = useToast()
  const validationSchema = Yup.object({
    role: Yup.string().required(),
  })
  const initialValues: Values = {
    role: "",
  }
  const onSubmit = async (values: Values, {resetForm}) => {
    await updateDoc(doc(firestore, "users", user.id), {
      role: values.role
    })
    toast({
      title: "Succesfully changed value!",
      status: "success",
      isClosable: true,
      duration: 5000,
    })
    resetForm()
  }

  const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

  const roles = ["admin", "coach", "participant"]
  return (
    <Flex direction="row" alignItems="center" style={{gap: '8px'}}>
      <Text>{user.name}</Text>
      <Formik
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      initialValues={initialValues}
      >
      {() => (
        <SelectControl
          name="role"
            selectProps={{ placeholder: `Current role: ${capitalize(user.role)}` }}
        >
        <SubmitListener />
            {roles.map(role => <option key={role} value={role}>{capitalize(role)}</option>)}
        </SelectControl>
        
        )}
      </Formik>
    </Flex>
  )
}

export default () => {
  const { status, data } = useAllUsers()
  if (status === 'loading') return <Loading />

  return (
    <Stack p={6}>
      {data.map(u => <RoleSelector key={u.id} user={u} />)}
    </Stack>
  )
}
