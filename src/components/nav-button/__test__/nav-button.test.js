import React from 'react'
import { cleanup, render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import renderer from 'react-test-renderer'
import NavButton from '../index'

afterEach(cleanup)

it('should render the nav-button correctly', () => {
  const { getByTestId } = render(<NavButton />)
  expect(getByTestId('nav-button')).toHaveClass('__button-container')
})

it('should match the nav-button snapshot', () => {
  const tree = renderer.create(<NavButton />).toJSON()
  expect(tree).toMatchSnapshot()
})
