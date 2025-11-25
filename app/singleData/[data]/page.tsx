"use client"
import { useParams } from "next/navigation";

const singleData=()=>{
    const param=useParams();
    console.log(param);
    return(
        <div>single data page</div>
    )
}
export default singleData;
