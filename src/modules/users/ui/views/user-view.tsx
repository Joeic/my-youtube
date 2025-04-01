interface UserViewProps{
    userId: string;
};

export const UserView = ({userId}: UserViewProps) => {
    return(
        <div>
            {userId}
        </div>
    )
}