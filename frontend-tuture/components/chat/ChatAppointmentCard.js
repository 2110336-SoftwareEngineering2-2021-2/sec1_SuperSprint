export default function ChatAppointmentCard({ canAccept }) {
  return (
    <div className="my-5 flex h-full justify-center">
      <div class="card card-bordered w-96 border-primary bg-base-100 text-neutral-content shadow-md shadow-primary/50">
        <div class="card-body items-center text-center">
          <h2 class="card-title text-neutral-content">3,200 Baht</h2>
          <p class="text-neutral-content">
            May 23rd 2022, 12:00 PM August 8th 2022, 14.00PM PAT1 (PAT)
          </p>
          {canAccept ? (
            <div class="card-actions justify-end">
              <button class="btn btn-outline btn-error">Decline</button>
              <button class="btn btn-outline btn-success">Accept</button>
            </div>
          ) : (
            <p>Pending</p>
          )}
        </div>
      </div>
    </div>
  );
}
