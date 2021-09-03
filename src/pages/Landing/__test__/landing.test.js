import React from 'react'
import { cleanup, render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import renderer from 'react-test-renderer'
import Landing from '../Landing'

afterEach(cleanup)

it('should render the landing page correctly', () => {
  const { getByTestId } = render(<Landing />)
  expect(getByTestId('header-image')).toHaveClass('__landing-header-image')
  expect(getByTestId('header-image').getAttribute('alt')).toEqual('hongkong')
  expect(getByTestId('landing-header-text')).toHaveClass('__landing-header-text')
  expect(getByTestId('landing-container')).toHaveClass('__landing-container')
})

it('should match the landing page snapshot', () => {
  const tree = renderer.create(<Landing />).toJSON()
  expect(tree).toMatchSnapshot()
})
