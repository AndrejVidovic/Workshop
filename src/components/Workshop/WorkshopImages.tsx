import './WorkshopImages.css'
const WorkshopImages=({image})=>{

    return(
        <div className="workshop-header-image">
            <img src={image} alt="workshop image"></img>
        </div>

    )
}
export default WorkshopImages;