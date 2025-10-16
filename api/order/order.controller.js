import { logger } from '../../services/logger.service.js'
import { socketService } from '../../services/socket.service.js'
import { orderService } from './order.service.js'

export async function getOrders(req, res) {
  try {
    const orders = await orderService.query(req.query)

    const ordersToReturn = orders.map((order) => {
      const timestamp = order._id.getTimestamp()
      return {
        ...order,
        createdAt: timestamp,
      }
    })
    res.send(ordersToReturn)
  } catch (err) {
    logger.error('Cannot get orders', err)
    res.status(400).send({ err: 'Failed to get orders' })
  }
}


export async function addOrder(req, res) {
  try {
    var order = req.body

    order = await orderService.add(order)
    socketService.emitToUser({
      type: 'order-added',
      data: order,
      userId: order.host._id,
    })

    res.send(order)
  } catch (err) {
    logger.error('Failed to add order', err)
    res.status(400).send({ err: 'Failed to add order' })
  }
}

export async function updateOrder(req, res) {
  const { loggedinUser, body: order } = req
  const { _id: userId, isAdmin } = loggedinUser
  try {
    const updatedOrder = await orderService.update(order)

    if (updatedOrder.status === 'Approved') {
      socketService.emitToUser({
        type: 'order-confirm',
        data: updatedOrder,
        userId: order.guest._id,
      })
    } else {
      socketService.emitToUser({
        type: 'order-reject',
        data: updatedOrder,
        userId: order.guest._id,
      })
    }

    res.json(updatedOrder)
  } catch (err) {
    logger.error('Failed to update order', err)
    res.status(400).send({ err: 'Failed to update order' })
  }
}
