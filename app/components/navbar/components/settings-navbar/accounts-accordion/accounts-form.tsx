"use client";

import * as zod from "zod"
import { useForm } from "react-hook-form"
import { Loader2 } from "lucide-react";
import { useState } from "react";
import clsx from "clsx";
import toast from "react-hot-toast";

import updateProfileUser from "@/actions/update/update-profile-user";
import updateUserAccounts from "@/actions/update/update-accounts-user";

interface Props {
    instagram: string | null;
    twitter: string | null;
    facebook: string | null;
    userId : string;
}


const formSchema = zod.object({
    instagramAccount : zod.string().trim(),
    twitterAccount : zod.string().trim(),
    facebookAccount : zod.string().trim(),
})

const AccountsForm: React.FC<Props> = ({
    userId, instagram , facebook , twitter
}) => {
    const [loading, setLoading] = useState(false);

    const {
        register, handleSubmit,
        formState: { errors } , 
    } = useForm<zod.infer<typeof formSchema>>({
        defaultValues: {
            facebookAccount :  "",
            instagramAccount :  "",
            twitterAccount : ""
        }
    });

    const onSubmit = async (values: zod.infer<typeof formSchema>) => {
        setLoading(true);
        
        // check empty string
        if(
            values.facebookAccount === "" && 
            values.instagramAccount  === "" &&
            values.twitterAccount === ""
        ){
            toast.error("Please fill in at least one section");
            setLoading(false);
            return;
        };

        await updateUserAccounts({
            facebookAccount : values.facebookAccount,
            instagramAccount : values.instagramAccount,
            twitterAccount : values.twitterAccount,
            userId,
        }).then( result => {
            if(result?.success){
                setLoading(false)
                result.success.map( msg => toast.success(msg))
            }
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
                {errors.instagramAccount && <p className='text-xs text-rose-400 ml-1 mb-1 transition-all'>{errors.username.message}</p>}
                <input
                    type='text'
                    className='
                    text-[#a7a6a8] mb-5 bg-[#1e2126] text-[0.9375rem] px-[1rem] py-[1.3rem] w-full font-normal tracking-normal rounded-xl outline-none
                    '
                    placeholder={instagram || "Instagram"}
                    {...register("instagramAccount")}
                    autoComplete="off"
                />
            </div>

            <div className="transition-all">
                {errors.facebookAccount && <p className='text-xs text-rose-400 ml-1 mb-1 transition-all'>{errors.phoneNumber.message}</p>}
                <input
                    type='text'
                    className='
                    text-[#a7a6a8] mb-5 bg-[#1e2126] text-[0.9375rem] px-[1rem] py-[1.3rem] w-full font-normal tracking-normal rounded-xl outline-none
                    '
                    placeholder={facebook  || "Facebook"}
                    {...register("facebookAccount")}
                    autoComplete="off"
                />
            </div>

            <div className="transition-all">
                {errors.twitterAccount && <p className='text-xs text-rose-400 ml-1 mb-1 transition-all'>{errors.bio.message}</p>}
                <input
                    type="text"
                    className='
                    text-[#a7a6a8] mb-5 bg-[#1e2126] text-[0.9375rem] px-[1rem] py-[1.3rem] w-full font-normal tracking-normal rounded-xl outline-none
                    '
                    placeholder={twitter || "Twitter"}
                    {...register("twitterAccount")}
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

export default AccountsForm