import React from 'react';
const cardData = [
    {
        imageUrl: "images/icon/projector.png",
        title: "Live Projects",
        text: "To work on real-time projects.",
        duration: 300
    },
    {
        imageUrl: "images/icon/trainers.png",
        title: "Expert Trainers",
        text: "Learn from certified & experienced trainers.",
        duration: 600
    },
    {
        imageUrl: "images/icon/course2.png",
        title: "Globally Recognized Certificates",
        text: "Our Certificates are valued by top corporates.",
        duration: 900
    },
    {
        imageUrl: "images/icon/practical.gif",
        title: "Hands on Training",
        text: "100% Practical based training model.",
        duration: 1200
    }
];
export default function Features() {
    return (
        <div style={{display:'flex',flexDirection:'column'}} id="liveCards">
            <center>
                <p id="LiveWork" style={{ color: '#00beff', fontSize: '1.5rem', fontWeight: 'bold' }}>
                    WHY CHOOSE DRISHTEE
                </p>
                <small className="h6 fw-normal" style={{ color: '#f0f0f0', maxWidth: '80%', display: 'block' }}>
                    We are a modern, welcoming institute, perfectly tailored for students, offering all the educational resources you need right here.
                </small>
                <hr style={{ height: '5px', backgroundColor: '#00beff', width: '20%' }} />
            </center>
            <center style={{display:"flex", flexWrap:"wrap", justifyContent:'center'}}>
            {cardData.map((card, index) => (
                <div key={index} className="card text-center m-1 border-secondary myshadow" >
                    <img className="card-img-top mt-2 rounded mx-auto d-block" src={card.imageUrl} style={{ width: '70px' }} />
                    <div className="card-body">
                        <h5 className="card-title fw-bolder" id={`liveHead${index + 1}`} style={{ color: 'blue' }}>{card.title}</h5>
                        <p className="card-text" id={`liveText${index + 1}`}>{card.text}</p>
                    </div>
                </div>
            ))}
            </center>
        </div>
    );
}
