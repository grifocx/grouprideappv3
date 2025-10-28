import { CreateRideModal } from '../CreateRideModal';

export default function CreateRideModalExample() {
  return (
    <div className="p-4">
      <CreateRideModal onCreateRide={(ride) => console.log('Created:', ride)} />
    </div>
  );
}
