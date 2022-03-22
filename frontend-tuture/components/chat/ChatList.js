import React from 'react';

export default function ChatList() {
  return (
    <div className="container space-y-5">
      <h1 className="text-center text-xl font-bold text-base-content xl:text-2xl">
        Chat
      </h1>
      <div className="carousel rounded-box w-96">
        <div className="carousel-item w-1/2">
          <img
            src="https://api.lorem.space/image/game?w=256&h=400&hash=8B7BCDC2"
            className="w-full"
          />
        </div>
        <div className="carousel-item w-1/2">
          <img
            src="https://api.lorem.space/image/game?w=256&h=400&hash=500B67FB"
            className="w-full"
          />
        </div>
      </div>
      <div className="carousel rounded-box w-96">
        <div className="carousel-item w-1/2">
          <img
            src="https://api.lorem.space/image/game?w=256&h=400&hash=A89D0DE6"
            className="w-full"
          />
        </div>
        <div className="carousel-item w-1/2">
          <img
            src="https://api.lorem.space/image/game?w=256&h=400&hash=225E6693"
            className="w-full"
          />
        </div>
      </div>
      <div className="carousel rounded-box w-96">
        <div className="carousel-item w-1/2">
          <img
            src="https://api.lorem.space/image/game?w=256&h=400&hash=BDC01094"
            className="w-full"
          />
        </div>
        <div className="carousel-item w-1/2">
          <img
            src="https://api.lorem.space/image/game?w=256&h=400&hash=7F5AE56A"
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
}
