import React from 'react'
import tick from '../assets/tick.png'
import untick from '../assets/untick.png'
import delete_icon from '../assets/delete.png'


const TodoItems = ({text,id,isComplete,deleteTodo,toggle}) => {
     // Debugging: Log image paths to console
  console.log("Tick image:", tick);
  console.log("Untick image:", untick);
  console.log("Delete icon:", delete_icon);
  return (
    <div className='flex items-center my-3 gap-2'>
        <div onClick={()=>{toggle(id)}} className='flex flex-1 items-center cursor-pointer'>
                <img src={isComplete ? tick :untick} alt="" className='w-7' />
            <p className={`text-slate-700 ml-4 text-[17px] decoration-slate-500
                 ${isComplete ? "line-through" : ""}`}>{text}</p>
        </div>
        <img onClick={()=>{deleteTodo(id)}}src={delete_icon} alt="" className='w-7 cursor-pointer' />
    </div>
  )
}

export default TodoItems