import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlusCircle,
  faPaperPlane,
  faImage,
  faCalendarAlt,
} from '@fortawesome/free-solid-svg-icons';

export default function MessageForm() {
  return (
    <div className="sticky bottom-0 flex w-full space-x-3 pb-5">
      <div className="flex-1 items-center">
        <div class="dropdown-top dropdown">
          <button
            tabIndex="0"
            className="btn btn-ghost btn-circle border-transparent bg-base-100"
          >
            <FontAwesomeIcon
              icon={faPlusCircle}
              size="2xl"
              fixedWidth
              color="primary"
            />
          </button>
          <ul
            tabindex="0"
            class="w-500 dropdown-content menu rounded-box mb-3 bg-base-100 p-4 shadow-lg"
          >
            <li className="flex">
              <a href="#my-modal-2" class="btn btn-ghost justify-start">
                <FontAwesomeIcon
                  icon={faImage}
                  size="xl"
                  fixedWidth
                  color="primary"
                />
                <span>Send Photo</span>
              </a>
            </li>
            <li className="flex w-max">
              <a href="#my-modal-2" class="btn btn-ghost justify-start">
                <FontAwesomeIcon
                  icon={faCalendarAlt}
                  size="xl"
                  fixedWidth
                  color="primary"
                />
                <span className="inline-block">Request Appointment</span>
              </a>
            </li>
          </ul>
        </div>

        {/* Modal */}
        <div class="modal" id="my-modal-2">
          <div class="modal-box w-max">
            <h3 class="text-lg font-bold">Request Appointment</h3>

            <div className="m-5 flex flex-col space-y-5">
              <div className="flex">
                <span>From</span>
              </div>
              <div className="flex">
                <span>To</span>
              </div>
              <div className="flex">
                <span>Price</span>
              </div>
              <div className="flex">
                <span>Subject</span>
              </div>
              <div className="flex">
                <span>Level</span>
              </div>
            </div>

            <div class="modal-action">
              <a href="#" class="btn btn-ghost">
                Cancle
              </a>
              <a href="#" class="btn btn-primary">
                Send
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-2 w-screen max-w-7xl items-center">
        <input
          type="text"
          placeholder="Enter your message"
          className="input input-bordered input-primary input-warning w-screen max-w-screen-xl"
        />
      </div>
      <div className="flex-2 items-center">
        <button className="btn btn-ghost">
          <FontAwesomeIcon
            icon={faPaperPlane}
            size="xl"
            fixedWidth
            color="primary"
          />
        </button>
      </div>
    </div>
  );
}
