import Image from "next/image"

const Avatar = () => {
    return (
        <Image
            src={"/images/default-user-icon.png"}
            alt="user"
            width={44}
            height={44}
            className="rounded-full"
        />
    )
}

export default Avatar