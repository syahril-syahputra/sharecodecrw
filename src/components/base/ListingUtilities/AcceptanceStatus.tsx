import { CircleMinus, CircleCheck, CircleX } from "lucide-react";

export default function AcceptanceStatus({acceptance} : {acceptance: string | undefined}){
    switch(acceptance){
        case "idle":
            return(
                <span className="inline-flex text-slate-500">
                    <CircleMinus color="grey" className="my-auto mr-1" size={20}/>Idle
                </span>
            )
            break;
        case "accepted":
            return(
                <span className="inline-flex text-blue-500">
                    <CircleCheck color="blue" className="my-auto mr-1" size={20}/>Accepted
                </span>
            )
            break;
        case "rejected":
            return(
                <span className="inline-flex text-red-500">
                    <CircleX color="red" className="my-auto mr-1" size={20}/>Rejected
                </span>
            )
            break;
        default:
            return(<>Undefined Status</>)
    }   
}