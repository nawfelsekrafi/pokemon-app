import '@testing-library/jest-dom'
import { beforeAll, afterEach, afterAll } from 'vitest'
import { server } from './server'

// Start MSW server before all tests
beforeAll(() => server.listen())

// Reset any request handlers that are declared as a part of our tests
afterEach(() => server.resetHandlers())

// Clean up after the tests are finished
afterAll(() => server.close())
