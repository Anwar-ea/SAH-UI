import * as React from 'react';
import { Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Radio, RadioGroup, TextField, } from '@mui/material';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

export interface IUserForm{
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
  books: Array<string>;
  active: boolean;
  dateOfBirth: Date;
}
export interface IUserFormProps {
}

export default function UserForm(props: IUserFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    control,
    watch,
    formState: { errors },
  } = useForm<IUserForm>({defaultValues: {active: true, books: ['Math', 'Physics'], gender: 'male', dateOfBirth: new Date()}})
  const onSubmit: SubmitHandler<IUserForm> = (data, event) => {
    console.log(data);
    reset();
    Array.from(event?.target.elements).forEach((element: any) => {
      if (element.type === 'checkbox') {
        element.checked = false;
      }
    });
  }
  
  return (
    <div className='flex flex-col justify-center items-center gap-4'>
       <h2>Add User</h2>
      <form onSubmit={handleSubmit(onSubmit)} className=' flex flex-col gap-2'>
        <div>
          <TextField type='text' {...register('firstName')} label="First-Name" variant="outlined" />

        </div>
        <div>
          <TextField type='text' {...register('lastName')} label="Last-Name" variant="outlined" />

        </div>
        <div>
          <TextField type='number' {...register('age')} label="Age" variant="outlined" />

        </div>
        <div>
              
        <FormControl>
            <FormLabel>Gender</FormLabel>
            <Controller
              render={({ field }) => (
                <RadioGroup {...field}>
                  <FormControlLabel value="female" control={<Radio />} label="Female" />
                  <FormControlLabel value="male" control={<Radio />} label="Male" />
                  <FormControlLabel value="other" control={<Radio />} label="Other" />
                </RadioGroup>
              )}
              name="gender"
              control={control}
              defaultValue=""
            />
          </FormControl>
        </div>
        <div>
          <FormGroup>
            <FormControlLabel control={<input type='checkbox' {...register('books')}  value={'English'} />} label="English" />
            <FormControlLabel control={<input type='checkbox' {...register('books')} value={'Math'} />} label="Math" />
            <FormControlLabel control={<input type='checkbox' {...register('books')} value={'Physics'} />} label="Physics" />
          </FormGroup>
        </div>
        <div>
            <FormControlLabel control={<input type='checkbox' {...register('active')} defaultChecked={false}  />} label="Active" />
        </div>
        <div>
        <FormControlLabel control={ <input type='date' {...register('dateOfBirth')} /> } label="date of birth" />
        </div>
        <div>
          <Button type='submit'>Submit</Button>
        </div>
      </form>
    </div>
  );
}
