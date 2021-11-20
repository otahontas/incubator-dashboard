import { Heading, Stack } from "@chakra-ui/react"
import {
  Box,
  Flex,
  Text,
  useColorModeValue,
} from "@chakra-ui/react"

import { collection, query } from "firebase/firestore"
import type { DocumentData } from "firebase/firestore"
import { useFirestoreCollectionData, useFirestore } from "reactfire"
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
      <Heading 
        color={"blue.400"}
        fontSize={"2xl"} fontFamily={"body"}>
        {tmpl.title}
      </Heading>
      <Stack spacing={8}>
        {data.map((d) => (
<Box key={d.id} p={5} shadow="sm" borderWidth="1px" style={{marginTop: '8px'}}>
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

export default () => {
  const firestore = useFirestore()
  const roadmapTemplates = collection(firestore, "roadmapTemplates")
  const roadmapTemplatesQuery = query(roadmapTemplates)
  const { status, data } = useFirestoreCollectionData(roadmapTemplatesQuery, {
    idField: "id",
  })

  if (status === "loading") return null

  return (
      <Stack spacing={6} w="100%" alignItems="center">
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
        All roadmap templates
      </Text>
      <Text color={"gray.500"} fontSize={"lg"}>
        Here you can find the roadmap templates you can assign to different
        teams.
      </Text>
      {data.map((tmpl, index) => (
        <Flex
          key={tmpl.id}
          boxShadow={"lg"}
          maxW={"640px"}
          direction={{ base: "column-reverse", md: "row" }}
          width={"full"}
          rounded={"xl"}
          p={10}
          justifyContent={"space-between"}
          position={"relative"}
          bg={useColorModeValue("white", "gray.800")}
          _before={{
            content: '""',
            position: "absolute",
            zIndex: "-1",
            height: "full",
            maxW: "640px",
            width: "full",
            filter: "blur(40px)",
            transform: "scale(0.98)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            top: 0,
            left: 0,
            backgroundImage: backgrounds[index % 4],
          }}
        >
          <Flex
            direction={"column"}
            textAlign={"left"}
            justifyContent={"space-between"}
          >
            <SingleRoadmap tmpl={tmpl} />
          </Flex>
        </Flex>
  ))}
  </Stack>
  )
}
