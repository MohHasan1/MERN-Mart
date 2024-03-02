import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../models/orderModel.js";


// @desc create a new order
// @route POST /api/orders
// @access Private
const addOrderItems = asyncHandler(async (req, res) => {
    const { orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice  } = req.body;

    if (orderItems && orderItems.length === 0) {
        res.status(400);
        throw new Error('No order Item!')
    } else {
        const order = new Order({
            user: req.user._id,
            orderItems: orderItems.map((item) => ({ ...item, product: item._id, _id: undefined })),
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
        });

        const createOrder = await order.save();

        res.status(201).json(createOrder);
    }

});


// @desc get order details
// @route GET /api/myorders
// @access Private
const getMyOrderItems = asyncHandler(async (req, res) => {
    const order = await Order.find({ user: req.user._id });

    res.status(200).json(order);
});


// @desc get one order details
// @route GET /api/orders/:id
// @access Private
const getOrderById = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate('user', 'email name' );

    if (order) {
        res.status(200).json(order);
    }else{

        res.status(404);
        throw new Error('Order not found')
    }
    
});

// @desc update isPaid 
// @route PUT /api/orders/:id/pay
// @access Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);

    if (order) {
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult ={
            id: req.body.id,
            status:req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer.email_address
        }

        const updateOrder = await order.save();

        res.status(200).json(updateOrder);
    } else {
        res.status(404);
        throw new Error('Order not found');

    }
});


// @desc update order to deliver
// @route PUT /api/orders/:id/deliver
// @access Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
    res.send('update order delivery')
});

// @desc get all order
// @route GET /api/orders/:id/deliver
// @access Private/Admin
const getAllOrder = asyncHandler(async (req, res) => {
    res.send('All orders')
});




export { addOrderItems, getMyOrderItems, getOrderById, updateOrderToDelivered, updateOrderToPaid, getAllOrder };
