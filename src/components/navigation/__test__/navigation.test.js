import React from 'react'
import { cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import renderer from 'react-test-renderer'
import NavigationRoutes from '../index'

afterEach(cleanup)

it('should match navigation routing snapshot', () => {
  const tree = renderer.create(<NavigationRoutes />).toJSON()
  expect(tree).toMatchSnapshot()
})
