import Image from 'next/image';

interface IUserListCard {
    firstName: string;
    lastName: string;
    email: string;
    profilePict: string;
}
export default function CardListUser(props: IUserListCard) {
    const initialUserName =
        props.firstName.charAt(0) + props.lastName.charAt(0);
    return (
        <div className="w-auto rounded-lg bg-secondary p-4">
            <div className="flex flex-grow">
                <div className="flex-none">
                    {!props.profilePict && (
                        <div className="relative inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-muted">
                            <span className="font-medium text-gray-600 dark:text-gray-300">
                                {initialUserName}
                            </span>
                        </div>
                    )}

                    <img
                        width={100}
                        alt=""
                        height={100}
                        src={props.profilePict || '/icons/user.png'}
                        className="relative inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-muted"
                    />
                </div>
                <div className="grid grow grid-rows-2 pl-4">
                    <span className="truncate font-semibold">
                        {props.firstName} {props.lastName}
                    </span>
                    <span className="truncate">{props.email}</span>
                </div>
            </div>
        </div>
    );
}
