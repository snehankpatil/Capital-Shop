import { FadeLoader } from "react-spinners";
function Loading(){
    return (
        <div className="my-12 flex flex-col justify-center items-center " >
            <FadeLoader color="#36d7b7" />
        </div>
    )
}

export default Loading;