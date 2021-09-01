import React,{useContext,forwardRef} from 'react'
import { OutputContext } from '../Body/Body'
import './footer.scss'
const Footer = forwardRef((props, ref) => {
    console.log(ref)
    const outputCtx = useContext(OutputContext)
    const {output} = outputCtx
    return (
        <div className="footer" ref={ref}>
           <p className="errors">{output?.data?.errors}</p>
        </div>
    )
});

export default Footer
