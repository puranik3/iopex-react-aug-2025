import IWorkshop from "../../../../models/IWorkshop";

import './Item.scss';

interface Props {
    workshop: IWorkshop
}

const Item = ( { workshop } : Props ) => {
    return (
        <div className="card p-3">
            <img src={workshop.imageUrl} className="card-img-top card-img-top-wrapper" alt={workshop.name} />
            <div className="card-body">
                <h5 className="card-title">{workshop.name}</h5>
                <p className="card-text">{workshop.startDate} - {workshop.endDate}</p>
                <a href="/" className="btn btn-primary">Know more</a>
            </div>
        </div>
    );
}

export default Item;