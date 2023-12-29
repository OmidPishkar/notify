"use client";

import addRequestFriend from '@/actions/friend-request/add-request-friend';
import getUserByEmail from '@/actions/get/get-user-by-email';
import useFriendsModal from '@/hooks/use-friend-modal';
import { SafeUser } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import clsx from 'clsx';
import { UserPlusIcon, ArrowLeft, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as zod from "zod"

interface Props {
    currentUser : SafeUser;
}

const AddFriend : React.FC<Props> = ({currentUser}) => {
    const [loading , setLoading] = useState(false)
    const { onClose } = useFriendsModal();

    const formSchema = zod.object({ email: zod.string().email() });

    const {
        register,
        handleSubmit,
    } = useForm<zod.infer<typeof formSchema>>();

    const onSubmit = async (value  :  zod.infer<typeof formSchema>) => {
        setLoading(true);
        const {email} = value;

        if(!email){ 
            setLoading(false)
            toast.error("please enter a email!")
        }

        const getUserEmail = await getUserByEmail({userEmail : email});
        
        if(getUserEmail === undefined ){
            toast.error("cannot find user by this email")
            setLoading(false)
        }

        if(getUserByEmail === null){
            toast.error("something went wrong")
            setLoading(false)
        }

        addRequestFriend({
            currentuserId : currentUser.id , 
            targetUser : getUserEmail
        })
        .then( result => { 
            if(result === "DID IT"){
            
                toast.success("Friend request sent")
                setLoading(false)

            }
            if(result === "already been sent"){

                toast.error("This request has already been sent")
                setLoading(false)

            }
        } )

        
    }


    return (
        <div
            className={clsx(
                `w-full animate-fade-up flex flex-col relative`,
            )}
        >

            <button
                className='flex items-center gap-x-3 w-max absolute top-0 left-0 text-white p-5
                text-sm font-medium'
                onClick={() => onClose()}
            >
                <ArrowLeft size={20} />
            </button>

            <div
                className='h-[105px] w-full bg-[#2787F5] rounded-t-xl'
            ></div>

            <div
                className='bg-[#0d0f11] py-5 rounded-b-xl relative'
            >

                <div
                    className='border-4 border-[#0d0f11] bg-[#2787F5] w-[60px] h-[60px] rounded-full
                    flex items-center justify-center text-white absolute
                    -top-1/2 left-1/2 -translate-x-1/2 translate-y-1/2'
                >
                    <UserPlusIcon size={24} />
                </div>

                <h4
                    className='text-white text-base font-medium text-center mb-3 mt-5'
                >Invite your friend</h4>

                <p
                    className='text-xs text-center font-medium'
                >
                    Send Request to your friend<br />for create conversation
                </p>
            </div>

            <p className='text-sm mt-5 mb-2'>
                Email
            </p>
            <form
                onSubmit={handleSubmit(onSubmit)}
            >
                <input
                    type='email'
                    className='text-[#a7a6a8] mb-5 bg-[#22262b] text-[0.9375rem] 
                    px-[1rem] py-[1.3rem] w-full font-normal tracking-normal rounded-xl 
                    outline-none'
                    {...register("email")}
                    placeholder={"name@example.com"}
                    autoComplete="off"
                />

                {loading ? (
                    <button
                        disabled
                        className='w-full bg-[#2787f5bd] transition-all font-semibold py-5 rounded-xl hover:bg-[#3127f5]'
                    >
                        <Loader2 size={24} className='animate-spin text-white mx-auto' />
                    </button>
                ) : (
                    <button
                        type='submit'
                        className='w-full bg-[#3127f5] cursor-pointer transition-all font-semibold text-base py-5 rounded-xl hover:bg-[#33378e]'
                    >
                        Send Request
                    </button>
                )}
            </form>

        </div>
    )
}

export default AddFriend