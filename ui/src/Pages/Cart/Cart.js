import React, { useCallback, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectCartItems } from '../../store/features/cart';
import NumberInput from '../../Components/NumberInput/NumberInput';
import { deleteItemFromCartAction, updateItemToCartAction } from '../../store/actions/cartAction';
import DeleteIcon from '../../Components/common/DeleteIcon'
import Modal from 'react-modal';
import {customStyles} from '../../styles/model';
import { isTokenValid } from '../../Utils/jwt-helper';
import { Link } from 'react-router-dom';

const heads = [
    "Product Details","Price","Quantity","Shipping","Subtotal","Action"
]

const Cart = () => {

    const dispatch = useDispatch();

    const [modalIsOpen, setModelIsOpen] = useState(false);

    const cartItems = useSelector(selectCartItems);

    const [deleteItem, setDeleteItem] = useState({});

    const onChangeQuantity = useCallback((value,productId, variantId) => {
        console.log("Received", value);

        dispatch(updateItemToCartAction({
            productId:productId,
            variant_id:variantId,
            quantity:value
        }))
        
    },[dispatch]);

    const deleteProduct = useCallback((productId,variantId) => {
        setModelIsOpen(true);
        setDeleteItem({
            productId:productId,
            variantId: variantId
        })
    },[])

    const onCloseModal = useCallback(() => {
        setDeleteItem({});
        setModelIsOpen(false);
    },[])

    const onDeleteItem = useCallback(() => {
        dispatch(deleteItemFromCartAction(deleteItem));
        setModelIsOpen(false);

    },[deleteItem, dispatch]);

    const subTotal = useMemo(() => {
        let value = 0;
        cartItems?.forEach(element =>{
            value += element?.subTotal
        });
        return value;
    },[cartItems]);

    const isLoggedIn = useMemo(() =>{
        return isTokenValid();
    },[]);



  return (
    <>
    <div className='p-8'>
        <p className='text-xl text-black p-4'>Shopping Bag</p>
        <table className='w-full text-lg '>
            <thead className='text-lg bg-black text-white uppercase'>
                <tr>
                    {heads?.map(head => {
                        return(
                            <th scope='col' className='px-6 py-3'>
                                {head} 
                            </th> 
                        )
                    })}
                </tr>

            </thead>
            <tbody>
                {
                    cartItems?.map((item,index) => {
                        return (
                            <tr className='p-4 bg-white border-b'>
                                <>
                                <td>
                                    <div className='flex p-4'>
                                        <img src={item?.thumbnail} alt={'product'+index} className='w-[120px] h-[120px] object-cover p-4'/>
                                        <div className='flex justify-center flex-col text-sm px-2 text-gray-500'>
                                            <p>{item?.name || 'Name'}</p>
                                            <p>Size: {item?.variant?.size}</p>
                                            <p>Color: {item?.variant?.color}</p>
                                        </div>
                                    </div>
                                </td> 
                                <td>
                                    <p className='text-center text-sm text-gray-500'>{item?.price}</p>
                                </td>
                                <td className='text-center text-sm text-gray-500'>
                                    <NumberInput max={2} quantity={item?.quantity} onChangeQuantity={(value) => onChangeQuantity(value, item?.productId, item?.variant?.id)} />
                                </td>
                                <td className='text-center text-sm text-gray-500'>
                                    FREE
                                </td>
                                <td>
                                    <p className='text-center text-sm text-gray-500'>${item?.subTotal}</p>
                                </td>

                                <td>
                                    <button onClick={() => deleteProduct(item?.productId, item?.variant?.id)} className='flex justify-center items-center w-full'><DeleteIcon /></button>
                                </td>
                                </>
                                <hr className='h-4 bg-gray-950'></hr>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
        <div className='flex justify-between bg-gray-200 p-4'>
            <div>
                <p className='text-lg font-bold'>Discount Coupon</p>
                <p className='text-sm text-gray-500'>Enter your coupon code.</p>
                <form>
                    <input type='text' className='mt-2 border-gray-500  p-2 w-[120px] h-[48px] hover:outline-none'
                    placeholder='Enter code' />
                    <button className='w-[60px] h-[48px] bg-black text-white hover:bg-gray-500'>Apply</button>
                </form>
            </div>
            <div className='mr-20 pr-8'>
                <div className='flex gap-8 text-lg '>
                    <p className='w-[100px]'>SubTotal</p> <p>${subTotal}</p>
                </div>
                <div className='flex gap-8 text-lg mt-2 '>
                    <p className='w-[100px]'>Shipping</p> <p>${0}</p>
                </div>
                <div className='flex gap-8 text-lg mt-2 font-bold'>
                    <p className='w-[100px]'>Grand Total</p> <p>${subTotal}</p>
                </div>
                <hr className='h-[2px] bg-slate-400 mt-2'></hr>
                {isLoggedIn && <button className='w-full items-center h-[48px] bg-black text-white border rounded-lg mt-2 hover:bg-gray-500'>Checkout</button> }
                {!isLoggedIn && <Link to={"/v1/login"}> <button className='w-full items-center h-[48px] bg-black text-white border rounded-lg mt-2 hover:bg-gray-500'>Login To Checkout</button> </Link>}
            </div>
        </div>
    </div>
    <Modal
        isOpen={modalIsOpen}
        onRequestClose={onCloseModal}
        style={customStyles}
        contentLabel="Remove Item"
      >
        <p>Are you sure you wan't to remove this item ?</p>
        <div className='flex justify-between p-4'>
            <button onClick={onCloseModal} className='bg-black text-white w-[80px] h-[48px] border rounded-lg hover:bg-gray-500'>Cancel</button>
            <button onClick={onDeleteItem} className='bg-black text-white w-[80px] h-[48px] border rounded-lg hover:bg-gray-500'>Remove</button>
        </div>
      </Modal>
    </>
  )
}

export default Cart