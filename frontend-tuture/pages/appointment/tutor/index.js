import React, { useEffect, useState } from 'react';
import AppointmentCard from '../../../components/appointment/AppointmentCard';

const APPO_STATUS= [
    {
      title: 'Pending',
      key: 'pending',
    },
    {
      title: 'Negotiating',
      key: 'negotiating',
    },
    {
      title: 'Offering',
      key: 'offering',
    },
    {
      title: 'Confirmed',
      key: 'confirmed',
    },
  ];

  const names = [
    ['Adam', 'Benson'],
    ['Clare', 'Donaldsdfadsfdsfson'],
    ['Phusaratis', 'Jong'],
    ['Donald', 'Clarkson'],
  ];

export default function TutorAppointment() {
  const [selectedStatus, setSelectedStatus] = useState(APPO_STATUS[0]);

    function changeTab(event) {
        const selected = event.target.getAttribute('tabStatus');
        setSelectedStatus(APPO_STATUS.find((item) => item.key === selected));
      }

    function goToChat(){
      //add function detail
        
      }
  
    function acceptStudent(){
      //add function detail
        
      }
  
    function declineStudent(){
      //add function detail
        
      }
  
    function cancelAppointment(){
      //add function detail
        
      }

      let temp = [];
  for (let i = 0; i < 4; i++) {
    temp.push(
      <AppointmentCard
        key={i}
        firstName={names[i][0]}
        lastName={names[i][1]}
        profileImg={
          'https://www.chicagotribune.com/resizer/a-16fPYl-SK8W6HPnzjOHK1rqho=/800x551/top/arc-anglerfish-arc2-prod-tronc.s3.amazonaws.com/public/IEYVMAFZ7BBXHM46GFNLWRN3ZA.jpg'
        }
        subjects={['Physics', 'Chemistry']}
        levels={['High school', 'Middle school']}
        createdDate={new Date(Date.now() - Math.random()*2*24*60*60*1000)}
        apptDate={new Date(Date.now() - Math.random()*2*24*60*60*1000)}
        status={selectedStatus.key}
        onCardClick={() => console.log(`Card click ${names[i][0]}`)}
        onChooseClick={() => console.log(`Choose button click ${names[i][0]}`)}
        onAccept={() => console.log(`Choose button click ${names[i][0]}`)}
        onDecline={() => console.log(`Choose button click ${names[i][0]}`)}
        onCancel={() => console.log(`Choose button click ${names[i][0]}`)}
        onChatClick={() => console.log(`Choose button click ${names[i][0]}`)}
        POV="tutor"
      />
    );
  }

  return (
    <div>
        <h1 className="text-center text-xl font-bold text-primary xl:text-2xl">
          Tutor's Appointment Status
        </h1>
        <br/>
      
      {(selectedStatus.key == "pending") && (<div>
      <div className="my-1 flex flex-wrap justify-center gap-4">
      <div class="tabs">
        <a onClick={changeTab} class="tab tab-bordered tab-active tab-lg" tabStatus="pending">Pending</a>
        <a onClick={changeTab} class="tab tab-bordered tab-lg" tabStatus="negotiating">Negotiating</a>
        <a onClick={changeTab} class="tab tab-bordered tab-lg" tabStatus="offering">Offering</a>
        <a onClick={changeTab} class="tab tab-bordered tab-lg" tabStatus="confirmed">Confirmed</a>
      </div>
      </div>
      <div className="my-2 flex flex-wrap justify-center gap-4">{temp}</div>
      </div>
      )}
      {(selectedStatus.key == "negotiating") && (
      <div>
      <div className="my-1 flex flex-wrap justify-center gap-4">
      <div class="tabs">
        <a onClick={changeTab} class="tab tab-bordered tab-lg" tabStatus="pending">Pending</a>
        <a onClick={changeTab} class="tab tab-bordered tab-active tab-lg" tabStatus="negotiating">Negotiating</a>
        <a onClick={changeTab} class="tab tab-bordered tab-lg" tabStatus="offering">Offering</a>
        <a onClick={changeTab} class="tab tab-bordered tab-lg" tabStatus="confirmed">Confirmed</a>
      </div>
      </div>
      <div className="my-2 flex flex-wrap justify-center gap-4">{temp}</div>
      </div>
      )}
      {(selectedStatus.key == "offering") && (
      <div>
      <div className="my-1 flex flex-wrap justify-center gap-4">
      <div class="tabs">
        <a onClick={changeTab} class="tab tab-bordered tab-lg" tabStatus="pending">Pending</a>
        <a onClick={changeTab} class="tab tab-bordered tab-lg" tabStatus="negotiating">Negotiating</a>
        <a onClick={changeTab} class="tab tab-bordered tab-active tab-lg" tabStatus="offering">Offering</a>
        <a onClick={changeTab} class="tab tab-bordered tab-lg" tabStatus="confirmed">Confirmed</a>
      </div>
      </div>
      <div className="my-2 flex flex-wrap justify-center gap-4">{temp}</div>
      </div>
      )}
      {(selectedStatus.key == "confirmed") && (
      <div>
      <div className="my-1 flex flex-wrap justify-center gap-4">
      <div class="tabs">
        <a onClick={changeTab} class="tab tab-bordered tab-lg" tabStatus="pending">Pending</a>
        <a onClick={changeTab} class="tab tab-bordered tab-lg" tabStatus="negotiating">Negotiating</a>
        <a onClick={changeTab} class="tab tab-bordered tab-lg" tabStatus="offering">Offering</a>
        <a onClick={changeTab} class="tab tab-bordered tab-active tab-lg" tabStatus="confirmed">Confirmed</a>
      </div>
      </div>
      <div className="my-2 flex flex-wrap justify-center gap-4">{temp}</div>
      </div>
      )}
    </div>
  );
}
