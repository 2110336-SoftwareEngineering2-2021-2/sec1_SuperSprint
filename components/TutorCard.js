import {
  faBookOpen,
  faGraduationCap,
  faDollarSign,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function TutorCard({
  name,
  profileImg,
  subjects,
  levels,
  rating,
  price,
  onCardClick,
  onChooseClick,
}) {
  function onChoose(event) {
    if (typeof onChooseClick == "function") {
      onChooseClick();
    }
    event.stopPropagation(); // Prevent button click from firing card click
  }

  return (
    <div
      className="bg-white dark:bg-zinc-800 shadow-lg hover:shadow-amber-500/50 hover:scale-105 transition-all rounded-lg w-auto max-w-3xl flex justify-between"
      onClick={onCardClick ?? null}
      tabIndex={0}
    >
      <img
        src={profileImg}
        className="rounded-lg h-full sm:w-48 w-24 object-cover drag flex-1"
      />
      <div className="inline-flex flex-col justify-between p-4 sm:w-96">
        <h3 className="font-bold dark:text-amber-500 dark:hover:text-white text-xl max-w-fit sm:w-64 w-40 whitespace-nowrap overflow-hidden overflow-ellipsis hover:text-amber-500 hover:cursor-pointer transition-colors">
          {name}
        </h3>
        <p className="text-md dark:text-white selection:bg-amber-300 cursor-default">
          <FontAwesomeIcon size="sm" icon={faBookOpen} fixedWidth />{" "}
          {subjects.join(", ")}
        </p>
        <p className="text-md dark:text-white selection:bg-amber-300 cursor-default">
          <FontAwesomeIcon size="sm" icon={faGraduationCap} fixedWidth />{" "}
          {levels.join(", ")}
        </p>
        <p className="text-md dark:text-white selection:bg-amber-300 cursor-default">
          <FontAwesomeIcon size="sm" icon={faDollarSign} fixedWidth />{" "}
          {`${price.min} - ${price.max} baht/hr`}
        </p>
      </div>
      <div className="inline-flex flex-col justify-between select-none p-2">
        <div>
          <p className="font-bold text-amber-500 sm:text-4xl text-3xl text-center">
            {rating.toFixed(1)}
          </p>
          <p className="text-amber-500 sm:text-md text-sm text-center">
            rating
          </p>
        </div>
        <button className="btn-primary" onClick={onChoose}>
          Choose
        </button>
      </div>
    </div>
  );
}
