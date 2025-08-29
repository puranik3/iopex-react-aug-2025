import IWorkshop from "../../../../models/IWorkshop";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencil } from "@fortawesome/free-solid-svg-icons";
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import FormattedDate from "../../../common/FormattedDate/FormattedDate";

import './Item.scss';

interface Props {
    workshop: IWorkshop
}

const Item = ( { workshop } : Props ) => {
    return (
        <Card className="w-100 p-3">
            <div className="card-action-buttons">
                <Button
                    variant="info"
                    size="sm"
                    title="Edit this workshop"
                    className="me-2"
                    onClick={() => {}}
                >
                    <FontAwesomeIcon
                        icon={faPencil}
                    />
                </Button>
                <Button
                    variant="danger"
                    size="sm"
                    title="Delete this workshop"
                    onClick={() => {}}
                >
                    <FontAwesomeIcon
                        icon={faTrash}
                    />
                </Button>
            </div>

            <div className="card-img-top-wrapper">
                <Card.Img variant="top" src={workshop.imageUrl} alt={workshop.name} />
            </div>
            <Card.Body>
                <Card.Title>{workshop.name}</Card.Title>
                <Card.Text>
                    <FormattedDate date={workshop.startDate} /> -
                    <FormattedDate date={workshop.endDate} />
                </Card.Text>
                <Card.Text>
                    {workshop.location.address}, {workshop.location.city}, {workshop.location.state}
                </Card.Text>
                <Link to={`/workshops/${workshop.id}`}>
                    <Button variant="primary">Know more</Button>
                </Link>
            </Card.Body>
        </Card>
    );
}

export default Item;