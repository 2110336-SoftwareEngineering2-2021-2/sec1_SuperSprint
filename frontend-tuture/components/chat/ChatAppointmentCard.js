import moment from 'moment';

export default function ChatAppointmentCard({
  apptId,
  subjects,
  levels,
  startApptDate,
  endApptDate,
  price,
  canAccept,
  onAccept,
  onDecline,
}) {
  return (
    <div className="my-5 flex h-full justify-center">
      <div className="card card-bordered w-96 border-primary bg-base-100 text-neutral-content shadow-md shadow-primary/50">
        <div className="card-body items-center text-center">
          <h2 className="card-title text-neutral-content">{price} Baht</h2>
          <p>
            {subjects[0]} ({levels[0]})
          </p>
          <p>{moment(startApptDate).format('MMMM Do YYYY, h:mm:ss a')}</p>
          <p>{moment(endApptDate).format('MMMM Do YYYY, h:mm:ss a')}</p>
          {canAccept ? (
            <div className="card-actions justify-end">
              <button
                className="btn btn-outline btn-error"
                onClick={async () => await onDecline(apptId)}
              >
                Decline
              </button>
              <button
                className="btn btn-outline btn-success"
                onClick={async () => await onAccept(apptId)}
              >
                Accept
              </button>
            </div>
          ) : (
            <p>Pending</p>
          )}
        </div>
      </div>
    </div>
  );
}
