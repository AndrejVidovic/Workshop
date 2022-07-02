import imageSmall from '../../Images/imageSmall.png'
import imageSmall2 from '../../Images/imageSmall2.png'
import './WorkshopImages.css'
const WorkshopImages=({image,id})=>{
    //two version of images
    return(
        <>
        {id%2==0?
            <div className="workshop-header-images-version1">
            <img src={image}></img>
            </div>
            :
            <div className="workshop-header-images">
                <div className="workshop-header-images-small"> 
                    <img src={imageSmall2}></img>
                    <img src={imageSmall} style={{marginTop:"1px"}}></img>
                </div>
                <div className="workshop-header-images-big">
                    <img src={image}></img>
                </div>
            </div>
        }
        </>
    )
}
export default WorkshopImages;