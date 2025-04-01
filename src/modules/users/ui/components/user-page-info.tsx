import { UserAvatar } from "@/components/user-avatar";
import { UserGetOneOutput } from "../../types";
import { useClerk } from "@clerk/nextjs";
import { useAuth } from "@clerk/clerk-react";

interface UserPageInfoProps{
    user: UserGetOneOutput;
}

export const UserPageInfo = ({user}:UserPageInfoProps) =>{
    const clerk = useClerk();
    const {userId} = useAuth();

    return(
        <div className="py-6">
            <div className=" flex flex-col md:hidden">
                <div className=" flex items-center gap-3">
                    <UserAvatar 
                        size="lg"
                        imageUrl={user.imageUrl}
                        name={user.name}
                        className="h-[60px] w-[60px]"
                        onClick={() => {
                            if(user.clerkId === userId){
                                clerk.openUserProfile();
                            }
                        }}
                    />
                </div>
            </div>
        </div>
    )
}