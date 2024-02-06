
import Button from "./Button"
import Input from "./Input"

import { useForm } from 'react-hook-form'
import { server_calls } from "../api/server"
import { useDispatch} from "react-redux"
import { chooseName, chooseTeam, chooseNumber, choosePosition } from "../redux/slices/RootSlice"

interface PlayerFormProps {
  id?: string[]
}

const PlayerForm = ( props:PlayerFormProps)  => {
    const { register, handleSubmit } = useForm({})
    const dispatch = useDispatch();
    
  
    const onSubmit = async (data: any, event: any) => {
        console.log(`ID: ${typeof props.id}`);
        console.log(props.id)
        console.log(data)
        if (props.id && props.id.length > 0) {
          server_calls.update(props.id[0], data)
          console.log(`Updated: ${ data.name } ${ props.id }`)
          event.target.reset()
        }else {
        dispatch(chooseName(data.name));
        dispatch(chooseTeam(data.team));
        dispatch(chooseNumber(data.number));
        dispatch(choosePosition(data.position));
  
      
        await server_calls.create(data);
        event.target.reset();
      }
      window.location.reload();
    }
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

export default PlayerForm