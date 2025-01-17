import React, { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectCartItems } from '../../store/features/cart';
import NumberInput from '../../Components/NumberInput/NumberInput';
import { updateItemToCartAction } from '../../store/actions/cartAction';
import DeleteIcon from '../../Components/common/DeleteIcon'
import Modal from 'react-modal';
import {customStyles} from '../../styles/model';

const heads = [
    "Product Details","Price","Quantity","Shipping","Subtotal","Action"
]

const Cart = () => {

    const dispatch = useDispatch();

    const [modalIsOpen, setModelIsOpen] = useState(false);

    const cartItems = useSelector(selectCartItems);

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
    },[])

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
                            <tr className='p-4'>
                                <td>
                                    <div className='flex p-4'>
                                        <img src={item?.thumbnail} alt={'product'+index} className='w-[120px] h-[120px] object-cover p-4'/>
                                        <div className='flex flex-col text-sm px-2 text-gray-500'>
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
                                    <button onClick={() => deleteProduct(item?.id, item?.variant?.id)} className='flex justify-center items-center w-full'><DeleteIcon /></button>
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    </div>
    <Modal
        isOpen={modalIsOpen}
        onRequestClose={()=> setModelIsOpen(false)}
        style={customStyles}
        contentLabel="Remove Item"
      >
        <p>Are you sure you wan't to remove this item ?</p>
        <div className='flex justify-between p-4'>
            <button className='bg-black text-white w-[80px] h-[48px] border rounded-lg hover:bg-gray-500'>Cancel</button>
            <button className='bg-black text-white w-[80px] h-[48px] border rounded-lg hover:bg-gray-500'>Remove</button>
        </div>
      </Modal>
    </>
  )
}

export default Cart