import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function ChatCard({
  firstName,
  lastName,
  accepted,
  canAccept = true,
  selected,
  onClick,
  onAccept,
  onDecline,
}) {
  return (
    <div
      className={`flex w-24 cursor-pointer items-center gap-0 rounded-md p-2 transition-colors hover:bg-base-300 xs:w-56 xs:gap-2 md:w-80 ${
        selected && 'bg-base-200'
      }`}
      onClick={onClick}
    >
      <div className="avatar">
        <div className="w-12 rounded-full md:w-14">
          <img src="https://api.lorem.space/image/face?hash=3174" />
        </div>
      </div>
      <div className="h-fit">
        <p
          className={`${
            accepted ? 'w-36 md:w-56' : 'w-28 md:w-40'
          } hidden overflow-hidden text-ellipsis whitespace-nowrap text-base-content xs:block`}
        >
          {firstName} {lastName}
        </p>
        <p
          className={`${
            accepted ? 'w-36 md:w-56' : 'w-28 md:w-40'
          } hidden overflow-hidden text-ellipsis whitespace-nowrap text-sm text-base-content/80 xs:block`}
        >
          {accepted ? '' : 'Pending chat request'}
        </p>
      </div>
      {!accepted && (
        <div className="ml-auto mr-0 flex w-fit flex-col md:flex-row">
          <button
            className="btn btn-ghost btn-circle btn-xs inline-block rounded-full text-error md:btn-sm"
            onClick={(e) => {
              e.stopPropagation();
              onDecline();
            }}
          >
            <FontAwesomeIcon fixedWidth icon={faTimes} />
          </button>
          {canAccept && (
            <button
              className="btn btn-ghost btn-circle btn-xs inline-block rounded-full text-success md:btn-sm"
              onClick={(e) => {
                e.stopPropagation();
                onAccept();
              }}
            >
              <FontAwesomeIcon fixedWidth icon={faCheck} />
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default ChatCard;
