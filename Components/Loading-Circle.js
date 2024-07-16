import { AiOutlineLoading3Quarters } from 'react-icons/ai';

const LoadingCircle = ({size, providedcolor = `#3498db`}) => {
    return <AiOutlineLoading3Quarters style={{fontSize: size, color: providedcolor}} className="spinner" />
}


export default LoadingCircle;