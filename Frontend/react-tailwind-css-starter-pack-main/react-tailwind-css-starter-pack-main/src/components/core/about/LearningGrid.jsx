import React from 'react'

const datas = [
    {
        order : -1,
        heading : "World-Class Learning for Anyone, Anywhere",
        highlightText : "Anyone, Anywhere",
        description : "Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
        btnText : "Learn More",
        btnLink : "/"
    },
    {
        order : 1,
        heading : "Curriculum Based on Industry Needs",
        description : "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
    },
    {
        order : 2,
        heading : "Our Learning Methods",
        description : "The learning process uses the namely online and offline.",
    },
    {
        order : 3,
        heading : "Certification",
        description : "You will get a certificate that can be used as a certification during job hunting.",
    },
    {
        order : 4,
        heading : "Rating Auto-grading",
        description : "You will immediately get feedback during the learning process without having to wait for an answer or response from the mentor.",
    },
    {
        order : 5,
        heading : "Ready to Work",
        description : "Connected with over 150+ hiring partners, you will have the opportunity to find a job after graduating from our program.",
    },
]

const LearningGrid = () => {
  return (
    <div className='grid grid-rows-2 grid-cols-4 gap-3 text-white'>
        {
            datas.map((data, index) => 
                <div key={index} className={`${data.order === -1  ? "col-span-2" : "col-span-1"}`}>
                    <div>
                        <h1>{data.heading}</h1>
                        {data.order === -1 && <p>{data.highlightText}</p>}
                    </div>
                    <div>
                        {data.description}
                    </div>
                    <div>
                        {
                            data.btnText && <button>data.btnText</button>
                        }
                    </div>
                </div>
            )
        }
    </div>
  )
}

export default LearningGrid