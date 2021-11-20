import { Button, Container, Heading, Text } from '@chakra-ui/react'
import React, { Component } from 'react'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hasError: false,
      eventId: undefined,
    }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error happened, here's the info:")
    console.error(error)
    console.error(errorInfo)
  }

  render() {
    const { hasError, eventId } = this.state
    const { children } = this.props
    if (!hasError) return children

    return (
      <Container>
        <Heading>Something bad happened and we have been notified</Heading>
        <Text>
          You can reload the page to continue.
        </Text>
      </Container>
    )
  }
}
