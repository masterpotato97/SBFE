
import Button from "./Button"
import Input from "./Input"

import { useForm } from 'react-hook-form'
import { server_calls } from "../api/server"
import { useDispatch, useStore} from "react-redux"
import { updateName, updateTeam, updateNumber, updatePosition } from "../redux/slices/UpdateSlice"

interface UpdateFormProps {
  id?: string;
}
const UpdateForm = ( props:UpdateFormProps)  => {
    const { register, handleSubmit } = useForm({})
    const dispatch = useDispatch();
    const store = useStore();
  
    const onSubmit = async (data: any, event: any) => {
        console.log(`ID: ${typeof props.id}`);
        console.log(props.id)
        console.log(data)

        if (props.id) {
            await server_calls.update(props.id, data);
            console.log(`Updated: ${data.name} ${props.id}`);
        }else {
        dispatch(updateName(data.name));
        dispatch(updateTeam(data.team));
        dispatch(updateNumber(data.number));
        dispatch(updatePosition(data.position));
  
      
        await server_calls.create(store.getState());
      
      } 
     event.target.reset();
    
    window.location.reload();
    }; 

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="name">Players Name</label>
          <Input {...register('name')} name='name' placeholder="Name" />
        </div>
        <div>
          <label htmlFor="team">Team Name</label>
          <Input {...register('team')} name='team' placeholder="Team" />
        </div>
        <div>
          <label htmlFor="number">number</label>
          <Input {...register('number')} name='number' placeholder="Number" />
        </div>
        <div>
          <label htmlFor="Position">Position</label>
          <Input {...register('position')} name='position' placeholder="Position" />
        </div>
      
        <div className="flex p-1">
          <Button className="flex justify-start m-3 bg-slate-300 p-2 rounded hover:bg-slate-800 text-white"
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  )
}

export default UpdateForm;