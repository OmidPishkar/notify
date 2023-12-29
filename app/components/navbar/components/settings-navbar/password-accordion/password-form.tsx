"use client";

import * as zod from "zod"
import { useForm } from "react-hook-form"
import { Loader2 } from "lucide-react";
import { useState } from "react";
import clsx from "clsx";
import toast from "react-hot-toast";

import updateProfileUser from "@/actions/update/update-profile-user";
import { zodResolver } from "@hookform/resolvers/zod";
import updatePassword from "@/actions/update/update-password";
import { signOut } from "next-auth/react";

interface Props {
    userId: string;
}

const formSchema = zod.object({
    newPassword: zod.string().trim().min(6).max(16),
    confirmPassword: zod.string().trim().min(6).max(16),
});

const FormProfileAccordion: React.FC<Props> = ({
    userId
}) => {
    const [loading, setLoading] = useState(false);

    const {
        register, handleSubmit,
        formState: { errors },

    } = useForm<zod.infer<typeof formSchema>>({
        resolver : zodResolver(formSchema),
        defaultValues: {
            newPassword : "",
            confirmPassword: ""
        }
    });

    const onSubmit = async (values: zod.infer<typeof formSchema>) => {
        setLoading(true);

        // check equil password
        if (values.newPassword !== values.confirmPassword) {
            toast.error("check your confirm password");
            setLoading(false);
            return;
        };

        await updatePassword({newPassword : values.newPassword , userId})
        .then(result => {

            toast.success("password successfully updated!")
            setLoading(false);
            signOut();
        }).catch(err => {
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
                {errors.newPassword && <p className='text-xs text-rose-400 ml-1 mb-1 transition-all'>{errors.newPassword.message}</p>}
                <input
                    type='text'
                    className='
                    text-[#a7a6a8] mb-5 bg-[#1e2126] text-[0.9375rem] px-[1rem] py-[1.3rem] w-full font-normal tracking-normal rounded-xl outline-none
                    '
                    placeholder={"New Password"}
                    {...register("newPassword")}
                    autoComplete="off"
                />
            </div>

            <div className="transition-all">
                {errors.confirmPassword && <p className='text-xs text-rose-400 ml-1 mb-1 transition-all'>{errors.confirmPassword.message}</p>}
                <input
                    type='text'
                    className='
                    text-[#a7a6a8] mb-5 bg-[#1e2126] text-[0.9375rem] px-[1rem] py-[1.3rem] w-full font-normal tracking-normal rounded-xl outline-none
                    '
                    placeholder={"Confirm Password"}
                    {...register("confirmPassword")}
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