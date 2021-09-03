import React from 'react'
import { cleanup, render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import renderer from 'react-test-renderer'
import Construction from '../index'

afterEach(cleanup)

it('should render the construction sign correctly', () => {
  const { getByTestId } = render(<Construction />)
  expect(getByTestId('construction-sign')).toHaveClass('__construction-sign')
})

it('should match the construction sign snapshot', () => {
  const tree = renderer.create(<Construction />).toJSON()
  expect(tree).toMatchSnapshot()
})
