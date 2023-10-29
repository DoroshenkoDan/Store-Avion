import React, { useState as useStateMock } from 'react'
import axios from 'axios'
import { act, render, waitFor } from '@testing-library/react'
import FavoritesPage from './index'
import { HOST } from '../Token'
import { MemoryRouter } from 'react-router-dom'

jest.mock('axios')

jest.mock('../OrderItem/index')

// jest.mock('./index', () => {
//     const FavoritesPage = jest.requireActual('./index')
//
//     FavoritesPage.changeOrders = jest.fn()
//     FavoritesPage.setOrders = jest.fn()
//     FavoritesPage.orders = []
//
//     return FavoritesPage
// })

// jest.mock('react-redux', () => ({
//     ...jest.requireActual('react-redux'),
//     useDispatch: jest.fn(),
//     useSelector: jest.fn(),
// }))

// jest.mock('react', () => ({
//     ...jest.requireActual('react'),
//     useState: jest.fn()
// }))

const orders = [
  {
    _id: 1,
    name: 'Order 1',
    price: 100,
  },
  {
    _id: 2,
    name: 'Order 2',
    price: 200,
  },
]

describe('OrdersList', () => {
  it('should render a list of orders', async () => {
    axios.get.mockResolvedValue({ data: orders })

    await act(async () => {
      render(
        <MemoryRouter>
          <FavoritesPage />
        </MemoryRouter>,
      )
    })
  })

  it('should fetch orders from the API', async () => {
    axios.get.mockResolvedValue({ data: orders })

    const result = await axios.get(HOST + '/orders')

    expect(result.data).toEqual(orders)
  })
})
