import WorkshopDetails from "../../../components/workshops/WorkshopDetails/WorkshopDetails";
import { useParams } from 'react-router-dom';

const WorkshopDetailsPage = () => {
    // params -> { id: '1' }
    const { id } = useParams();
    const numId = +(id as string);

    return (
        <WorkshopDetails id={numId} />
    );
};

export default WorkshopDetailsPage;