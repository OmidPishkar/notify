"use client";

import * as zod from "zod"
import { useForm } from "react-hook-form"
import { Loader2 } from "lucide-react";
import { useState } from "react";
import clsx from "clsx";
import toast from "react-hot-toast";

import updateProfileUser from "@/actions/update/update-profile-user";

interface Props {
    username: string | null;
    bio: string | null;
    phoneNumber: string | null;
    userId : string;
}

const formSchema = zod.object({
    username: zod.string().trim().optional(),
    phoneNumber: zod.string().trim().optional(),
    bio: zod.string().trim().optional(),
});

const FormProfileAccordion: React.FC<Props> = ({
    bio, phoneNumber, username , userId
}) => {
    const [loading, setLoading] = useState(false);

    const {
        register, handleSubmit,
        formState: { errors } , 
        
    } = useForm<zod.infer<typeof formSchema>>({
        defaultValues: {
            bio: "",
            phoneNumber: "",
            username: ""
        }
    });

    const onSubmit = async (values: zod.infer<typeof formSchema>) => {
        setLoading(true);
        
        // check empty string
        if(
            values.bio === "" && 
            values.username  === "" &&
            values.phoneNumber === ""
        ){
            toast.error("Please fill in at least one section");
            setLoading(false);
            return;
        };

        await updateProfileUser({
            bio : values.bio ,
            phoneNumber : values.phoneNumber,
            userId,
            username : values.username
        }).then( result => {
            if(result?.success){
                result.success.map( msg => toast.success(msg))
            }
            if(result?.error){
                result.error.map( msg => toast.error(msg))
            }
            setLoading(false);
        }).catch( err => {
            console.log("RESULT CLIENT")
            console.log(err)
        })

        

    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col"
        >
            <div className="transition-all">
                {errors.username && <p className='text-xs text-rose-400 ml-1 mb-1 transition-all'>{errors.username.message}</p>}
                <input
                    type='text'
                    className='
                    text-[#a7a6a8] mb-5 bg-[#1e2126] text-[0.9375rem] px-[1rem] py-[1.3rem] w-full font-normal tracking-normal rounded-xl outline-none
                    '
                    placeholder={username || "Name"}
                    {...register("username")}
                    autoComplete="off"
                />
            </div>

            <div className="transition-all">
                {errors.phoneNumber && <p className='text-xs text-rose-400 ml-1 mb-1 transition-all'>{errors.phoneNumber.message}</p>}
                <input
                    type='number'
                    className='
                    text-[#a7a6a8] mb-5 bg-[#1e2126] text-[0.9375rem] px-[1rem] py-[1.3rem] w-full font-normal tracking-normal rounded-xl outline-none
                    '
                    placeholder={phoneNumber  || "Phone"}
                    {...register("phoneNumber")}
                    autoComplete="off"
                />
            </div>

            <div className="transition-all">
                {errors.bio && <p className='text-xs text-rose-400 ml-1 mb-1 transition-all'>{errors.bio.message}</p>}
                <textarea
                    className='
                    text-[#a7a6a8] min-h-[200px] max-h-[200px] overflow-y-scroll scrollbar-none mb-5 bg-[#1e2126] text-[0.9375rem] px-[1rem] py-[1.3rem] w-full font-normal tracking-normal rounded-xl outline-none
                    '
                    placeholder={bio || "Bio"}
                    {...register("bio")}
                    autoComplete="off"
                />
            </div>

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
                    Save
                </button>
            )}
        </form>
    )
};

export default FormProfileAccordion